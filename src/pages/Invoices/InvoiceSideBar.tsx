import { faFile, faMoneyBill, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PaymentPopup from "./PaymentPopup";

const InvoiceSideBar = () => {
  const [date, setDate] = React.useState<string>("");
  const [vendor, setVendor] = React.useState<string>("");
  const [notes, setNotes] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="invoice-sidebar">
      <h4>البيانات الاساسية</h4>
      <div>
        <label>تاريخ الفاتورة</label>
        <input
          type="date"
          placeholder="رقم الفاتورة"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>المورد</label>
        <select value={vendor} onChange={(e) => setVendor(e.target.value)}>
          <option value="" selected disabled>
            اختر المورد
          </option>
          <option value="vendor1">المورد 1</option>
        </select>
      </div>
      <div>
        <label>ملاحظات</label>
        <textarea
          cols={5}
          placeholder="ملاحظات"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <button
          className="success"
          style={{ width: "150px" }}
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faMoneyBill} /> سداد
        </button>
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <button className="edit" style={{ width: "150px" }}>
          <FontAwesomeIcon icon={faSave} /> حفظ
        </button>
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <button style={{ width: "150px" }}>
          <FontAwesomeIcon icon={faFile} /> فاتورة جديدة
        </button>
      </div>
      <br />

      <PaymentPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default InvoiceSideBar;
