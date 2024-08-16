using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class RegularServiceReport
    {
        public long ServiceReportID { get; set; }
        public long SparePartCollectionID { get; set; }
        public long SERVICE_CALL_ID { get; set; }
        public long CUSTOMER_ID { get; set; }
        public string CustomerDetails { get; set; }
        public string NatureOfProblem { get; set; }
        public string WorkDoneSolution { get; set; }
        public string ServiceCharges { get; set; }
        public string Total { get; set; }
        public string EngineerRemark { get; set; }
        public string BANK_NAME { get; set; }
        public string ACC_NO { get; set; }
        public string IFSC_CODE { get; set; }
        public string Date { get; set; }
        public string ModelNumber { get; set; }
        public string Make { get; set; }
        public string SWVersion { get; set; }
        public string SerialNumber { get; set; }
        public string SparePartName { get; set; }
        public string Charges { get; set; }
        public string CUSTOMER_TYPE { get; set; }
        public string COMPANY_NAME { get; set; }
        public string CONTRACT_TYPE_NAME { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string CAT_NAME { get; set; }
        public string EMP_NAME { get; set; }
        public string CompanyType { get; set; }
        public string ServiceType { get; set; }
        public string AmountInWord { get; set; }
        public string PaymentsDetails { get; set; }
        public string PaidAmount { get; set; }
        public string BalanceAmount { get; set; }
        public string SelectWork { get; set; }
        public string SelectCategory { get; set; }
        public string HospitalDiagnosticCenter { get; set; }
        public string Address { get; set; }
        public string Department { get; set; }
        public string ContactPerson { get; set; }
        public string Telephone { get; set; }
        public string MobileNumber { get; set; }
        public string ZipPostalCode { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string Accessories { get; set; }
        public string Warranty { get; set; }
        public string WarrantyStartDate { get; set; }
        public string WarrantyEndDate { get; set; }
        public string ServiceInformation { get; set; }
        public string MalfunctionDescription { get; set; }
        public string ServiceProcess { get; set; }
        public string SatisfactionFeedback { get; set; }
        public string Comment { get; set; }
        public string CustomerName { get; set; }
        public string EngineerName { get; set; }
        public string BankID { get; set; }
        public string M_NAME { get; set; }
        public string ModelName { get; set; }
        public string CS_SpecificSuggestion { get; set; }
        public string GST_NO { get; set; }
        public string CompanyLogo { get; set; }
        public string PN { get; set; }
        public string OldSN { get; set; }
        public string NewSN { get; set; }
        public string Quantity { get; set; }
        public string SafetyInspection { get; set; }
        public string FunctionTest { get; set; }
        public string SoftwareUpgrade { get; set; }
        public string NewSoftwareVersion { get; set; }
    }
}