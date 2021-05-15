export default class Comment {
  constructor(content, timestamp, author) {
    this.content = content;
    this.timestamp = timestamp;
    this.author = author;
  }
}

export const getCommentsFromDB = (post) => {};
