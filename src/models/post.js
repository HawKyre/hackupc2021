import getDB from "./db";

export const getCommentsFromDB = async (post_id) => {
  let error = false;
  const db = await getDB();
  const query =
    "SELECT Comments.id, Comments.created_on, User.nickname, Comments.author_id, Comments.content FROM Comments INNER JOIN User ON Comments.author_id = User.id WHERE Comments.post_id = ?";
  let response;
  try {
    response = await db.all(query, [post_id]);
  } catch (e) {
    error = e;
  }
  if (!user || !response || error) {
    return { succes: false, error: error || "No data." };
  }
  const { id, created_on, content, nickname, author_id } = response;
  return {
    success: true,
    data: { id, created_on, content, author: { nickname, author_id } },
  };
};

export const getPostByID = async (id) => {
  let error = false;
  const db = await getDB();
  const query =
    "SELECT Post.*, Category.name, Category.uni_id FROM Post INNER JOIN Category ON Post.category_id = Category.id WHERE Post.id = ?";
  let response;
  try {
    response = await db.get(query, [id]);
  } catch (e) {
    error = e;
  }
  if (!response || error) {
    return { success: false, error: error || "No data." };
  }
  const {
    id,
    created_on,
    author_id,
    category_id,
    uni_id,
    name,
    title,
    content,
  } = response;
  return {
    success: true,
    data: {
      id,
      created_on,
      author_id,
      category: { category_id, name, uni_id },
      title,
      content,
    },
  };
};

export const getCategoryPostsFromDB = async (category_id) => {
  let error = false;
  const db = await getDB();
  const query = "SELECT * FROM Post WHERE category_id = ?";
  let response;
  try {
    response = await db.all(query, [category_id]);
  } catch (e) {
    error = e;
  }
  if (!response || error) {
    return { success: false, error: error || "No data." };
  }
  return {
    success: true,
    data: response,
  };
};
