import { useState } from "react";
import InvoicesApi from "../../Api/invoiceApi";
import { IItem } from "../../interfaces/inedx";

type PaymentPopupProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  mode: "create" | "pay";
  invoiceId?: string;
  finalPrice: number;
  date?: string;
  selectedUser?: string;
  notes?: string;
  invoiceItemsProp?: any;
  discountValue?: number;
  invoiceType?: string;
  payments?: { method: string; amount: number }[];
  adminExpenses?: number;
};

const PaymentPopup = ({
  isOpen,
  setIsOpen,
  mode,
  invoiceId,
  finalPrice,
  date,
  selectedUser,
  notes,
  invoiceItemsProp,
  discountValue,
  invoiceType,
  payments = [],

  adminExpenses,
}: PaymentPopupProps) => {
  const [paymentType, setPaymentType] = useState("كاش");
  const [amount, setAmount] = useState(0);
  const [localPayments, setLocalPayments] = useState(payments);

  const handleAddPayment = () => {
    if (amount > 0) {
      setLocalPayments([...localPayments, { method: paymentType, amount }]);
      setAmount(0);
      setPaymentType("كاش");
    }
  };

  const invoiceItems = invoiceItemsProp
    ? invoiceItemsProp.map((item: IItem) => ({
        productId: item._id,
        unitPrice: item.sellPrice,
        buyPrice: item.buyPrice,
        quantity: item.quantity,
      }))
    : [];

  const totalPaid = localPayments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = Number(finalPrice) - totalPaid;

  const handleSaveInvoice = async () => {
    if (mode === "create") {
      await InvoicesApi.addNewInvoice(
        invoiceType!,
        date!,
        selectedUser!,
        invoiceItems,
        discountValue!,
        notes!,
        totalPaid,
        finalPrice,
        localPayments,
        remaining,
        adminExpenses || 0
      );
    } else if (mode === "pay" && invoiceId) {
      const newPayments = localPayments.slice(payments.length);
      await InvoicesApi.payAgain(invoiceId, newPayments);
    }

    setIsOpen(false);
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
                {localPayments.map((p, index) => (
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
                {mode === "create" ? "حفظ الفاتورة" : "تحديث السداد"}
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
