package com.tems.repository;

import com.tems.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

    List<Expense> findByReqId(int reqId);
    
    List<Expense> findByReqIdAndStatus(int reqId, String status);
   
}
