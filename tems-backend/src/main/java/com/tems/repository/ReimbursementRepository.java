package com.tems.repository;

import com.tems.dto.ReimbursementDTO;
import com.tems.model.Expense;
import com.tems.model.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReimbursementRepository extends JpaRepository<Reimbursement, Integer> {
	@Query("""
			  SELECT new com.tems.dto.ReimbursementDTO(
			    r.reimbId,
			    r.reqId,
			    r.employeeId,
			    u.username,
			    r.totalAmount,
			    r.status,
			    r.createdAt
			  )
			  FROM Reimbursement r
			  JOIN User u ON r.employeeId = u.employeeId
			""")
			List<ReimbursementDTO> getAllWithEmployeeName();
   
	boolean existsByReqId(int reqId);

    Optional<Reimbursement> findByReqId(int reqId);

    List<Reimbursement> findByEmployeeId(int employeeId);
    
    List<Expense> findByReqIdAndStatus(int reqId, String status);
   
}
