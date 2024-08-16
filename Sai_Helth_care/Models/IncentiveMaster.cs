using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class IncentiveMaster
    {
        public int IM_ID { get; set; }
        public int INC_SERVICE_TYPE_ID { get; set; }
        public string INC_SERVICE_TYPE_NAME { get; set; }
        public decimal INCENTIVE_AMOUNT { get; set; }
        public string UNIT { get; set; }
        public string ACTION { get; set; }
        public long ADMIN_ID { get; set; }
        public string REG_DATE { get; set; }
    }

    public class IncentiveScheme {
        public int? IS_ID { get; set; }
        public string SERIAL_NO { get; set; }
        public string REF_NO { get; set; }
        public long EMP_ID { get; set; }
        public string EMP_NAME { get; set; }
        public string INCENTIVE_DATE { get; set; }
        public int INC_TYPE_ID { get; set; }
        public string INC_TYPE_NAME { get; set; }
        public int INC_SERVICE_TYPE_ID { get; set; }
        public string INC_SERVICE_TYPE_NAME { get; set; }
        public decimal INCENTIVE_AMOUNT { get; set; }
        public string COMMENT { get; set; }
        public string ACTION { get; set; }
        public long ADMIN_ID { get; set; }
        public string REG_DATE { get; set; }

    }

}