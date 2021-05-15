import { getCommentsFromDB } from "@models/comments";
import { getCategoryPostsFromDB, getPostByID } from "@models/post";

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      // console.log(req.query);
      if (req.query.categoryID) {
        const categoryID = req.query.categoryID;
        const posts = await getCategoryPostsFromDB(categoryID);
        // console.log(posts);
        res.status(200).json(posts);
        break;
      } else if (req.query.id) {
        const postID = req.query.id;
        console.log(req.query);
        const postData = await getPostByID(postID);
        console.log(postData);
        const comments = await getCommentsFromDB(postID);
        console.log(comments);
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
