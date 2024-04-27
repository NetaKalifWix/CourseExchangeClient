import React, { useState } from "react";

const TermsOfUseModal = ({
  isOpen,
  onClose,
  onAccept,
  setIsTermsOfUseModalOpen,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleAccept = () => {
    if (isChecked) {
      setIsTermsOfUseModalOpen(false);
    } else {
      alert("Please accept the terms of use.");
    }
  };

  return (
    <div className="EditCoursesModal">
      <div className="EditCourseContent">
        <div className="box">
          <h2>Terms of Use</h2>
          <p>
            ע״י השתתפות במערכת למציאת החלפות קורסים אני מאשר שאמחק כל החלפה
            שהוכנסה על ידי ואינה רלוונטית יותר, בין אם עקב מציאת מעגל החלפות
            מתאים ובין אם היא כבר לא רלוונטית מכל סיבה אחרת. הבטחה זו נועדה
            להבטיח את תקינות המערכת, ומועילה לכל משתמשיה.
          </p>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            I accept the terms of use.
          </label>
          <br />
          <button className="button is-primary" onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUseModal;
