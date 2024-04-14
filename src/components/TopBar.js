import "./TopBar.css";

const TopBar = ({ isLoggegIn ,setIsLoggedIn, setShowLoginFrom, setShowMyExchanges , userInfo}) => {
  return (
    <header className="topbar">
      <button
        className="login_button"
        onClick={() => setShowLoginFrom((curr) => !curr)}
      >
        {isLoggegIn ? userInfo.name : "login"}
      </button>
      <h1 style={{ display: "inline" }}>Course Exchange App</h1>
      <button
        className="personal_info_button"
        onClick={() => setShowMyExchanges(true)}
      >
        {" "}
        my exchanges{" "}
      </button>
    </header>
  );
};

export default TopBar;
