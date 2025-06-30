import React, { useEffect, useState } from "react";
import UsersApi from "../../Api/userApi";
import { toast } from "react-toastify";
import { IUser } from "../../interfaces/inedx";

const ClientsAndVendors = ({
  invoiceType,
  isNewClient,
  setIsNewClient,
  getAllUsers,
  editData,
}: {
  invoiceType: string;
  isNewClient: boolean;
  setIsNewClient: any;
  getAllUsers: any;
  editData?: IUser | null;
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setPhone(editData.phone || "");
      setAddress(editData.address || "");
    } else {
      setName("");
      setPhone("");
      setAddress("");
    }
  }, [editData]);

  const saveUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let res;

      if (editData) {
        res = await UsersApi.updateUser(
          editData._id,
          name,
          phone,
          address,
          invoiceType === "P" ? "S" : "C"
        );
      } else {
        res = await UsersApi.addNewUser(
          name,
          phone,
          address,
          invoiceType === "P" ? "S" : "C"
        );
      }

      if (res.status === 201 || res.status === 200) {
        toast.success(editData ? "تم التعديل بنجاح" : "تمت الإضافة بنجاح");
        setIsNewClient(false);
        setName("");
        setPhone("");
        setAddress("");
        getAllUsers();
      } else {
        toast.error("حدث خطأ");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء الحفظ");
    }
  };

  return (
    <div>
      {isNewClient && (
        <div className="modalOverlay" onClick={() => setIsNewClient(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>
              {editData
                ? invoiceType === "S"
                  ? "تعديل مورد"
                  : "تعديل عميل"
                : invoiceType === "S"
                ? "إضافة مورد"
                : "إضافة عميل"}
            </h2>

            <div>
              <form onSubmit={saveUser}>
                <div>
                  <label>الاسم</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>رقم الهاتف</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>العنوان</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <button className="success" type="submit">
                  حفظ
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsAndVendors;
