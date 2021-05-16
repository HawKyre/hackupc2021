import UniMain from "@components/UniversityMain";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { LoremIpsum } from "lorem-ipsum";
import CategoryShowcase from "@components/CategoryShowcase";
import jwt from "jsonwebtoken";
import PostVisualizer from "@components/PostVisualizer";
import { getCategoriesFromDB } from "@models/uni";

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

export default function Home({ categoryListData }) {
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    const json = await res.json();
    return json;
  });

  const [pageState, setPageState] = useState("main");
  const [uni, setUni] = useState(data ? data.user.uni.name : undefined);
  const [categoryList, setCategoryList] = useState(categoryListData);
  const [category, setCategory] = useState();
  const [posts, setPosts] = useState(postListData);
  const [cPost, setCurrentPost] = useState();

  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.user) {
    loggedIn = true;
  }

  const logout = () => {
    Cookies.remove("hackupc-token");
    revalidate();
  };

  const goToCategory = async (cat) => {
    setPageState("cat");
    setCategory(cat);
    const postsFromCategory = await fetch(`/api/posts?categoryID=${cat.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const json = await postsFromCategory.json();
    if (json.success) {
      setPosts(json.data);
    } else {
      throw new Error("No se han cargao los posts vaya");
    }
    // Request al server para los datos de la categoría en esa universidad
  };

  const goToPost = async (postID) => {
    const postData = await fetch(`/api/posts?id=${postID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const json = await postData.json();
    console.log(data);
    if (json.success) {
      setCurrentPost({ ...json.data });
      setPageState("forum");
    } else {
      throw new Error("No se han cargao los posts vaya");
    }
  };

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

  const submitComment = async (text) => {
    const c = await fetch(`/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userID: data.user.id,
        postID: cPost.postData.data.id,
        content: text,
      }),
    });

    const json = await c.json();
    console.log(json);
    if (json.success) {
      const comments = await fetch(
        `/api/comment?postID=${cPost.postData.data.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const json2 = await comments.json();
      setCurrentPost((x) => {
        return { ...x, comments };
      });

      console.log("Json 2");
      console.log(json2);
    } else {
      throw new Error("Tusmuert-OS");
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
              return (
                <CategoryShowcase
                  categoryName={category.name}
                  posts={posts}
                  goToPost={goToPost}
                />
              );
            case "forum":
              return (
                <PostVisualizer post={cPost} submitComment={submitComment} />
              );
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

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.headers.cookie
    .split(";")
    .map((x) => x.trim())
    .filter((x) => x.startsWith("hackupc-token="))[0]
    .split("=")[1];

  const data = jwt.verify(cookie, process.env.JWT_SECRET);
  const categories = await getCategoriesFromDB(data.user.uni.id);

  return {
    props: {
      categoryListData: categories.data,
    },
  };
}
