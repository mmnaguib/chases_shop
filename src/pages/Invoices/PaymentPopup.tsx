import React from "react";

const PaymentPopup = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  return (
    <div>
      {isOpen && (
        <div className="modalOverlay" onClick={() => setIsOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <table className="tableStyle" border={1} style={{ marginTop: "0" }}>
              <thead>
                <tr>
                  <th>م</th>
                  <th>الطريقة</th>
                  <th>القيمة</th>
                  <th>الإجراء</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPopup;
