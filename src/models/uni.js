import getDB from "@models/db";

export const getCategoriesFromDB = async (uniID) => {
  let error = false;
  const db = await getDB();
  let response = false;
  try {
    response = await db.all("SELECT name, id FROM Category WHERE uni_id = ?", [
      uniID,
    ]);
  } catch (err) {
    error = err;
  }
  if (!response || error) {
    return { error: error || "No data.", success: false };
  }
  return { data: response, success: true };
};

export const getUnisListFromDB = async () => {
  let error = false;
  const db = await getDB();
  let response = false;
  try {
    response = await db.all("SELECT name, id FROM Uni");
  } catch (err) {
    error = err;
  }
  if (!response || error) {
    return { error: error || "No data", success: false };
  }
  return { data: response, success: true };
};
