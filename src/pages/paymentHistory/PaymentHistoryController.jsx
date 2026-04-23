import PaymentHistoryComponent from "./PaymentHistoryComponent";
import { usePaymentHistory } from "../../hooks/usePaymentHistory";

function PaymentHistoryController() {
  const { data: paymentData = null, isLoading: loading } = usePaymentHistory();

  return (
    <div>
      <PaymentHistoryComponent paymentData={paymentData} loading={loading} />
    </div>
  );
}

export default PaymentHistoryController;
