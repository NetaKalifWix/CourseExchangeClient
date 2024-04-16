// import React, { useState } from "react";
// import Input from "./Input";
// import "./MyExchanges.css";

// const MyExchanges = (props) => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [showExchanges, setShowExchanges] = useState(false);
//   const [myExchanges, setMyExchanges] = useState([]);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const filterdExchanges = props.exchanges.filter(
//       (exchange) => exchange.name === name && exchange.phone === phone
//     );
//     setMyExchanges(filterdExchanges);
//     setShowExchanges(true);
//   };
//   return (
//     <React.Fragment>
//       <form className="MyExchangesForm">
//         <Input set={setName} value={name} label="Your Name (English)" />
//         <Input set={setPhone} value={phone} label="Your Phone" />
//         <button onClick={(e) => handleSubmit(e)}>Get My Exchanges</button>
//       </form>
//       {showExchanges && (
//         <div className="MyExchangesTabel modal">
//           <tr className="tabelHeader">
//             <th>What I Have</th>
//             <th>What I Want</th>
//             <th>Action</th>
//           </tr>
//           {myExchanges.map((exchange) => {
//             return (
//               <tr>
//                 <th>{exchange.currentCourse}</th>
//                 <th>{exchange.desiredCourse}</th>
//                 <th>
//                   <button onClick={props.handleDeleteExchange}>
//                     Delete Exchange
//                   </button>
//                 </th>
//               </tr>
//             );
//           })}
//           <button
//             className="closeButton"
//             onClick={props.setShowMyExchanges(false)}
//           >
//             close
//           </button>
//         </div>
//       )}
//     </React.Fragment>
//   );
// };

// export default MyExchanges;
import React, { useEffect, useState } from "react";
import Input from "./Input";
import "./MyExchanges.css"; // Import the CSS file

const MyExchanges = (props) => {
  const { isLoggedIn , userInfo } = props;
  const { name, phone } = userInfo;
  const [showExchanges, setShowExchanges] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [myExchanges, setMyExchanges] = useState([]);

  const filterdExchanges = props.exchanges.filter(
    (exchange) => exchange.name === name
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
        {/* {showForm && (
          <form className="MyExchangesForm form">
            <Input set={setName} value={name} label="Your Name (English)" />
            <Input set={setPhone} value={phone} label="Your Phone" />
            <button onClick={(e) => handleSubmit(e)}>Get My Exchanges</button>
          </form>
        )} */}
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
                            props.handleDeleteExchange({
                              toDelete: {
                                name: exchange.name,
                                phone: exchange.phone,
                                currentCourse: exchange.currentCourse,
                                desiredCourse: exchange.desiredCourse,
                              },
                            });
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
