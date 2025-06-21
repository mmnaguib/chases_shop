import React, { useState } from "react";
import InvoiceSideBar from "../InvoiceSideBar";
import AddInvoice from "../AddInvoice";

const Purchases = () => {
  const [restMoney, setRestMoney] = useState(0);

  return (
    <div>
      <h1 className="pageHeader">فاتورة شراء</h1>
      <div className="invoiceContainer">
        <InvoiceSideBar invoiceType="P" restMoney={restMoney} />
        <AddInvoice invoiceType="P" setRestMoney={setRestMoney} />
      </div>
    </div>
  );
};

export default Purchases;
