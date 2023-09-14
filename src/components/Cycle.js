const Cycle = (props) => {
  const cycle = props.cycle;

  return (
    <div className="cycles">
      <h2>Cycles:</h2>
      {cycle.length === 0 ? (
        <h4>no cycles found</h4>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gives Course</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {cycle.map((curr, index) => (
                <tr>
                  <td>{curr.name}</td>
                  <td>{curr.currentCourse}</td>
                  {index === cycle.length - 1 ? (
                    <td>{cycle[0].name}</td>
                  ) : (
                    <td>{cycle[index + 1].name}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <h5>phone numbers:</h5>
          <ul>
            {cycle.map((curr, index) => (
              <li key={index}>
                {curr.name}: {curr.phone}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Cycle;
