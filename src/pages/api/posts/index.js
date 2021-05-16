import { getCommentsFromDB } from "@models/comments";
import {
  createPostInDB,
  getCategoryPostsFromDB,
  getPostByID,
} from "@models/post";

export default async (req, res) => {
  const OK = 200;
  switch (req.method) {
    case "POST": {
      const { authorID, categoryID, title, content } = req.body;
      const newPost = await createPostInDB(
        authorID,
        categoryID,
        title,
        content
      );
      if (newPost.success) {
        res.status(301).json({
          success: true,
          data: newPost.data,
        });
      } else {
        res.status(400).json({
          success: false,
          error: newPost.error,
        });
      }
      break;
    }
    case "GET": {
      if (req.query.categoryID) {
        const { categoryID } = req.query;
        const posts = await getCategoryPostsFromDB(categoryID);
        res.status(OK).json(posts);
        break;
      } else if (req.query.id) {
        const postID = req.query.id;
        const postData = await getPostByID(postID);
        const comments = await getCommentsFromDB(postID);
        const post = {
          data: {
            comments,
            postData,
          },
          success: true,
        };
        res.status(OK).json(post);
        break;
      }
      break;
    }
    default: {
      break;
    }
  }
};
