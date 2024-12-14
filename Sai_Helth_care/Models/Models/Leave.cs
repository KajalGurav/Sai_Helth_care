using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class Leave
    {
        public string DEP_NAME { get; set; }
        public string DESI_NAME { get; set; }
        public string LEAVE_STATUS_NAME { get; set; }
        public int? LEAVE_ID { get; set; }
        public long EMP_ID { get; set; }
        public string EMP_NAME { get; set; }
        public string APPLICATION_NO  { get; set; }
        public string APPLICATION_DATE { get; set; }
        public int LEAVE_CAT_ID { get; set; }
        public string LEAVE_CAT_NAME { get; set; }
        public string LEAVE_TYPE { get; set; }
        public string LEAVE_FROM_DATE { get; set; }
        public string LEAVE_TO_DATE { get; set; }
        public int LEAVE_IN_DAYS { get; set; }
        public string LEAVE_REASON { get; set; }
        public int? LEAVE_STATUS_TYPE_ID { get; set; }
        public string REG_DATE { get; set; }
        public string ACTION { get; set; }
        public string LEAVE_CANCEL_REMARK { get; set; }
        public long ADMIN_ID { get; set; }
    }
}