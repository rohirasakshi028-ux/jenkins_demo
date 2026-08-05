const students = require("./studentData");

function addStudent(id, name, age, course) {
  if (!id || !name || !age || !course) {
    throw new Error("All fields are required");
  }

  const student = {
    id,
    name,
    age,
    course
  };

  students.push(student);
  return student;
}

function getStudents() {
  return students;
}

function findStudentById(id) {
  return students.find(student => student.id === id);
}

module.exports = {
  addStudent,
  getStudents,
  findStudentById
};
