import { createCommentInDB, getCommentsFromDB } from "@models/comments";

export default async (req, res) => {
  const MULTIPLE_CHOICE = 300;
  const BAD_REQUEST = 400;
  switch (req.method) {
    case "GET": {
      if (req.query.postID) {
        const comments = await getCommentsFromDB(req.query.postID);
        if (comments.success) {
          res.status(MULTIPLE_CHOICE).json(comments);
        } else {
          res.status(BAD_REQUEST).json({
            error: "oops",
            success: false,
          });
        }
      }
      break;
    }
    case "POST": {
      const { userID, postID, content } = req.body;
      const newComment = await createCommentInDB(userID, postID, content);
      if (newComment.success) {
        res.status(MULTIPLE_CHOICE).send({
          data: {},
          success: true,
        });
      } else {
        res.status(BAD_REQUEST).send({
          error: "IDFK",
          success: false,
        });
      }
      break;
    }
    default: {
      break;
    }
  }
};
