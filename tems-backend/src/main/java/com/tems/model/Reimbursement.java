package com.tems.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reimbursement")
public class Reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reimbId;

    @Column(unique = true)
    private int reqId;

    private int employeeId;

    private double totalAmount;

    private String status = "PAID";

    private LocalDateTime createdAt = LocalDateTime.now();

	public int getReimbId() {
		return reimbId;
	}

	public int getReqId() {
		return reqId;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public String getStatus() {
		return status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setReimbId(int reimbId) {
		this.reimbId = reimbId;
	}

	public void setReqId(int reqId) {
		this.reqId = reqId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

    // getters & setters
}
