import getDB from "@models/db";

export const getCategoriesFromDB = async (uni_id) => {
  let error = false;
  const db = await getDB();
  const response = await db.all(
    "SELECT name FROM Category WHERE uni_id = ?",
    [uni_id],
    (e) => (error = e)
  );
  if (!response || error) {
    return { success: false, error: error || "No data." };
  }
  return { success: true, data: response };
};

export const getUnisListFromDB = async () => {
  let error = false;
  const db = await getDB();
  const response = await db.all("SELECT name, id FROM Uni", (e) => (error = e));
  if (!response || error) {
    return { success: false, error: error || "No data" };
  }
  return {
    success: true,
    data: response,
  };
};
