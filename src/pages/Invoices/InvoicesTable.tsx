import React, { useEffect, useState } from "react";
import InvoicesApi from "../../Api/invoiceApi";
import { IInvoice } from "../../interfaces/inedx";
import PaymentPopup from "./PaymentPopup";
import { Link } from "react-router-dom";

const InvoicesTable = () => {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [val, setVal] = useState("P");

  const [selectedInvoice, setSelectedInvoice] = useState<IInvoice | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    getInvoices(val);
  }, [val]);

  const getInvoices = async (type: string) => {
    const res = await InvoicesApi.getAllInvoices(type);
    setInvoices(res.data);
  };

  return (
    <>
      <select value={val} onChange={(e) => setVal(e.target.value)}>
        <option value="P">فواتير الشراء</option>
        <option value="S">فواتير البيع</option>
      </select>

      <table className="tableStyle" border={1}>
        <thead>
          <tr>
            <th>التاريخ</th>
            <th>رقم الفاتوره</th>
            <th>نوع الفاتوره</th>
            <th>{val === "P" ? "المورد" : "العميل"}</th>
            <th>الكمية</th>
            <th>إجمالي السعر قبل الخصم</th>
            <th>قيمة الخصم</th>
            <th>إجمالي السعر بعد الخصم</th>
            <th>المدفوع</th>
            <th>المتبقي</th>
            <th>الاجراءت</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.date.slice(0, 10)}</td>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.type === "P" ? "شراء" : "بيع"}</td>
              <td>
                <Link to={`/user/${invoice.userId._id}`}>
                  {invoice.userId.name}
                </Link>
              </td>
              <td>{invoice.items.map((item) => item.quantity)}</td>
              <td>{invoice.finalPrice + invoice.discount}</td>
              <td>{invoice.discount}</td>
              <td>{invoice.finalPrice}</td>
              <td>{invoice.totalPrice}</td>
              <td>{invoice.remaining}</td>
              <td>
                {invoice.remaining > 0 && (
                  <button
                    className="success sm"
                    onClick={() => {
                      setSelectedInvoice(invoice);
                      setIsPopupOpen(true);
                    }}
                  >
                    سدد
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedInvoice && (
        <PaymentPopup
          isOpen={isPopupOpen}
          setIsOpen={setIsPopupOpen}
          mode="pay"
          invoiceId={selectedInvoice._id}
          finalPrice={selectedInvoice.finalPrice}
          payments={selectedInvoice.paymentMethods}
        />
      )}
    </>
  );
};

export default InvoicesTable;
