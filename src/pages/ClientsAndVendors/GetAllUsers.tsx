import { useEffect, useState } from "react";
import UsersApi from "../../Api/userApi";
import { IUser } from "../../interfaces/inedx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faLocationPin,
  faPhone,
  faPlus,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ClientsAndVendors from "./ClientsAndVendorsPopup";
import { toast } from "react-toastify";

const GetAllUsers = () => {
  const [vendors, setVendors] = useState<IUser[]>([]);
  const [clients, setClients] = useState<IUser[]>([]);

  const [addClientPopup, setAddClientPopup] = useState(false);
  const [addVendorPopup, setAddVendorPopup] = useState(false);

  const [editClientData, setEditClientData] = useState<IUser | null>(null);
  const [editVendorData, setEditVendorData] = useState<IUser | null>(null);

  const fetchVendors = async () => {
    const res = await UsersApi.getAllByType("S");
    if (res.status === 200) {
      setVendors(res.data);
    }
  };

  const fetchClients = async () => {
    const res = await UsersApi.getAllByType("C");
    if (res.status === 200) {
      setClients(res.data);
    }
  };

  useEffect(() => {
    fetchVendors();
    fetchClients();
  }, []);

  const deleteUser = async (id: string, type: "C" | "S") => {
    const res = await UsersApi.deleteUser(id);
    toast.error(res.data.message);
    type === "C" ? fetchClients() : fetchVendors();
  };

  return (
    <>
      <h1 className="pageHeader ">العملاء والموردين</h1>
      <div className="usersContent">
        <div>
          <h5>
            العملاء
            <button
              className="success sm"
              onClick={() => {
                setEditClientData(null);
                setAddClientPopup(true);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </h5>
          <div>
            {clients.map((client) => (
              <div className="user" key={client._id}>
                <div className="info">
                  <Link to={`/user/${client._id}`}>
                    <FontAwesomeIcon icon={faUser} />
                    <span className="iconWithText">{client.name}</span>
                  </Link>
                  <br />
                  <br />
                  <FontAwesomeIcon icon={faPhone} />
                  <span className="iconWithText">{client.phone}</span>
                  <br />
                  <br />

                  <FontAwesomeIcon icon={faLocationPin} />
                  <span className="iconWithText">{client.address}</span>
                </div>
                <div className="actions">
                  <button
                    className="edit sm"
                    onClick={() => {
                      setEditClientData(client);
                      setAddClientPopup(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="danger sm"
                    onClick={() => deleteUser(client._id, "C")}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5>
            الموردين
            <button
              className="success sm"
              onClick={() => {
                setEditVendorData(null);
                setAddVendorPopup(true);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </h5>
          <div>
            {vendors.map((vendor) => (
              <div className="user" key={vendor._id}>
                <div className="info">
                  <Link to={`/user/${vendor._id}`}>
                    <FontAwesomeIcon icon={faUser} />
                    <span className="iconWithText">{vendor.name}</span>
                  </Link>
                  <br />
                  <br />
                  <FontAwesomeIcon icon={faPhone} />
                  <span className="iconWithText">{vendor.phone}</span>
                  <br />
                  <br />

                  <FontAwesomeIcon icon={faLocationPin} />
                  <span className="iconWithText">{vendor.address}</span>
                </div>
                <div className="actions">
                  <button
                    className="edit sm"
                    onClick={() => {
                      setEditVendorData(vendor);
                      setAddVendorPopup(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="danger sm"
                    onClick={() => deleteUser(vendor._id, "S")}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {addClientPopup && (
        <ClientsAndVendors
          invoiceType={"C"}
          isNewClient={addClientPopup}
          setIsNewClient={setAddClientPopup}
          getAllUsers={fetchClients}
          editData={editClientData}
        />
      )}

      {addVendorPopup && (
        <ClientsAndVendors
          invoiceType={"S"}
          isNewClient={addVendorPopup}
          setIsNewClient={setAddVendorPopup}
          getAllUsers={fetchVendors}
          editData={editVendorData}
        />
      )}
    </>
  );
};

export default GetAllUsers;
