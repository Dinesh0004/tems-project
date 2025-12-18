package com.tems.service;

import com.tems.model.Expense;
import com.tems.model.Reimbursement;
import com.tems.repository.ExpenseRepository;
import com.tems.repository.ReimbursementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tems.dto.ReimbursementDTO;

import java.util.List;

@Service
public class ReimbursementService {

    @Autowired
    private ExpenseRepository expenseRepo;

    @Autowired
    private ReimbursementRepository reimbursementRepo;

    public Reimbursement calculateReimbursement(int reqId, int employeeId) {

        // 🚫 Prevent duplicate reimbursement
        if (reimbursementRepo.existsByReqId(reqId)) {
            throw new RuntimeException("Reimbursement already completed for this request");
        }

        // ✅ Fetch APPROVED expenses
        List<Expense> expenses =
                expenseRepo.findByReqIdAndStatus(reqId, "APPROVED");

        if (expenses.isEmpty()) {
            throw new RuntimeException("No approved expenses found");
        }

        double total = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        Reimbursement r = new Reimbursement();
        r.setReqId(reqId);
        r.setEmployeeId(employeeId);
        r.setTotalAmount(total);
        r.setStatus("PAID");

        return reimbursementRepo.save(r);
    }

    public List<Reimbursement> getAll() {
        return reimbursementRepo.findAll();
    }

    public List<Reimbursement> getByEmployee(int employeeId) {
        return reimbursementRepo.findByEmployeeId(employeeId);
    }
    public List<ReimbursementDTO> getAllWithEmployeeName() {
        return reimbursementRepo.getAllWithEmployeeName();
    }
}
