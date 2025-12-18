package com.tems.dto;

import java.time.LocalDateTime;

public class ReimbursementDTO {

    private int reimbId;
    private int reqId;
    private int employeeId;
    private String employeeName;
    private double totalAmount;
    private String status;
    private LocalDateTime createdAt;

    public ReimbursementDTO(
            int reimbId,
            int reqId,
            int employeeId,
            String employeeName,
            double totalAmount,
            String status,
            LocalDateTime createdAt
    ) {
        this.reimbId = reimbId;
        this.reqId = reqId;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = createdAt;
    }

    public int getReimbId() { return reimbId; }
    public int getReqId() { return reqId; }
    public int getEmployeeId() { return employeeId; }
    public String getEmployeeName() { return employeeName; }
    public double getTotalAmount() { return totalAmount; }
    public String getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
