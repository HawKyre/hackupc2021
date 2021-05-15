import getDB from "@models/db";

export const getPostByID = async (postID) => {
  let error = false;
  const db = await getDB();
  let query =
    "SELECT Post.*, Category.name, Category.uni_id FROM Post INNER JOIN Category ON Post.category_id = Category.id WHERE Post.id = ?";
  query = "SELECT * FROM Post WHERE id = ?";
  let response;
  try {
    response = await db.get(query, [postID]);
  } catch (e) {
    error = e;
  }
  console.log("----------------------------");
  console.log(response);
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
      category: { id: category_id, name, uni_id },
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

export const createPostInDB = async (
  author_id,
  category_id,
  title,
  content
) => {
  const db = await getDB();
  let response;
  let error = false;
  let query =
    "INSERT INTO Post (author_id, category_id, title, content) VALUES (?, ?, ?, ?)";
  try {
    response = await db.run(query, [author_id, category_id, title, content]);
  } catch (e) {
    error = e;
  }
  if (!response || error) {
    return { success: false, error: error || "Failed to insert." };
  }
  return await getPostByID(response.lastID);
};
