import type { NextApiRequest, NextApiResponse } from "next";
import transactionsDb from "@db/Parent.json";
import installmentsDb from "@db/Child.json";
import Transaction from "@interfaces/transaction";
import { defaultPageSize } from "@constants/index";

type Data = {
  data: Transaction[];
  totalPages: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || defaultPageSize;
  const { data: transactions } = transactionsDb;
  const { data: installments } = installmentsDb;

  const formattedTransactions = transactions.map((tx) => {
    const totalPaidAmount = installments
      .filter((installment) => installment.parentId === tx.id)
      .reduce((totalValue, currentInstallment) => {
        return totalValue + currentInstallment.paidAmount;
      }, 0);

    return { ...tx, totalPaidAmount };
  });

  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  const data = formattedTransactions
    .sort((a, b) => a.id - b.id)
    .slice(startIndex, endIndex);
  const totalPages = Math.ceil(formattedTransactions.length / perPage);

  res.status(200).json({ data, totalPages });
}
