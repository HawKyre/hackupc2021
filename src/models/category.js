import getDB from "@models/db";

export const getCategoryByID = async (id) => {
  let error = false;
  const db = await getDB();
  let response = false;
  const query =
    "SELECT Category.*, Uni.name as uni_name FROM Category INNER JOIN Uni ON Category.uni_id = Uni.id WHERE Category.id = ?";
  try {
    response = await db.get(query, [id]);
  } catch (err) {
    error = err;
  }
  if (!response || error) {
    return { error: error || "No data.", success: false };
  }
  const { idR, name, uni_id: uniID, uni_name: uniName } = response;
  return {
    data: {
      id: idR,
      name,
      uni: {
        id: uniID,
        name: uniName,
      },
    },
    success: true,
  };
};
