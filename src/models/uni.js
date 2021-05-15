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
    return response;
  }

  async json() {
    return toJSON({
      name: this.name,
      categories: await this.getCategories(),
    });
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
    data: response.map(({ name: name_, id }) => new Uni(id, name_)),
  };
};
