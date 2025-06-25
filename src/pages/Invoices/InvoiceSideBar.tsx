import {
  faFile,
  faMoneyBill,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import PaymentPopup from "./PaymentPopup";
import ClientsAndVendors from "../ClientsAndVendors/ClientsAndVendors";
import { IUser } from "../../interfaces/inedx";
import UsersApi from "../../Api/userApi";
import { toast } from "react-toastify";

const InvoiceSideBar = ({
  finalPrice,
  invoiceType,
  invoiceItemsProp,
  discountValue,
  setAdminExpenses,
  adminExpenses,
}: {
  finalPrice: number;
  invoiceType: string;
  invoiceItemsProp: any;
  discountValue: number;
  setAdminExpenses: any;
  adminExpenses: number;
}) => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [notes, setNotes] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isNewClient, setIsNewClient] = useState(false);

  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const getAllUsers = async () => {
    const res = await UsersApi.getAllByType(invoiceType === "P" ? "S" : "C");
    if (res.status === 200) {
      setUsers(res.data);
      //setSelectedUser(res.data[0].name);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const paymentPopupHandler = () => {
    if (finalPrice <= 0) {
      toast.error("يجب ان يكون المبلغ اكبر من السعر");
      return;
    }
    if (!selectedUser) {
      toast.error("يجب إدخال اسم المستخدم");
      return;
    }
    setIsOpen(true);
  };
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
        <label>{invoiceType === "P" ? "المورد" : "العميل"}</label>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="" selected disabled>
              اختر
            </option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            className="edit sm"
            onClick={() => setIsNewClient(true)}
            style={{ width: "38px", height: "38px" }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
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

      <div>
        <label>إضافات</label>
        <input
          type="number"
          value={adminExpenses}
          onChange={(e) => setAdminExpenses(+e.target.value)}
          placeholder="مصروفات إدارية (شحن، بنزين...)"
        />
      </div>
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <button
          className="success"
          style={{ width: "150px" }}
          onClick={paymentPopupHandler}
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

      <PaymentPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        finalPrice={finalPrice}
        date={date}
        selectedUser={selectedUser}
        notes={notes}
        invoiceItemsProp={invoiceItemsProp}
        discountValue={discountValue}
        invoiceType={invoiceType}
        mode="create"
        adminExpenses={adminExpenses}
      />

      <ClientsAndVendors
        invoiceType={invoiceType}
        isNewClient={isNewClient}
        setIsNewClient={setIsNewClient}
        getAllUsers={getAllUsers}
      />
    </div>
  );
};

export default InvoiceSideBar;
