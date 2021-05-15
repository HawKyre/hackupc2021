import getDB from "@models/db";

export const getCategoriesFromDB = async (uni_id) => {
  let error = false;
  const db = await getDB();
  let response;
  try {
    response = await db.all("SELECT name FROM Category WHERE uni_id = ?", [
      uni_id,
    ]);
  } catch (e) {
    error = e;
  }
  if (!response || error) {
    return { success: false, error: error || "No data." };
  }
  return { success: true, data: response };
};

export const getUnisListFromDB = async () => {
  let error = false;
  const db = await getDB();
  let response;
  try {
    response = await db.all("SELECT name, id FROM Uni");
  } catch (e) {
    error = e;
  }
  if (!response || error) {
    return { success: false, error: error || "No data" };
  }
  return {
    success: true,
    data: response,
  };
};
