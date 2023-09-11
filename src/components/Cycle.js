const Cycle = (props) => {
  const cycle = props.cycle;

  return (
    <div className="cycles">
      <h2>Cycles:</h2>
      {cycle.length === 0 ? (
        <h4>no cycles found</h4>
      ) : (
        <>
          <ul>
            {cycle.map((curr, index) => (
              <li key={index}>
                {curr.name} that has {curr.currentCourse}, gives it to
              </li>
            ))}
            <li key={cycle.length + 1}>{cycle[0].name}</li>
          </ul>
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
