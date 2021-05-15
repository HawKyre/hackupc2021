import UniMain from "@components/UniversityMain";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { LoremIpsum } from "lorem-ipsum";
import CategoryShowcase from "@components/CategoryShowcase";

const categoryListData = [
  "Novedades",
  "Noticias",
  "Deportes",
  "Becas",
  "Y yo que sé",
  "Por favor",
  "Solo quiero",
  "Rellenar",
  "Los putos",
  "Huecos :)",
];

const postListData = (() => {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });

  let arr = [];
  for (let i = 0; i < 20; i++) {
    const title = lorem.generateSentences(1);
    const content = lorem.generateParagraphs(1);
    arr.push({
      title,
      content,
    });
  }
  return arr;
})();

export default function Home() {
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    const json = await res.json();
    console.log(json);
    return json;
  });

  const [pageState, setPageState] = useState("main");
  const [uni, setUni] = useState("UPV");
  const [categoryList, setCategoryList] = useState(categoryListData);
  const [category, setCategory] = useState("none");
  const [posts, setPosts] = useState(postListData);
  const [cPost, setCurrentPost] = useState();

  console.log(data);
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }

  const logout = () => {
    Cookies.remove("hackupc-token");
    revalidate();
  };

  const goToCategory = (cat) => {
    setPageState("cat");
    setCategory(cat);
    // Request al server para los datos de la categoría en esa universidad
  };

  const goToPost = (postID) => {};

  const goBack = () => {
    switch (pageState) {
      case "main":
        break;
      case "cat":
        setPageState("main");
        break;
      case "forum":
        setPageState("cat");
        break;
    }
  };

  return (
    <>
      {loggedIn &&
        (() => {
          switch (pageState) {
            case "main":
              return (
                <UniMain
                  uniName={uni}
                  categoryList={categoryList}
                  goToCategory={goToCategory}
                />
              );
            case "cat":
              return <CategoryShowcase categoryName={category} posts={posts} />;
            case "forum":
              return <p>forums</p>;
          }
        })()}
      {!loggedIn && (
        <>
          <Link href="/login">Entrar / Crear cuenta</Link>
        </>
      )}
    </>
  );
}
