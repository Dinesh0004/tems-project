package com.tems.dto;

public class TravelRequestDTO {

    private int reqId;
    private int employeeId;
    private String employeeName;
    private String purpose;
    private String status;
    private String dateFrom;
    private String dateTo;

    public TravelRequestDTO(
            int reqId,
            int employeeId,
            String employeeName,
            String purpose,
            String status,
            String dateFrom,
            String dateTo
    ) {
        this.reqId = reqId;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.purpose = purpose;
        this.status = status;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }

    // getters only (DTO is read-only)
    public int getReqId() { return reqId; }
    public int getEmployeeId() { return employeeId; }
    public String getEmployeeName() { return employeeName; }
    public String getPurpose() { return purpose; }
    public String getStatus() { return status; }
    public String getDateFrom() { return dateFrom; }
    public String getDateTo() { return dateTo; }
}
