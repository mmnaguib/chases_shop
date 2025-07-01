import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICategory, IItem } from "../../interfaces/inedx";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../Api/axiosInstance";

const AddInvoice = ({
  invoiceType,
  setfinalPrice,
  setInvoiceItemsProp,
  setDiscountValue,
  discountValue,
}: {
  invoiceType: string;
  setfinalPrice: any;
  setInvoiceItemsProp: any;
  setDiscountValue: any;
  discountValue: number;
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [items, setItems] = useState<IItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantityAvailabel, setQuantityAvailabel] = useState<number>(1);
  const [invoiceItems, setInvoiceItems] = useState<IItem[]>([]);
  const [formQuantity, setFormQuantity] = useState<number>(1);
  const [profit, setProfit] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const getCategories = async () => {
    const res = await axiosInstance.get("/categories");
    if (res.status === 200) {
      setCategories(res.data);
      setSelectedCategoryId(res.data[0]._id);
    }
  };

  const getItems = useCallback(async (categoryId: string) => {
    const res = await axiosInstance.get(
      `/products/categoryItems/${categoryId}`
    );
    if (res.status === 200) {
      setItems(res.data);
      setSelectedItemId(res.data[0]._id);
      setPrice(
        invoiceType === "P" ? res.data[0].buyPrice : res.data[0].sellPrice
      );
      setQuantityAvailabel(0);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      getItems(selectedCategoryId);
    }
  }, [getItems, selectedCategoryId]);

  useEffect(() => {
    if (selectedItemId) {
      const selectedItem = items.find((item) => item._id === selectedItemId);
      if (selectedItem) {
        setPrice(
          invoiceType === "P" ? selectedItem.buyPrice : selectedItem.sellPrice
        );
        setQuantityAvailabel(selectedItem.quantity);
      }
    }
  }, [selectedItemId, items, invoiceType]);

  useEffect(() => {
    const total = invoiceItems.reduce(
      (acc, item) =>
        acc +
        (invoiceType === "P" ? item.buyPrice : item.sellPrice) * item.quantity,
      0
    );
    setTotalPrice(total);
    setProfit(total - discountValue);
    setfinalPrice(total - discountValue);
    setInvoiceItemsProp(invoiceItems);
  }, [
    setInvoiceItemsProp,
    setInvoiceItemsProp,
    setfinalPrice,
    invoiceItems,
    discountValue,
    invoiceType,
  ]);

  const addToGrid = () => {
    const selectedItem = items.find((item) => item._id === selectedItemId);
    if (!selectedItem) return;

    setInvoiceItems((prev) => {
      const existingItem = prev.find((item) => item._id === selectedItemId);
      if (existingItem) {
        return prev.map((item) =>
          item._id === selectedItemId
            ? { ...item, quantity: item.quantity + formQuantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            _id: selectedItem._id,
            name: selectedItem.name,
            categoryId: selectedItem.categoryId,
            buyPrice: invoiceType === "P" ? price : selectedItem.buyPrice,
            sellPrice: invoiceType === "S" ? price : selectedItem.sellPrice,
            quantity: formQuantity,
          },
        ];
      }
    });

    setFormQuantity(1);
  };

  const removeFromGrid = (id: string) => {
    setInvoiceItems((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="addInvoiceContent">
      <div className="addInvoiceHeader">
        <h4>إضافة الصنف الي الفاتورة</h4>
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
              onChange={async (e) => {
                const newPrice = +e.target.value;
                setPrice(newPrice);

                try {
                  const selectedItem = items.find(
                    (item) => item._id === selectedItemId
                  );
                  if (!selectedItem) return;

                  const fieldToUpdate =
                    invoiceType === "P" ? "buyPrice" : "sellPrice";
                  const updateBody = {
                    [fieldToUpdate]: newPrice,
                  };

                  await axiosInstance.patch(
                    `/products/${selectedItemId}`,
                    updateBody
                  );
                } catch (err) {
                  console.error("خطأ أثناء تحديث السعر:", err);
                }
              }}
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
              readOnly
            />
          </div>
          <div>
            <label className="hiddenLabel">.</label>
            <button
              className="success"
              onClick={addToGrid}
              disabled={invoiceType === "S" ? !quantityAvailabel : false}
            >
              <FontAwesomeIcon icon={faPlus} />
              <span className="iconWithText">إضافة</span>
            </button>
          </div>
        </div>
      </div>

      <div className="anyMobileTable invoiceGrid">
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
                  {invoiceType === "P"
                    ? invoiceItem.buyPrice
                    : invoiceItem.sellPrice}
                </td>
                <td>
                  <input
                    type="number"
                    value={invoiceItem.quantity}
                    min={1}
                    onChange={(e) => {
                      const newQty = +e.target.value;
                      setInvoiceItems((prev) =>
                        prev.map((item) =>
                          item._id === invoiceItem._id
                            ? { ...item, quantity: newQty }
                            : item
                        )
                      );
                    }}
                  />
                </td>
                <td>
                  {(
                    (invoiceType === "P"
                      ? invoiceItem.buyPrice
                      : invoiceItem.sellPrice) * invoiceItem.quantity
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
        <h4>الاجمالي</h4>
        <div className="addInvoiceContentToAdd">
          <div>
            <label htmlFor="itemsNumber">عدد الاصناف</label>
            <input
              type="number"
              id="itemsNumber"
              value={invoiceItems.length}
              disabled
            />
          </div>
          <div>
            <label htmlFor="totalPrice">إجمالي السعر</label>
            <input type="number" id="totalPrice" value={totalPrice} disabled />
          </div>
          <div>
            <label htmlFor="discountValue">خصم بالقيمة</label>
            <input
              type="number"
              id="discountValue"
              min={0}
              value={discountValue}
              onChange={(e) => setDiscountValue(+e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="profit">الصافي</label>
            <input type="number" id="profit" min={1} disabled value={profit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvoice;
