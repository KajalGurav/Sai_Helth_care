using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sai_Helth_care.Models
{    
    public class DailyActivity
    {
        public int? DAILY_ACTIVITY_ID { get; set; }
        public int EMP_ID { get; set; }
        public string EMP_NAME { get; set; }
        public int CITY_ID { get; set; }
        public string CITY_NAME { get; set; }
        public string ACTIVITY_DATE { get; set; }
        public string ACTIVITY_NOTE { get; set; }
        public string ADMIN_NOTE { get; set; }
        public string REG_DATE { get; set; }
        public string ACTION { get; set; }
    }
}