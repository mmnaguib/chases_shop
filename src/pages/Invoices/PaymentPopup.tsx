import { useState } from "react";
import InvoicesApi from "../../Api/invoiceApi";
import { IItem } from "../../interfaces/inedx";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faCheckDouble,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

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
    if (totalPaid <= 0) {
      toast.error("يجب دفع أي مبلغ .");
      return;
    }
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
      await InvoicesApi.getAllInvoices("S");
    }

    setIsOpen(false);
  };
  const handleDeletePayment = (indexToDelete: number) => {
    const updatedPayments = localPayments.filter(
      (_, idx) => idx !== indexToDelete
    );
    setLocalPayments(updatedPayments);
  };

  return (
    <div>
      {isOpen && (
        <div className="modalOverlay" onClick={() => setIsOpen(false)}>
          <div
            className="modalContent paymentPopup"
            onClick={(e) => e.stopPropagation()}
          >
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
                    <td>
                      <button
                        className="danger sm"
                        onClick={() => handleDeletePayment(index)}
                        title="حذف الدفعة"
                        disabled={mode === "pay"}
                      >
                        x
                      </button>
                    </td>
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
                      max={finalPrice}
                    />
                  </td>
                  <td>
                    <button className="edit sm" onClick={handleAddPayment}>
                      <FontAwesomeIcon icon={faCheckDouble} />
                      <span className="iconWithText">ادفع</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0",
              }}
            >
              <span style={{ color: "#080", fontWeight: "bold" }}>
                المدفوع : {totalPaid} جنيه
              </span>
              <span style={{ color: "#f00", fontWeight: "bold" }}>
                الباقي : {remaining} جنيه
              </span>
            </div>
            <div>
              <button className="success" onClick={handleSaveInvoice}>
                <FontAwesomeIcon icon={faSave} />
                <span className="iconWithText">
                  {mode === "create" ? "حفظ الفاتورة" : "تحديث السداد"}
                </span>
              </button>
              <button className="danger" onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faCancel} />
                <span className="iconWithText">إلغاء</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPopup;
