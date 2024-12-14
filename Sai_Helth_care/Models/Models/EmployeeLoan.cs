using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class EmployeeLoan
    {
        public long EMP_LOAN_ID { get; set; }
        public long EMP_ID { get; set; }
        public string EMP_NAME { get; set; }
        public decimal LOAN_AMOUNT { get; set; }
        public decimal INTREST_RATE { get; set; }
        public decimal INSTALLMENT_AMOUNT { get; set; }
        public decimal LOAN_OUTSTANDING { get; set; }
        public string REASON { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
        public string ACTION { get; set; }
        public string BASIC_SALARY { get; set; }
        public string SALARY_FOR_MONTH { get; set; }
        public string SALARY_FOR_YEAR { get; set; }
        public string PRESENT_DAYS { get; set; }
        public string LOAN_INSTALLMENT { get; set; }
        public string SALARY_DATE { get; set; }
        public long ADMIN_ID { get; set; }

        public class EmployeeSalary
        {
            public int? SALARY_ID { get; set; }
            public long EMP_ID { get; set; }
            public string EMP_NAME { get; set; }
            public decimal BASIC_SALARY { get; set; }
            public string SALARY_FOR_MONTH { get; set; }
            public int SALARY_FOR_YEAR { get; set; }
            public string SALARY_DATE { get; set; }
            public int PRESENT_DAYS { get; set; }
            public decimal ADVANCE_SALARY { get; set; }
            public long? EMP_LOAN_ID { get; set; }
            public decimal? LOAN_INSTALLMENT { get; set; }
            public decimal? CURRENT_MOBILE_BILL { get; set; }
            public decimal? EXTRA_MOBILE_BILL { get; set; }
            public decimal? INCENTIVE_AMOUNT { get; set; }
            public decimal? BONUS_DETAILS_TOTAL_SALARY { get; set; }
            public int? BONUS_PERCENTAGE { get; set; }
            public decimal? SALARY_BONUS { get; set; }
            public int IS_SALARY_HOLD { get; set; }
            public string REG_DATE { get; set; }
            public string ACTION { get; set; }
            public long ADMIN_ID { get; set; }
        }
    }
}