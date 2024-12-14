using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class PartsAccessories
    {
        public int ADMIN_ID { get; set; }
        public string ACC_SERIAL_NO { get; set; }
        public string SP_SERIAL_NO { get; set; }
        public Nullable<int> DC_ID { get; set; }
        public string DC_For { get; set; }
        public Nullable<int> STD_ID { get; set; }
        public Nullable<int> SP_ID { get; set; }
        public int PART_QTY { get; set; }
        public decimal PART_PRICE { get; set; }
    }

    public class DC_SparePartsAndAccessories {
        public int ID { get; set; }
        public string DC_FOR { get; set; }
        public Nullable<int> DC_ID { get; set; }
        public int SP_ACCESSORIES_ID { get; set; }
        public string SP_ACCESSORIES_NAME { get; set; }
        public string SP_ACC_SERIAL_NO { get; set; }
        public int PART_QTY { get; set; }
        public decimal PART_PRICE { get; set; }
        public int EMP_ID { get; set; }
        public DateTime REG_DATE { get; set; }

    }


    public class InvoicePartsAccessories
    {
        public int ADMIN_ID { get; set; }
        public int QUOTATION_ID { get; set; }
        public int Q_ID { get; set; }
        public Nullable<int> INVOICE_ID { get; set; }
        public string INVOICE_For { get; set; }
        public Nullable<int> STD_ID { get; set; }
        public Nullable<int> SP_ID { get; set; }
        public int PART_QTY { get; set; }
        public decimal PART_PRICE { get; set; }
        public string HSN_CODE { get; set; }
        public string SERIAL_NO { get; set; }
    }

    public class IM_SparePartsAndAccessories
    {
        public int ID { get; set; }
        public string INVOICE_FOR { get; set; }
        public string BATCH_NO { get; set; }
        public Nullable<int> INVOICE_ID { get; set; }
        public int SP_ACCESSORIES_ID { get; set; }
        public string SP_ACCESSORIES_NAME { get; set; }
        public int PART_QTY { get; set; }
        public decimal PART_PRICE { get; set; }
        public string HSN_CODE { get; set; }
        public string SERIAL_NO { get; set; }
        public int EMP_ID { get; set; }
        public string EXPIRY_DATE1 { get; set; }
        public int MRP1 { get; set; }
        public DateTime REG_DATE { get; set; }

    }

    //Medtronic Accessories
    public class DC_MedtronicAccessories
    {
        public int DC_MED_ACC_ID { get; set; }
        public string DC_FOR { get; set; }
        public Nullable<int> DC_ID { get; set; }
        public int MED_ACC_ID { get; set; }
        public string ACCESSORY_CODE { get; set; }
        public string ACCESSORY_NAME { get; set; }
        public string SERIAL_NO { get; set; }
        public int PART_QTY { get; set; }
        public decimal? PART_PRICE { get; set; }
        public int EMP_ID { get; set; }
        public string REG_DATE { get; set; }

    }
    public class DC_MedtronicAccessories_ForPrint
    {
        public int? DC_ID { get; set; }
        public string DC_NUMBER { get; set; }
        public string DC_DATE { get; set; }
        public string GSTIN_NUMBER { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string CONTACT_NO { get; set; }
        public string CUSTOMER_ADDRESS { get; set; }
        public string ZIP_CODE { get; set; }
        public List<DC_MedtronicAccessories_Products> ProductList { get; set; }
    }
    public class DC_MedtronicAccessories_Products
    {
        public int MED_ACC_ID { get; set; }
        public string DC_FOR { get; set; }
        public string ACCESSORY_CODE { get; set; }
        public string ACCESSORY_NAME { get; set; }
        public int PART_QTY { get; set; }
        public List<DC_MedtronicAccessories_SerialNo> SerialNoList { get; set; }
    }

    public class DC_MedtronicAccessories_SerialNo {
        public string SERIAL_NO { get; set; }
    }


}