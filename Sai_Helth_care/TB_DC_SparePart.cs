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
    
    public partial class TB_DC_SparePart
    {
        public int DC_SPAREPART_ID { get; set; }
        public Nullable<int> DC_ID { get; set; }
        public Nullable<long> SP_ID { get; set; }
        public Nullable<int> PART_QTY { get; set; }
        public Nullable<decimal> PART_PRICE { get; set; }
        public Nullable<long> EMP_ID { get; set; }
        public Nullable<System.DateTime> REG_DATE { get; set; }
    
        public virtual TB_DeliveryChallan TB_DeliveryChallan { get; set; }
        public virtual Tb_EmployeeMaster Tb_EmployeeMaster { get; set; }
        public virtual Tb_SparePart Tb_SparePart { get; set; }
    }
}
