import React, { useEffect, useState } from "react";
import "./App.css";
import DDCourseList from "./components/DDCourseList";
import Cycles from "./components/Cycles";
import Input from "./components/Input";
import MyExchanges from "./components/MyExchanges";
import ExchangesList from "./components/ExchangesList";
import TopBar from "./components/TopBar";
import LoginForm from "./components/LoginForm";
import EditCourses from "./components/EditCourses";
import TermsOfUseModal from "./components/TermsOfUseModal";

// const url = process.env.REACT_APP_STATUS === "prod"
//   ? process.env.REACT_APP_SERVER_URL
//   : process.env.REACT_APP_LOCAL_SERVER_URL;

// const url = "https://course-exchange-server.onrender.com";
const url = "http://localhost:3002";

function App() {
  const [desiredCourse, setDesiredCourse] = useState("");
  const [currentCourse, setCurrentCourse] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    isAdmin: false,
  });
  const [courseList, setCourseList] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [showMyExchanges, setShowMyExchanges] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEditCoursesModalOpen, setIsEditCoursesModalOpen] = useState(false);
  const [isTermsOfUseModalOpen, setIsTermsOfUseModalOpen] = useState(false);

  const { name, phone, email } = userInfo;

  const validate = (type, val) => {
    if (type === "name") {
      if (val === "") {
        return false;
      }
    }
    // phone must start with 0 or +972
    // if it starts with +972 it must have 12 digits
    // if it starts with 0 it must have 10 digits
    const phoneRegex = /^(\+972|0)([0-9]{9,10})$/;
    if (type === "phone") {
      if (!phoneRegex.test(val)) {
        return false;
      }
    }
    return true;
  };

  const validateAll = () => {
    let errorMsg = "";
    if (currentCourse === "") {
      errorMsg = "Please select a current course";
    }
    if (desiredCourse === "") {
      errorMsg = "Please select a desired course";
    }
    if (!validate("name", name)) {
      errorMsg = "Please enter a valid name";
    }
    if (!validate("phone", phone)) {
      errorMsg = "Please enter a valid phone number";
    }
    if (errorMsg !== "") {
      alert(errorMsg);
      setIsError(true);
      return false;
    }

    return true;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginFrom, setShowLoginFrom] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}`);
        const data = await response.json();
        setExchanges(data.exchanges);
        setCourseList(data.courses);
        updateCycle(); // Assuming updateCycle is defined elsewhere
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const updateCycle = () => {
    fetch(`${url}/cycles`)
      .then((response) => response.json())
      .then((data) => {
        setCycles(data);
      })
      .catch((error) => console.log(error));
  };

  const handleAddExchange = () => {
    if (!validateAll()) {
      return;
    }
    const toSend = {
      exchange: {
        name,
        phone,
        email,
        currentCourse,
        desiredCourse,
      },
    };
    fetch(`${url}/add`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
    })
      .then((response) => response.json())
      .then((data) => {
        setExchanges(data);
        updateCycle();
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteExchange = (toSend, shouldShowAlert, filteredExchanges) => {
    const deleteItem = exchanges.find(
      (person) =>
        person.name === toSend.toDelete.name &&
        person.phone === toSend.toDelete.phone &&
        person.currentCourse === toSend.toDelete.currentCourse &&
        person.desiredCourse === toSend.toDelete.desiredCourse
    );

    if (deleteItem) {
      fetch(`${url}/delete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toSend),
      })
        .then((response) => response.json())
        .then((data) => {
          setExchanges(data);
          updateCycle();
        })
        .catch((error) => console.log(error));
      if (shouldShowAlert) {
        if (filteredExchanges.length !== 0) {
          let exchangeList = "";
          for (const exchange of filteredExchanges) {
            exchangeList += `What I have: ${exchange.currentCourse}, What I want: ${exchange.desiredCourse}\n`;
          }
          const message = `You also have the following exchanges that might be irrelevant:\n${exchangeList}\nPlease consider deleting them as well.`;
          alert(message);
        }
      }
    } else {
      alert("No data matching the deletion request was found");
    }
  };

  return (
    <div className="App">
      <TopBar
        isLoggegIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setShowLoginFrom={setShowLoginFrom}
        setShowMyExchanges={setShowMyExchanges}
        userInfo={userInfo}
        setIsEditCoursesModalOpen={setIsEditCoursesModalOpen}
        url={url}
      />
      {showLoginFrom && (
        <LoginForm
          url={url}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setShowLoginFrom={setShowLoginFrom}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setIsTermsOfUseModalOpen={setIsTermsOfUseModalOpen}
        />
      )}
      {isEditCoursesModalOpen && (
        <EditCourses
          courseList={courseList}
          setCourseList={setCourseList}
          url={url}
          setIsEditCoursesModalOpen={setIsEditCoursesModalOpen}
        />
      )}
      {isTermsOfUseModalOpen && (
        <TermsOfUseModal setIsTermsOfUseModalOpen={setIsTermsOfUseModalOpen} />
      )}
      {showMyExchanges && (
        <MyExchanges
          handleDeleteExchange={handleDeleteExchange}
          exchanges={exchanges}
          setShowMyExchanges={setShowMyExchanges}
          isLoggedIn={isLoggedIn}
          userInfo={userInfo}
        />
      )}
      <div className="form">
        <label>
          {!isLoggedIn ? "please login to add exchange" : "Hello " + name}
        </label>

        {isLoggedIn && (
          <DDCourseList
            courses={courseList}
            course={currentCourse}
            setCourse={setCurrentCourse}
            title="What I Have"
          />
        )}
        {isLoggedIn && (
          <DDCourseList
            courses={courseList}
            course={desiredCourse}
            setCourse={setDesiredCourse}
            title="What I Want"
          />
        )}
        {isLoggedIn && (
          <Input
            set={(phone) =>
              setUserInfo((curr) => {
                return { ...curr, phone };
              })
            }
            value={phone}
            label="Your Phone"
            isError={isError && !validate("phone", phone)}
          />
        )}
        {isLoggedIn && (
          <button onClick={handleAddExchange}>Add Exchange</button>
        )}
        {isLoggedIn && (
          <button
            onClick={() =>
              handleDeleteExchange({
                toDelete: {
                  name,
                  phone,
                  currentCourse,
                  desiredCourse,
                },
              })
            }
          >
            Delete Exchange
          </button>
        )}
      </div>
      <ExchangesList
        exchanges={exchanges}
        isAdmin={userInfo.isAdmin}
        handleDeleteExchange={handleDeleteExchange}
      />
      <Cycles cycles={cycles} />
      <footer>© 2023 Neta Kalif, Eran Shtekel, Amir Gordon, Tal Nesher</footer>
    </div>
  );
}

export default App;
