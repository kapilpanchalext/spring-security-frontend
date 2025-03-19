"use client"
import { ENDPOINTS, StudentModel } from '@/model/DataModel';
import React, { useState } from 'react';

const StudentCourseSelector = () => {
  const[studentData, setStudentData] = useState<StudentModel[]>([]);

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
      return data;
    } catch (error) {
      console.error("Error fetching student course subjects: ", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">Spring Data JPA</h1>
      <button onClick={studentListHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Students List</button>
      <div>
        {studentData.map((element, index) => (
          <div key={index}>
            <p>{element.firstname + " " + element.lastname}</p>
          </div>
        ))}
      </div>
    </>
  )
};

export default StudentCourseSelector;