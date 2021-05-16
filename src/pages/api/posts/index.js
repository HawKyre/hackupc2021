/* eslint-disable one-var */
/* eslint-disable max-statements */
import { getCategoryPostsFromDB, getPostByID } from "@models/post";
import { getCommentsFromDB } from "@models/comments";

export default async (req, res) => {
  const OK = 200;
  switch (req.method) {
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
