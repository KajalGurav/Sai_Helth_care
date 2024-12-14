using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class InvoiceMaster
    {
        public int? INVOICE_ID { get; set; }
        public string INVOICE_NUMBER { get; set; }
        public string PO_DATE { get; set; }
        public string BATCH_NO { get; set; }
        public string DC_NUMBER { get; set; }
        public string PI_NUMBER { get; set; }
        public long Customer_ID { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string FIRM_NAME { get; set; }
        public string INVOICE_DATE { get; set; }
        public long? P_ID { get; set; }
        public long? M_ID { get; set; }
        public long? CAT_ID { get; set; }
        public long? F_ID { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string CAT_NAME { get; set; }
        public int? QUANTITY { get; set; }
        public decimal PRICE { get; set; }
        public int? IS_INVOICE_FOR_SPAREPARTS { get; set; }
        public string InvoiceFor { get; set; }
        public decimal TOTAL_AMOUNT { get; set; }
        public int INC_ALL_TAXES { get; set; }
        public int? GST { get; set; }
        public decimal? TAX_AMOUNT { get; set; }
        public decimal? AMOUNT_INC_TAX { get; set; }
        public decimal? OTHER_SERVICES_AMOUNT { get; set; }
        public long? EMP_ID { get; set; }
        public string COMMENTS { get; set; }
        public string SERIAL_NO { get; set; }
        public string HSN_CODE { get; set; }
        public string ACTION { get; set; }
        public long ADMIN_ID { get; set; }
        public long? BANK_ID { get; set; }
        public string PAYMENT_TERMS_DETAILS { get; set; }
        public string ADMIN_REMARK { get; set; }
        public string DISPATCHED_THROUGH { get; set; }
        public string DESTINATION { get; set; }
        public string PNDT_ACKNOWLEDGEMENT_IMAGE { get; set; }
        public string PNDT_CERTIFICATE_IMAGE { get; set; }
        public string CHALLAN_IMAGE { get; set; }
        public string INSTALLATION_REPORT_IMAGE { get; set; }
        public string SERIAL_NO_OF_TUBE { get; set; }
        public int? NO_OF_TRANSDUCER { get; set; }
        public string SOFTWARE_VERSION { get; set; }
        public string WARRANTY_IN_DMY { get; set; }
        public string WARRANTY_FROM { get; set; }
        public string WARRANTY_TO { get; set; }
        public string INSTALLATION_DATE { get; set; }
        public string PO_NUMBER { get; set; }
        public string PNDT_NO { get; set; }
        public string PNDT_ACK_NO { get; set; }
        public decimal? WARRANTY_PERIOD { get; set; }

        public string ImageBase64Data { get; set; }
        public string ImageName { get; set; }
        public string ImageExtension { get; set; }

        public string ImageBase64Data1 { get; set; }
        public string ImageName1 { get; set; }
        public string ImageExtension1 { get; set; }

        public string ImageBase64Data2 { get; set; }
        public string ImageName2 { get; set; }
        public string ImageExtension2 { get; set; }

        public string ImageBase64Data3 { get; set; }
        public string ImageName3 { get; set; }
        public string ImageExtension3 { get; set; }
        public string EXPIRY_DATE { get; set; }
        public string MRP { get; set; }
        public string IGST { get; set; }
        public string INVOICE_PO_NUMBER { get; set; }
    }

    public class PrintInvoice
    {

        public int? INVOICE_ID { get; set; }
        public long BANK_ID { get; set; }
        public string PO_DATE { get; set; }
        public string COMMENTS { get; set; }
        public string INVOICE_NUMBER { get; set; }
        public decimal AMOUNT_INC_TAX { get; set; }
        public decimal? TAX_AMOUNT { get; set; }
        public decimal? TOTAL_AMOUNT { get; set; }
        public int INC_ALL_TAXES { get; set; }
        public int? GST { get; set; }
        public string DISPATCHED_THROUGH { get; set; }
        public string DESTINATION { get; set; }
        public string DC_NUMBER { get; set; }
        public string PI_NUMBER { get; set; }
        public string INVOICE_DATE { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string FIRM_NAME { get; set; }
        public string ENGINEER_NAME { get; set; }
        public string CONTACT_NO { get; set; }
        public string CUSTOMER_ADDRESS { get; set; }
        public string CUSTOMER_CONSIGNEE_ADDRESS { get; set; }
        public string PAYMENT_TERMS_DETAILS { get; set; }
        public string ZIP_CODE { get; set; }
        public string CONSIGNEE_ZIP_CODE { get; set; }
        public string PNDT_ACKNOWLEDGEMENT_IMAGE { get; set; }
        public string PNDT_CERTIFICATE_IMAGE { get; set; }
        public string SERIAL_NO_OF_TUBE { get; set; }
        public int? NO_OF_TRANSDUCER { get; set; }
        public string WARRANTY_IN_DMY { get; set; }
        public decimal? WARRANTY_PERIOD { get; set; }
        public string WARRANTY_FROM { get; set; }
        public string WARRANTY_TO { get; set; }
        public string INSTALLATION_DATE { get; set; }
        public string PO_NUMBER { get; set; }
        public string PNDT_NO { get; set; }
        public string PNDT_ACK_NO { get; set; }
        public string CUSTOMER_GSTIN_NUMBER { get; set; }
        public int? IS_INVOICE_FOR_SPAREPARTS { get; set; }

        public List<IMProducts> ProductList { get; set; }
    }
    public class IMProducts
    {
        public int P_ID { get; set; }
        public string PRODUCT_NAME { get; set; }
        public string M_NAME { get; set; }
        public long? CAT_ID { get; set; }
        public string CAT_NAME { get; set; }
        public int? IS_WITH_PROBE { get; set; }
        public int? QUANTITY { get; set; }
        public decimal? PRICE { get; set; }
        public string SERIAL_NO { get; set; }
        public string HSN_CODE { get; set; }
        public string PO_NUMBER { get; set; }
        public string PO_DATE { get; set; }
        public int TOTAL_ACCESSORIES_COUNT { get; set; }
        public int TOTAL_SPAREPART_COUNT { get; set; }
        public List<IMProductAccessories> AccessoriesList { get; set; }
        public List<IMProductSpareParts> SparePartsList { get; set; }
    }

    public class IMProductAccessories
    {
        public string STD_ACC_NAME { get; set; }
        public int? PART_QTY { get; set; }
        public decimal? PART_PRICE { get; set; }
        public string HSN_CODE { get; set; }
        public string SERIAL_NO { get; set; }
        public string PART_TAXABLE_VALUE { get; set; }
        public string PART_TAX_AMOUNT { get; set; }
    }
    public class IMProductSpareParts
    {
        public string SPARE_PART { get; set; }
        public int? PART_QTY { get; set; }
        public decimal? PART_PRICE { get; set; }
        public string HSN_CODE { get; set; }
        public string SERIAL_NO { get; set; }
        public string PART_TAXABLE_VALUE { get; set; }
        public string PART_TAX_AMOUNT { get; set; }
    }

    //Medtronic Accessories
    public class IM_MedtronicAccessories
    {
        public int INVOICE_MED_ACC_ID { get; set; }
        public string INVOICE_FOR { get; set; }
        public string BATCH_NO { get; set; }
        public Nullable<int> INVOICE_ID { get; set; }
        public int MED_ACC_ID { get; set; }
        public string ACCESSORY_CODE { get; set; }
        public string ACCESSORY_NAME { get; set; }
        public string HSN_CODE { get; set; }
        public string SERIAL_NO { get; set; }
        public int PART_QTY { get; set; }
        public decimal? PART_PRICE { get; set; }
        public int EMP_ID { get; set; }
        public string REG_DATE { get; set; }
        public int? GST_PERCENTAGE { get; set; }
        public decimal? PART_TAXABLE_VALUE { get; set; }
        public decimal? PART_TAX_AMOUNT { get; set; }

    }
    public class IM_MedtronicAccessories_ForPrint
    {
        public int? INVOICE_ID { get; set; }
        public long BANK_ID { get; set; }
        public string INVOICE_NUMBER { get; set; }
        public string DC_NUMBER { get; set; }
        public string PI_NUMBER { get; set; }
        public decimal? AMOUNT_INC_TAX { get; set; }
        public decimal? TAX_AMOUNT { get; set; }
        public decimal? TOTAL_AMOUNT { get; set; }
        public int INC_ALL_TAXES { get; set; }
        public int? GST { get; set; }
        public string DISPATCHED_THROUGH { get; set; }
        public string DESTINATION { get; set; }
        public string CUSTOMER_CONSIGNEE_ADDRESS { get; set; }
        public string PAYMENT_TERMS_DETAILS { get; set; }
        public string CONSIGNEE_ZIP_CODE { get; set; }
        public string INVOICE_DATE { get; set; }
        public string GSTIN_NUMBER { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string FIRM_NAME { get; set; }
        public string CONTACT_NO { get; set; }
        public string CUSTOMER_ADDRESS { get; set; }
        public string ZIP_CODE { get; set; }
        public string PNDT_ACKNOWLEDGEMENT_IMAGE { get; set; }
        public string PNDT_CERTIFICATE_IMAGE { get; set; }
        public string SERIAL_NO_OF_TUBE { get; set; }
        public int? NO_OF_TRANSDUCER { get; set; }
        public string WARRANTY_IN_DMY { get; set; }
        public decimal? WARRANTY_PERIOD { get; set; }
        public string WARRANTY_FROM { get; set; }
        public string WARRANTY_TO { get; set; }
        public string INSTALLATION_DATE { get; set; }
        public string PO_NUMBER { get; set; }
        public string PNDT_NO { get; set; }
        public string PNDT_ACK_NO { get; set; }
        public string PO_DATE { get; set; }
        public string COMMENTS { get; set; }
        public int? IS_INVOICE_FOR_SPAREPARTS { get; set; }
        public List<IM_MedtronicAccessories_Products> ProductList { get; set; }
    }
    public class IM_MedtronicAccessories_Products
    {
        public int MED_ACC_ID { get; set; }
        public string INVOICE_FOR { get; set; }
        public string ACCESSORY_CODE { get; set; }
        public string ACCESSORY_NAME { get; set; }
        public long? CAT_ID { get; set; }
        public string CAT_NAME { get; set; }
        public int? IS_WITH_PROBE { get; set; }
        public string HSN_CODE { get; set; }
        public string SERIAL_NO { get; set; }
        public string BATCH_NO { get; set; }
        public string MRP { get; set; }
        public string EXPIRY_DATE { get; set; }
        public int PART_QTY { get; set; }
        public decimal? PART_TAXABLE_VALUE { get; set; }
        public decimal? PART_TAX_AMOUNT { get; set; }
        public int? GST_PERCENTAGE { get; set; }
        public List<IM_MedtronicAccessories_SerialNo> SerialNoList { get; set; }
    }

    public class IM_MedtronicAccessories_SerialNo
    {
        public string SERIAL_NO { get; set; }
        public string BATCH_NO { get; set; }
    }


    public class DeleteUploadedDocumentParams
    {
        public string DELETE_DOC_FOR { get; set; }
        public long? RECORD_ID { get; set; }
        public string DOCUMENT_TYPE { get; set; }
    }

    public class StockPartSerialNoList
    {
        public long SP_STOCK_ID { get; set; }
        public string SP_STOCK_NO { get; set; }
        public long P_ID { get; set; }
        public long PART_ID { get; set; }
        public int PART_TYPE_ID { get; set; }
        public string PART_SERIAL_NO { get; set; }
        public decimal? PART_PRICE { get; set; }
        public string HSN_CODE { get; set; }
        public int? INVOICE_ID { get; set; }
        public long? ASSIGN_TO { get; set; }
        public string ASSIGN_ON_DATE { get; set; }
        public string BATCH_NO { get; set; }

    }

    public class StockProductSerialNoList
    {
        public long P_STOCK_ID { get; set; }
        public string P_STOCK_NO { get; set; }
        public long P_ID { get; set; }
        public string P_SERIAL_NO { get; set; }
        public string HSN_CODE { get; set; }
        public int? INVOICE_ID { get; set; }
        public long? ASSIGN_TO { get; set; }
        public string ASSIGN_ON_DATE { get; set; }

    }
}