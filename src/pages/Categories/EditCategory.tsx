import React, { useEffect } from "react";
import categoriesApi from "../../Api/categoriesApi";
import { toast } from "react-toastify";
import { ICategory } from "../../interfaces/inedx";

const EditCategory = ({
  isOpen,
  setIsOpen,
  catId,
  setCategories,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  catId: string;
  setCategories: any;
}) => {
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) setError("");
  };
  const getCategory = async (catId: string) => {
    const res = await categoriesApi.getCategoryById(catId);
    if (res.status === 200) {
      setName(res.data.name);
    }
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("اسم التصنيف مطلوب");
      return;
    }
    const res = await categoriesApi.updateCategory(catId, name);
    if (res.status === 200) {
      setName("");
      setError("");
      setCategories((prevCategories: ICategory[]) =>
        prevCategories.map((cat: ICategory) =>
          cat._id === catId ? { ...cat, name } : cat
        )
      );
      toast.success("تم تعديل التصنيف بنجاح");
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && catId) {
      getCategory(catId);
    }
  }, [isOpen, catId]);

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

export default EditCategory;
