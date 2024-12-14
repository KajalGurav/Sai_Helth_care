using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class VendorPO
    {
        public long VPO_ID { get; set; }
        public string VPO_NUMBER { get; set; }
        public long VENDOR_ID { get; set; }
        public long ADMIN_ID { get; set; }
        public string TERMS_AND_CONDITIONS { get; set; }
        public int CUSTOMER_TYPE_ID { get; set; }
        public int? INC_ALL_TAXES { get; set; }
        public string INC_EXC_TAX { get; set; }
        public int? GST { get; set; }
        public decimal? TOTAL_AMOUNT { get; set; }
        public decimal? TAX_AMOUNT { get; set; }
        public decimal? AMOUNT_INC_TAX { get; set; }
        public string VPO_DATE { get; set; }
        public string VPO_FOR { get; set; }
        public string ACTION { get; set; }
        public string VENDOR_NAME { get; set; }
        public string OWNER_NAME { get; set; }
        public string SUBJECT_LINE { get; set; }
        public string CONTACT_NO { get; set; }
        public string EMAIL { get; set; }
        public string ADDRESS { get; set; }
        public string STATE_NAME { get; set; }
        public string CITY_NAME { get; set; }
        public string ZIP_CODE { get; set; }
        public string PAN_CARD_NO { get; set; }
        public string GST_NO { get; set; }
        public string TIN_NO { get; set; }
        public string STATUS { get; set; }
        public string REG_DATE { get; set; }
    }

    public class VendorPOProduct
    {
        public long VPO_ID { get; set; }
        public long VPO_P_ID { get; set; }
        public long VENDOR_ID { get; set; }
        public long P_ID { get; set; }
        public string PRODUCT_CODE { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string CAT_NAME { get; set; }
        public string M_NAME { get; set; }
        public int IS_WITH_WARRANTY { get; set; }
        public string WITH_WARRANTY { get; set; }
        public int QUANTITY { get; set; }
        public decimal PRICE { get; set; }
        public int WARRANTY_QTY { get; set; }
        public decimal WARRANTY_PRICE { get; set; }
        public decimal? PART_TAXABLE_VALUE { get; set; }
        public decimal? WARRANTY_TAXABLE_VALUE { get; set; }
        public decimal? PART_TAX_AMOUNT { get; set; }
        public decimal? WARRANTY_TAX_AMOUNT { get; set; }
        public List<VendorPOProductAccessories> VendorPOProductAccessoriesList { get; set; }
    }

    public class VendorPOProductAccessories
    {
        public long VPO_ACC_ID { get; set; }
        public long VPO_ID { get; set; }
        public long VPO_P_ID { get; set; }
        public long ACC_ID { get; set; }
        public long ACC_TYPE_ID { get; set; }
        public string ACCESSORY_CODE { get; set; }
        public string ACCESSORY_NAME { get; set; }
        public int PART_QTY { get; set; }
        public decimal PART_PRICE { get; set; }
        public decimal? PART_TAXABLE_VALUE { get; set; }
        public decimal? PART_TAX_AMOUNT { get; set; }
    }

}