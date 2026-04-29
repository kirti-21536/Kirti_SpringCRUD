package com.example.Kirti_SpringCRUD.service;

import com.example.Kirti_SpringCRUD.model.Student;
import com.example.Kirti_SpringCRUD.repository.StudentRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service layer that contains business logic for Student operations.
 * Acts as an intermediary between the Controller and Repository layers.
 */
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    // Constructor-based dependency injection
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    /**
     * Create a new student.
     *
     * @param student the student to create
     * @return the created student (with name, email, course)
     */
    public Student createStudent(Student student) {
        studentRepository.save(student);
        return student;
    }

    /**
     * Retrieve all students.
     *
     * @return list of all students
     */
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    /**
     * Retrieve a student by their ID.
     *
     * @param id the student ID
     * @return an Optional containing the student if found
     */
    public Optional<Student> getStudentById(int id) {
        return studentRepository.findById(id);
    }

    /**
     * Update an existing student.
     *
     * @param id      the ID of the student to update
     * @param student the updated student data
     * @return true if the update was successful, false otherwise
     */
    public boolean updateStudent(int id, Student student) {
        int rowsAffected = studentRepository.update(id, student);
        return rowsAffected > 0;
    }

    /**
     * Delete a student by their ID.
     *
     * @param id the ID of the student to delete
     * @return true if the deletion was successful, false otherwise
     */
    public boolean deleteStudent(int id) {
        int rowsAffected = studentRepository.deleteById(id);
        return rowsAffected > 0;
    }
}
