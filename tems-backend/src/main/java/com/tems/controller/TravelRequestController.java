package com.tems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tems.dto.TravelRequestDTO;
import com.tems.model.TravelRequest;
import com.tems.service.TravelRequestService;

@RestController
@RequestMapping("/api/travel")
@CrossOrigin(origins = "http://localhost:5173") // 🔥 ADD THIS
public class TravelRequestController {

    @Autowired
    private TravelRequestService service;

    // EMPLOYEE: Create travel request
    @PostMapping
    public TravelRequest submit(@RequestBody TravelRequest req) {
        System.out.println(">>> TRAVEL SUBMIT API HIT <<<");
        return service.submitRequest(req);
    }

    // ADMIN: Get all travel requests WITH employee name
    @GetMapping
    public List<TravelRequestDTO> getAll() {
        return service.getAllTravelRequests();
    }

    // EMPLOYEE: Get own travel requests
    @GetMapping("/employee/{employeeId}")
    public List<TravelRequest> getByEmployee(
            @PathVariable int employeeId) {

        return service.getByEmployee(employeeId);
    }

    // ADMIN: Approve / Reject travel request
    @PutMapping("/approve/{id}/{status}")
    public TravelRequest approveOrReject(
            @PathVariable int id,
            @PathVariable String status) {

        return service.updateStatus(id, status);
    }
}
