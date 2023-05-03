import * as React from "react";
import Transaction from "@interfaces/transaction";
import Table from "@components/Table";
import Link from "next/link";

function Transactions() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  React.useEffect(() => {
    setStatus("loading");
    fetch("/api/transactions")
      .then((response) => response.json())
      .then(({ data }) => {
        setTransactions(data);
        setStatus("success");
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }, []);

  return (
    <div>
      <Table
        header={
          <tr>
            <Table.TH>ID</Table.TH>
            <Table.TH>Sender</Table.TH>
            <Table.TH>Receiver</Table.TH>
            <Table.TH>Total Amount</Table.TH>
            <Table.TH>Total Paid Amount</Table.TH>
          </tr>
        }
      >
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <Table.TD>{transaction.id}</Table.TD>
            <Table.TD>{transaction.sender}</Table.TD>
            <Table.TD>{transaction.receiver}</Table.TD>
            <Table.TD>{transaction.totalAmount}</Table.TD>
            <Table.TD>
              <Link href={"/" + transaction.id} className="hover:underline">
                {transaction.totalPaidAmount}
              </Link>
            </Table.TD>
          </tr>
        ))}
      </Table>
    </div>
  );
}

export default Transactions;
