import * as React from "react";
import Transaction from "@interfaces/transaction";

function Transactions() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  React.useEffect(() => {
    fetch("/api/transactions")
      .then((response) => response.json())
      .then(({ data }) => {
        console.log(data);
        setTransactions(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Total Amount</th>
            <th>Total Paid Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.sender}</td>
              <td>{tx.receiver}</td>
              <td>{tx.totalAmount}</td>
              <td>{tx.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
