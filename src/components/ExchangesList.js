const ExchangesList = (props) => {
  return (
    <div className="exchanges">
      <h2>Exchanges:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>What I Have</th>
            <th>What I Want</th>
          </tr>
        </thead>
        <tbody>
          {props.exchanges.map((exchange, index) => (
            <tr key={index}>
              <td>{exchange.name}</td>
              <td>{exchange.currentCourse}</td>
              <td>{exchange.desiredCourse}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangesList;
