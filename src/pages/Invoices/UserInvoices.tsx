import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InvoicesApi from "../../Api/invoiceApi";
import { IInvoice } from "../../interfaces/inedx";
import PaymentPopup from "./PaymentPopup";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserInvoices = () => {
  const [userInvoices, setUserInvoices] = useState<IInvoice[]>([]);
  const { id } = useParams();
  const getUserInvoices = useCallback(async (userId: string) => {
    const res = await InvoicesApi.getUserInvoices(userId);
    setUserInvoices(res.data);
  }, []);
  const [selectedInvoice, setSelectedInvoice] = useState<IInvoice | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    getUserInvoices(id!);
  }, [id]);
  return (
    <div>
      <h5 style={{ margin: 0 }}>
        فواتير الاستاذ : {userInvoices[0]?.userId.name}
      </h5>
      <div className="anyMobileTable">
        <table className="tableStyle" border={1}>
          <thead>
            <tr>
              <th>التاريخ</th>
              <th>رقم الفاتوره</th>
              <th>نوع الفاتوره</th>
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
            {userInvoices.map((invoice) => (
              <tr key={invoice._id}>
                <td>{invoice.date.slice(0, 10)}</td>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.type === "P" ? "شراء" : "بيع"}</td>
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
                      <FontAwesomeIcon icon={faCheckDouble} />
                      <span className="iconWithText">ادفع</span>
                    </button>
                  )}
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
    </div>
  );
};

export default UserInvoices;
