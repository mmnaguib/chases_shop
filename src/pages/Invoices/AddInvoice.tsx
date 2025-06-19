import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddInvoice = ({ invoiceType }: { invoiceType: string }) => {
  return (
    <div className="addInvoiceContent">
      <div className="addInvoiceHeader">
        <h4>إضافة اضناف</h4>
        <div className="addInvoiceContentToAdd">
          <div>
            <label htmlFor="categoryName">التصنيف</label>
            <select id="categoryName">
              <option value="" selected disabled>
                اختر التصنيف
              </option>
              <option value="1">تصنيف 1</option>
              <option value="2">تصنيف 2</option>
            </select>
          </div>
          <div>
            <label htmlFor="itemName">الصنف</label>
            <select id="itemName">
              <option value="" selected disabled>
                اختر الصنف
              </option>
              <option value="1">الصنف 1</option>
              <option value="2">الصنف 2</option>
            </select>
          </div>
          <div>
            <label htmlFor="price">السعر</label>
            <input type="number" id="price" />
          </div>
          <div>
            <label htmlFor="quantity">الكمية</label>
            <input type="number" id="quantity" min={1} />
          </div>
          <div>
            <label htmlFor="availableQuantity">الكمية المتاحة</label>
            <input type="number" id="availableQuantity" min={0} />
          </div>
          <div>
            <label className="hiddenLabel">.</label>
            <button className="success">إضافة</button>
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
            <tr>
              <td>تصنيف 1</td>
              <td>الصنف 1</td>
              <td>100</td>
              <td>2</td>
              <td>200</td>
              <td>
                <button className="danger sm">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
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
