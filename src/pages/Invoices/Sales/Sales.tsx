import InvoiceSideBar from "../InvoiceSideBar";
import AddInvoice from "../AddInvoice";

const Sales = () => {
  return (
    <div>
      <h1 className="pageHeader">فاتورة بيع</h1>
      <div className="invoiceContainer">
        <InvoiceSideBar />
        <AddInvoice invoiceType="S" />
      </div>
    </div>
  );
};

export default Sales;
