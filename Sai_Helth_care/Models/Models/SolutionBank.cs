using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class SolutionBank
    {
        public int SB_ID { get; set; }
        public long P_ID { get; set; }
        public string CAT_NAME { get; set; }
        public string M_NAME { get; set; }
        public string PRODUCT_NAME { get; set; }
        public long SERVICE_ENGG_ID { get; set; }
        public string SEVICE_ENGG_NAME { get; set; }
        public string PROBLEM_DESCRIPTION { get; set; }
        public string SOLUTION_DESCRIPTION { get; set; }
        public long? SOLUTION_PROVIDER_ID { get; set; }
    }
}