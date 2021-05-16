import getDB from "@models/db";

export const createCommentInDB = async (author_id, post_id, content) => {
  const db = await getDB();
  let response;
  let error = false;
  let query =
    "INSERT INTO Comment (author_id, post_id, content) VALUES (?, ?, ?)";
  try {
    response = await db.run(query, [author_id, post_id, content]);
  } catch (e) {
    error = e;
  }
  if (!response || error) {
    return { success: false, error: error || "Failed to insert." };
  }
  return { success: true, data: {} };
};

export const getCommentByID = async (id) => {
  const db = await getDB();
  let response;
  let error = false;
  let query = "SELECT * FROM Comment WHERE id = ?";
  try {
    response = await db.get(query, [id]);
  } catch (e) {
    error = e;
  }
  if (!response || error) {
    return { success: false, error: error || "Failed to insert." };
  }
  return { success: true, data: response };
};

export const getCommentsFromDB = async (post_id) => {
  let error = false;
  const db = await getDB();
  let query =
    "SELECT Comment.*, User.nickname FROM Comment LEFT JOIN User ON Comment.author_id = User.id WHERE Comment.post_id = ?";

  let response;
  try {
    response = await db.all(query, [post_id]);
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
