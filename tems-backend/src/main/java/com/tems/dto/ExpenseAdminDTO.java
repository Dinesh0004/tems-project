package com.tems.dto;

import java.time.LocalDate;

public class ExpenseAdminDTO {

    private int id;
    private int employeeId;
    private String employeeName;
    private int reqId;
    private String type;
    private double amount;
    private LocalDate date;
    private String status;

    // getters & setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getEmployeeId() { return employeeId; }
    public void setEmployeeId(int employeeId) { this.employeeId = employeeId; }

    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }

    public int getReqId() { return reqId; }
    public void setReqId(int reqId) { this.reqId = reqId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
