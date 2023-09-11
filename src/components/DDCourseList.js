const DDCourseList = (props) => {
  const courses = props.courses;
  return (
    <>
      <label>{props.title}</label>
      <select
        value={props.course}
        onChange={(e) => props.setCourse(e.target.value)}
      >
        {courses.map((course, index) => (
          <option key={index} value={course}>
            {course}
          </option>
        ))}
      </select>
    </>
  );
};

export default DDCourseList;
