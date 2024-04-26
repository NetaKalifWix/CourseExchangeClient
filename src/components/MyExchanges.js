import React, { useEffect, useState } from "react";
import "./MyExchanges.css"; // Import the CSS file

const MyExchanges = (props) => {
  const { isLoggedIn, userInfo } = props;
  const { phone } = userInfo;
  const [myExchanges, setMyExchanges] = useState([]);

  const filterdExchanges = props.exchanges.filter(
    (exchange) => exchange.phone === phone
  );

  useEffect(() => {
    if (isLoggedIn) {
      setMyExchanges(filterdExchanges);
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
                          className="deleteExchangeButton"
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
                              true,
                              myExchanges.filter(
                                (exchange1) =>
                                  (exchange1.desiredCourse ===
                                    exchange.desiredCourse ||
                                    exchange1.currentCourse ===
                                      exchange.currentCourse) &&
                                  exchange1 !== exchange
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
