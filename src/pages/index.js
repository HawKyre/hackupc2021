import UniMain from "@components/UniMain";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import CategoryShowcase from "@components/CategoryShowcase";
import jwt from "jsonwebtoken";
import PostVisualizer from "@components/PostVisualizer";
import { getCategoriesFromDB } from "@models/uni";
import Head from "@components/Head";
import CreatePost from "@components/CreatePost";

export default function Home({ categoryListData }) {
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    const json = await res.json();
    return json;
  });

  const [pageState, setPageState] = useState("main");
  const [category, setCategory] = useState();
  const [posts, setPosts] = useState([]);
  const [cPost, setCurrentPost] = useState();
  const [newPostData, setNewPostData] = useState({
    title: "",
    content: "",
  });

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
      case "newpost":
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
    if (json.success) {
      goToPost(cPost.postData.data.id);
    } else {
      throw new Error("Tusmuert-OS");
    }
  };

  const goToCreatePost = () => {
    setPageState("newpost");
  };

  const createPost = async () => {
    const postData = await fetch(`/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        authorID: data.user.id,
        categoryID: category.id,
        title: newPostData.title,
        content: newPostData.content,
      }),
    });
    const json = await postData.json();
    console.log(json);
    if (json.success) {
      await goToCategory(category);
    } else {
      throw new Error("No se han cargao los posts vaya");
    }
  };

  return (
    <div>
      <Head />
      {loggedIn &&
        (() => {
          switch (pageState) {
            case "main":
              return (
                <UniMain
                  uniName={data.user.uni.name}
                  categoryList={categoryListData}
                  goToCategory={goToCategory}
                />
              );
            case "cat":
              return (
                <CategoryShowcase
                  categoryName={category.name}
                  posts={posts}
                  goToPost={goToPost}
                  goBack={goBack}
                  goToCreatePost={goToCreatePost}
                />
              );
            case "newpost":
              return (
                <CreatePost
                  categoryName={category.name}
                  newPostData={newPostData}
                  setNewPostData={setNewPostData}
                  cancel={goBack}
                  accept={createPost}
                />
              );
            case "forum":
              return (
                <PostVisualizer
                  post={cPost}
                  submitComment={submitComment}
                  goBack={goBack}
                />
              );
          }
        })()}
      {!loggedIn && (
        <>
          <Link href="/login">Entrar / Crear cuenta</Link>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  let cookie = ctx.req.headers.cookie;
  if (cookie) {
    cookie = cookie
      .split(";")
      .map((x) => x.trim())
      .filter((x) => x.startsWith("hackupc-token="));
    if (cookie.length > 0) {
      cookie = cookie[0].split("=")[1];
    }
  }

  if (!cookie || cookie.length == 0) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  console.log(cookie);
  const data = jwt.verify(cookie, process.env.JWT_SECRET);
  const categories = await getCategoriesFromDB(data.user.uni.id);

  return {
    props: {
      categoryListData: categories.data,
    },
  };
}
