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
    
    public partial class TB_Leave
    {
        public int LEAVE_ID { get; set; }
        public Nullable<long> EMP_ID { get; set; }
        public string APPLICATION_NO { get; set; }
        public Nullable<System.DateTime> APPLICATION_DATE { get; set; }
        public Nullable<byte> LEAVE_CAT_ID { get; set; }
        public string LEAVE_TYPE { get; set; }
        public Nullable<System.DateTime> LEAVE_FROM_DATE { get; set; }
        public Nullable<System.DateTime> LEAVE_TO_DATE { get; set; }
        public Nullable<byte> LEAVE_IN_DAYS { get; set; }
        public string LEAVE_REASON { get; set; }
        public Nullable<byte> LEAVE_STATUS_TYPE_ID { get; set; }
        public Nullable<System.DateTime> REG_DATE { get; set; }
        public string LEAVE_CANCEL_REMARK { get; set; }
    
        public virtual Tb_EmployeeMaster Tb_EmployeeMaster { get; set; }
        public virtual TB_LeaveCategory TB_LeaveCategory { get; set; }
        public virtual TB_LeaveStatusType TB_LeaveStatusType { get; set; }
    }
}