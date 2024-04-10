import "./TopBar.css";

const TopBar = ({ setIsLoggedIn, setShowLoginFrom }) => {
  return (
    <header className="topbar">
      <button
        className="login_button"
        onClick={() => setShowLoginFrom((curr) => !curr)}
      >
        {" "}
        Login{" "}
      </button>
      <button
      className="personal_info_button"
      >
        {" "}
        Personal Info{" "}
      </button>
    </header>
  );
};

export default TopBar;
