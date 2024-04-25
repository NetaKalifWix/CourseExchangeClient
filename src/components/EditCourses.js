import { useState } from "react";
import Input from "./Input";
const EditCourses = (props) => {
  const { courseList, setCourseList, url, setIsEditCoursesModalOpen } = props;
  const [isAddNewCourseOptionOpen, setIsAddNewCourseOptionOpen] =
    useState(false);
  const [rename, setRename] = useState(false);
  const [courseName, setCourseName] = useState("");

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
      body: JSON.stringify({ course: courseName }),
    })
      .then((response) => response.json())
      .then((courses) => {
        alert("course was added successfully");
        setCourseList(courses);
      })
      .catch((err) => console.log(err));
  };

  const handleRenameChange = (e, courseToRename) => {
    if (e.key === "Enter") {
      if (e.target.value.length === 0) {
        alert("course name must have at least 1 char");
        return;
      }
      setRename(false);
      fetch(`${url}/rename_course/${courseToRename}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course: courseToRename,
          newName: e.target.value,
        }),
      })
        .then((response) => response.json())
        .then((courses) => {
          setCourseList(courses);
        })
        .catch((err) => console.log(err));
    }

    if (e.key === "Escape") {
      setRename(false);
    }
  };

  const handleDeleteCourse = (e, courseToDelete) => {
    if (e.key === "Enter") {
      fetch(`${url}/remove_course/${courseToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((courses) => {
          alert(`course ${courseToDelete} removed successfully`);
          setCourseList(courses);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="EditCoursesModal">
      <button className="closeButton" onClick={handleCloseModal}>
        Close
      </button>
      <div className="MyExchangesContent">
        {courseList.map((course) => (
          <div>
            <h1>{course}</h1>
            {rename ? (
              <input
                onKeyDown={(e) => handleRenameChange(e)}
                placeholder="Enter new name"
              ></input>
            ) : (
              <button onClick={() => setRename(true)}>edit course name</button>
            )}
            <button onClick={(e) => handleDeleteCourse(e, course)}>
              delete course
            </button>
          </div>
        ))}

        <button
          onClick={() => setIsAddNewCourseOptionOpen(!isAddNewCourseOptionOpen)}
        >
          add new course
        </button>
        {isAddNewCourseOptionOpen && (
          <form className="addCourseForm">
            <Input
              set={(courseName) => setCourseName(courseName)}
              value={courseName}
              label="Course Name"
            />
            <button onClick={(e) => handleSubmit(e)}>Add Course</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditCourses;
