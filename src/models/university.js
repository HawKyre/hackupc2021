import getDB from "@models/db";

export default class Uni {
  constructor(name_, categories) {
    this.name = name_;
    this.categories = categories;
  }
}

export const getUnisListFromDB = async () => {
  const db = await getDB();
  return await db.all("SELECT name FROM Uni");
};
