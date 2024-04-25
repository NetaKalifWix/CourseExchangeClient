import React, { useEffect, useState } from "react";
import Input from "./Input";
import "./MyExchanges.css"; // Import the CSS file

const MyExchanges = (props) => {
  const { isLoggedIn, userInfo } = props;
  const { name, phone } = userInfo;
  const [showExchanges, setShowExchanges] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [myExchanges, setMyExchanges] = useState([]);

  const filterdExchanges = props.exchanges.filter(
    (exchange) => exchange.phone === phone
  );
  console.log(filterdExchanges);
  console.log(props.exchanges);

  useEffect(() => {
    if (isLoggedIn) {
      setShowForm(true);
      setMyExchanges(filterdExchanges);
      setShowExchanges(true);
      setShowForm(false);
    }
  }, [isLoggedIn]);

  const handleCloseModal = () => {
    props.setShowMyExchanges(false);
  };

  return (
    <React.Fragment>
      <div className="MyExchangesModal">
        <button className="closeButton" onClick={handleCloseModal}>
          Close
        </button>
        {!isLoggedIn && (
          <form className="MyExchangesForm form">
            <h1>please login to see exchanges</h1>
          </form>
        )}
        {isLoggedIn && (
          <div className="MyExchangesContent">
            {myExchanges.length > 0 ? (
              <table>
                <thead>
                  <tr key={-1} className="tabelHeader">
                    <th>What I Have</th>
                    <th>What I Want</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myExchanges.map((exchange, index) => (
                    <tr key={index}>
                      <td>{exchange.currentCourse}</td>
                      <td>{exchange.desiredCourse}</td>
                      <td>
                        <button
                          onClick={() => {
                            props.handleDeleteExchange(
                              {
                                toDelete: {
                                  name: exchange.name,
                                  phone: exchange.phone,
                                  currentCourse: exchange.currentCourse,
                                  desiredCourse: exchange.desiredCourse,
                                },
                              },
                              myExchanges.filter(
                                (exchange1) =>
                                  exchange1.desiredCourse ===
                                    exchange.desiredCourse ||
                                  exchange1.currentCourse ===
                                    exchange.currentCourse
                              )
                            );
                            handleCloseModal();
                          }}
                        >
                          Delete Exchange
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h2 className="noExchangesMessege">no exchanges were found</h2>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default MyExchanges;
