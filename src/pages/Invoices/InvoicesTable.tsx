import React, { useEffect, useState } from "react";
import InvoicesApi from "../../Api/invoiceApi";
import { IInvoice } from "../../interfaces/inedx";

const InvoicesTable = () => {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [val, setVal] = useState("P");

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
            <th>العميل</th>
            <th>إجمالي السعر قبل الخصم</th>
            <th>قيمة الخصم</th>
            <th>إجمالي السعر بعد الخصم</th>
            <th>المدفوع</th>
            <th>المتبقي</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr>
              <td>{invoice.date.slice(0, 10)}</td>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.type}</td>
              <td>{invoice.userId.name}</td>
              <td>{invoice.finalPrice + invoice.discount}</td>
              <td>{invoice.discount}</td>
              <td>{invoice.finalPrice}</td>
              <td>{invoice.totalPrice}</td>
              <td>{invoice.remaining}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default InvoicesTable;
