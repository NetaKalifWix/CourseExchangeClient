import React, { useEffect, useState } from "react";
import "./App.css";
import DDCourseList from "./components/DDCourseList";

import Cycles from "./components/Cycles";
import Input from "./components/Input";
import MyExchanges from "./components/MyExchanges";
import ExchangesList from "./components/ExchangesList";

const url = process.env.REACT_APP_SERVER_URL;
// const url = "https://course-exchange-server.onrender.com";
// const url = "http://localhost:3002";

function App() {
  const [desiredCourse, setDesiredCourse] = useState("");
  const [currentCourse, setCurrentCourse] = useState("");
  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [showMyExchanges, setShowMyExchanges] = useState(false);
  const [isError, setIsError] = useState(false);

  const validate = (type,val) => {
    if (type === "name"){
      if (val === ""){
        return false
      }
    }
    // phone must start with 0 or +972
    // if it starts with +972 it must have 12 digits
    // if it starts with 0 it must have 10 digits
    const phoneRegex = /^(\+972|0)([0-9]{9,10})$/
    if (type === "phone"){
      if (!phoneRegex.test(val)){
        return false
      }
    }
    return true
  }

  const validateAll = () => {
    
    let errorMsg = ""
    if (currentCourse === ""){
      errorMsg = "Please select a current course"
    }
    if (desiredCourse === ""){
      errorMsg = "Please select a desired course"
    }
    if (!validate("name",name)){
      errorMsg = "Please enter a valid name"
    }
    if (!validate("phone",phone)){
      errorMsg = "Please enter a valid phone number"
    }
    if (errorMsg !== ""){
      alert(errorMsg)
      setIsError(true)
      return false
    }

    return true
  }

  useEffect(() => {
    fetch(`${url}`)
      .then((response) => response.json())
      .then((data) => {
        setExchanges(data.exchanges);
        setCourseList(data.courses);
        updateCycle();
      });
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

    if (!validateAll()){
      return
    }
    const toSend = {
      exchange: {
        name,
        phone,
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

  const handleDeleteExchange = (toSend) => {
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
    } else {
      alert("No data matching the deletion request was found");
    }
  };

  return (
    <div className="App">
      <h1>Course Exchange App</h1>
      <button onClick={() => setShowMyExchanges(true)}>My Exchanges</button>
      {showMyExchanges && (
        <MyExchanges
          handleDeleteExchange={handleDeleteExchange}
          exchanges={exchanges}
          setShowMyExchanges={setShowMyExchanges}
        />
      )}
      <div className="form">
        <DDCourseList
          courses={courseList}
          course={currentCourse}
          setCourse={setCurrentCourse}
          title="What I Have"
        />
        <DDCourseList
          courses={courseList}
          course={desiredCourse}
          setCourse={setDesiredCourse}
          title="What I Want"
        />
        <Input set={setname} value={name} label="Your Name (English)" isError ={isError && !validate("name",name)}/>
        <Input set={setPhone} value={phone} label="Your Phone" isError={isError && !validate("phone",phone)}/>
        <button onClick={handleAddExchange}>Add Exchange</button>
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
      </div>
      <ExchangesList exchanges={exchanges} />
      <Cycles cycles={cycles} />
      <footer>© 2023 Neta Kalif, Special thanks to Harel Damti</footer>
    </div>
  );
}

export default App;
