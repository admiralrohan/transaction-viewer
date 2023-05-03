import type { NextApiRequest, NextApiResponse } from "next";
import db from "@db/Parent.json";
import Transaction from "@interfaces/transaction";

type Data = {
  data: Transaction[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(db);
}
