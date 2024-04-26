import { useState } from "react";

const EditCourse = ({ course, url, setCourseList }) => {
  const [rename, setRename] = useState(false);
  const handleRenameChange = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length === 0) {
        alert("course name must have at least 1 char");
        return;
      }
      setRename(false);
      fetch(`${url}/rename_course/${course}/${e.target.value}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((courses) => {
          alert("Course name was changed successfully");
          setCourseList(courses);
        })
        .catch((err) => console.log(err));
    }

    if (e.key === "Escape") {
      setRename(false);
    }
  };
  const handleDeleteCourse = (e, courseToDelete) => {
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
  };

  return (
    <div className="EditCourseLine">
      <h3>{course}</h3>
      <div className="editButtonsContainer">
        {rename ? (
          <input
            onKeyDown={(e) => handleRenameChange(e)}
            placeholder="Enter new name"
          ></input>
        ) : (
          <button onClick={() => setRename(true)}>edit course name</button>
        )}
        <button
          className="editButtonDelete"
          onClick={(e) => handleDeleteCourse(e, course)}
        >
          delete course
        </button>
      </div>
    </div>
  );
};

export default EditCourse;
