import InvoiceSideBar from "../InvoiceSideBar";
import AddInvoice from "../AddInvoice";
import { useState } from "react";

const Sales = () => {
  const [restMoney, setRestMoney] = useState(0);

  return (
    <div>
      <h1 className="pageHeader">فاتورة بيع</h1>
      <div className="invoiceContainer">
        <InvoiceSideBar invoiceType="S" restMoney={restMoney} />
        <AddInvoice invoiceType="S" setRestMoney={setRestMoney} />
      </div>
    </div>
  );
};

export default Sales;
