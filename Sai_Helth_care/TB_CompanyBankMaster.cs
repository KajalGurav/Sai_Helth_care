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
    
    public partial class TB_CompanyBankMaster
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TB_CompanyBankMaster()
        {
            this.TB_ServiceCall = new HashSet<TB_ServiceCall>();
        }
    
        public long B_ID { get; set; }
        public Nullable<long> COMPANY_ID { get; set; }
        public string BANK_NAME { get; set; }
        public string IFSC_CODE { get; set; }
        public string ACC_NO { get; set; }
        public string ACC_HOLDER_NAME { get; set; }
        public string BRANCH_NAME { get; set; }
        public Nullable<System.DateTime> REG_DATE { get; set; }
        public string STATUS { get; set; }
    
        public virtual TB_CompanyMaster TB_CompanyMaster { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_ServiceCall> TB_ServiceCall { get; set; }
    }
}
