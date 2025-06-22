import React, { useState } from "react";
import InvoicesApi from "../../Api/invoiceApi";
import { IItem } from "../../interfaces/inedx";

const PaymentPopup = ({
  isOpen,
  setIsOpen,
  finalPrice,
  date,
  selectedUser,
  notes,
  invoiceItemsProp,
  discountValue,
  invoiceType,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  finalPrice: number;
  date: string;
  selectedUser: string;
  notes: string;
  invoiceItemsProp: any;
  discountValue: number;
  invoiceType: string;
}) => {
  const [payments, setPayments] = useState<
    { method: string; amount: number }[]
  >([]);
  const [paymentType, setPaymentType] = useState("كاش");
  const [amount, setAmount] = useState(0);

  const handleAddPayment = () => {
    if (amount > 0) {
      setPayments([...payments, { method: paymentType, amount }]);
      setAmount(0);
      setPaymentType("كاش");
    }
  };

  const invoiceItems = invoiceItemsProp.map((item: IItem) => ({
    productId: item._id,
    unitPrice: invoiceType === "P" ? item.buyPrice : item.sellPrice,
    quantity: item.quantity,
  }));
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = Number(finalPrice) - totalPaid;
  console.log(typeof remaining);

  const handleSaveInvoice = async () => {
    const res = await InvoicesApi.addNewInvoice(
      invoiceType,
      date,
      selectedUser,
      invoiceItems,
      discountValue,
      notes,
      totalPaid,
      finalPrice,
      payments,
      remaining
    );
  };
  return (
    <div>
      {isOpen && (
        <div className="modalOverlay" onClick={() => setIsOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <table className="tableStyle" border={1} style={{ marginTop: "0" }}>
              <thead>
                <tr>
                  <th>الطريقة</th>
                  <th>القيمة</th>
                  <th>الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, index) => (
                  <tr key={index}>
                    <td>{p.method}</td>
                    <td>{p.amount}</td>
                    <td>✓</td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <select
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                    >
                      <option value="كاش">كاش</option>
                      <option value="محفظة">محفظة</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(+e.target.value)}
                    />
                  </td>
                  <td>
                    <button className="edit sm" onClick={handleAddPayment}>
                      سدد
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div>
              المدفوع: {totalPaid}
              <br />
              الباقي: {remaining}
            </div>
            <div>
              <button className="success" onClick={handleSaveInvoice}>
                حفظ
              </button>
              <button className="danger" onClick={() => setIsOpen(false)}>
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPopup;
