import getDB from "./db";
import { getUserByID } from "./user";

export default class Post {
  constructor(id, title, content, timestamp, author, comments, category) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.timestamp = timestamp;
    this.author = author;
    this.category = category;
  }

  async getComments() {
    let error = false;
    const response = getDB().all(
      "SELECT id, created_on, author_id, content FROM Comments WHERE post_id = ?",
      [this.id],
      (e) => (error = e)
    );
    const { data: user } = await getUserByID(response.author_id);
    if (!user || !response || error) {
      return { succes: false, error: error || "No data." };
    }
    return {
      success: true,
      data: response.map(
        (comment) =>
          new Comment(response.id, response.content, response.timestamp, user)
      ),
    };
  }
}

export const getUserPostByID = (user) => {
  const response = await getDB().all("SELECT ");
};
export const getCategoryPostsFromDB = (category) => {};
