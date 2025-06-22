import React, { useEffect, useState } from "react";
import UsersApi from "../../Api/userApi";
import { toast } from "react-toastify";
import { IUser } from "../../interfaces/inedx";

const ClientsAndVendors = ({
  invoiceType,
  isNewClient,
  setIsNewClient,
  getAllUsers,
}: {
  invoiceType: string;
  isNewClient: boolean;
  setIsNewClient: any;
  getAllUsers: any;
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAdress] = useState("");
  const saveUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await UsersApi.addNewUser(
      name,
      phone,
      address,
      invoiceType == "P" ? "S" : "C"
    );
    if (res.status === 201) {
      toast.success("تمت الاضافة بنجاح");
      setIsNewClient(false);
      setName("");
      setAdress("");
      setPhone("");
      getAllUsers();
    }
  };
  return (
    <div>
      {isNewClient && (
        <div className="modalOverlay" onClick={() => setIsNewClient(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>{invoiceType == "P" ? "اضافة مورد" : "اضافة عميل"}</h2>
            <div>
              <form>
                <div>
                  <label>الاسم</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label>رقم الهاتف</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label>العنوان</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAdress(e.target.value)}
                  />
                </div>
                <button className="success" type="submit" onClick={saveUser}>
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
