import getDB from "@models/db";

export const getCategoryByID = (id) => {
  let error = false;
  const db = await getDB();
  let response;
  const query =
    "SELECT Category.*, Uni.name as uni_name FROM Category INNER JOIN Uni ON Category.uni_id = Uni.id WHERE Category.id = ?";
  try {
    response = await db.get(query, [1]);
  } catch (e) {
    error = e;
  }
  if (!response || error) {
    return { success: false, error: error || "No data." };
  }
  const { id, name, uni_id, uni_name } = response;
  return {
    success: true,
    data: {
      id,
      name,
      uni: {
        id: uni_id,
        name: uni_name,
      },
    },
  };
};
