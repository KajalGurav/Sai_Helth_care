//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Sai_Helth_care
{
    using System;
    using System.Collections.Generic;
    
    public partial class TB_DailyActivity
    {
        public int DAILY_ACTIVITY_ID { get; set; }
        public Nullable<long> EMP_ID { get; set; }
        public Nullable<long> CITY_ID { get; set; }
        public Nullable<System.DateTime> ACTIVITY_DATE { get; set; }
        public string ACTIVITY_NOTE { get; set; }
        public string ADMIN_NOTE { get; set; }
        public Nullable<System.DateTime> REG_DATE { get; set; }
    
        public virtual TB_CityMaster TB_CityMaster { get; set; }
        public virtual Tb_EmployeeMaster Tb_EmployeeMaster { get; set; }
    }
}
