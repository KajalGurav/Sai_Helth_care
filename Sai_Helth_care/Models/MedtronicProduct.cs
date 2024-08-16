using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class MedtronicProduct
    {
    }

    public class MedtronicAccessories
    {
        public int? MED_ACC_ID { get; set; }
        public int MED_ACCESSORY_TYPE_ID { get; set; }
        public long P_ID { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string HSN_CODE { get; set; }
        public string ACCESSORY_CODE { get; set; }
        public string ACCESSORY_NAME { get; set; }
        public decimal MRP { get; set; }
        public decimal BASIC_PRICE { get; set; }
        public int GST_PERCENTAGE { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
        public string ACTION { get; set; }
        public long ADMIN_ID { get; set; }
    }

    public class MedtronicQuotationProduct
    {
        public long Q_ID { get; set; }
        public long CUSTOMER_ID { get; set; }
        public long P_ID { get; set; }
        public string PRODUCT_CODE { get; set; }
        public string PRODUCT_NAME { get; set; }
        public int QUANTITY { get; set; }
        public decimal MRP { get; set; }
        public decimal BASIC_PRICE { get; set; }
        public decimal TOTAL_BASIC_PRICE { get; set; }
        public int GST_PERCENTAGE { get; set; }
        public List<MedtronicQuotationProductAccessories> MedtronicQuotationProductAccessoriesList { get; set; }
    }

    public class MedtronicQuotationProductAccessories
    {
        public int MQPA_ID { get; set; }
        public long Q_ID { get; set; }
        public long P_ID { get; set; }
        public int MED_ACC_ID { get; set; }
        public long MED_ACCESSORY_TYPE_ID { get; set; }
        public string ACCESSORY_CODE { get; set; }
        public string ACCESSORY_NAME { get; set; }
        public int QUANTITY { get; set; }
        public decimal MRP { get; set; }
        public decimal DISCOUNT { get; set; }
        public decimal BASIC_PRICE { get; set; }
        public decimal T_TOTAL_PRICE { get; set; }
        public int GST_PERCENTAGE { get; set; }
        public decimal PART_TOTAL_AMOUNT { get; set; }
        public decimal TOTAL_BASIC_PRICE { get; set; }
        public decimal TOTAL_GST { get; set; }
    }


    //MEDTRONIC AMC : 
    public class AMC_MedtronicAccessories {
        public long? AMC_MEDACC_ID { get; set; }
        public long? AMC_CMC_ID { get; set; }
        public int? MED_ACC_ID { get; set; }
        public string ACCESSORY_NAME { get; set; }
        public int? MED_ACCESSORY_TYPE_ID { get; set; }
        public string MED_ACCESSORY_TYPE_NAME { get; set; }
        public string SERIAL_NO { get; set; }
        public int? QUANTITY { get; set; }
        public decimal? AMC_AMOUNT { get; set; }
        public long EMP_ID { get; set; }
        public string REG_DATE { get; set; }
    }


}