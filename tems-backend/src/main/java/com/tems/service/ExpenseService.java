package com.tems.service;

import com.tems.model.Expense;

import com.tems.dto.ExpenseAdminDTO;
import com.tems.repository.ExpenseRepository;
import com.tems.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepo;

    @Autowired
    private UserRepository userRepo;   // ✅ CORRECT INJECTION

    // EMPLOYEE: Submit expense
    public Expense submitExpense(Expense expense) {
        expense.setStatus("SUBMITTED");
        return expenseRepo.save(expense);
    }

    // EMPLOYEE: View expenses by travel request
    public List<Expense> getByRequestId(int reqId) {
        return expenseRepo.findByReqId(reqId);
    }

    // ADMIN: Approve / Reject expense
    public Expense updateExpenseStatus(int id, String status) {
        Expense expense = expenseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        expense.setStatus(status);
        return expenseRepo.save(expense);
    }

    // ✅ ADMIN: View ALL expenses WITH employee name
    public List<ExpenseAdminDTO> getAllExpensesForAdmin() {

        return expenseRepo.findAll().stream().map(expense -> {

            ExpenseAdminDTO dto = new ExpenseAdminDTO();

            dto.setId(expense.getId());
            dto.setEmployeeId(expense.getEmployeeId());
            dto.setReqId(expense.getReqId());
            dto.setType(expense.getType());
            dto.setAmount(expense.getAmount());
            dto.setDate(expense.getDate());
            dto.setStatus(expense.getStatus());

            userRepo.findByEmployeeId(expense.getEmployeeId())
                    .ifPresentOrElse(
                        user -> dto.setEmployeeName(user.getUsername()),
                        () -> dto.setEmployeeName("Unknown")
                    );

            return dto;

        }).toList();
    }
}
