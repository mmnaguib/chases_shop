import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import categoriesApi from "../../Api/categoriesApi";
import { ICategory } from "../../interfaces/inedx";
import EditCategory from "./EditCategory";

const CategoriesTable = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    string | null
  >(null);

  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const getCategories = async () => {
    const res = await categoriesApi.getCategories();
    if (res.status === 200) {
      setCategories(res.data);
    }
  };
  React.useEffect(() => {
    getCategories();
  }, []);
  const deleteCategory = async (catID: string) => {
    const res = await categoriesApi.deleteCategory(catID);
    if (res.status === 200) {
      setCategories(categories.filter((cat) => cat._id !== catID));
    }
  };

  return (
    <>
      <table className="tableStyle" border={1}>
        <thead>
          <tr>
            <th>الرقم</th>
            <th>اسم التصنيف</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <>
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <button
                    className="edit sm"
                    onClick={() => {
                      setSelectedCategoryId(category._id);
                      setIsOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="danger sm"
                    onClick={() => deleteCategory(category._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>

      <EditCategory
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        catId={selectedCategoryId!}
        setCategories={setCategories}
      />
    </>
  );
};

export default CategoriesTable;
