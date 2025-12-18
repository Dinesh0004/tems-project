package com.tems.controller;

import com.tems.dto.ReimbursementDTO;
import com.tems.model.Reimbursement;
import com.tems.service.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reimbursement")
public class ReimbursementController {

    @Autowired
    private ReimbursementService service;

    // ✅ ADMIN: Calculate reimbursement
    @PostMapping("/{reqId}/{employeeId}")
    public Reimbursement calculate(
            @PathVariable int reqId,
            @PathVariable int employeeId) {

        return service.calculateReimbursement(reqId, employeeId);
    }

    // ✅ ADMIN: View all
        @GetMapping
    public List<ReimbursementDTO> getAll() {
        return service.getAllWithEmployeeName();
    }

    // ✅ EMPLOYEE: View own reimbursements
    @GetMapping("/employee/{employeeId}")
    public List<Reimbursement> getByEmployee(@PathVariable int employeeId) {
        return service.getByEmployee(employeeId);
    }
    
}
