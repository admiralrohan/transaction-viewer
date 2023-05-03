import * as React from "react";
import Installment from "@interfaces/installment";
import IWrapper from "@interfaces/IWrapper";
import Link from "next/link";

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

  return (
    <div className="w-full">
      <table className="border-collapse w-4/5 m-auto">
        <thead>
          <tr>
            <TH>ID</TH>
            <TH>Sender</TH>
            <TH>Receiver</TH>
            <TH>Total Amount</TH>
            <TH>Paid Amount</TH>
          </tr>
        </thead>

        <tbody>
          {installments.map((installment) => (
            <tr key={installment.id}>
              <TD>{installment.id}</TD>
              <TD>{installment.sender}</TD>
              <TD>{installment.receiver}</TD>
              <TD>{installment.totalAmount}</TD>
              <TD>{installment.paidAmount}</TD>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-6">
        <Link href="/" className="hover:underline">
          Back
        </Link>
      </div>
    </div>
  );
}

function TH({ children }: IWrapper) {
  return (
    <th
      className="bg-gray-100 border-b border-gray-200 px-8 py-4
    text-gray-800 font-bold text-left"
    >
      {children}
    </th>
  );
}

function TD({ children }: IWrapper) {
  return (
    <th
      className="border-b border-gray-200 font-normal
      px-8 py-4 text-gray-700 text-left"
    >
      {children}
    </th>
  );
}

export default Transaction;
