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
    
    public partial class Tb_StdAccessoriesMaster
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Tb_StdAccessoriesMaster()
        {
            this.TB_DC_Accessories = new HashSet<TB_DC_Accessories>();
            this.TB_Invoice_Accessories = new HashSet<TB_Invoice_Accessories>();
        }
    
        public long STD_ID { get; set; }
        public Nullable<long> P_ID { get; set; }
        public string STD_ACC_NAME { get; set; }
        public string STATUS { get; set; }
        public Nullable<System.DateTime> REG_DATE { get; set; }
        public Nullable<decimal> PRICE { get; set; }
        public Nullable<long> CAT_ID { get; set; }
        public Nullable<long> M_ID { get; set; }
        public string HSN_CODE { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_DC_Accessories> TB_DC_Accessories { get; set; }
        public virtual Tb_Product Tb_Product { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_Invoice_Accessories> TB_Invoice_Accessories { get; set; }
    }
}
