import getDB from "@models/db";

export default class Uni {
  constructor(name_, id) {
    this.name = name_;
    this.id = id;
  }

  get categories() {
    return (async () => {
      return JSON.parse(
        await getDB().all("SELECT name FROM Category WHERE uni_id = ?", [
          this.id,
        ])
      );
    })();
  }
}

export const getUnisListFromDB = async () => {
  const response = JSON.parse(await getDB().all("SELECT name, id FROM Uni"));
  if (!response) {
    return { success: false, content: null };
  }
  return {
    success: true,
    content: response.map(({ name: name_, id }) => new Uni(name_, id)),
  };
};
