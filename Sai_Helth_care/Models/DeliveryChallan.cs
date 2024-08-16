using Antlr.Runtime.Misc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class DeliveryChallan
    {
        public int? DC_ID { get; set; }
        public string DC_NUMBER { get; set; }
        public long Customer_ID { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string DC_DATE { get; set; }
        public long? P_ID { get; set; }
        public long? M_ID { get; set; }
        public long? CAT_ID { get; set; }
        public long? F_ID { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string CAT_NAME { get; set; }
        public int? QUANTITY { get; set; }
        public decimal PRICE { get; set; }
        public int? IS_DC_FOR_SPAREPARTS { get; set; }
        public decimal TOTAL_AMOUNT { get; set; }
        public int INC_ALL_TAXES { get; set; }
        public int? GST { get; set; }
        public decimal? TAX_AMOUNT { get; set; }
        public decimal? AMOUNT_INC_TAX { get; set; }
        public int? MATERIAL_ID { get; set; }
        public string MATERIAL_NAME { get; set; }
        public string DC_CLOSE_DATE { get; set; }
        public int? DCS_ID { get; set; }
        public string STATUS_NAME { get; set; }
        public long? EMP_ID { get; set; }
        public string COMMENTS { get; set; }
        public string ACTION { get; set; }
        public long ADMIN_ID { get; set; }
        public string CHALLAN_IMAGE { get; set; }
        public string ADMIN_REMARK { get; set; }
        public string ImageBase64Data { get; set; }
        public string ImageName { get; set; }
        public string ImageExtension { get; set; }
        public string PRODUCT_SERIAL_NO { get; set; }
    }

    public class PrintDeliveryChallan
    {

        public int? DC_ID { get; set; }
        public string DC_NUMBER { get; set; }
        public string DC_DATE { get; set; }
        public string GSTIN_NUMBER { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string CUSTOMER_ADDRESS { get; set; }
        public string ZIP_CODE { get; set; }
        public List<DCProducts> ProductList { get; set; }
    }
    public class DCProducts
    {
        public int P_ID { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string COMMENTS { get; set; }
        public string M_NAME { get; set; }
        public string PRODUCT_SERIAL_NO { get; set; }
        public int? QUANTITY { get; set; }
        public decimal? PRICE { get; set; }
        public int TOTAL_ACCESSORIES_COUNT { get; set; }
        public int TOTAL_SPAREPART_COUNT { get; set; }
        public List<DCProductAccessories> AccessoriesList { get; set; }
        public List<DCProductSpareParts> SparePartsList { get; set; }
    }

    public class DCProductAccessories
    {
        public string STD_ACC_NAME { get; set; }
        public string ACC_SERIAL_NO { get; set; }
        public int? PART_QTY { get; set; }
        public decimal? PART_PRICE { get; set; }
    } 
    public class DCProductSpareParts
    {
        public string SPARE_PART { get; set; }
        public string SP_SERIAL_NO { get; set; }
        public int? PART_QTY { get; set; }
        public decimal? PART_PRICE { get; set; }
    }



    public class IncludingAllTaxes
    {
        public int IAT_ID { get; set; }
        public string IAT_NAME { get; set; }
    }

    public class GSTPercentage
    {
        public int GSTP_ID { get; set; }
        public int GST_PERC { get; set; }
    }



}