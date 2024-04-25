import "./TopBar.css";

const TopBar = ({
  isLoggegIn,
  setIsLoggedIn,
  setShowLoginFrom,
  setShowMyExchanges,
  userInfo,
  setIsEditCoursesModalOpen,
  url,
}) => {
  const isAdmin = userInfo.isAdmin;

  const handleResetSemester = (e) => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the semester? this action will remove all courses and all exchanges"
    );
    if (confirmed) {
      fetch(`${url}/erase_courses_table`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((_) =>
          fetch(`${url}/erase_all_exchanges`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
        )
        .catch((err) => console.log(err));
    }
  };

  const renderAdminButtons = () => {
    return (
      <div>
        <button
          className="personal_info_button"
          onClick={() => {
            setIsEditCoursesModalOpen(true);
          }}
        >
          Edit Courses
        </button>
        <button className="personal_info_button" onClick={handleResetSemester}>
          Reset Semester
        </button>
      </div>
    );
  };
  return (
    <header className="topbar">
      <button
        className="login_button"
        onClick={() => setShowLoginFrom((curr) => !curr)}
      >
        {isLoggegIn
          ? isAdmin
            ? `Admin ${userInfo.name}`
            : userInfo.name
          : "login"}
      </button>
      <h1 style={{ display: "inline" }}>Course Exchange App</h1>
      {!isAdmin && (
        <button
          className="personal_info_button"
          onClick={() => setShowMyExchanges(true)}
        >
          {" "}
          my exchanges{" "}
        </button>
      )}
      {isAdmin && renderAdminButtons()}
    </header>
  );
};

export default TopBar;
