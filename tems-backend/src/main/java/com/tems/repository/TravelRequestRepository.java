package com.tems.repository;

import com.tems.dto.TravelRequestDTO;
import com.tems.model.TravelRequest;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TravelRequestRepository
extends JpaRepository<TravelRequest, Integer> {

List<TravelRequest> findByEmployeeId(int employeeId);

@Query("""
SELECT new com.tems.dto.TravelRequestDTO(
    t.reqId,
    t.employeeId,
    e.name,
    t.purpose,
    t.status,
    t.dateFrom,
    t.dateTo
)
FROM TravelRequest t
JOIN Employee e ON t.employeeId = e.empId
""")
List<TravelRequestDTO> findAllWithEmployeeName();
}

