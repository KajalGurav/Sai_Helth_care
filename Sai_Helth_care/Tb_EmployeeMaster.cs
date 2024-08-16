//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class Tb_EmployeeMaster
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Tb_EmployeeMaster()
        {
            this.TB_AMC_MedtronicAccessories = new HashSet<TB_AMC_MedtronicAccessories>();
            this.TB_DailyActivity = new HashSet<TB_DailyActivity>();
            this.TB_DC_Accessories = new HashSet<TB_DC_Accessories>();
            this.TB_DC_SparePart = new HashSet<TB_DC_SparePart>();
            this.TB_DeliveryChallan = new HashSet<TB_DeliveryChallan>();
            this.TB_EmployeeAdvancedSalary = new HashSet<TB_EmployeeAdvancedSalary>();
            this.TB_EmployeeSalaryIncrement = new HashSet<TB_EmployeeSalaryIncrement>();
            this.TB_IncentiveScheme = new HashSet<TB_IncentiveScheme>();
            this.TB_ServiceCallAssignHistory = new HashSet<TB_ServiceCallAssignHistory>();
            this.TB_ServiceCallAssignHistory1 = new HashSet<TB_ServiceCallAssignHistory>();
            this.TB_SolutionBank = new HashSet<TB_SolutionBank>();
            this.TB_SolutionBank1 = new HashSet<TB_SolutionBank>();
            this.TB_ServiceCall = new HashSet<TB_ServiceCall>();
            this.TB_ServiceCall1 = new HashSet<TB_ServiceCall>();
            this.TB_Leave = new HashSet<TB_Leave>();
            this.TB_DC_MedtronicAccessories = new HashSet<TB_DC_MedtronicAccessories>();
            this.TB_EmployeeSalary = new HashSet<TB_EmployeeSalary>();
            this.TB_InvoiceMaster = new HashSet<TB_InvoiceMaster>();
            this.TB_InvoiceMaster1 = new HashSet<TB_InvoiceMaster>();
            this.TB_Invoice_SparePart = new HashSet<TB_Invoice_SparePart>();
            this.TB_Invoice_MedtronicAccessories = new HashSet<TB_Invoice_MedtronicAccessories>();
            this.TB_Invoice_Accessories = new HashSet<TB_Invoice_Accessories>();
            this.TB_Vendor_PO_Master = new HashSet<TB_Vendor_PO_Master>();
            this.TB_EmployeeTaskMaster = new HashSet<TB_EmployeeTaskMaster>();
            this.TB_ProductStockMaster = new HashSet<TB_ProductStockMaster>();
            this.TB_EmployeeTask = new HashSet<TB_EmployeeTask>();
            this.TB_EmpTaskMaster = new HashSet<TB_EmpTaskMaster>();
        }
    
        public long EMP_ID { get; set; }
        public Nullable<long> COMPANY_ID { get; set; }
        public string EMP_NAME { get; set; }
        public string CONTACT_NO { get; set; }
        public string ALTERNATE_CONT_NO { get; set; }
        public string EMAIL { get; set; }
        public string ALTERNATE_EMAIL { get; set; }
        public Nullable<System.DateTime> EMP_DOB { get; set; }
        public Nullable<long> DEPARTMENT_ID { get; set; }
        public Nullable<long> DESIGNATION_ID { get; set; }
        public string PERMENENT_ADDRESS { get; set; }
        public Nullable<long> STATE_ID { get; set; }
        public Nullable<long> CITY_ID { get; set; }
        public string ZIP_CODE { get; set; }
        public string SALERY_PER_MONTH { get; set; }
        public string MARRIED_STATUS { get; set; }
        public string PHYSICAL_DUSABILITY { get; set; }
        public string BANK_NAME { get; set; }
        public string ACCOUNT_NO { get; set; }
        public string IFSC_CODE { get; set; }
        public string UPLOD_BANK_PASS { get; set; }
        public string PAN_CARD_NO { get; set; }
        public string ADHAR_CARD_NO { get; set; }
        public string PASSWORD { get; set; }
        public string UPLOD_ADHAR_CARD { get; set; }
        public string UPLOD_PAN_CARD { get; set; }
        public string STATUS { get; set; }
        public Nullable<System.DateTime> REG_DATE { get; set; }
        public string NOTI_TOKEN_ID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_AMC_MedtronicAccessories> TB_AMC_MedtronicAccessories { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_DailyActivity> TB_DailyActivity { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_DC_Accessories> TB_DC_Accessories { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_DC_SparePart> TB_DC_SparePart { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_DeliveryChallan> TB_DeliveryChallan { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_EmployeeAdvancedSalary> TB_EmployeeAdvancedSalary { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_EmployeeSalaryIncrement> TB_EmployeeSalaryIncrement { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_IncentiveScheme> TB_IncentiveScheme { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_ServiceCallAssignHistory> TB_ServiceCallAssignHistory { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_ServiceCallAssignHistory> TB_ServiceCallAssignHistory1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_SolutionBank> TB_SolutionBank { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_SolutionBank> TB_SolutionBank1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_ServiceCall> TB_ServiceCall { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_ServiceCall> TB_ServiceCall1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_Leave> TB_Leave { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_DC_MedtronicAccessories> TB_DC_MedtronicAccessories { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_EmployeeSalary> TB_EmployeeSalary { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_InvoiceMaster> TB_InvoiceMaster { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_InvoiceMaster> TB_InvoiceMaster1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_Invoice_SparePart> TB_Invoice_SparePart { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_Invoice_MedtronicAccessories> TB_Invoice_MedtronicAccessories { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_Invoice_Accessories> TB_Invoice_Accessories { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_Vendor_PO_Master> TB_Vendor_PO_Master { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_EmployeeTaskMaster> TB_EmployeeTaskMaster { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_ProductStockMaster> TB_ProductStockMaster { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_EmployeeTask> TB_EmployeeTask { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_EmpTaskMaster> TB_EmpTaskMaster { get; set; }
    }
}