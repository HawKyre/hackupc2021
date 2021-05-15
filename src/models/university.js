import getDB from "@models/db";

export default class Uni {
  constructor(name_, categories) {
    this.name = name_;
    this.categories = categories;
  }
}

export const getUnisListFromDB = async () => {
  return await getDB().all("SELECT name FROM University");
};
