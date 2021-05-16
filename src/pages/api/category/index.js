import { getCategoriesFromDB } from "@models/uni";

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      const universityID = req.query.universityID;
      const categories = await getCategoriesFromDB(universityID);
      break;
    }
  }
};
