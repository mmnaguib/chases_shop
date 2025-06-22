import React, { useState } from "react";
import InvoiceSideBar from "../InvoiceSideBar";
import AddInvoice from "../AddInvoice";
import { IItem } from "../../../interfaces/inedx";

const Purchases = () => {
  const [finalPrice, setfinalPrice] = useState(0);
  const [invoiceItemsProp, setInvoiceItemsProp] = useState([]);
  const [discountValue, setDiscountValue] = useState<number>(0);
  return (
    <div>
      <h1 className="pageHeader">فاتورة شراء</h1>
      <div className="invoiceContainer">
        <InvoiceSideBar
          invoiceType="P"
          finalPrice={finalPrice}
          invoiceItemsProp={invoiceItemsProp}
          discountValue={discountValue}
        />
        <AddInvoice
          invoiceType="P"
          setfinalPrice={setfinalPrice}
          setInvoiceItemsProp={setInvoiceItemsProp}
          setDiscountValue={setDiscountValue}
          discountValue={discountValue}
        />
      </div>
    </div>
  );
};

export default Purchases;
