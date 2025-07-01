import React, { useEffect, useState } from "react";
import InvoicesApi from "../../Api/invoiceApi";
import { IInvoice } from "../../interfaces/inedx";
import PaymentPopup from "./PaymentPopup";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faCheckDouble,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";

const InvoicesTable = () => {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [val, setVal] = useState("S");

  const [selectedInvoice, setSelectedInvoice] = useState<IInvoice | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    getInvoices(val);
  }, [val]);

  const getInvoices = async (type: string) => {
    const res = await InvoicesApi.getAllInvoices(type);
    setInvoices(res.data);
  };
  const handlePrint = (invoice: IInvoice) => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    const invoiceHTML = `
    <html dir="rtl" lang="ar">
      <head>
        <title>طباعة فاتورة رقم ${invoice.invoiceNumber}</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #000; padding: 8px; text-align: center; }
          h2 { text-align: center; }
        </style>
      </head>
      <body>
        <h2>فاتورة رقم ${invoice.invoiceNumber}</h2>
        <p><strong>التاريخ:</strong> ${invoice.date.slice(0, 10)}</p>
        <p><strong>النوع:</strong> ${invoice.type === "P" ? "شراء" : "بيع"}</p>
        <p><strong>${invoice.type === "P" ? "المورد" : "العميل"}:</strong> ${
      invoice.userId?.name || ""
    }</p>

        <table>
          <thead>
            <tr>
              <th>الصنف</th>
              <th>الكمية</th>
              <th>سعر</th>
              <th>الاجمالي</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items
              .map(
                (item) => `
              <tr>
                <td>${item.productId.name}</td>
                <td>${item.quantity}</td>
                <td>${
                  invoice.type === "P" ? item.buyPrice : item.unitPrice
                }</td>
                <td>${invoice.finalPrice}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <p><strong>إجمالي السعر قبل الخصم:</strong> ${
          invoice.finalPrice + invoice.discount
        }</p>
        <p><strong>الخصم:</strong> ${invoice.discount}</p>
        <p><strong>الإجمالي بعد الخصم:</strong> ${invoice.finalPrice}</p>
        <p><strong>المدفوع:</strong> ${invoice.totalPrice}</p>
        <p><strong>المتبقي:</strong> ${invoice.remaining}</p>

        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
    </html>
  `;

    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
  };

  return (
    <>
      <h1 className="pageHeader" style={{ marginBottom: "20px" }}>
        الفواتير
      </h1>
      <div style={{ width: "300px", marginBottom: "20px" }}>
        <label>اختر نوع الفاتورة:</label>
        <select value={val} onChange={(e) => setVal(e.target.value)}>
          <option value="P">فواتير الشراء</option>
          <option value="S">فواتير البيع</option>
        </select>
      </div>
      <div className="anyMobileTable">
        <table className="tableStyle" border={1}>
          <thead>
            <tr>
              <th>التاريخ</th>
              <th>رقم الفاتوره</th>
              <th>نوع الفاتوره</th>
              <th>{val === "P" ? "المورد" : "العميل"}</th>
              <th>سعر الشراء</th>
              <th>الكمية</th>
              <th>سعر البيع</th>
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
                  <Link
                    style={{ color: "#242478" }}
                    to={`/user/${invoice.userId?._id}`}
                  >
                    <FontAwesomeIcon icon={faArrowCircleRight} />
                    <span className="iconWithText">{invoice.userId.name}</span>
                  </Link>
                </td>
                <td>{invoice.items.map((item) => item.buyPrice)}</td>
                <td>{invoice.items.map((item) => item.quantity)}</td>
                <td>{invoice.items.map((item) => item.unitPrice)}</td>
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
                      <FontAwesomeIcon icon={faCheckDouble} />
                      <span className="iconWithText">ادفع</span>
                    </button>
                  )}
                  <button
                    className="primary sm"
                    onClick={() => handlePrint(invoice)}
                  >
                    <FontAwesomeIcon icon={faPrint} />
                    <span className="iconWithText">طباعة</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
