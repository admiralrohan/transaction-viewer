import type { NextApiRequest, NextApiResponse } from "next";
import db from "@db/Parent.json";

type Data = {
  data: { id: number; sender: string; receiver: string; totalAmount: number }[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(db);
}
