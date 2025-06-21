import React, { useState } from "react";

const PaymentPopup = ({
  isOpen,
  setIsOpen,
  restMoney,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  restMoney: number;
}) => {
  const [payments, setPayments] = useState<{ type: string; amount: number }[]>(
    []
  );
  const [paymentType, setPaymentType] = useState("كاش");
  const [amount, setAmount] = useState(0);

  const handleAddPayment = () => {
    if (amount > 0) {
      setPayments([...payments, { type: paymentType, amount }]);
      setAmount(0);
      setPaymentType("كاش");
    }
  };

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = restMoney - totalPaid;

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
                    <td>{p.type}</td>
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
              <button
                className="success"
                onClick={() => console.log("Payments:", payments)}
              >
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
