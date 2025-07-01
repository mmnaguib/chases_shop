import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddCategory from "./AddCategory";
import CategoriesTable from "./CategoiesTable";

const Categoies = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <h1 className="pageHeader">إدارة التصنيفات</h1>
      <button className="success" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faPlus} />
        <span className="iconWithText">إضافة تصنيف جديد </span>
      </button>
      <CategoriesTable />
      <AddCategory isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Categoies;
