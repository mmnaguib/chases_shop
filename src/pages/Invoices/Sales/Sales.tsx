import InvoiceSideBar from "../InvoiceSideBar";
import AddInvoice from "../AddInvoice";
import { useState } from "react";

const Sales = () => {
  const [finalPrice, setfinalPrice] = useState(0);
  const [invoiceItemsProp, setInvoiceItemsProp] = useState([]);
  const [discountValue, setDiscountValue] = useState<number>(0);

  const [adminExpenses, setAdminExpenses] = useState<number>(0);
  return (
    <div>
      <h1 className="pageHeader">فاتورة بيع</h1>
      <div className="invoiceContainer">
        <InvoiceSideBar
          invoiceType="S"
          finalPrice={finalPrice}
          invoiceItemsProp={invoiceItemsProp}
          discountValue={discountValue}
          setAdminExpenses={setAdminExpenses}
          adminExpenses={adminExpenses}
        />
        <AddInvoice
          invoiceType="S"
          setfinalPrice={setfinalPrice}
          setInvoiceItemsProp={setInvoiceItemsProp}
          setDiscountValue={setDiscountValue}
          discountValue={discountValue}
        />
      </div>
    </div>
  );
};

export default Sales;
