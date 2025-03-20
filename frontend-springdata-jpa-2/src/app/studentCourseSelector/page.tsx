"use client"
import { CourseModel, ENDPOINTS, StudentModel } from '@/model/DataModel';
import React, { useState } from 'react';

const StudentCourseSelector = () => {
  const [studentData, setStudentData] = useState<StudentModel[]>([]);
  const [courseData, setCourseData] = useState<CourseModel[]>([]);
  const [studentCourses, setStudentCourses] = useState<{ [key: string]: { courseno: string; coursename: string }[] }>({});

  const studentListHandler = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const url = ENDPOINTS.STUDENTS;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.dir(data);
      setStudentData(data);

      try {
        const url = ENDPOINTS.COURSES;
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.dir(data);
        setCourseData(data);
        // return data;
      } catch (error) {
        console.error("Error fetching student course subjects: ", error);
      }
      return data;
    } catch (error) {
      console.error("Error fetching student course subjects: ", error);
    }
  };

  // Handle Drag Start
  const dragStartHandler = (event: React.DragEvent, courseno: string, coursename: string) => {
    event.dataTransfer.setData("courseno", courseno);
    event.dataTransfer.setData("coursename", coursename);
  };

  // Handle Drop Event (Assign Course)
  const dropHandler = async (event: React.DragEvent, studentId: string) => {
    event.preventDefault();
    const courseno = event.dataTransfer.getData("courseno");
    const coursename = event.dataTransfer.getData("coursename");

    if (!courseno || !coursename) return;

    try {
      const url = ENDPOINTS.ASSIGN_COURSES_TO_STUDENTS;
      const response = await fetch(`${url}?rollNo=${studentId}&courseNo=${courseno}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.dir(data);

      // Ensure state updates **after** a successful API call
      setStudentCourses((prev) => {
        const updatedCourses = { ...prev };

        if (!updatedCourses[studentId]) {
          updatedCourses[studentId] = [];
        }

        const alreadyAssigned = updatedCourses[studentId].some(course => course.courseno === courseno);
        if (!alreadyAssigned) {
          updatedCourses[studentId] = [...updatedCourses[studentId], { courseno, coursename }];
        }
        console.log(`Course assigned: ${studentId} -> ${courseno}`);
        return updatedCourses;
      });

    } catch (error) {
      console.error("Error fetching student course subjects: ", error);
    }
  };

  // Handle Course Removal
  const removeCourseHandler = (studentId: string, courseno: string) => {
    setStudentCourses((prev) => {
      const updatedCourses = { ...prev };
      updatedCourses[studentId] = updatedCourses[studentId].filter(course => course.courseno !== courseno);
      return updatedCourses;
    });
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">Spring Data JPA</h1>
      <button onClick={studentListHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Students List</button>
      
      <div className="flex flex-col max-w-lg mx-auto mt-4">
        <div className="grid grid-cols-2 gap-10">
          {/* Student List */}
          <div className="flex flex-wrap">
            {studentData.map((student, index) => (
              <div
                className="border border-gray-400 text-black font-bold m-2 p-6 rounded w-64 text-center"
                key={index}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => dropHandler(event, student.rollno)}>
                  <p>{student.firstname + " " + student.lastname}</p>

                {/* Assigned Courses with Delete Button */}
                <div className="mt-2">
                  {studentCourses[student.rollno]?.map((course) => (
                    <div key={course.courseno} className="bg-blue-200 text-black p-2 rounded flex justify-between items-center">
                      <span>{course.coursename}</span>
                      <button
                        className="text-black px-2 py-1 rounded ml-2"
                        onClick={() => removeCourseHandler(student.rollno, course.courseno)}>
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Course List */}
          <div className="flex flex-wrap">
            {courseData.map((course, index) => (
              <div
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-6 px-6 m-2 rounded"
                key={index}
                draggable="true"
                onDragStart={(event) => dragStartHandler(event, course.courseno, course.coursename)}>
                  <p>{course.coursename}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
};

export default StudentCourseSelector;