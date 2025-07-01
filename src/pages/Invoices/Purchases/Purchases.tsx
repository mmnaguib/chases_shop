import { useState } from "react";
import InvoiceSideBar from "../InvoiceSideBar";
import AddInvoice from "../AddInvoice";

const Purchases = () => {
  const [finalPrice, setfinalPrice] = useState(0);
  const [invoiceItemsProp, setInvoiceItemsProp] = useState([]);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [adminExpenses, setAdminExpenses] = useState<number>(0);

  return (
    <div>
      <h1 className="pageHeader">فاتورة شراء</h1>
      <div className="invoiceContainer">
        <AddInvoice
          invoiceType="P"
          setfinalPrice={setfinalPrice}
          setInvoiceItemsProp={setInvoiceItemsProp}
          setDiscountValue={setDiscountValue}
          discountValue={discountValue}
        />
        <InvoiceSideBar
          invoiceType="P"
          finalPrice={finalPrice}
          invoiceItemsProp={invoiceItemsProp}
          discountValue={discountValue}
          setAdminExpenses={setAdminExpenses}
          adminExpenses={adminExpenses}
        />
      </div>
    </div>
  );
};

export default Purchases;
