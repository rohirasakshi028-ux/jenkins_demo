const {
    addStudent,
    getStudents,
    findStudentById
  } = require("./studentForm");
  
  describe("Student Form Tests", () => {
  
    test("Add a new student", () => {
      const student = addStudent(
        3,
        "Priya",
        20,
        "Electronics"
      );
  
      expect(student.name).toBe("Priya");
      expect(student.id).toBe(3);
    });
  
    test("Get all students", () => {
      const students = getStudents();
  
      expect(students.length).toBeGreaterThan(0);
    });
  
    test("Find student by ID", () => {
      const student = findStudentById(1);
  
      expect(student.name).toBe("Sakshi Rohira");
    });
  
    test("Should throw error if any field is missing", () => {
      expect(() => {
        addStudent(4, "", 20, "IT");
      }).toThrow("All fields are required");
    });
  
  });
  