import getDB from "@models/db";

export const createCommentInDB = async (authorID, postID, content) => {
  const db = await getDB();
  let error = false;
  let response = false;
  const query =
    "INSERT INTO Comment (author_id, post_id, content) VALUES (?, ?, ?)";
  try {
    response = await db.run(query, [authorID, postID, content]);
  } catch (err) {
    error = err;
  }
  if (!response || error) {
    return { error: error || "Failed to insert.", success: false };
  }
  return { data: {}, success: true };
};

export const getCommentByID = async (id) => {
  const db = await getDB();
  let response = false;
  let error = false;
  const query = "SELECT * FROM Comment WHERE id = ?";
  try {
    response = await db.get(query, [id]);
  } catch (err) {
    error = err;
  }
  if (!response || error) {
    return { error: error || "Failed to insert.", success: false };
  }
  return { data: response, success: true };
};

export const getCommentsFromDB = async (postID) => {
  let error = false;
  const db = await getDB();
  const query =
    "SELECT Comment.*, User.nickname FROM Comment LEFT JOIN User ON Comment.author_id = User.id WHERE Comment.post_id = ?";

  let response = false;
  try {
    response = await db.all(query, [postID]);
  } catch (err) {
    error = err;
  }
  if (!response || error) {
    return { error: error || "No data.", success: false };
  }
  return { data: response, success: true };
};
