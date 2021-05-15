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
    const db = await getDB();
    const response = await db.all(
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

  async json() {
    let comments = this.getComments().then((comm) => (comments = comm.data));
    return toJSON({
      id: this.id,
      title: this.title,
      content: this.content,
      timestamp: this.timestamp,
      author: this.author,
      category: this.category,
      comments,
    });
  }
}

export const getUserPostByID = async (id) => {
  let error = false;
  const db = await getDB();
  const response = await db.get(
    "SELECT * FROM Post WHERE id = ?",
    [id],
    (e) => (error = e)
  );
  if (!response || error) {
    return { success };
  }
};
export const getCategoryPostsFromDB = (category) => {};
