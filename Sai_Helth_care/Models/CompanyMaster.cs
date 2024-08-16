using Antlr.Runtime.Misc;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.UI.WebControls;

namespace Sai_Helth_care.Models
{

    public class Department
    {
        public long DEP_ID { get; set; }
        public string DEP_NAME { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
    }


    public class Designation
    {
        public long DESI_ID { get; set; }
        public long DEP_ID { get; set; }
        public string DEP_NAME { get; set; }
        public string DESI_NAME { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
    }

    public class ServiceCallRequest
    {
        public long CustomerEnquiry_ID { get; set; }
        public long Customer_ID { get; set; }
        public long P_ID { get; set; }
        public string EMP_NAME { get; set; }
        public string PRODUCT_TYPE { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string CUSTOMER_REMARK { get; set; }
        public string ENQUIRY_STATUS { get; set; }
        public string COMPANY_NAME { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
        public string CAT_NAME { get; set; }
        public string M_NAME { get; set; }
    }

    public class EmployeeMaster
    {
        public long EMP_ID { get; set; }
        public long? COMPANY_ID { get; set; }
        public long DEPARTMENT_ID { get; set; }
        public long DESIGNATION_ID { get; set; }
        public long STATE_ID { get; set; }
        public string STATE_NAME { get; set; }
        public long CITY_ID { get; set; }
        public string CITY_NAME { get; set; }
        public string COMPANY_NAME { get; set; }
        public string EMP_NAME { get; set; }
        public string DEP_NAME { get; set; }
        public string DESI_NAME { get; set; }
        public string CONTACT_NO { get; set; }
        public string ALTERNATE_CONT_NO { get; set; }
        public string EMAIL { get; set; }
        public string ALTERNATE_EMAIL { get; set; }
        public string EMP_DOB { get; set; }
        public string PERMENENT_ADDRESS { get; set; }
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
        public string REG_DATE { get; set; }
        public string DATE { get; set; }
        public string LATITUDE { get; set; }
        public string LONGITUDE { get; set; }
        public string TIME { get; set; }
        public string TYPE { get; set; }
        public string Distance { get; set; }



        public string ImageBase64Data { get; set; }
        public string ImageName { get; set; }
        public string ImageExtension { get; set; }

        public string ImageBase64Data1 { get; set; }
        public string ImageName1 { get; set; }
        public string ImageExtension1 { get; set; }


        public string ImageBase64Data2 { get; set; }
        public string ImageName2 { get; set; }
        public string ImageExtension2 { get; set; }

    }

    public class VendorRegistration
    {
        public long V_ID { get; set; }
        public long COMPANY_ID { get; set; }
        public long STATE_ID { get; set; }
        public long CITY_ID { get; set; }
        public string VENDOR_NAME { get; set; }
        public string VENDOR_COMPANY { get; set; }
        public string CONTACT_NO { get; set; }
        public string ALTERNATE_CONTACT_NO { get; set; }
        public string EMAIL { get; set; }
        public string ALTERNATE_EMAIL { get; set; }
        public string ADDRESS { get; set; }
        public string ZIP_CODE { get; set; }
        public string PAN_CARD_NO { get; set; }
        public string GST_NO { get; set; }
        public string TIN_NO { get; set; }

        public string STATUS { get; set; }
        public string REG_DATE { get; set; }


    }
    
    public class Category
    {
        public long? CAT_ID { get; set; }
        public long? M_ID { get; set; }
        public long? P_ID { get; set; }
        public long SP_ID { get; set; }
        public long STD_ID { get; set; }
        public string CAT_NAME { get; set; }
        public string M_NAME { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string HSN_CODE { get; set; }
        public string LETTER_REF_NO { get; set; }
        public string SPARE_PART { get; set; }
        public string STD_ACC_NAME { get; set; }
        public string PRICE { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
    }


    public class ProductStockEntry
    {
        public long? P_STOCK_ID { get; set; }
        public string P_STOCK_NO { get; set; }
        public string STOCK_ENTRY_DATE { get; set; }
        public long? CAT_ID { get; set; }
        public long? M_ID { get; set; }
        public long P_ID { get; set; }
        public int P_QTY { get; set; }
        public string P_SERIAL_NO { get; set; }
        public int IS_URD_SUPPLIER { get; set; }
        public long? URD_SUPPLIER_ID { get; set; }
        public long? VENDOR_SUPPLIER_ID { get; set; }
        public string SUPPLIER_NAME { get; set; }
        public string SUPPLIER_CONTACT_PERSON { get; set; }
        public string DEPART_FROM { get; set; }
        public string INVOICE_NO { get; set; }
        public string DC_NO { get; set; }
        public string ARRIVE_AT { get; set; }
        public string VEHICAL_NO { get; set; }
        public string MATERIAL_RECEIVED_DATE { get; set; }
        public string COMMENTS { get; set; }
        public string SHIPMENT_DETAILS { get; set; }
        public long? EMPLOYEE_ID { get; set; }
        public string EMP_NAME { get; set; }
        public int? PENDING_QTY { get; set; }
        public long? INVOICE_ID { get; set; }
        public string INVOICE_NUMBER { get; set; }
        public string DC_NUMBER { get; set; }
        public long? ASSIGN_TO { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string CUSTOMER_TYPE { get; set; }
        public string ASSIGN_ON_DATE { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
        public string HSN_CODE { get; set; }
        public string PRODUCT_TYPE { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string M_NAME { get; set; }
        public string CAT_NAME { get; set; }
        public string ACTION { get; set; }
    }


    public class StockPartsList
    {
        public long P_ID { get; set; }
        public int PART_TYPE_ID { get; set; }
        public long PART_ID { get; set; }
        public string PART_NAME { get; set; }

    }

    public class PartStockEntry
    {
        public long SP_STOCK_ID { get; set; }
        public long? P_STOCK_ID { get; set; }
        public string PRODUCT_TYPE { get;set;}
        public string BATCH_NO { get;set;}
        public string P_SERIAL_NO { get;set;}
        public string STOCK_ENTRY_DATE {get;set;}
        public long P_ID {get;set;}
        public int PART_TYPE_ID {get;set;}
        public long PART_ID {get;set;}
        public int PART_QTY{get;set;}
        public string PART_SERIAL_NO {get;set;}
        public string PART_NO{get;set;}
        public string LOCATION {get;set;}
        public decimal? PART_PRICE{get;set;}
        public string HSN_CODE{get;set;}
        public string REMARK {get;set;}
        public string SP_STOCK_NO { get;set;}
        public int? PENDING_QTY { get;set;}
        public long? INVOICE_ID {get;set;}
        public string INVOICE_NUMBER { get;set;}
        public long? ASSIGN_TO { get;set;}
        public string CUSTOMER_NAME { get;set;}
        public string CUSTOMER_TYPE { get;set;}
        public string ASSIGN_ON_DATE { get;set;}
        public string STATUS { get;set;}
        public string PART_NAME { get;set;}
        public string REG_DATE { get;set;}
        public string ACTION {get;set;}
    }

    public class MindrayCategory
    {
        public long P_ID { get; set; }
        public long? CAT_ID { get; set; }
        public long PS_ID { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string HSN_CODE { get; set; }
        public string PRODUCT_IMAGE { get; set; }
        public string DESCRIPTION { get; set; }
        public string CONFIGURATION { get; set; }
        public string PROBE_NAME { get; set; }
        public decimal PRICE { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }

        public string ImageBase64Data { get; set; }
        public string ImageName { get; set; }
        public string ImageExtension { get; set; }
    }

    public class MonthlySalary
    {
        public long SALARY_ID { get; set; }
        public long B_ID { get; set; }
        public long COMPANY_BANK_ID { get; set; }
        public long EMP_LOAN_ID { get; set; }
        public long EMP_ID { get; set; }
        public double GROSS_SALARY { get; set; }
        public double NET_SALARY { get; set; }
        public double TOTAL_SALARY { get; set; }
        public string EMP_NAME { get; set; }
        public string SALARY_FOR_MONTH { get; set; }
        public double SALERY_PER_MONTH1 { get; set; }
        public string SALARY_DATE { get; set; }
        public long PRESENT_DAYS { get; set; }
        public long ADVANCE_SALARY { get; set; }
        public long LOAN_INSTALLMENT { get; set; }
        public long CURRENT_MOBILE_BILL { get; set; }
        public long EXTRA_MOBILE_BILL { get; set; }
        public double INCENTIVE_AMOUNT { get; set; }
        public double SALARY_BONUS { get; set; }
        public string SALERY_PER_MONTH { get; set; }
        public Boolean IS_SALARY_HOLD { get; set; }
        public string REG_DATE { get; set; }
        public string BANK_NAME { get; set; }
        public string ACCOUNT_NO { get; set; }
        public string IFSC_CODE { get; set; }
        public string LOGO { get; set; }
        public string BRANCH_NAME { get; set; }
        public string ACC_NO { get; set; }
    }
    public class CompanyMaster
    {
        public long COMPANY_ID { get; set; }
        public string COMPANY_NAME { get; set; }
        public string COMPANY_REG_ADDRESS { get; set; }
        public string COMPANY_COR_ADDRESS { get; set; }
        public string ZIP_CODE { get; set; }
        public string AUTHORITY_NAME { get; set; }
        public string MOBILE_NO { get; set; }
        public string ALT_MOBILE_NO { get; set; }
        public string SERVICES { get; set; }
        public string COMPANY_TYPE { get; set; }
        public string COMPANY_REG { get; set; }
        public string EMAIL_ID { get; set; }
        public string PNDT_NO { get; set; }
        public string TIN_NO { get; set; }
        public string CST_NO { get; set; }
        public string PAN_NO { get; set; }
        public string VAT_TIN_NO { get; set; }
        public string GST_NO { get; set; }
        public string BANK_NAME { get; set; }
        public string IFSC_CODE { get; set; }
        public string ACC_NO { get; set; }
        public string ACC_HOLDER_NAME { get; set; }
        public string BRANCH_NAME { get; set; }
        public string COMPANY_LOGO { get; set; }
        public string COMPANY_LETTERHEAD { get; set; }
        public string COMPANY_SEAL { get; set; }
        public string COMPANY_PNDT_CERTIFICATE { get; set; }
        public string COMPANY_PREFIX { get; set; }
        public string SIGNATURE { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
        public string Operation { get; set; }
        public List<CompanyBankMaster> CompanyBankDetails { get; set; }


        public string ImageBase64Data { get; set; }
        public string ImageName { get; set; }
        public string ImageExtension { get; set; }

        public string ImageBase64Data1 { get; set; }
        public string ImageName1 { get; set; }
        public string ImageExtension1 { get; set; }
        
        public string ImageBase64Data2 { get; set; }
        public string ImageName2 { get; set; }
        public string ImageExtension2 { get; set; }
    }

    public class CompanyBankMaster
    {
        public long B_ID { get; set; }
        public long COMPANY_ID { get; set; }
        public string COMPANY_NAME { get; set; }
        public string COMPANY_REG_ADDRESS { get; set; }
        public string COMPANY_COR_ADDRESS { get; set; }
        public string ZIP_CODE { get; set; }
        public string BANK_NAME { get; set; }
        public string IFSC_CODE { get; set; }
        public string ACC_NO { get; set; }
        public string GST_NO { get; set; }
        public string PAN_NO { get; set; }
        public string ACC_HOLDER_NAME { get; set; }
        public string BANK_AND_ACCNO { get; set; }
        public string BRANCH_NAME { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
        public string EMAIL_ID { get; set; }
        public string MOBILE_NO { get; set; }
        public string COMPANY_LETTERHEAD { get; set; }
        public string COMPANY_SEAL { get; set; }
        public string Operation { get; set; }
    }

    public class CompanyDocMaster
    {
        public long DOC_ID { get; set; }
        public string DOC_TITLE { get; set;}
        public string DOC_TYPE { get; set;}
        public string DOC_NO { get; set; }
        public string FILE_URL { get; set;}
        public string FILE_TYPE { get; set;}
        public string DOC_INSERT_DATE { get; set;}
        public string UPLOAD_DOC { get; set; }
        public string Operation { get; set; }
        public string ImageBase64Data { get; set; }
        public string ImageName { get; set; }
        public string ImageExtension { get; set; }
    }
    public class STATE
    {
        public long STATE_ID { get; set; }
        public string STATE_NAME { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
    }
    public class CITY
    {
        public long STATE_ID { get; set; }
        public long CITY_ID { get; set; }
        public string CITY_NAME { get; set; }
        public string STATE_NAME { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
    }


    public class CustomerMaster
    {
        public long Customer_ID { get; set;}
        public long? FIRM_ID { get; set; }
        public long? STATE_ID { get; set; }
        public long? SHIP_STATE_ID { get; set; }
        public string STATE_NAME { get; set; }
        public string SHIP_STATE_NAME { get; set; }
        public long? CITY_ID { get; set; }
        public long? SHIP_CITY_ID { get; set; }
        public string CITY_NAME { get; set; }
        public string SHIP_CITY_NAME { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string FIRM_NAME { get; set; }
        public string CONTACT_NO { get; set; }
        public string ALTERNATE_CONTACT_NO { get; set; }
        public string EMAIL { get; set; }
        public string ALTERNATE_EMAIL { get; set; }
        public string BILLING_ADDRESS { get; set; }
        public string SHIPPING_ADDRESS { get; set; }
        public string ZIP_CODE { get; set; }
        public string SHIPPING_ZIP_CODE { get; set; }
        public string DEGREE_OF_CUSTOMER { get; set; }
        public string PAN_NO { get; set; }
        public string GST_NO { get; set; }
        public string TIN_NO { get; set; }
        public string PNDT_NO { get; set; }
        public string PNDT_VALIDITY { get; set; }
       
        public string UPLOAD_PNDT_CERTIFICATE { get; set; }
        public string UPLOAD_PAN_CERTIFICATE { get; set; }
        public string ADDRESS { get; set; }
        public string UNIT { get; set; }
        public string ADD_EQUIPMENT { get; set; }
        public string ELORA_USER_ID { get; set; }
        public string ELORA_PASSWORD { get; set; }
        public string NO_OF_TLD { get; set; }
        public string DOCUMENT_STATUS { get; set; }
        public string REGISTRATION_STATUS { get; set; }
        public string REPORT_STATUS { get; set; }
        public string TOTAL_AMOUNT { get; set; }
        public string BALANCE_PAYMENT { get; set; }
        public string CHEQUE_NO { get; set; }
        public string QA_DONE_BY { get; set; }
        public string QA_DONE_ON_DATE { get; set; }
        public string QA_SALE_PERSON { get; set; }
        public string QA_DUE_DATE { get; set; }
        public string QA_PERSON_COMMISSON { get; set; }
        public string UPLOD_DOCUMETN { get; set; }
        public string COMMENT { get; set; }
        public string BRANCH_NAME { get; set; }
        public long? CUSTOMER_TYPE_ID { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }


        public string ImageBase64Data { get; set; }
        public string ImageName { get; set; }
        public string ImageExtension { get; set; }

        public string ImageBase64Data1 { get; set; }
        public string ImageName1 { get; set; }
        public string ImageExtension1 { get; set; }

    }

    public class SalesLeed
    {
        public long DSR_LEAD_ID { get; set; }
        public long EMP_ID { get; set; }
        public long COMPANY_ID { get; set; }
        public string DSR_DATE { get; set; }
        public string CITY_NAME { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string FIRM_NAME { get; set; }
        public string FIRM_ADDRESS { get; set; }
        public string MOBILE_NO { get; set; }
        public string MODALITY { get; set; }
        public string EMAIL_ID { get; set; }
        public string EMP_NAME { get; set; }
        public string CUSTOMER_REQUIREMENT { get; set; }
        public string SALES_PERSON_COMMITMENTS { get; set; }
        public string FORCASTED_MONTH { get; set; }
        public string PROJECHTED_MODEL { get; set; }
        public string PRICE { get; set; }
        public string BUY_PERCENT { get; set; }
        public string ENQUIRY_TYPE { get; set; }
        public string UPLOAD_VISITING_CARD { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }



        public string ImageBase64Data { get; set; }
        public string ImageName { get; set; }
        public string ImageExtension { get; set; }


    }

    public class ProductQuotaion
    {
        public long QUOTATION_ID { get; set; }
        public long AccID { get; set; }
        public long QuantID { get; set; }
        public long PriceID { get; set; }
        public long StdAccID { get; set; }
        public long StdQuantID { get; set; }
        public long P_ID { get; set; }
        public string PRODUCTNAME { get; set; }
        public string SPARE_PART { get; set; }
        public string STD_ACC_NAME { get; set; }
        public string QUANTITY { get; set; }
        public string PRODUCTPRICE { get; set; }
        public string ACCPRICE { get; set; }
        public string SPARE_QUANTITY { get; set; }
        public bool IS_WITH_STANDARD_ACC { get; set; }
        public long? M_ID { get; set; }
        public string M_NAME { get; set; }
        public long? CAT_ID { get; set; }
        public string CAT_NAME { get; set; }
        public string PRODUCT_HSN_CODE { get; set; }
        public string HSN_CODE { get; set; }
        public string QUOTATION_TYPE { get; set; }
        public int? CUSTOMER_TYPE_ID { get; set; }
        public decimal? AMOUNT_WITHOUT_TAX { get; set; }
        public decimal? AMOUNT_WITH_TAX { get; set; }
        public decimal? TAX_AMOUNT { get; set; }
        public int? TAX_PERCENTAGE { get; set; }
        public int? AMOUNT_INC_TAX { get; set; }

    }

    public class MProductQuotaion
    {
        public long QUOTATION_ID { get; set; }
        public long AccID { get; set; }
        public long QuantID { get; set; }
        public long PriceID { get; set; }
        public long MP_ID { get; set; }
        public string M_NAME { get; set; }
        public string PRODUCTNAME { get; set; }
        public string PROBE_NAME { get; set; }
        public string PRODUCT_IMAGE { get; set; }
        public string QUANTITY { get; set; }
        public string PRODUCTPRICE { get; set; }
        public string ACCPRICE { get; set; }
        public string PROBE_QUANTITY { get; set; }
        public bool IS_WITH_PROBE_ACC { get; set; }
        public string DESCRIPTION { get; set; }
        public string CONFIGURATION { get; set; }
        public long? M_ID { get; set; }
        public long? CAT_ID { get; set; }
        public string CAT_NAME { get; set; }
        public string HSN_CODE { get; set; }
        public string PRODUCT_HSN_CODE { get; set; }
        public string QUOTATION_TYPE { get; set; }
        public int? CUSTOMER_TYPE_ID { get; set; }
        public decimal? AMOUNT_WITHOUT_TAX { get; set; }
        public decimal? AMOUNT_WITH_TAX { get; set; }
        public decimal? TAX_AMOUNT { get; set; }
        public int? TAX_PERCENTAGE { get; set; }
        public int? AMOUNT_INC_TAX { get; set; }
    }



    public class ProducList
    {
        public long QUOTATION_ID { get; set; }
        public long P_ID { get; set; }
        public string PRODUCTNAME { get; set; }
        public string QUANTITY { get; set; }
        public string PRODUCTPRICE { get; set; }
        public string IS_WITH_STANDARD_ACC { get; set; }
       
    }
    public class ProdList
    {
        public string PRODUCTNAME { get; set; }
        public List<SparePart> SPARE_PARTLIST { get; set; }
        public string QUANTITY { get; set; }
        public string PRODUCTPRICE { get; set; }
        public string IS_WITH_STANDARD_ACC { get; set; }
        public string M_NAME { get; set; }
        public List<StdAccList> STD_ACC_LIST { get; set; }
        public long? CUSTOMER_TYPE_ID { get; set; }
        public long? P_ID { get; set; }
        public long? M_ID { get; set; }
        public long? CAT_ID { get; set; }
        public string CAT_NAME { get; set; }
        public string HSN_CODE { get; set; }
        public string QUOTATION_TYPE { get; set; }
        public decimal? AMOUNT_WITHOUT_TAX { get; set; }
        public decimal? AMOUNT_WITH_TAX { get; set; }
        public decimal? TAX_AMOUNT { get; set; }
        public int? TAX_PERCENTAGE { get; set; }
        public int? AMOUNT_INC_TAX { get; set; }
    }

    public class MProducList
    {
        public long QUOTATION_ID { get; set; }
        public string PRODUCTNAME { get; set; }
        public string QUANTITY { get; set; }
        public string PRODUCTPRICE { get; set; }
        public string IS_WITH_PROBE_ACC { get; set; }
        public string PRODUCT_IMAGE { get; set; }
        public string DESCRIPTION { get; set; }
        public string CONFIGURATION { get; set; }

    }
    public class MProdList
    {
        public string PRODUCTNAME { get; set; }
        public List<ProbePart> PROBE_PARTLIST { get; set; }
        public string QUANTITY { get; set; }
        public string PRODUCTPRICE { get; set; }
        public string IS_WITH_PROBE_ACC { get; set; }
        public string PRODUCT_IMAGE { get; set; }
        public string DESCRIPTION { get; set; }
        public string CONFIGURATION { get; set; }
        public string M_NAME { get; set; }
        public long? CUSTOMER_TYPE_ID { get; set; }
        public long? P_ID { get; set; }
        public long? M_ID { get; set; }
        public long? CAT_ID { get; set; }
        public string CAT_NAME { get; set; }
        public string HSN_CODE { get; set; }
        public string QUOTATION_TYPE { get; set; }
        public decimal? AMOUNT_WITHOUT_TAX { get; set; }
        public decimal? AMOUNT_WITH_TAX { get; set; }
        public decimal? TAX_AMOUNT { get; set; }
        public int? TAX_PERCENTAGE { get; set; }
        public int? AMOUNT_INC_TAX { get; set; }
        public long QUOTATION_ID { get; set; }

    }

    public class StdAccList
    {
        public long StdAccID { get; set; }
        public long QUOTATION_ID { get; set; }
        public string STD_ACC_NAME { get; set; }
        public long STDACC_QUANTITY { get; set; }
        public string PRODUCTNAME { get; set; }
        public string HSN_CODE { get; set; }
    }
    public class SparePart
    {
        public long AccID { get; set; }
        public long QUOTATION_ID { get; set; }
        public string SPARE_PART { get; set; }
        public decimal ACCPRICE { get; set; }
        public long SPARE_QUANTITY { get; set; }
        public string PRODUCTNAME { get; set; }
        public string HSN_CODE { get; set; }
        public string QUOTATION_TYPE { get; set; }
        public long? CUSTOMER_TYPE_ID { get; set; }
        public decimal? AMOUNT_WITHOUT_TAX { get; set; }
        public decimal? AMOUNT_WITH_TAX { get; set; }
        public decimal? TAX_AMOUNT { get; set; }
        public int? TAX_PERCENTAGE { get; set; }
        public int? AMOUNT_INC_TAX { get; set; }
    }

    public class ProbePart
    {
        public long AccID { get; set; }
        public long QUOTATION_ID { get; set; }
        public string PROBE_NAME { get; set; }
        public decimal ACCPRICE { get; set; }
        public long PROBE_QUANTITY { get; set; }
        public string PRODUCTNAME { get; set; }
        public string HSN_CODE { get; set; }
        public string QUOTATION_TYPE { get; set; }
        public long? CUSTOMER_TYPE_ID { get; set; }
        public decimal? AMOUNT_WITHOUT_TAX { get; set; }
        public decimal? AMOUNT_WITH_TAX { get; set; }
        public decimal? TAX_AMOUNT { get; set; }
        public int? TAX_PERCENTAGE { get; set; }
        public int? AMOUNT_INC_TAX { get; set; }
    }

    public class QuantList
    {
        public long QuantID { get; set; }
        public string PRODUCTNAME { get; set;}
    }

    public class ProductQuotaion_list
    {
        public long QUOTATION_ID { get; set; }
        public long AccID { get; set; }

        public string PRODUCTNAME { get; set; }
        public string SPARE_PART { get; set; }
        public string QUANTITY { get; set; }
        public string PRODUCTPRICE { get; set; }
        public string ACCPRICE { get; set; }

    }

    public class QuotationMaster
    {
        public long Q_ID { get; set; }
        public long QUOTATION_ID { get; set; }
        public long CUSTOMER_ID { get; set; }
        public long SPAREPART_ID_LIST { get; set; }
        public long FIRM_ID { get; set; }
        public long CAT_ID { get; set; }
        public long M_ID { get; set; }
        public long P_ID { get; set; }
        public long PRODUCT_ID { get; set; }
       // public long SP_ID { get; set; }
        public string SP_ID { get; set; }
        public string SPPRICE_ID { get; set; }
        public string IS_WITH_STANDARD_ACC { get; set; }
        public long SPAREPART_ID { get; set; }

        public string PRODUCT_QUANTITY { get; set; }
        public string PROCUCT_PRICE { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string PRICE { get; set; }
        public string SPARE_PART { get; set; }
        public string FIRM_NAME { get; set; }
        public string FIRM_ADDRESS { get; set; }
        public string QUOTATION_TYPE { get; set; }
        public string QUOTATION_NO { get; set; }
        public string QUOTATION_FOR { get; set; }
        public string QUOTATION_DATE { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string PNDT_STATUS { get; set; }
        public string PNDT_NO { get; set; }
        public string PO_DATE { get; set; }
        public string PAYMENT_TERM { get; set; }
        public string NOTE { get; set; }
        public long? BANK_ID { get; set; }
        public string AERB_OR_PNDT { get; set; }
        public string PRODUCT_PRICE { get; set; }
        public string SELECT_PRODUCT_IS_NEW { get; set; }
        public string QUOTATION_FOR_SPARE_PART { get; set; }
        public string QUNATITY { get; set; }
        public string MODIFY_PRODUCT_PRICE { get; set; }
        public int CTYPE_ID { get; set; }
        public long? CUSTOMER_TYPE_ID { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
        public string CONTACT_NO { get; set; }
        public string EMAIL { get; set; }
        public string BILLING_ADDRESS { get; set; }
        public string ZIP_CODE { get; set; }
        public string SHIPPING_ADDRESS { get; set; }
        public string SHIPPING_ZIP_CODE { get; set; }
        public string STATE_ID { get; set; }
        public string STATE_NAME { get; set; }
        public string CITY_ID { get; set; }
        public string CITY_NAME { get; set; }
        public string SHIP_STATE_ID { get; set; }
        public string SHIP_STATE_NAME { get; set; }
        public string SHIP_CITY_ID { get; set; }
        public string SHIP_CITY_NAME { get; set; }
        public string WARRANTY_IN_DMY { get; set; }
        public int WARRANTY_PERIOD {get;set;}
        public decimal AMOUNT_WITHOUT_TAX {get;set;}
        public decimal TAX_AMOUNT {get;set;}
        public decimal AMOUNT_WITH_TAX {get;set;}
        public int TAX_PERCENTAGE {get;set;}
        public string AMOUNT_INC_TAX {get;set;}
        public string IS_SPL_WARRANTY { get; set; }
        public string PAYMENT_TERM_DETAILS { get; set; }
        public string SPQ_ID { get; set; }
        public string STD_ID { get; set; }
        public string STDQ_ID { get; set; }
        // Mindray Quotation
        public long MQ_ID { get; set; }
        public long PROBE_ID_LIST { get; set; }
        public long MP_ID { get; set; }
        public string PS_ID { get; set; }
        public string IS_WITH_PROBE_ACC { get; set; }
        public string IS_MINDRAY { get; set; }
        public string PROBE_NAME { get; set; }
        public string PSQ_ID { get; set; }
        public string PSPRICE_ID { get; set; }
        public string QUANTITY { get; set; }
        public string SUBJECT { get; set; }
        public string IS_REFURGISHED { get; set; }
        public string C_NAME { get; set; }
        public string RECEIPT_FOR { get; set; }
        public int IS_INVOICE_GENERATED { get; set; }
    }
    //public class MQuotationMaster
    //{
    //    public long MQ_ID { get; set; }
    //    public long QUOTATION_ID { get; set; }
    //    public long CUSTOMER_ID { get; set; }
    //    public long PROBE_ID_LIST { get; set; }
    //    public long FIRM_ID { get; set; }
    //    public long MP_ID { get; set; }
    //    public long PRODUCT_ID { get; set; }
    //    // public long SP_ID { get; set; }
    //    public string PS_ID { get; set; }
    //    public string IS_WITH_PROBE_ACC { get; set; }
    //    public long SPAREPART_ID { get; set; }

    //    public string PRODUCT_QUANTITY { get; set; }
    //    public string PROCUCT_PRICE { get; set; }
    //    public string CUSTOMER_NAME { get; set; }
    //    public string PRICE { get; set; }
    //    public string PROBE_NAME { get; set; }
    //    public string FIRM_NAME { get; set; }
    //    public string FIRM_ADDRESS { get; set; }
    //    public string QUOTATION_TYPE { get; set; }
    //    public string QUOTATION_NO { get; set; }
    //    public string QUOTATION_DATE { get; set; }
    //    public string PRODUCT_NAME { get; set; }
    //    public string PNDT_STATUS { get; set; }
    //    public string PNDT_NO { get; set; }
    //    public string PO_DATE { get; set; }
    //    public string PAYMENT_TERM { get; set; }
    //    public string NOTE { get; set; }
    //    public string PRODUCT_PRICE { get; set; }
    //    public string SELECT_PRODUCT_IS_NEW { get; set; }
    //    public string QUOTATION_FOR_SPARE_PART { get; set; }
    //    public string QUANTITY { get; set; }
    //    public string MODIFY_PRODUCT_PRICE { get; set; }
    //    public int CTYPE_ID { get; set; }
    //    public string CUSTOMER_TYPE { get; set; }
    //    public string STATUS { get; set; }
    //    public string REG_DATE { get; set; }
    //    public string CONTACT_NO { get; set; }
    //    public string EMAIL { get; set; }
    //    public string BILLING_ADDRESS { get; set; }
    //    public string ZIP_CODE { get; set; }
    //    public string SHIPPING_ADDRESS { get; set; }
    //    public string SHIPPING_ZIP_CODE { get; set; }
    //    public string STATE_ID { get; set; }
    //    public string STATE_NAME { get; set; }
    //    public string CITY_ID { get; set; }
    //    public string CITY_NAME { get; set; }
    //    public string WARRANTY_IN_DMY { get; set; }
    //    public int WARRANTY_PERIOD { get; set; }
    //    public long AMOUNT_WITHOUT_TAX { get; set; }
    //    public long TAX_AMOUNT { get; set; }
    //    public long AMOUNT_WITH_TAX { get; set; }
    //    public int TAX_PERCENTAGE { get; set; }
    //    public string AMOUNT_INC_TAX { get; set; }
    //    public string PAYMENT_TERM_DETAILS { get; set; }
    //    public string PSQ_ID { get; set; }
    //}


    public class UrdProduct
    {
        public long UP_ID { get; set; }
        public long URD_ACC_ID { get; set; }
        public long STD_ID { get; set; }
        public long CAT_ID { get; set; }
        public long QUANTITY { get; set; }
        public long M_ID { get; set; }
        public long P_ID { get; set; }
        public long CUSTOMER_ID { get; set; }
        public long COMPANY_ID { get; set; }
        public long FIRM_ID { get; set; }
        public long EMP_ENG_ID { get; set; }
        public long CUSTOMER_TYPE_ID { get; set; }
        public string LETER_REF_NO { get; set; }
        public string STD_ACC_NAME { get; set; }
        public string LETTER_DATE { get; set; }
        public string MRC_NO { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string FIRM_NAME { get; set; }
        public string FIRM_ADDRESS { get; set; }
        public string PNDT_NO { get; set; }
        public string PNDT_VALIDITY { get; set; }
        public string ADDRESS { get; set; }
        public string ALTERNATE_CONTACT_NO { get; set; }
        public string CONTACT_NO { get; set; }
        public string COMPANY_NAME { get; set; }
        public string CAT_NAME { get; set; }
        public string M_NAME { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string PNDT_CELL { get; set; }
        public string URD_STATUS { get; set; }
        public string PNDT_CIRTIFICATE_NO { get; set; }
        public string VALIDITY_DATE { get; set; }
        public string GOV_PERMITED_URD_REF_NO { get; set; }
        public string LETTER_RECIVED_DATE { get; set; }
        public string ACCESSORIES_DETAILS { get; set; }
        public string UPLOAD_PNDT_CERTIFICATE { get; set; }
        public string UPLOD_GOV_PERMISSION_LATER { get; set; }
        public string COMPANY_PNDT_CERTIFICATE { get; set; }
        public string SERIAL_NO { get; set; }
        public string COMPANY_PNDT_NO { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
        public string ImageBase64Data { get; set; }
        public string ImageName { get; set; }
        public string ImageExtension { get; set; }

        public string ImageBase64Data2 { get; set; }
        public string ImageName2 { get; set; }
        public string ImageExtension2 { get; set; }
        public string PRODUCT_FOR { get; set; }
    }

    public class AMC_CMCMaster
    {
        public long AMC_CMC_ID { get; set; }
        public long EMP_ID { get; set; }
        public long? AMC_COMPANY_ID { get; set; }
        public string FARMER_NAME { get; set; }
        public string VisitDate { get; set; }
        public string CONTRACT_DOCUMENT_NO { get; set; }
        public string CONTRACT_TYPE { get; set; }
        public int CONTRACT_PERIOD {get;set;}
        public string CONTRACT_DATE { get; set; }
        public long CUSTOMER_ID {get;set;}
        public string CUSTOMER_NAME { get; set; }
        public int CUSTOMER_TYPE { get; set; }
        public long FIRM_ID {get;set;}
        public string CUSTOMER_FIRM_NAME { get; set; }
        public string EMAIL { get; set; }
        public string BILLING_ADDRESS { get; set; }
        public string FIRM_ADDRESS { get; set; }
        public string CONTACT_NO { get; set; }
        public string ALTERNATE_CONTACT_NO { get; set; }
        public string ZIP_CODE { get; set; }
        public long CITY_ID { get; set; }
        public string CITY_NAME { get; set; }
        public long STATE_ID { get; set; }
        public string STATE_NAME { get; set; }
        public string SHIPPING_ADDRESS { get; set; }
        public string SHIPPING_ZIP_CODE { get; set; }
        public long SHIP_STATE_ID { get; set; }
        public string SHIP_STATE_NAME { get; set; }
        public long SHIP_CITY_ID { get; set; }
        public string SHIP_CITY_NAME { get; set; }
        public long? CAT_ID {get;set;}
        public string M_NAME { get; set; }
        public string PRODUCT_NAME { get; set; }
        public long P_ID {get;set;}
        public string MODEL_NAME { get; set; }
        public string MODEL_SERIAL_NO {get;set;}
        public string CONTRACT_FROM { get; set; }
        public string CONTRACT_TO { get; set; }
        public string PM_VISIT {get;set;} 
        public string CM_VISIT {get;set;} 
        public bool IS_FEES_INC_GST { get;set;} 
        public long FEES {get;set;}
        public long FEES_IN_GST {get;set;}
        public int? GST_PERCENTAGE {get;set;}
        public long BALANCE_AMOUNT { get; set; }
        public long PAID_FEES {get;set;}
        public string FEES_PAID_BY {get;set;} 
        public string COMMENTS {get;set;} 
        public string AMC_CMC_STATUS {get;set;}
        public long? BANK_ID { get; set; }
        public string CONTRACT_TYPE_DETAILS { get; set; }
        public string VisitDates { get; set; }
    }

    public class AMC_CMCLatestRecord
    {
        public long AMC_CMC_ID { get; set; }
        public string CONTRACT_DOCUMENT_NO { get; set; }
        public string CONTRACT_DOCUMENT_NO_NEW { get; set; }
    }

    public class LatestRecordByType
    {
        public long ID { get; set; }
        public string LATEST_RECORD_NO { get; set; }
        public string RECORD_NO_NEW { get; set; }
    }

    public class PaymentReceipt
    {
        public long R_ID { get; set; } 
        public string PAYMENT_RECEIPT_NO {get;set;} 
        public long CUSTOMER_ID {get;set;}
        public long Q_ID {get;set;}
        public long? BANK_ID {get;set;}
        public int? CUSTOMER_TYPE_ID { get; set; }
        public string CUSTOMER_NAME {get;set;}
        public long? FIRM_ID {get;set;}
        public string FIRM_NAME {get;set;}
        public string FIRM_ADDRESS { get; set; }
        public string FIRM_ZIP_CODE { get; set; }
        public string PAYMENT_REF_NO {get;set;}
        public string PAYMENT_RECEIPT_TYPE {get;set;}
        public string PAYMENT_TYPE {get;set;}
        public string RECIEPT_FOR {get;set;}
        public decimal PAYMENT_AMOUNT {get;set;}
        public decimal AMOUNT_RECEIVED {get;set;}
        public decimal AMOUNT_REMAINING {get;set;}
        public string TXN_ID { get; set; }
        public string STATUS {get;set;}
        public string RECEIPT_GEN_DATE {get;set;}
        public string Operation { get; set; }
        public long? STATE_ID { get; set;}
        public long? CITY_ID { get; set; }
        public string STATE_NAME { get; set; }
        public string CITY_NAME { get; set; }
        public string CHEQUE_DATE { get; set; }
    }

    public class ReferenceNoByType
    {
        public string TYPE { get; set; }
        public long CUSTOMER_ID { get; set; }
        public long FIRM_ID { get; set; }
    }
    public class ReferenceNoList
    {
        public long? Quot_ID { get; set; }
        public string REF_NO_LIST { get; set; }
        public string RECEIPT_FOR { get; set; }
    }
    
    public class PaymentTypeProdDetails
    {
        public string PTYPE { get; set; }
        public string ID { get; set; }
        public long Q_ID { get; set; }
        public long MQ_ID { get; set; }
        public long CUSTOMER_ID { get; set; }
        public long? CUSTOMER_TYPE { get; set; }
        public string PRODUCTNAME { get; set; }
        public long TOTAL_AMOUNT { get; set; }
        public long AMOUNT_RECEIVED { get; set;}
        public long AMOUNT_REMAINING { get; set;}

    }


    public class AdminPermission
    {
        public long EMP_ID { get; set; }
        public string Customer_Master { get; set; }
        public string Regular_Customer { get; set; }
        public string AERB_Customer { get; set; }

        public string Medtronic_Customer { get; set; }
        public string Mindray_Customer { get; set; }
        public string Customer_Service { get; set; }

        public string Service_Call_Assign { get; set; }
        public string Regular { get; set; }
        public string AERB { get; set; }

        public string Medtronic { get; set; }
        public string Mindray { get; set; }
        public string Sales_Lead { get; set; }

        public string Regular_Product_Master { get; set; }
        public string Category { get; set; }
        public string Manufacturer { get; set; }

        public string Regular_Product { get; set; }
        public string Spare_Part { get; set; }
        public string URD_Product_Purchase { get; set; }
        public string Standard_Accessories { get; set; }
        public string Mindray_Product_Master { get; set; }
        public string Mindray_Product { get; set; }

        public string Probe_Specifications { get; set; }
        public string Medtronic_Products_List { get; set; }
        public string Medtronic_Product { get; set; }

        public string Main_System { get; set; }
        public string Attachments { get; set; }
        public string Tools { get; set; }
        public string Incentive { get; set; }
        public string Incentive_Master { get; set; }
        public string Incentive_Scheme { get; set; }

        public string Quotation_Master { get; set; }
        public string Regular_Quotation { get; set; }
        public string AERB_Quotation { get; set; }

        public string Medtronic_Quotation { get; set; }
        public string Mindray_Quotation { get; set; }
        public string Report_Master { get; set; }

        public string Attendance_Report { get; set; }
        public string Leave_Report { get; set; }
        public string Monthly_Salary_Report { get; set; }
        public string Daily_Activity { get; set; }
        public string Delivery_Challan { get; set; }
        public string Regular_DC { get; set; }

        public string AERB_DC { get; set; }
        public string Medtronic_DC { get; set; }
        public string Mindray_DC { get; set; }

        public string AMC_CMC_Master { get; set; }
        public string AMC_CMC_Regular { get; set; }
        public string AMC_CMC_AERB { get; set; }
        public string AMC_CMC_Medtronic { get; set; }
        public string AMC_CMC_Mindray { get; set; }
        public string Payment_Receipt { get; set; }

        public string Payment_Receipt_Regular { get; set; }
        public string Payment_Receipt_AERB { get; set; }
        public string Payment_Receipt_Medtronic { get; set; }

        public string Payment_Receipt_Mindray { get; set; }
        public string Salary_Wages { get; set; }
        public string Salary_Increment { get; set; }


        public string Advance_Salary { get; set; }
        public string Employee_Loan { get; set; }
        public string Setting { get; set; }
        public string Company_Master { get; set; }
        public string Employee_Registration { get; set; }
        public string Department_Master { get; set; }

        public string Designation_Master { get; set; }
        public string Solution_Bank { get; set; }
        public string City_Master { get; set; }

        public string Vender_Registration { get; set; }

        public string Invoice_Master { get; set; }
        public string Invoice_Regular { get; set; }
        public string Invoice_AERB { get; set; }

        public string Invoice_Medtronic { get; set; }
        public string Invoice_Mindray { get; set; }
        
        public string Vendor_PO_Master { get; set; }
        public string Vendor_PO_Regular { get; set; }
        public string Vendor_PO_AERB { get; set; }
        public string Vendor_PO_Medtronic { get; set; }
        public string Vendor_PO_Mindray { get; set; }

        public string Employee_Expense_Master { get; set; }
    }

    public class MonthlyAttendence
    {
        public string PRESNET_COUNT { set; get; }
        public string ABSENT_COUNT { set; get; }
        public string TOTAL_COUNT { set; get; }
        public string EMPLOYEE_NAME { set; get; }
        public string STARTING_DATE { set; get; }
        public string ENDING_DATE { set; get; }
        public string sql { set; get; }
        public string col_list { set; get; }
        public long EMPLOYEE_ID { set; get; }

    }

    class litb
    {
        public string DATE { set; get; }
        public string DATE_VALUE { set; get; }
    }


    class litb1
    {
        public long SALESTEAM_ID { set; get; }
        public string EMP_NAME { set; get; }
        public long TOTAL_ABSENT { set; get; }
        public long TOTAL_PRESENT { set; get; }
        public List<litb> DATE_VALUEList { set; get; }
        //  public List<insertVechiclereading> salesproductList { get; set; }
    }
   

    public class EmployeeTaskMaster
    {
        public long EmployeeTaskID { set; get; }
        public long EmployeeId { set; get; }
        public string EMP_NAME { set; get; }
        public string EmployeeType { set; get; }
        public string Date { set; get; }
        public string Location { set; get; }
        public string TodaysWork { set; get; }
        public string Remark { set; get; }
        public string Status { set; get; }
        public string RegDate { set; get; }

        //Emp Task Detail

        public long EmployeeTaskDataID { set; get; }
        public string AllocatedWork { set; get; }
        public string WorkResult { set; get; }
        public string NewLearning { set; get; }
        public string HospitalName { set; get; }
        public string CustomerDetails { set; get; }
        public string ServiceEngReason { set; get; }
        public string DoctorName { set; get; }
        public string ContactNumber { set; get; }
        public string ExistingModel { set; get; }
        public string ProposedModel { set; get; }
        public string SalesTeamStatus { set; get; }
        public string Purpose { set; get; }
        public string WarehouseType { set; get; }
        public string CleaningOff { set; get; }
        public string Type { set; get; }
        public string EquipmentsPartDetails { set; get; }
        public string InTime { set; get; }
        public string OutTime { set; get; }
        public string PersonFrom { set; get; }
        public string PersonName { set; get; }
        public string WhoAskForIt { set; get; }
        public string DCNumber { set; get; }
    }

}