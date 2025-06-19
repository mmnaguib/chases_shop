import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { ICategory, IItem } from "../../interfaces/inedx";
import itemsApi from "../../Api/itemsApi";
import ItemsApi from "../../Api/itemsApi";
import categoriesApi from "../../Api/categoriesApi";

const EditItem = ({
  isOpen,
  setIsOpen,
  ItemId,
  setItems,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  ItemId: string;
  setItems: any;
}) => {
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);
  const [categoryId, setCategoryId] = React.useState("");
  const [buyPrice, setBuyPrice] = React.useState<number>(0);
  const [sellPrice, setsellPrice] = React.useState<number>(0);
  const [error, setError] = React.useState("");
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) setError("");
  };
  const getItem = async (itemId: string) => {
    const res = await itemsApi.getItemById(itemId);
    if (res.status === 200) {
      setName(res.data.name);
      setCategoryId(res.data.categoryId);
      setBuyPrice(res.data.buyPrice);
      setsellPrice(res.data.sellPrice);
      setImage(null);
    }
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("اسم التصنيف مطلوب");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("categoryId", categoryId);
    formData.append("buyPrice", buyPrice.toString());
    formData.append("sellPrice", sellPrice.toString());
    if (image) formData.append("image", image);
    const res = await ItemsApi.updateItem(formData, ItemId);
    if (res.status === 200) {
      setName("");
      setError("");

      const updatedItem = res.data;

      setItems((prevItems: IItem[]) =>
        prevItems.map((item: IItem) =>
          item._id === ItemId ? updatedItem : item
        )
      );

      toast.success("تم تعديل التصنيف بنجاح");
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && ItemId) {
      getItem(ItemId);
    }
  }, [isOpen, ItemId]);
  const getCategories = async () => {
    const res = await categoriesApi.getCategories();
    setCategories(res.data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {isOpen && (
        <div className="modalOverlay" onClick={() => setIsOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>تعديل تصنيف</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>اسم التصنيف</label>
                <input
                  type="text"
                  placeholder="أدخل اسم التصنيف"
                  value={name}
                  onChange={handleChange}
                />
                {error && <span className="form-error">{error}</span>}
              </div>
              <div>
                <label>صورة الصنف</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    } else {
                      setImage(null);
                    }
                  }}
                />
              </div>
              <div>
                <label>التصنيف</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="price">سعر الشراء</label>
                <input
                  type="number"
                  id="price"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(+e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="price">سعر البيع</label>
                <input
                  type="number"
                  id="price"
                  value={sellPrice}
                  onChange={(e) => setsellPrice(+e.target.value)}
                />
              </div>
              <button className="success" type="submit">
                حفظ
              </button>
              <button
                className="danger"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                إلغاء
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditItem;
