import * as React from "react";
import Link from "next/link";
import Table from "@components/Table";
import Installment from "@interfaces/installment";

interface ITransaction {
  id: number;
}

function Transaction({ id }: ITransaction) {
  const [installments, setInstallments] = React.useState<Installment[]>([]);
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  React.useEffect(() => {
    setStatus("loading");
    fetch("/api/transactions/" + id)
      .then((response) => response.json())
      .then(({ data }) => {
        setInstallments(data);
        setStatus("success");
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }, [id]);

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
    <div className="w-full">
      <Table
        header={
          <tr>
            <Table.TH>ID</Table.TH>
            <Table.TH>Sender</Table.TH>
            <Table.TH>Receiver</Table.TH>
            <Table.TH>Total Amount</Table.TH>
            <Table.TH>Paid Amount</Table.TH>
          </tr>
        }
      >
        {installments.map((installment) => (
          <tr key={installment.id}>
            <Table.TD>{installment.id}</Table.TD>
            <Table.TD>{installment.sender}</Table.TD>
            <Table.TD>{installment.receiver}</Table.TD>
            <Table.TD>{installment.totalAmount}</Table.TD>
            <Table.TD>{installment.paidAmount}</Table.TD>
          </tr>
        ))}
      </Table>

      <div className="text-center mt-6">
        <Link href="/" className="hover:underline">
          Back
        </Link>
      </div>
    </div>
  );
}

export default Transaction;
