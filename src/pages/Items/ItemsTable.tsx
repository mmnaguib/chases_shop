import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import itemsApi from "../../Api/itemsApi";
import { IItem } from "../../interfaces/inedx";
import EditItem from "./EditItem";

const ItemsTable = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    string | null
  >(null);

  const [items, setItems] = React.useState<IItem[]>([]);
  const getCategories = async () => {
    const res = await itemsApi.getitems();
    if (res.status === 200) {
      setItems(res.data);
    }
  };
  React.useEffect(() => {
    getCategories();
  }, []);
  const deleteItem = async (itemID: string) => {
    const res = await itemsApi.deleteItem(itemID);
    if (res.status === 200) {
      setItems(items.filter((item) => item._id !== itemID));
    }
  };
  return (
    <>
      <table className="tableStyle" border={1}>
        <thead>
          <tr>
            <th>الرقم</th>
            <th>اسم المنتج</th>
            <th>صورة المنتج</th>
            <th>سعر الشراء</th>
            <th>سعر البيع</th>
            <th>التصنيف</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                <img src={`http://localhost:5000/${item.image}`} width={30} />
              </td>
              <td>{item.name}</td>
              <td>{item.buyPrice}</td>
              <td>{item.sellPrice}</td>
              <td>{item.categoryId.name}</td>
              <td>
                <button
                  className="edit sm"
                  onClick={() => {
                    setSelectedCategoryId(item._id);
                    setIsOpen(true);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="danger sm"
                  onClick={() => deleteItem(item._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        ItemId={selectedCategoryId!}
        setItems={setItems}
      />
    </>
  );
};

export default ItemsTable;
