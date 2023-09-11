import React, { useEffect, useState } from "react";
import "./App.css";
import DDCourseList from "./components/DDCourseList";

import Cycle from "./components/Cycle";
import Input from "./components/Input";

function App() {
  const [desiredCourse, setDesiredCourse] = useState("");
  const [currentCourse, setCurrentCourse] = useState("");
  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [cycle, setCycle] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001`)
      .then((response) => response.json())
      .then((data) => {
        setExchanges(data.exchanges);
        setCourseList(data.courses);
      });

    fetch(`http://localhost:3001/cycles`)
      .then((response) => response.json())
      .then((data) => {
        setCycle(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateCycle = () => {
    fetch(`http://localhost:3001/cycles`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCycle(data);
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
    fetch(`http://localhost:3001/add`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setExchanges(data))
      .catch((error) => console.log(error));
    updateCycle();
  };
  const handleDeleteExchange = () => {
    const toSend = {
      toDelete: {
        name: name,
        phone: phone,
        currentCourse: currentCourse,
        desiredCourse: desiredCourse,
      },
    };
    const deleteItem = exchanges.find(
      (person) =>
        person.name === toSend.toDelete.name &&
        person.phone === toSend.toDelete.phone &&
        person.currentCourse === toSend.toDelete.currentCourse &&
        person.desiredCourse === toSend.toDelete.desiredCourse
    );

    if (deleteItem) {
      fetch(`http://localhost:3001/delete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toSend),
      })
        .then((response) => response.json())
        .then((data) => setExchanges(data))
        .catch((error) => console.log(error));
      updateCycle();
    } else {
      alert("No data matching the deletion request was found");
    }
  };

  return (
    <div className="App">
      <h1>Course Exchange App</h1>
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
        <button onClick={handleDeleteExchange}>Delete Exchange</button>
      </div>
      <div className="exchanges">
        <h2>Exchanges:</h2>
        <ul>
          {exchanges.map((exchange, index) => (
            <li key={index}>
              {exchange.name} give {exchange.currentCourse}, {exchange.name}{" "}
              wants {exchange.desiredCourse}
            </li>
          ))}
        </ul>
      </div>
      <Cycle cycle={cycle} />
    </div>
  );
}

export default App;
