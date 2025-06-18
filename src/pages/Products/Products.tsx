import React from "react";
import AddProduct from "./AddProduct";
import ProductsTable from "./ProductsTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <h1 className="pageHeader">إدارة المنتجات</h1>
      <button className="success" onClick={() => setIsOpen(!isOpen)}>
        إضافة منتج جديد <FontAwesomeIcon icon={faPlus} />
      </button>
      <ProductsTable />
      <AddProduct isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Products;
