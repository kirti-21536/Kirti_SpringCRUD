package com.example.Kirti_SpringCRUD.repository;

import com.example.Kirti_SpringCRUD.model.Student;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

/**
 * Repository layer that interacts with the PostgreSQL database
 * using JdbcTemplate. All SQL queries are written manually.
 */
@Repository
public class StudentRepository {

    private final JdbcTemplate jdbcTemplate;

    // Constructor-based dependency injection
    public StudentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // RowMapper to map each ResultSet row to a Student object
    private final RowMapper<Student> studentRowMapper = (ResultSet rs, int rowNum) -> {
        Student student = new Student();
        student.setId(rs.getInt("id"));
        student.setName(rs.getString("name"));
        student.setEmail(rs.getString("email"));
        student.setCourse(rs.getString("course"));
        return student;
    };

    /**
     * INSERT a new student into the database.
     *
     * @param student the student to create
     * @return number of rows affected (1 if successful)
     */
    public int save(Student student) {
        String sql = "INSERT INTO student (name, email, course) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, student.getName(), student.getEmail(), student.getCourse());
    }

    /**
     * SELECT all students from the database.
     *
     * @return list of all students
     */
    public List<Student> findAll() {
        String sql = "SELECT id, name, email, course FROM student ORDER BY id";
        return jdbcTemplate.query(sql, studentRowMapper);
    }

    /**
     * SELECT a single student by ID.
     *
     * @param id the student ID
     * @return an Optional containing the student if found
     */
    public Optional<Student> findById(int id) {
        String sql = "SELECT id, name, email, course FROM student WHERE id = ?";
        List<Student> results = jdbcTemplate.query(sql, studentRowMapper, id);
        return results.stream().findFirst();
    }

    /**
     * UPDATE an existing student's details.
     *
     * @param id      the ID of the student to update
     * @param student the updated student data
     * @return number of rows affected (1 if successful)
     */
    public int update(int id, Student student) {
        String sql = "UPDATE student SET name = ?, email = ?, course = ? WHERE id = ?";
        return jdbcTemplate.update(sql, student.getName(), student.getEmail(), student.getCourse(), id);
    }

    /**
     * DELETE a student by ID.
     *
     * @param id the ID of the student to delete
     * @return number of rows affected (1 if successful)
     */
    public int deleteById(int id) {
        String sql = "DELETE FROM student WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
