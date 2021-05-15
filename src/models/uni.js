import getDB from "@models/db";

export default class Uni {
  constructor(id, name_) {
    this.name = name_;
    this.id = id;
  }

  async getCategoriesFromDB() {
    let error = false;
    const db = await getDB();
    const response = await db.all(
      "SELECT name FROM Category WHERE uni_id = ?",
      [this.id],
      (e) => (error = e)
    );
    if (!response || error) {
      return { success: false, error: error || "No data." };
    }
    return { success: true, data: response };
  }

  json() {
    let categories;
    this.getCategoriesFromDB().then((cats) => (categories = cats.data));
    return {
      name: this.name,
      categories,
    };
  }
}

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
