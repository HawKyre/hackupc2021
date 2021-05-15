import getDB from "@models/db";

export default class Uni {
  constructor(id, name_) {
    this.name = name_;
    this.id = id;
  }

  async getCategories() {
    return await getDB().all("SELECT name FROM Category WHERE uni_id = ?", [
      this.id,
    ]);
  }

  async JSON() {
    return { name: this.name, categories: await this.getCategories() };
  }
}

export const getUnisListFromDB = async () => {
  const response = await getDB().all("SELECT name, id FROM Uni");
  if (!response) {
    return { success: false, content: null };
  }
  return {
    success: true,
    content: response.map(({ name: name_, id }) => new Uni(id, name_)),
  };
};
