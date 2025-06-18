import React from "react";

const AddProduct = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Product Name:", name);
    console.log("Image File:", image);
    setIsOpen(false);
  };
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
                <select>
                  <option value="" selected disabled>
                    اختر تصنيفًا
                  </option>
                  <option value="electronics">إلكترونيات</option>
                </select>
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

export default AddProduct;
