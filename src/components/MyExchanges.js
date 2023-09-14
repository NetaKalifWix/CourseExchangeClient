import React, { useState } from "react";
import Input from "./Input";

const MyExchanges = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showExchanges, setShowExchanges] = useState(false);
  const [myExchanges, setMyExchanges] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const filterdExchanges = props.exchanges.filter(
      (exchange) => exchange.name === name && exchange.phone === phone
    );
    setMyExchanges(filterdExchanges);
    setShowExchanges(true);
  };
  return (
    <React.Fragment>
      <form>
        <Input set={setName} value={name} label="Your Name (English)" />
        <Input set={setPhone} value={phone} label="Your Phone" />
        <button onClick={(e) => handleSubmit(e)}>Get My Exchanges</button>
      </form>
      {showExchanges && (
        <div className="MyExchanges">
          <tr>
            <th>What I Have</th>
            <th>What I Want</th>
            <th>Action</th>
          </tr>
          {myExchanges.map((exchange) => {
            return (
              <tr>
                <th>{exchange.currentCourse}</th>
                <th>{exchange.desiredCourse}</th>
                <th>
                  <button onClick={props.handleDeleteExchange}>
                    Delete Exchange
                  </button>
                </th>
              </tr>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default MyExchanges;
