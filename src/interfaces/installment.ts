/**
 * transaction:installment relationship is 1:N \
 * N can be zero.
 */
interface Installment {
  id: number;
  sender: string;
  receiver: string;
  totalAmount: number;
  paidAmount: number;
}

export default Installment;
