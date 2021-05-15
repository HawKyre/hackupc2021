import getDB from "./db";

export const getUserFromDB = async (nickname, passwd) => {
  let error = false;
  const query =
    "SELECT User.id, User.nickname, User.email, User.passwd, User.uni_id, Uni.name, User.first_name, User.surnames, User.degree FROM User INNER JOIN Uni ON User.id = Uni.id WHERE User.nickname = ? AND User.passwd = ?";
  const db = await getDB();
  let response;
  try {
    response = await db.get(query, [nickname, passwd]);
  } catch (e) {
    error = e;
  }

  if (!response || error) {
    return { success: false, error: error || "No data" };
  }
  return {
    success: true,
    data: _getUserFromResponse(response),
  };
};

export const createUserInDB = async (
  nickname,
  email,
  passwd,
  uni_id,
  name = null, // Null values to avoid problems inserting it to the db.
  surnames = null,
  degree = null
) => {
  const db = await getDB();
  let response;
  let error = false;
  let query =
    "INSERT INTO User (nickname, email, passwd, uni_id, first_name, surnames, degree) VALUES (?, ?, ?, ?, ?, ?, ?)";
  try {
    response = await db.run(query, [
      nickname,
      email,
      passwd,
      uni_id,
      name,
      surnames,
      degree,
    ]);
  } catch (e) {
    error = e;
  }
  if (!response || error) {
    return { success: false, error: error || "Failed to insert." };
  }
  return await getUserByID(response.lastID);
};

export const getUserByID = async (id) => {
  const db = await getDB();
  const query =
    "SELECT User.id, User.nickname, User.email, User.passwd, User.uni_id, Uni.name, User.first_name, User.surnames, User.degree FROM User INNER JOIN Uni ON User.id = Uni.id WHERE User.uni_id = ?";
  let response;
  try {
    response = await db.get(query, [id]);
  } catch (e) {
    error = e;
  }
  if (!response || error) {
    return { success: false, error: error || "No data" };
  }
  return {
    success: true,
    data: _getUserFromResponse(response),
  };
};

const _getUserFromResponse = (response) => {
  const {
    id,
    nickname,
    email,
    passwd: password,
    name,
    uni_id,
    ...data
  } = response;
  return { id, nickname, email, password, uni: { name, uni_id }, data };
};
