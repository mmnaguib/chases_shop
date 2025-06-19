import React, { useEffect } from "react";
import categoriesApi from "../../Api/categoriesApi";
import { ICategory } from "../../interfaces/inedx";
import itemsApi from "../../Api/itemsApi";
import { toast } from "react-toastify";

const AddItem = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);
  const [categoryId, setCategoryId] = React.useState("");
  const [costPrice, setcostPrice] = React.useState<number>(0);
  const [sellPrice, setsellPrice] = React.useState<number>(0);
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const getCategories = async () => {
    const res = await categoriesApi.getCategories();
    setCategories(res.data);
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!name || !categoryId || !costPrice || !sellPrice) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }
    if (!image) {
      toast.error("يرجى اختيار صورة للمنتج");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("categoryId", categoryId);
    formData.append("buyPrice", costPrice.toString());
    formData.append("sellPrice", sellPrice.toString());
    formData.append("image", image);
    const res = await itemsApi.addNewItem(formData);
    if (res.status === 201) {
      toast.success("تم إضافة المنتج بنجاح");
      setName("");
      setImage(null);
      setCategoryId("");
      setcostPrice(0);
      setsellPrice(0);
      getCategories();
      setIsOpen(false);
      window.location.reload();
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {isOpen && (
        <div className="modalOverlay" onClick={() => setIsOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>إضافة منتج جديد</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>اسم المنتج</label>
                <input
                  type="text"
                  placeholder="أدخل اسم المنتج"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                  <option value="" selected disabled>
                    اختر
                  </option>
                  {categories.map((category) => (
                    <>
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="price">سعر الشراء</label>
                <input
                  type="number"
                  id="price"
                  value={costPrice}
                  onChange={(e) => setcostPrice(+e.target.value)}
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

export default AddItem;
