export default class Post {
  constructor(title, content, timestamp, author, comments, category) {
    this.title = title;
    this.content = content;
    this.timestamp = timestamp;
    this.author = author;
    this.comments = comments;
    this.category = category;
  }
}

export const getUserPostsFromDB = (user) => {};
export const getCategoryPostsFromDB = (category) => {};
