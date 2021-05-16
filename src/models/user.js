import getDB from "@models/db";

const getUserFromResponse = (response) => {
  const {
    id,
    nickname,
    email,
    passwd: password,
    name,
    uni_id: uniID,
    ...data
  } = response;
  return { data, email, id, nickname, password, uni: { id: uniID, name } };
};

export const getUserFromDB = async (nickname, passwd) => {
  let error = false;
  const query =
    "SELECT User.id, User.nickname, User.email, User.passwd, User.uni_id, Uni.name, User.first_name, User.surnames, User.degree FROM User INNER JOIN Uni ON User.uni_id = Uni.id WHERE User.nickname = ? AND User.passwd = ?";
  const db = await getDB();
  let response = false;
  try {
    response = await db.get(query, [nickname, passwd]);
  } catch (err) {
    error = err;
  }

  if (!response || error) {
    return { error: error || "No data", success: false };
  }
  return { data: getUserFromResponse(response), success: true };
};

export const getUserByID = async (id) => {
  const db = await getDB();
  let error = false;
  const query =
    "SELECT User.id, User.nickname, User.email, User.passwd, User.uni_id, User.first_name, User.surnames, User.degree, Uni.name FROM User INNER JOIN Uni ON User.uni_id = Uni.id WHERE User.id = ?";
  let response = false;
  try {
    response = await db.get(query, [id]);
  } catch (err) {
    error = err;
  }
  if (!response || error) {
    return { error: error || "No data", success: false };
  }
  return { data: getUserFromResponse(response), success: true };
};

export const createUserInDB = async (
  nickname,
  email,
  passwd,
  uniID,
  name = null,
  surnames = null,
  degree = null
) => {
  const db = await getDB();
  let response = false;
  let error = false;
  const query =
    "INSERT INTO User (nickname, email, passwd, uni_id, first_name, surnames, degree) VALUES (?, ?, ?, ?, ?, ?, ?)";
  try {
    response = await db.run(query, [
      nickname,
      email,
      passwd,
      uniID,
      name,
      surnames,
      degree,
    ]);
  } catch (err) {
    error = err;
  }
  if (!response || error) {
    return { error: error || "Failed to insert.", success: false };
  }
  const user = await getUserByID(response.lastID);
  return user;
};
