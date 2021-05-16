import { createCommentInDB, getCommentsFromDB } from "@models/comments";

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      console.log("dsdssd");
      if (req.query.postID) {
        const comments = await getCommentsFromDB(req.query.postID);
        if (comments.success) {
          res.status(300).json(comments);
          return;
        } else {
          res.status(400).json({
            success: false,
            error: "oops",
          });
          return;
        }
      }
      break;
    }
    case "POST": {
      const { userID, postID, content } = req.body;
      const newComment = await createCommentInDB(userID, postID, content);
      console.log(newComment);
      if (newComment.success) {
        res.status(300).send({
          success: true,
          data: {},
        });
      } else {
        res.status(400).send({
          success: false,
          error: "IDFK",
        });
      }
      break;
    }
  }
};
