import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ProductsTable = () => {
  return (
    <table className="productsTable" border={1}>
      <thead>
        <tr>
          <th>الرقم</th>
          <th>اسم المنتج</th>
          <th>التصنيف</th>
          <th>الإجراءات</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>منتج 1</td>
          <td>تصنيف</td>
          <td>
            <button className="edit sm">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="danger sm">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProductsTable;
