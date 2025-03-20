"use client"
import { CourseModel, ENDPOINTS, SubjectModel } from '@/model/DataModel';
import React, { useState } from 'react';

const CourseSubjectSelector = () => {
  const [courseData, setCourseData] = useState<CourseModel[]>([]);
  const [subjectData, setSubjectData] = useState<SubjectModel[]>([]);
  const [coursesSubject, setCoursesSubject] = useState<{ [key: string]: { subjectno: string; subjectname: string }[] }>({});

  const courseListHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
  
    try {
      // Fetch Courses (which already contain subjects)
      const courseResponse = await fetch(ENDPOINTS.COURSES);
  
      if (!courseResponse.ok) {
        throw new Error(`HTTP error! Status: ${courseResponse.status}`);
      }
  
      const courseData: CourseModel[] = await courseResponse.json();
      setCourseData(courseData);
  
      // Initialize coursesSubject from fetched courses
      setCoursesSubject((prev) => {
        const updatedCourses = { ...prev };
  
        courseData.forEach((course) => {
          if (!updatedCourses[course.courseno]) {
            updatedCourses[course.courseno] = [];
          }
  
          course.subject.forEach((subject) => {
            const alreadyAssigned = updatedCourses[course.courseno].some(
              (s) => s.subjectno === subject.subjectno
            );
  
            if (!alreadyAssigned) {
              updatedCourses[course.courseno] = [
                ...updatedCourses[course.courseno],
                { subjectno: subject.subjectno, subjectname: subject.subjectname },
              ];
            }
          });
        });
  
        return updatedCourses;
      });
  
      // Fetch subjects separately (for later assignments)
      const subjectResponse = await fetch(ENDPOINTS.SUBJECTS);
  
      if (!subjectResponse.ok) {
        throw new Error(`HTTP error! Status: ${subjectResponse.status}`);
      }
  
      const subjectData = await subjectResponse.json();
      setSubjectData(subjectData);
  
    } catch (error) {
      console.error("Error fetching student course subjects: ", error);
    }
  };

  // Handle Drag Start
  const dragStartHandler = (event: React.DragEvent, subjectno: string, subjectname: string) => {
    event.dataTransfer.setData("subjectno", subjectno);
    event.dataTransfer.setData("subjectname", subjectname);
  };

  // Handle Drop Event (Assign Course)
  const dropHandler = async (event: React.DragEvent, coursename: string, courseno: string) => {
    event.preventDefault();
    const subjectno = event.dataTransfer.getData("subjectno");
    const subjectname = event.dataTransfer.getData("subjectname");

    if (!subjectno || !subjectname) return;

    try {
      const url = ENDPOINTS.ASSIGN_SUBJECT_TO_COURSE;
      const response = await fetch(`${url}?courseNo=${courseno}&subjectNo=${subjectno}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.dir(data);

      // Ensure state updates **after** a successful API call
      setCoursesSubject((prev) => {
        const updatedCourses = { ...prev };
      
        if (!updatedCourses[courseno]) {
          updatedCourses[courseno] = [];
        }
      
        const alreadyAssigned = updatedCourses[courseno].some(subject => subject.subjectno === subjectno);
        if (!alreadyAssigned) {
          updatedCourses[courseno] = [...updatedCourses[courseno], { subjectno, subjectname }];
        }
      
        console.log(`Subject assigned: ${courseno} -> ${subjectno}`);
        return updatedCourses;
      });
    } catch (error) {
      console.error("Error fetching student course subjects: ", error);
    }
  };

  // Handle Course Removal
  const removeCourseHandler = (courseno: string, subjectno: string) => {
    setCoursesSubject((prev) => {
      const updatedCourses = { ...prev };
  
      if (updatedCourses[courseno]) {
        updatedCourses[courseno] = updatedCourses[courseno].filter(subject => subject.subjectno !== subjectno);
        if (updatedCourses[courseno].length === 0) {
          delete updatedCourses[courseno];
        }
      }
  
      return updatedCourses;
    });
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">Spring Data JPA</h1>
      <button onClick={courseListHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Course List</button>
      
      <div className="flex flex-col w-full mx-auto mt-4">
        <div className="grid grid-cols-2 gap-10">
          {/* Subject List */}
          <div className="flex flex-wrap w-full w-1/2">
            {courseData.map((course, index) => (
              <div
                className="border border-gray-400 text-black font-bold m-2 p-6 rounded w-64 text-center"
                key={index}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => dropHandler(event, course.coursename, course.courseno)}>
                  <p>{course.coursename}</p>

                {/* Assigned Courses with Delete Button */}
                <div className="mt-2">
                  {coursesSubject[course.courseno]?.map((subject) => (
                    <div key={subject.subjectno} className="bg-blue-200 text-black p-2 rounded flex justify-between items-center">
                      <span>{subject.subjectname}</span>
                      <button
                        className="text-black px-2 py-1 rounded ml-2"
                        onClick={() => removeCourseHandler(course.courseno, subject.subjectno)}>
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Subject List */}
          <div className="flex flex-wrap">
            {subjectData.map((subject, index) => (
              <div
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-6 px-6 m-2 rounded"
                key={index}
                draggable="true"
                onDragStart={(event) => dragStartHandler(event, subject.subjectno, subject.subjectname)}>
                  <p>{subject.subjectname}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
};

export default CourseSubjectSelector;