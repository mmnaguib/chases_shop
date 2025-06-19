import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICategory, IItem } from "../../interfaces/inedx";
import { useEffect, useState } from "react";
import axiosInstance from "../../Api/axiosInstance";
import { toast } from "react-toastify";

const AddInvoice = ({ invoiceType }: { invoiceType: string }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [items, setItems] = useState<IItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityAvailabel, setQuantityAvailabel] = useState<number>(1);
  const [invoiceItems, setInvoiceItems] = useState<IItem[]>([]);
  const [formQuantity, setFormQuantity] = useState<number>(1);

  const getCategories = async () => {
    const res = await axiosInstance.get("/categories");
    if (res.status === 200) {
      setCategories(res.data);
      setSelectedCategoryId(res.data[0]._id);
    }
  };
  const getItems = async (categoryId: string) => {
    const res = await axiosInstance.get(
      `/products/categoryItems/${categoryId}`
    );
    if (res.status === 200) {
      setItems(res.data);
      console.log(res.data);
      setSelectedItemId(res.data[0]._id);
      setPrice(
        invoiceType === "P" ? res.data[0].buyPrice : res.data[0].sellPrice
      );
      setQuantityAvailabel(0);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    if (selectedCategoryId) {
      getItems(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const updateQuantity = (id: string, newQuantity: number) => {
    setInvoiceItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const updatePrice = (id: string, newPrice: number, type: "buy" | "sell") => {
    setInvoiceItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, [type === "buy" ? "buyPrice" : "sellPrice"]: newPrice }
          : item
      )
    );
  };

  const addToGrid = () => {
    const selectedItem = items.find((item) => item._id === selectedItemId);
    if (!selectedItem) return;

    setInvoiceItems((prev) => {
      const exists = prev.find((item) => item._id === selectedItemId);

      if (exists) {
        // زود الكمية بس
        return prev.map((item) =>
          item._id === selectedItemId
            ? { ...item, quantity: quantity + formQuantity }
            : item
        );
      }

      // إضافة جديدة
      return [
        ...prev,
        {
          _id: selectedItem._id,
          name: selectedItem.name,
          categoryId: selectedItem.categoryId,
          buyPrice: selectedItem.buyPrice,
          sellPrice: selectedItem.sellPrice,
          quantity: formQuantity,
        },
      ];
    });

    // تصفير الفورم
    setSelectedItemId("");
    setFormQuantity(1);
  };

  const removeFromGrid = (id: string) => {
    setInvoiceItems((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="addInvoiceContent">
      <div className="addInvoiceHeader">
        <h4>إضافة اضناف</h4>
        <div className="addInvoiceContentToAdd">
          <div>
            <label htmlFor="categoryName">التصنيف</label>
            <select
              id="categoryName"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="itemName">الصنف</label>
            <select
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
            >
              <option value="">اختر صنف</option>
              {items.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="price">السعر</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="quantity">الكمية</label>
            <input
              type="number"
              value={formQuantity}
              min={1}
              onChange={(e) => setFormQuantity(+e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="availableQuantity">الكمية المتاحة</label>
            <input
              type="number"
              id="availableQuantity"
              min={0}
              value={quantityAvailabel}
              onChange={(e) => setQuantityAvailabel(+e.target.value)}
            />
          </div>
          <div>
            <label className="hiddenLabel">.</label>
            <button className="success" onClick={addToGrid}>
              إضافة
            </button>
          </div>
        </div>
      </div>
      <div className="invoiceGrid">
        <table className="tableStyle" border={1}>
          <thead>
            <tr>
              <th>التصنيف</th>
              <th>الصنف</th>
              <th>السعر</th>
              <th>الكمية</th>
              <th>الاجمالي</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems.map((invoiceItem) => (
              <tr key={invoiceItem._id}>
                <td>{invoiceItem.categoryId.name}</td>
                <td>{invoiceItem.name}</td>
                <td>
                  <input
                    type="number"
                    value={
                      invoiceType === "P"
                        ? invoiceItem.buyPrice
                        : invoiceItem.sellPrice
                    }
                    onChange={(e) =>
                      updatePrice(
                        invoiceItem._id,
                        +e.target.value,
                        invoiceType === "P" ? "buy" : "sell"
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      updateQuantity(invoiceItem._id, +e.target.value)
                    }
                  />
                </td>
                <td>
                  {(
                    (invoiceType === "P"
                      ? invoiceItem.buyPrice
                      : invoiceItem.sellPrice) * quantity
                  ).toFixed(2)}
                </td>
                <td>
                  <button
                    className="danger sm"
                    onClick={() => removeFromGrid(invoiceItem._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="addInvoiceHeader" style={{ marginTop: "20px" }}>
        <h4>قيم الفاتورة</h4>
        <div className="addInvoiceContentToAdd">
          <div>
            <label htmlFor="itemsNumber">عدد الاصناف</label>
            <input type="number" id="itemsNumber" disabled />
          </div>
          <div>
            <label htmlFor="totalPrice">إجمالي السعر</label>
            <input type="number" id="totalPrice" min={1} disabled />
          </div>
          <div>
            <label htmlFor="discountValue">خصم بالقيمة</label>
            <input type="number" id="discountValue" min={0} />
          </div>
          <div>
            <label htmlFor="discountPersentage">نسبة الخصم %</label>
            <input type="number" id="discountPersentage" min={0} />
          </div>
          <div>
            <label htmlFor="profit">الصافي</label>
            <input type="number" id="profit" min={1} disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvoice;
