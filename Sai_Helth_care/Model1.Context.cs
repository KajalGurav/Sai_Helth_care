﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Sai_Helth_care
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class DB_SaiHealthCareEntities1 : DbContext
    {
        public DB_SaiHealthCareEntities1()
            : base("name=DB_SaiHealthCareEntities1")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<TB_Add_Spare_Part> TB_Add_Spare_Part { get; set; }
        public virtual DbSet<TB_AdminMaster> TB_AdminMaster { get; set; }
        public virtual DbSet<Tb_AMC_CMC_Master> Tb_AMC_CMC_Master { get; set; }
        public virtual DbSet<TB_AMC_MedtronicAccessories> TB_AMC_MedtronicAccessories { get; set; }
        public virtual DbSet<TB_Banner> TB_Banner { get; set; }
        public virtual DbSet<TB_CallPriorityType> TB_CallPriorityType { get; set; }
        public virtual DbSet<TB_Category> TB_Category { get; set; }
        public virtual DbSet<TB_CHECKIN> TB_CHECKIN { get; set; }
        public virtual DbSet<TB_CityMaster> TB_CityMaster { get; set; }
        public virtual DbSet<TB_Company_DocumentMaster> TB_Company_DocumentMaster { get; set; }
        public virtual DbSet<TB_CompanyBankMaster> TB_CompanyBankMaster { get; set; }
        public virtual DbSet<TB_CompanyMaster> TB_CompanyMaster { get; set; }
        public virtual DbSet<TB_ContractType> TB_ContractType { get; set; }
        public virtual DbSet<Tb_CustomerMaster> Tb_CustomerMaster { get; set; }
        public virtual DbSet<Tb_CustomerType> Tb_CustomerType { get; set; }
        public virtual DbSet<TB_DailyActivity> TB_DailyActivity { get; set; }
        public virtual DbSet<TB_DC_Accessories> TB_DC_Accessories { get; set; }
        public virtual DbSet<TB_DC_SparePart> TB_DC_SparePart { get; set; }
        public virtual DbSet<TB_DCStatus> TB_DCStatus { get; set; }
        public virtual DbSet<TB_DeliveryChallan> TB_DeliveryChallan { get; set; }
        public virtual DbSet<Tb_Department> Tb_Department { get; set; }
        public virtual DbSet<Tb_Designation> Tb_Designation { get; set; }
        public virtual DbSet<TB_EmployeeAdvancedSalary> TB_EmployeeAdvancedSalary { get; set; }
        public virtual DbSet<TB_EmployeeLoan> TB_EmployeeLoan { get; set; }
        public virtual DbSet<Tb_EmployeeMaster> Tb_EmployeeMaster { get; set; }
        public virtual DbSet<TB_EmployeeSalaryIncrement> TB_EmployeeSalaryIncrement { get; set; }
        public virtual DbSet<TB_EXPENSES> TB_EXPENSES { get; set; }
        public virtual DbSet<Tb_FirmMaster> Tb_FirmMaster { get; set; }
        public virtual DbSet<TB_IncentiveMaster> TB_IncentiveMaster { get; set; }
        public virtual DbSet<TB_IncentiveScheme> TB_IncentiveScheme { get; set; }
        public virtual DbSet<TB_IncentiveServiceType> TB_IncentiveServiceType { get; set; }
        public virtual DbSet<TB_IncentiveType> TB_IncentiveType { get; set; }
        public virtual DbSet<TB_Leads> TB_Leads { get; set; }
        public virtual DbSet<Tb_Manufacturer> Tb_Manufacturer { get; set; }
        public virtual DbSet<TB_Material> TB_Material { get; set; }
        public virtual DbSet<TB_MedtronicAccessories> TB_MedtronicAccessories { get; set; }
        public virtual DbSet<TB_MedtronicAccessoriesType> TB_MedtronicAccessoriesType { get; set; }
        public virtual DbSet<TB_MedtronicQuotationProductAccessories> TB_MedtronicQuotationProductAccessories { get; set; }
        public virtual DbSet<Tb_MindrayProduct> Tb_MindrayProduct { get; set; }
        public virtual DbSet<Tb_MindrayQuotationMaster> Tb_MindrayQuotationMaster { get; set; }
        public virtual DbSet<Tb_MindrayQuotationProductDetails> Tb_MindrayQuotationProductDetails { get; set; }
        public virtual DbSet<tb_Notification> tb_Notification { get; set; }
        public virtual DbSet<Tb_PaymentReceiptMaster> Tb_PaymentReceiptMaster { get; set; }
        public virtual DbSet<Tb_ProbeSpecificationsPart> Tb_ProbeSpecificationsPart { get; set; }
        public virtual DbSet<Tb_Product> Tb_Product { get; set; }
        public virtual DbSet<TB_ProductType> TB_ProductType { get; set; }
        public virtual DbSet<Tb_QuotationMaster> Tb_QuotationMaster { get; set; }
        public virtual DbSet<Tb_QuotationProductDetails> Tb_QuotationProductDetails { get; set; }
        public virtual DbSet<TB_ServiceCall> TB_ServiceCall { get; set; }
        public virtual DbSet<TB_ServiceCallAssignHistory> TB_ServiceCallAssignHistory { get; set; }
        public virtual DbSet<TB_ServiceType> TB_ServiceType { get; set; }
        public virtual DbSet<TB_SolutionBank> TB_SolutionBank { get; set; }
        public virtual DbSet<Tb_SparePart> Tb_SparePart { get; set; }
        public virtual DbSet<TB_StateMaster> TB_StateMaster { get; set; }
        public virtual DbSet<TB_StatusMaster> TB_StatusMaster { get; set; }
        public virtual DbSet<Tb_StdAccessoriesMaster> Tb_StdAccessoriesMaster { get; set; }
        public virtual DbSet<TB_Test> TB_Test { get; set; }
        public virtual DbSet<Tb_URDProduct> Tb_URDProduct { get; set; }
        public virtual DbSet<TB_VEHICAL> TB_VEHICAL { get; set; }
        public virtual DbSet<Tb_VendorRegistration> Tb_VendorRegistration { get; set; }
        public virtual DbSet<TB_LeaveCategory> TB_LeaveCategory { get; set; }
        public virtual DbSet<TB_Leave> TB_Leave { get; set; }
        public virtual DbSet<TB_LeaveStatusType> TB_LeaveStatusType { get; set; }
        public virtual DbSet<TB_AdminPermission> TB_AdminPermission { get; set; }
        public virtual DbSet<TB_DC_MedtronicAccessories> TB_DC_MedtronicAccessories { get; set; }
        public virtual DbSet<TB_EmployeeSalary> TB_EmployeeSalary { get; set; }
        public virtual DbSet<TB_Invoice_Accessories> TB_Invoice_Accessories { get; set; }
        public virtual DbSet<TB_Invoice_MedtronicAccessories> TB_Invoice_MedtronicAccessories { get; set; }
        public virtual DbSet<TB_Invoice_SparePart> TB_Invoice_SparePart { get; set; }
        public virtual DbSet<TB_InvoiceMaster> TB_InvoiceMaster { get; set; }
        public virtual DbSet<TB_Vendor_PO_AccessoriesAndSpareParts> TB_Vendor_PO_AccessoriesAndSpareParts { get; set; }
        public virtual DbSet<TB_Vendor_PO_Master> TB_Vendor_PO_Master { get; set; }
        public virtual DbSet<TB_Vendor_PO_Products> TB_Vendor_PO_Products { get; set; }
        public virtual DbSet<TB_VendorAccType> TB_VendorAccType { get; set; }
        public virtual DbSet<TB_EmployeeTaskMaster> TB_EmployeeTaskMaster { get; set; }
        public virtual DbSet<TB_PartType> TB_PartType { get; set; }
        public virtual DbSet<TB_SparePartStock> TB_SparePartStock { get; set; }
        public virtual DbSet<TB_ProductStockMaster> TB_ProductStockMaster { get; set; }
        public virtual DbSet<TB_EmployeeTask> TB_EmployeeTask { get; set; }
        public virtual DbSet<TB_EmployeeTaskData> TB_EmployeeTaskData { get; set; }
        public virtual DbSet<TB_EmpTaskMaster> TB_EmpTaskMaster { get; set; }
    }
}