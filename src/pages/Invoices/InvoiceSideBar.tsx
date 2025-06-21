import { faFile, faMoneyBill, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import PaymentPopup from "./PaymentPopup";
import ClientsAndVendors from "../ClientsAndVendors/ClientsAndVendors";

const InvoiceSideBar = ({
  restMoney,
  invoiceType,
}: {
  restMoney: number;
  invoiceType: string;
}) => {
  const [date, setDate] = React.useState<string>("");
  const [vendor, setVendor] = React.useState<string>("");
  const [notes, setNotes] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isNewClient, setIsNewClient] = useState(false);

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
        <label>{invoiceType == "P" ? "المورد" : "العميل"}</label>
        <select value={vendor} onChange={(e) => setVendor(e.target.value)}>
          <option value="" selected disabled>
            اختر
          </option>
        </select>
        <button className="edit sm" onClick={() => setIsNewClient(true)}>
          +
        </button>
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

      <PaymentPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        restMoney={restMoney}
      />

      <ClientsAndVendors
        invoiceType={invoiceType}
        isNewClient={isNewClient}
        setIsNewClient={setIsNewClient}
      />
    </div>
  );
};

export default InvoiceSideBar;
