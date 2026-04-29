package com.example.Kirti_SpringCRUD.controller;

import com.example.Kirti_SpringCRUD.model.Student;
import com.example.Kirti_SpringCRUD.service.StudentService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST Controller that exposes CRUD endpoints for the Student entity.
 */
@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    // Constructor-based dependency injection
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // ======================== CREATE ========================

    /**
     * POST /students → Create a new student.
     *
     * @param student the student data from the request body
     * @return the created student with HTTP 201
     */
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student created = studentService.createStudent(student);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // ======================== READ ALL ========================

    /**
     * GET /students → Retrieve all students.
     *
     * @return list of all students with HTTP 200
     */
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // ======================== READ BY ID ========================

    /**
     * GET /students/{id} → Retrieve a student by ID.
     *
     * @param id the student ID from the URL path
     * @return the student if found (HTTP 200), or HTTP 404
     */
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        Optional<Student> student = studentService.getStudentById(id);
        return student
                .map(s -> new ResponseEntity<>(s, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // ======================== UPDATE ========================

    /**
     * PUT /students/{id} → Update an existing student.
     *
     * @param id      the student ID from the URL path
     * @param student the updated student data from the request body
     * @return the updated student (HTTP 200), or HTTP 404
     */
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody Student student) {
        boolean updated = studentService.updateStudent(id, student);
        if (updated) {
            student.setId(id);
            return new ResponseEntity<>(student, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // ======================== DELETE ========================

    /**
     * DELETE /students/{id} → Delete a student by ID.
     *
     * @param id the student ID from the URL path
     * @return HTTP 204 if deleted, or HTTP 404
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable int id) {
        boolean deleted = studentService.deleteStudent(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
