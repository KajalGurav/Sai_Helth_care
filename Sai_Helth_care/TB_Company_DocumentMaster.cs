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
    
    public partial class TB_Company_DocumentMaster
    {
        public long DOC_ID { get; set; }
        public long COMPANY_ID { get; set; }
        public string DOC_TITLE { get; set; }
        public string DOC_TYPE { get; set; }
        public string FILE_URL { get; set; }
        public string FILE_TYPE { get; set; }
        public Nullable<System.DateTime> DOC_INSERT_DATE { get; set; }
        public Nullable<System.DateTime> DOC_UPDATED_DATE { get; set; }
        public string DOC_NO { get; set; }
    
        public virtual TB_CompanyMaster TB_CompanyMaster { get; set; }
    }
}
