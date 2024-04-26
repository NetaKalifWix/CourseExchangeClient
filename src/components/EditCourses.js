import { useState } from "react";
import Input from "./Input";
import "./EditCourses.css";
import EditCourse from "./EditCourse";

const EditCourses = (props) => {
  const { courseList, setCourseList, url, setIsEditCoursesModalOpen } = props;
  const [isAddNewCourseOptionOpen, setIsAddNewCourseOptionOpen] =
    useState(false);

  const [newCourseName, setNewCourseName] = useState("");

  const handleCloseModal = () => {
    setIsEditCoursesModalOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${url}/add_course`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ course: newCourseName }),
    })
      .then((response) => response.json())
      .then((courses) => {
        setCourseList(courses);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditCoursesModal">
      <button className="closeButton" onClick={handleCloseModal}>
        Close
      </button>
      <div className="EditCourseContent">
        {courseList.map((course) => (
          <EditCourse course={course} url={url} setCourseList={setCourseList} />
        ))}

        <button
          className="addCourseButton"
          onClick={() => setIsAddNewCourseOptionOpen(!isAddNewCourseOptionOpen)}
        >
          Add new course
        </button>
        {isAddNewCourseOptionOpen && (
          <form className="addCourseForm">
            <input
              onChange={(e) => setNewCourseName(e.target.value)}
              placeholder="Course Name"
            />
            <button onClick={(e) => handleSubmit(e)}>Add Course</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditCourses;
