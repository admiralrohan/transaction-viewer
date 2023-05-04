import type { NextApiRequest, NextApiResponse } from "next";
import transactionsDb from "@db/Parent.json";
import installmentsDb from "@db/Child.json";
import Installment from "@interfaces/installment";

type Data = {
  data: Installment[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id: transactionId } = req.query;
  const { data: transactions } = transactionsDb;
  const { data: installments } = installmentsDb;

  const transactionDetails = transactions.find(
    (tx) => tx.id === Number(transactionId)
  );
  const relevantInstallments = installments.filter(
    (installment) => installment.parentId === Number(transactionId)
  );

  if (!transactionDetails) return res.status(200).json({ data: [] });

  const formattedInstallments: Installment[] = relevantInstallments.map(
    (installment) => ({
      ...transactionDetails,
      id: installment.id,
      paidAmount: installment.paidAmount,
    })
  );
  const data = formattedInstallments.sort((a, b) => a.id - b.id);

  res.status(200).json({ data });
}
