import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InvoicesApi from "../../Api/invoiceApi";
import { IInvoice } from "../../interfaces/inedx";

const UserInvoices = () => {
  const [userInvoices, setUserInvoices] = useState<IInvoice[]>([]);
  const getUserInvoices = async (userId: string) => {
    const res = await InvoicesApi.getUserInvoices(userId);
    setUserInvoices(res.data);
  };

  useEffect(() => {
    getUserInvoices(id!);
  }, []);
  const { id } = useParams();
  return (
    <div>
      <h5>
        فواتير الاستاذ : {userInvoices.map((invioce) => invioce.userId.name)}
      </h5>
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
              {/* <td>
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
                  </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInvoices;
