import getDB from "@models/db";

export default class Uni {
  constructor(id, name_) {
    this.name = name_;
    this.id = id;
  }

  async getCategories() {
    let error = false;
    const response = await getDB().all(
      "SELECT name FROM Category WHERE uni_id = ?",
      [this.id],
      (e) => (error = e)
    );
    if (!response || error) {
      return { success: false, error: error || "No data." };
    }
    return response;
  }

  async JSON() {
    return { name: this.name, categories: await this.getCategories() };
  }
}

export const getUnisListFromDB = async () => {
  let error = false;
  const response = await getDB().all(
    "SELECT name, id FROM Uni",
    (e) => (error = e)
  );
  if (!response || error) {
    return { success: false, error: error || "No data" };
  }
  return {
    success: true,
    content: response.map(({ name: name_, id }) => new Uni(id, name_)),
  };
};
