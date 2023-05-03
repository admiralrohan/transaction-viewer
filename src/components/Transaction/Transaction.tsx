import * as React from "react";
import Installment from "@interfaces/installment";

interface ITransaction {
  id: number;
}

function Transaction({ id }: ITransaction) {
  const [installments, setInstallments] = React.useState<Installment[]>([]);

  React.useEffect(() => {
    fetch("/api/transactions/" + id)
      .then((response) => response.json())
      .then(({ data }) => {
        setInstallments(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Total Amount</th>
            <th>Paid Amount</th>
          </tr>
        </thead>

        <tbody>
          {installments.map((installment) => (
            <tr key={installment.id}>
              <td>{installment.id}</td>
              <td>{installment.sender}</td>
              <td>{installment.receiver}</td>
              <td>{installment.totalAmount}</td>
              <td>{installment.paidAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transaction;
