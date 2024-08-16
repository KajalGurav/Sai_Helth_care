using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class EmployeeExpense
    {
        public long EXPENSE_ID { get; set; }
        public long EMP_ID { get; set; }
        public string EMP_NAME { get; set; }
        public string REMARK { get; set; }
        public string PHOTO { get; set; }
        public decimal AMOUNT { get; set; }
        public string EXPENSE_TYPE { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
    }
}