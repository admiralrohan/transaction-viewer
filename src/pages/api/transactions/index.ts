import type { NextApiRequest, NextApiResponse } from "next";
import transactionsDb from "@db/Parent.json";
import installmentsDb from "@db/Child.json";
import Transaction from "@interfaces/transaction";

type Data = {
  data: Transaction[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data: transactions } = transactionsDb;
  const { data: installments } = installmentsDb;

  const result = transactions.map((tx) => {
    const totalPaidAmount = installments
      .filter((installment) => installment.parentId === tx.id)
      .reduce((totalValue, currentInstallment) => {
        return totalValue + currentInstallment.paidAmount;
      }, 0);

    return { ...tx, totalPaidAmount };
  });

  res.status(200).json({ data: result });
}
