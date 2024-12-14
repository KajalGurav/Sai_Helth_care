using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class SalaryWages
    {
        public class SearchSalaryWagesParams
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public long EMP_LOAN_ID { get; set; }
            public string SEARCH_NAME { get; set; }
            public long? EMP_ID { get; set; }
            public string START_DATE { get; set; }
            public string END_DATE { get; set; }
        }

        public class SalaryIncrement {
            public int? ESI_ID { get; set; }
            public int EMP_ID { get; set; }
            public string EMP_NAME { get; set; }
            public decimal BASIC_SALARY { get; set; }
            public decimal INCREMENT_VALUE { get; set; }
            public string INCREMENT_DATE { get; set; }
            public string REG_DATE { get; set; }
            public string ACTION { get; set; }
            public long ADMIN_ID { get; set; }
        }
        public class AdvancedSalary
        {
            public int? EAS_ID { get; set; }
            public int EMP_ID { get; set; }
            public string EMP_NAME { get; set; }
            public decimal ADVANCE_AMOUNT { get; set; }
            public string ADVANCE_DATE { get; set; }
            public string REG_DATE { get; set; }
            public string ACTION { get; set; }
            public long ADMIN_ID { get; set; }
        }

    }
}