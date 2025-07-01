import React from "react";
import categoriesApi from "../../Api/categoriesApi";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faSave } from "@fortawesome/free-solid-svg-icons";

const AddCategory = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) setError("");
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("اسم التصنيف مطلوب");
      return;
    }
    const res = await categoriesApi.addNewCategory(name);
    if (res.status === 201) {
      setName("");
      setError("");
      toast.success("تم إضافة التصنيف بنجاح");
      setIsOpen(false);
      window.location.reload();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modalOverlay" onClick={() => setIsOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>إضافة تصنيف جديد</h2>
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
                <FontAwesomeIcon icon={faSave} />
                <span className="iconWithText">حفظ</span>
              </button>
              <button
                className="danger"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={faCancel} />
                <span className="iconWithText">إلغاء</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCategory;
