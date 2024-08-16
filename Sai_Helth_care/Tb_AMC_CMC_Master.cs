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
    
    public partial class Tb_AMC_CMC_Master
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Tb_AMC_CMC_Master()
        {
            this.TB_AMC_MedtronicAccessories = new HashSet<TB_AMC_MedtronicAccessories>();
        }
    
        public long AMC_CMC_ID { get; set; }
        public string CONTRACT_DOCUMENT_NO { get; set; }
        public string CONTRACT_TYPE { get; set; }
        public short CONTRACT_PERIOD { get; set; }
        public System.DateTime CONTRACT_DATE { get; set; }
        public long CUSTOMER_ID { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public long FIRM_ID { get; set; }
        public string CUSTOMER_FIRM_NAME { get; set; }
        public Nullable<long> CAT_ID { get; set; }
        public string PRODUCT_NAME { get; set; }
        public long MODEL_ID { get; set; }
        public string MODEL_NAME { get; set; }
        public string MODEL_SERIAL_NO { get; set; }
        public System.DateTime CONTRACT_FROM { get; set; }
        public System.DateTime CONTRACT_TO { get; set; }
        public string PM_VISIT { get; set; }
        public string CM_VISIT { get; set; }
        public decimal FEES { get; set; }
        public decimal FEES_IN_GST { get; set; }
        public decimal PAID_FEES { get; set; }
        public string FEES_PAID_BY { get; set; }
        public string COMMENTS { get; set; }
        public string AMC_CMC_STATUS { get; set; }
        public string CUSTOMER_TYPE { get; set; }
        public System.DateTime AMC_GEN_DATE { get; set; }
        public Nullable<decimal> FEES_REMAINING { get; set; }
        public Nullable<long> BANK_ID { get; set; }
        public Nullable<byte> GST_PERCENTAGE { get; set; }
        public Nullable<bool> IS_FEES_INC_GST { get; set; }
        public string CONTRACT_TYPE_DETAILS { get; set; }
    
        public virtual Tb_CustomerMaster Tb_CustomerMaster { get; set; }
        public virtual Tb_FirmMaster Tb_FirmMaster { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_AMC_MedtronicAccessories> TB_AMC_MedtronicAccessories { get; set; }
        public virtual Tb_Product Tb_Product { get; set; }
    }
}
