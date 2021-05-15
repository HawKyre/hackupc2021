import { getCategoriesFromDB } from "@models/uni";

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      console.log(req.query);
      const universityID = req.query.universityID;
      console.log(universityID);
      const categories = await getCategoriesFromDB(universityID);
      console.log(categories);
      break;
    }
  }
};
