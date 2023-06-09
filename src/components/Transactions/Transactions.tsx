import * as React from "react";
import Transaction from "@interfaces/transaction";
import Table from "@components/Table";
import Link from "next/link";
import { defaultPageSize } from "@constants/index";

function Transactions() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setStatus("loading");
    fetch(`/api/transactions?page=${currentPage}&perPage=${defaultPageSize}`)
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data.data);
        setTotalPages(data.totalPages);
        setStatus("success");
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }, [currentPage]);

  if (status === "loading") {
    return <div className="flex justify-center">Loading...</div>;
  }

  if (status === "error") {
    return (
      <div className="flex justify-center">
        Some error happened. Refresh the page.
      </div>
    );
  }

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

      <div className="flex justify-center gap-4 mt-6">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </Button>
        <span>{currentPage}</span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="hover:underline
      disabled:text-gray-400 disabled:pointer-events-none"
    />
  );
}

export default Transactions;
