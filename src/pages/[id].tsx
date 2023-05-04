import { useRouter } from "next/router";
import Transaction from "@components/Transaction";

export default function TransactionPage() {
  const router = useRouter();
  const { id } = router.query;

  return <Transaction id={Number(id)} />;
}
