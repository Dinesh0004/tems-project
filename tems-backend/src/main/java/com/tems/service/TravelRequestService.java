package com.tems.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tems.dto.TravelRequestDTO;
import com.tems.model.TravelRequest;
import com.tems.repository.TravelRequestRepository;

@Service
public class TravelRequestService {

    @Autowired
    private TravelRequestRepository travelRepo;

    // ✅ EMPLOYEE: Submit travel request
    public TravelRequest submitRequest(TravelRequest req) {
        req.setStatus("PENDING");
        return travelRepo.save(req);
    }

    // ✅ ADMIN: Get all travel requests with employee name
    public List<TravelRequestDTO> getAllTravelRequests() {
        return travelRepo.findAllWithEmployeeName();
    }

    // ✅ EMPLOYEE: Get travel requests by employee
    public List<TravelRequest> getByEmployee(int employeeId) {
        return travelRepo.findByEmployeeId(employeeId);
    }

    // ✅ ADMIN: Approve / Reject travel request
    public TravelRequest updateStatus(int id, String status) {
        TravelRequest req = travelRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        req.setStatus(status);
        return travelRepo.save(req);
    }
}
