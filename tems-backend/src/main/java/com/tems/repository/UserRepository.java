package com.tems.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tems.model.User;

import java.util.Optional;
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);
    
    // 👨‍💼 Used for ADMIN EXPENSE (employee name)
    Optional<User> findByEmployeeId(int employeeId);
}
