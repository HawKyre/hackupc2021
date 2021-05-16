import getDB from "@models/db";

export const getPostByID = async (postID) => {
  let error = false;
  const db = await getDB();
  const query =
    "SELECT Post.*, Category.name, Category.uni_id FROM Post INNER JOIN Category ON Post.category_id = Category.id WHERE Post.id = ?";
  let response = false;
  try {
    response = await db.get(query, [postID]);
  } catch (err) {
    error = err;
  }
  if (!response || error) {
    return { error: error || "No data.", success: false };
  }
  const {
    id,
    created_on: createdOn,
    author_id: authorID,
    category_id: categoryID,
    uni_id: uniID,
    name,
    title,
    content,
  } = response;
  return {
    data: {
      author_id: authorID,
      category: { id: categoryID, name, uni_id: uniID },
      content,
      created_on: createdOn,
      id,
      title,
    },
    success: true,
  };
};

export const getCategoryPostsFromDB = async (categoryID) => {
  let error = false;
  const db = await getDB();
  const query = "SELECT * FROM Post WHERE category_id = ?";
  let response = false;
  try {
    response = await db.all(query, [categoryID]);
  } catch (err) {
    error = err;
  }
  if (!response || error) {
    return { error: error || "No data.", success: false };
  }
  return { data: response, success: true };
};

export const createPostInDB = async (authorID, categoryID, content, title) => {
  const db = await getDB();
  let response = false;
  let error = false;
  const query =
    "INSERT INTO Post (author_id, category_id, title, content) VALUES (?, ?, ?, ?)";
  try {
    response = await db.run(query, [authorID, categoryID, title, content]);
  } catch (err) {
    error = err;
  }
  if (!response || error) {
    return { error: error || "Failed to insert.", success: false };
  }
  const post = await getPostByID(response.lastID);
  return post;
};
