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
    
    public partial class TB_VendorAccType
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TB_VendorAccType()
        {
            this.TB_Vendor_PO_AccessoriesAndSpareParts = new HashSet<TB_Vendor_PO_AccessoriesAndSpareParts>();
        }
    
        public int ACC_TYPE_ID { get; set; }
        public string ACC_TYPE_NAME { get; set; }
        public Nullable<bool> STATUS { get; set; }
        public Nullable<System.DateTime> REG_DATE { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_Vendor_PO_AccessoriesAndSpareParts> TB_Vendor_PO_AccessoriesAndSpareParts { get; set; }
    }
}
