import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ItemsTable from "./ItemsTable";
import AddItem from "./AddItem";

const Items = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <h1 className="pageHeader">إدارة المنتجات</h1>
      <button className="success" onClick={() => setIsOpen(!isOpen)}>
        إضافة منتج جديد <FontAwesomeIcon icon={faPlus} />
      </button>
      <ItemsTable />
      <AddItem isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Items;
