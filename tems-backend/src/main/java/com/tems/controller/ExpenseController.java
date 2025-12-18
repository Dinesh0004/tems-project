package com.tems.controller;

import com.tems.model.Expense;
import com.tems.dto.ExpenseAdminDTO;
import com.tems.service.ExpenseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    @Autowired
    private ExpenseService service;

    // ✅ EMPLOYEE: Submit expense
    @PostMapping
    public Expense submitExpense(@RequestBody Expense expense) {
        return service.submitExpense(expense);
    }

    // ✅ EMPLOYEE: Get expenses by request ID
    @GetMapping("/request/{reqId}")
    public List<Expense> getExpensesByRequest(@PathVariable int reqId) {
        return service.getByRequestId(reqId);
    }

    // ✅ ADMIN: Get ALL expenses WITH employee name (DTO)
    @GetMapping
    public List<ExpenseAdminDTO> getAllExpenses() {
        System.out.println(">>> ADMIN EXPENSE DTO API HIT <<<");
        return service.getAllExpensesForAdmin();
    }

    // ✅ ADMIN: Approve / Reject expense
    @PutMapping("/{id}/status/{status}")
    public Expense updateExpenseStatus(
            @PathVariable int id,
            @PathVariable String status) {

        return service.updateExpenseStatus(id, status);
    }
}