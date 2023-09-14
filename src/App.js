import React, { useEffect, useState } from "react";
import "./App.css";
import DDCourseList from "./components/DDCourseList";

import Cycle from "./components/Cycle";
import Input from "./components/Input";
import MyExchanges from "./components/MyExchanges";
const url = "https://course-exchange-server.onrender.com";
const urlTest = "http://localhost:3002";
function App() {
  const [desiredCourse, setDesiredCourse] = useState("");
  const [currentCourse, setCurrentCourse] = useState("");
  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [cycle, setCycle] = useState([]);

  useEffect(() => {
    fetch(`${urlTest}`)
      .then((response) => response.json())
      .then((data) => {
        setExchanges(data.exchanges);
        setCourseList(data.courses);
        updateCycle();
      });
  }, []);

  const updateCycle = () => {
    fetch(`${urlTest}/cycles`)
      .then((response) => response.json())
      .then((data) => {
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
    fetch(`${urlTest}/add`, {
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
      fetch(`${urlTest}/delete`, {
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
      <MyExchanges
        handleDeleteExchange={handleDeleteExchange}
        exchanges={exchanges}
      />
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
        <tr>
          <th>Name</th>
          <th>What I Have</th>
          <th>What I Want</th>
        </tr>
        {exchanges.map((exchange, index) => (
          <tr>
            <th>{exchange.name}</th>
            <th>{exchange.currentCourse}</th>
            <th>{exchange.desiredCourse}</th>
          </tr>
        ))}
      </div>
      <Cycle cycle={cycle} />
    </div>
  );
}

export default App;
