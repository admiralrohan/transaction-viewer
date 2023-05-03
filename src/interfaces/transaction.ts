interface Transaction {
  id: number;
  sender: string;
  receiver: string;
  totalAmount: number;
  totalPaidAmount: number;
}

export default Transaction;
