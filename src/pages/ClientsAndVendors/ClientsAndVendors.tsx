import React, { useState } from "react";

const ClientsAndVendors = ({
  invoiceType,
  isNewClient,
  setIsNewClient,
}: {
  invoiceType: string;
  isNewClient: boolean;
  setIsNewClient: any;
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAdress] = useState("");
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
                <button
                  className="success"
                  type="submit"
                  onClick={() => console.log("save")}
                >
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
