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
    
    public partial class TB_AMC_MedtronicAccessories
    {
        public int AMC_MEDACC_ID { get; set; }
        public Nullable<long> AMC_CMC_ID { get; set; }
        public Nullable<int> MED_ACC_ID { get; set; }
        public string SERIAL_NO { get; set; }
        public Nullable<byte> QUANTITY { get; set; }
        public Nullable<decimal> AMC_AMOUNT { get; set; }
        public Nullable<long> EMP_ID { get; set; }
        public Nullable<System.DateTime> REG_DATE { get; set; }
    
        public virtual Tb_AMC_CMC_Master Tb_AMC_CMC_Master { get; set; }
        public virtual Tb_EmployeeMaster Tb_EmployeeMaster { get; set; }
        public virtual TB_MedtronicAccessories TB_MedtronicAccessories { get; set; }
    }
}
