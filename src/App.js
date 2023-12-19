import React, { useEffect, useState } from "react";
import "./App.css";
import DDCourseList from "./components/DDCourseList";

import Cycles from "./components/Cycles";
import Input from "./components/Input";
import MyExchanges from "./components/MyExchanges";
import ExchangesList from "./components/ExchangesList";
const url = "https://course-exchange-server-zlc5.onrender.com";
const urlTest = "http://localhost:3002";
function App() {
  const [desiredCourse, setDesiredCourse] = useState("");
  const [currentCourse, setCurrentCourse] = useState("");
  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [showMyExchanges, setShowMyExchanges] = useState(false);

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
    const toSend = {
      exchange: {
        name: name,
        phone: phone,
        currentCourse: currentCourse,
        desiredCourse: desiredCourse,
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
        <Input set={setname} value={name} label="Your Name (English)" />
        <Input set={setPhone} value={phone} label="Your Phone" />
        <button onClick={handleAddExchange}>Add Exchange</button>
        <button
          onClick={() =>
            handleDeleteExchange({
              toDelete: {
                name: name,
                phone: phone,
                currentCourse: currentCourse,
                desiredCourse: desiredCourse,
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
