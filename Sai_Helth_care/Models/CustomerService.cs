using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class CustomerService
    {
        public long SERVICE_CALL_ID { get; set; }
        public string SERVICE_CALL_NUMBER { get; set; }
        public long? CUSTOMER_ID { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public long? F_ID { get; set; }
        public string FIRM_NAME { get; set; }
        public string ADDRESS { get; set; }
        public string CALL_ASSIGN_DATE { get; set; }
        public string SCHEDULE_CALL_DATE { get; set; }
        public long? CAT_ID { get; set; }
        public string CAT_NAME { get; set; }
        public long? M_ID { get; set; }
        public string M_NAME { get; set; }
        public long? P_ID { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string MED_ACC_NAME { get; set; }
        public long? EMP_ID { get; set; }
        public string SERVICE_ENGG_NAME { get; set; }
        public long? CONTRACT_TYPE_ID { get; set; }
        public string CALL_PRIORITY_TYPE_NAME { get; set; }
        public long? SERVICE_TYPE_ID { get; set; }
        public long? CALL_PRIORITY_TYPE_ID { get; set; }
        public string CALL_STATUS { get; set; }
        public string WORK_STATUS { get; set; }
        public string SERVICE_REMARK { get; set; }
        public string DESCRIPTION { get; set; }
        public long? ASSIGN_CALL_BY_ID { get; set; }
        public int? MED_ACC_ID { get; set; }
        public string REG_DATE { get; set; }
        public string ACTION { get; set; }
        public string SERVICE_FOR { get; set; }
        public long ADMIN_ID { get; set; }
        public long EnqId { get; set; }
        public long? BANK_ID { get; set; }
    }

    public class CustomerServicePrint
    {
        public long SERVICE_CALL_ID { get; set; }
        public string SERVICE_CALL_NUMBER { get; set; }
        public long? CUSTOMER_ID { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public long? F_ID { get; set; }
        public string FIRM_NAME { get; set; }
        public string ADDRESS { get; set; }
        public string CALL_ASSIGN_DATE { get; set; }
        public string SCHEDULE_CALL_DATE { get; set; }
        public long? CAT_ID { get; set; }
        public string CAT_NAME { get; set; }
        public long? M_ID { get; set; }
        public string M_NAME { get; set; }
        public long? P_ID { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string MED_ACC_NAME { get; set; }
        public long? EMP_ID { get; set; }
        public string SERVICE_ENGG_NAME { get; set; }
        public long? CONTRACT_TYPE_ID { get; set; }
        public string CALL_PRIORITY_TYPE_NAME { get; set; }
        public long? SERVICE_TYPE_ID { get; set; }
        public long? CALL_PRIORITY_TYPE_ID { get; set; }
        public string CALL_STATUS { get; set; }
        public string WORK_STATUS { get; set; }
        public string SERVICE_REMARK { get; set; }
        public string DESCRIPTION { get; set; }
        public long? ASSIGN_CALL_BY_ID { get; set; }
        public int? MED_ACC_ID { get; set; }
        public string REG_DATE { get; set; }
        public string ACTION { get; set; }
        public string SERVICE_FOR { get; set; }
        public long ADMIN_ID { get; set; }
        public long? BANK_ID { get; set; }
    }

    public class ServiceCallReportPrint
    {
        public long SERVICE_CALL_ID { get; set; }
        public string SERVICE_CALL_NUMBER { get; set; }
        public long? CUSTOMER_ID { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string CUSTOMER_TYPE { get; set; }
        public long? F_ID { get; set; }
        public string FIRM_NAME { get; set; }
        public string ZIP_CODE { get; set; }
        public string BILLING_ADDRESS { get; set; }
        public string EMAIL { get; set; }
        public string CITY_NAME { get; set; }
        public string STATE_NAME { get; set; }
        public string MOBILE_NO { get; set; }
        public string ADDRESS { get; set; }
        public string CALL_ASSIGN_DATE { get; set; }
        public string SCHEDULE_CALL_DATE { get; set; }
        public long? CAT_ID { get; set; }
        public string CAT_NAME { get; set; }
        public long? M_ID { get; set; }
        public string M_NAME { get; set; }
        public long? P_ID { get; set; }
        public string PRODUCT_NAME { get; set; }
        public long? EMP_ID { get; set; }
        public string SERVICE_ENGG_NAME { get; set; }
        public string ASSIGN_CALL_BY_NAME { get; set; }
        public long? CONTRACT_TYPE_ID { get; set; }
        public string CONTRACT_TYPE_NAME { get; set; }
        public string CALL_PRIORITY_TYPE_NAME { get; set; }
        public long? SERVICE_TYPE_ID { get; set; }
        public string SERVICE_TYPE { get; set; }
        public long? CALL_PRIORITY_TYPE_ID { get; set; }
        public string CALL_PRIORITY { get; set; }
        public string CALL_STATUS { get; set; }
        public string WORK_STATUS { get; set; }
        public string SERVICE_REMARK { get; set; }
        public string DESCRIPTION { get; set; }
        public long? BANK_ID { get; set; }
        public int? MED_ACC_ID { get; set; }
        public string MED_ACC_NAME { get; set; }
        public string SERVICE_FOR { get; set; }
        public long? ASSIGN_CALL_BY_ID { get; set; }
        public string PROBLEM_DESCRIPTION { get; set; }
        public string SOLUTION_DESCRIPTION { get; set; }
        public List<SparePartDetails> sparePartsList { get; set; }
    }

    public class SparePartDetails
    {
        public long SERVICE_CALL_ID { get; set; }
        public long? SP_ID { get; set; }
        public string SPARE_PART { get; set; }
        public int QUANTITY { get; set; }
        public decimal? AMOUNT { get; set; }
        public string HSN_CODE { get; set; }
    }
}