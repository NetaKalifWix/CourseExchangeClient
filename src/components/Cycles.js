const Cycles = (props) => {
  const cycles = props.cycles;
  return (
    <div className="cycles">
      <h2>Cycles:</h2>
      {cycles.length === 0 ? (
        <h4>no cycles found</h4>
      ) : (
        <>
          {cycles.map((cycle, index) => (
            <>
              <h2> cycle number {index + 1}</h2>
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
                      {index === 0 ? (
                        <td>{cycle[cycle.length - 1].name}</td>
                      ) : (
                        <td>{cycle[index - 1].name}</td>
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
          ))}
        </>
      )}
    </div>
  );
};

export default Cycles;
