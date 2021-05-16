import { getCommentsFromDB } from "@models/comments";
import { getCategoryPostsFromDB, getPostByID } from "@models/post";

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      if (req.query.categoryID) {
        const categoryID = req.query.categoryID;
        const posts = await getCategoryPostsFromDB(categoryID);
        res.status(200).json(posts);
        break;
      } else if (req.query.id) {
        const postID = req.query.id;
        const postData = await getPostByID(postID);
        const comments = await getCommentsFromDB(postID);
        const post = {
          success: true,
          data: {
            postData,
            comments,
          },
        };
        res.status(200).json(post);
        break;
      }
    }
  }
};
