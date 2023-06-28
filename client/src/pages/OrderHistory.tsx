import useAuth from "../utils/hooks";

const OrderHistoryPage = () => {
  useAuth();
  return (
    <div>
      <h1>Order History</h1>
    </div>
  );
};

export default OrderHistoryPage;
