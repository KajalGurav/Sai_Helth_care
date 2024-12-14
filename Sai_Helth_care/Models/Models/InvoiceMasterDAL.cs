using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using static Sai_Helth_care.Models.QuotationDAL;
using System.Drawing.Imaging;
using System.IO;
using System.Web.Hosting;

namespace Sai_Helth_care.Models
{
    public class InvoiceMasterDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        static DataSet ds;

        public static int AddUpdateInvoice(InvoiceMaster tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.PNDT_ACKNOWLEDGEMENT_IMAGE == "Yes")
                {
                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;

                    string fileName1;
                    if (extension.ToLower() == ".pdf")
                    {
                        fileName = "PNDTAckPDF" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                        tB_admin.PNDT_ACKNOWLEDGEMENT_IMAGE = Master.serverurl + "/UploadedImages/PDF/" + fileName;
                        fileName1 = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/UploadedImages/PDF/"), fileName);
                    }
                    else
                    {
                        fileName = "PNDTAckImage" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                        tB_admin.PNDT_ACKNOWLEDGEMENT_IMAGE = Master.serverurl + "/UploadedImages/" + fileName;
                        fileName1 = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/UploadedImages/"), fileName);
                    }


                    if (tB_admin.PNDT_ACKNOWLEDGEMENT_IMAGE != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                       
                        if (extension.ToLower() == ".pdf")
                        {
                            System.IO.File.WriteAllBytes(HostingEnvironment.MapPath("~/UploadedImages/PDF/" + fileName), imageByteData);
                            
                        }
                        else
                        {
                            MemoryStream mem = new MemoryStream(imageByteData);
                            System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                            if(extension.ToLower() == ".png")
                            {
                                img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName), ImageFormat.Png);
                            }
                            else
                            {
                                img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName), ImageFormat.Jpeg);
                            }
                            
                        }
                        
                    }
                }
                else
                {
                    tB_admin.PNDT_ACKNOWLEDGEMENT_IMAGE = null;
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.PNDT_CERTIFICATE_IMAGE == "Yes")
                {
                    string fileName2 = tB_admin.ImageName1;
                    string extension = tB_admin.ImageExtension1;
                    string fileName3;
                    if (extension.ToLower() == ".pdf")
                    {
                        fileName2 = "PNDTAckPDF" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                        tB_admin.PNDT_CERTIFICATE_IMAGE = Master.serverurl + "/UploadedImages/PDF/" + fileName2;
                        fileName3 = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/UploadedImages/PDF/"), fileName2);
                    }
                    else
                    {
                        fileName2 = "PNDTAckImage" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                        tB_admin.PNDT_CERTIFICATE_IMAGE = Master.serverurl + "/UploadedImages/" + fileName2;
                        fileName3 = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/UploadedImages/"), fileName2);
                    }


                    if (tB_admin.PNDT_CERTIFICATE_IMAGE != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data1);

                        if (extension.ToLower() == ".pdf")
                        {
                            System.IO.File.WriteAllBytes(HostingEnvironment.MapPath("~/UploadedImages/PDF/" + fileName2), imageByteData);

                        }
                        else
                        {
                            MemoryStream mem = new MemoryStream(imageByteData);
                            System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                            if (extension.ToLower() == ".png")
                            {
                                img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName2), ImageFormat.Png);
                            }
                            else
                            {
                                img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName2), ImageFormat.Jpeg);
                            }

                        }

                    }
                }
                else
                {
                    tB_admin.PNDT_CERTIFICATE_IMAGE = null;
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                if (tB_admin.PO_DATE == null)
                {

                }

                bool IGST = false;

                if (tB_admin.IGST != null)
                {
                    if (tB_admin.IGST.ToLower() == "yes")
                    {
                        IGST = true;
                    }
                }
                


                cmd = new SqlCommand("InsertUpdateInvoice", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@INVOICE_ID", tB_admin.INVOICE_ID);
                cmd.Parameters.AddWithValue("@INVOICE_NUMBER", tB_admin.INVOICE_NUMBER);
                cmd.Parameters.AddWithValue("@DC_NUMBER", tB_admin.DC_NUMBER);
                cmd.Parameters.AddWithValue("@PI_NUMBER", tB_admin.PI_NUMBER);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.Customer_ID);
                cmd.Parameters.AddWithValue("@INVOICE_DATE", tB_admin.INVOICE_DATE);
                cmd.Parameters.AddWithValue("@P_ID", tB_admin.P_ID);
                cmd.Parameters.AddWithValue("@F_ID", tB_admin.F_ID);
                cmd.Parameters.AddWithValue("@QUANTITY", tB_admin.QUANTITY);
                cmd.Parameters.AddWithValue("@PRICE", tB_admin.PRICE);
                cmd.Parameters.AddWithValue("@SERIAL_NO", tB_admin.SERIAL_NO);
                cmd.Parameters.AddWithValue("@HSN_CODE", tB_admin.HSN_CODE);
                cmd.Parameters.AddWithValue("@IS_INVOICE_FOR_SPAREPARTS", tB_admin.IS_INVOICE_FOR_SPAREPARTS);
                cmd.Parameters.AddWithValue("@TOTAL_AMOUNT", tB_admin.TOTAL_AMOUNT);
                cmd.Parameters.AddWithValue("@INC_ALL_TAXES", tB_admin.INC_ALL_TAXES);
                cmd.Parameters.AddWithValue("@GST", tB_admin.GST);
                cmd.Parameters.AddWithValue("@TAX_AMOUNT", tB_admin.TAX_AMOUNT);
                cmd.Parameters.AddWithValue("@AMOUNT_INC_TAX", tB_admin.AMOUNT_INC_TAX);
                cmd.Parameters.AddWithValue("@OTHER_SERVICES_AMOUNT", tB_admin.OTHER_SERVICES_AMOUNT);
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID);
                cmd.Parameters.AddWithValue("@COMMENTS", tB_admin.COMMENTS);
                cmd.Parameters.AddWithValue("@ADMIN_REMARK", tB_admin.ADMIN_REMARK);
                cmd.Parameters.AddWithValue("@ADMIN_ID", tB_admin.ADMIN_ID);
                cmd.Parameters.AddWithValue("@BANK_ID", tB_admin.BANK_ID);
                cmd.Parameters.AddWithValue("@PAYMENT_TERMS_DETAILS", tB_admin.PAYMENT_TERMS_DETAILS);
                cmd.Parameters.AddWithValue("@DISPATCHED_THROUGH", tB_admin.DISPATCHED_THROUGH);
                cmd.Parameters.AddWithValue("@DESTINATION", tB_admin.DESTINATION);
                cmd.Parameters.AddWithValue("@SERIAL_NO_OF_TUBE", tB_admin.SERIAL_NO_OF_TUBE);
                cmd.Parameters.AddWithValue("@NO_OF_TRANSDUCER", tB_admin.NO_OF_TRANSDUCER);
                cmd.Parameters.AddWithValue("@SOFTWARE_VERSION", tB_admin.SOFTWARE_VERSION);
                cmd.Parameters.AddWithValue("@WARRANTY_IN_DMY", tB_admin.WARRANTY_IN_DMY);
                cmd.Parameters.AddWithValue("@WARRANTY_PERIOD", tB_admin.WARRANTY_PERIOD);
                cmd.Parameters.AddWithValue("@WARRANTY_FROM", tB_admin.WARRANTY_FROM);
                cmd.Parameters.AddWithValue("@WARRANTY_TO", tB_admin.WARRANTY_TO);
                cmd.Parameters.AddWithValue("@INSTALLATION_DATE", tB_admin.INSTALLATION_DATE);
                cmd.Parameters.AddWithValue("@PO_NUMBER", tB_admin.PO_NUMBER);
                cmd.Parameters.AddWithValue("@PNDT_ACKNOWLEDGEMENT_IMAGE", tB_admin.PNDT_ACKNOWLEDGEMENT_IMAGE);
                cmd.Parameters.AddWithValue("@PNDT_ACK_NO", tB_admin.PNDT_ACK_NO);
                cmd.Parameters.AddWithValue("@PNDT_CERTIFICATE_IMAGE", tB_admin.PNDT_CERTIFICATE_IMAGE);
                cmd.Parameters.AddWithValue("@PNDT_NO", tB_admin.PNDT_NO);
                cmd.Parameters.AddWithValue("@ACTION", tB_admin.ACTION);
                cmd.Parameters.AddWithValue("@BATCH_NO", tB_admin.BATCH_NO);
                cmd.Parameters.AddWithValue("@PO_DATE", tB_admin.PO_DATE);
                cmd.Parameters.AddWithValue("@EXPIRY_DATE", tB_admin.EXPIRY_DATE);
                cmd.Parameters.AddWithValue("@MRP", tB_admin.MRP);
                cmd.Parameters.AddWithValue("@IGST", IGST);
                cmd.Parameters.AddWithValue("@INVOICE_PO_NUMBER", tB_admin.INVOICE_PO_NUMBER);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                return i;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static int GetInvoiceMasterTotalRecordCount(SearchQuotationParams tb_params)
        {
            HttpContext context = HttpContext.Current;
            long id = Convert.ToInt64(context.Session["COMPANY_ID"]);
            int i = 0;
            try
            {
                cmd = new SqlCommand("GetInvoiceMasterTotalRecordCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tb_params.CUSTOMER_TYPE_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_params.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tb_params.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@FIRM_NAME", tb_params.FIRM_NAME);
                cmd.Parameters.AddWithValue("@STARTING_DATE", tb_params.STARTING_DATE);
                cmd.Parameters.AddWithValue("@ENDING_DATE", tb_params.ENDING_DATE);
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return i;
        }

        public static List<InvoiceMaster> GetInvoiceMasterList(SearchQuotationParams tb_params)
        {
            HttpContext context = HttpContext.Current;
            long id = Convert.ToInt64(context.Session["COMPANY_ID"]);

            cmd = new SqlCommand("SP_GetInvoiceMasterList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tb_params.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tb_params.PageNo - 1);
            cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tb_params.CUSTOMER_TYPE_ID);
            cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_params.CUSTOMER_ID);
            cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tb_params.CUSTOMER_NAME);
            cmd.Parameters.AddWithValue("@FIRM_NAME", tb_params.FIRM_NAME);
            cmd.Parameters.AddWithValue("@STARTING_DATE", tb_params.STARTING_DATE);
            cmd.Parameters.AddWithValue("@ENDING_DATE", tb_params.ENDING_DATE);
            cmd.Parameters.AddWithValue("@COMPANY_ID", id);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            InvoiceMaster rt;
            List<InvoiceMaster> FinalreportList = new List<InvoiceMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new InvoiceMaster();
                    try
                    {
                        rt.INVOICE_ID = Convert.ToInt32(dt.Rows[i]["INVOICE_ID"]);
                        rt.INVOICE_NUMBER = Convert.ToString(dt.Rows[i]["INVOICE_NUMBER"]);
                        rt.DC_NUMBER = Convert.ToString(dt.Rows[i]["DC_NUMBER"]);
                        rt.PI_NUMBER = Convert.ToString(dt.Rows[i]["PI_NUMBER"]);
                        rt.Customer_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"]).ToString();
                        rt.CAT_NAME = (dt.Rows[i]["CAT_NAME"]).ToString();
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"]).ToString();
                        rt.INVOICE_DATE = (dt.Rows[i]["INVOICE_DATE"]).ToString();
                        rt.InvoiceFor = (dt.Rows[i]["InvoiceFor"]).ToString();
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }

        public static InvoiceMaster GetInvoiceDetailsForUpdate(long invoiceID)
        {
            cmd = new SqlCommand("SP_GetInvoiceDetailsForUpdate", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@INVOICE_ID", invoiceID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            InvoiceMaster rt;
            rt = new InvoiceMaster();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    try
                    {
                        rt.INVOICE_ID = Convert.ToInt32(dt.Rows[i]["INVOICE_ID"]);
                        rt.INVOICE_NUMBER = Convert.ToString(dt.Rows[i]["INVOICE_NUMBER"]);
                        rt.DC_NUMBER = Convert.ToString(dt.Rows[i]["DC_NUMBER"]);
                        rt.PI_NUMBER = Convert.ToString(dt.Rows[i]["PI_NUMBER"]);
                        rt.Customer_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.BANK_ID = dt.Rows[i]["BANK_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["BANK_ID"]);
                        rt.INVOICE_DATE = (dt.Rows[i]["INVOICE_DATE"]).ToString(); 
                        rt.P_ID = dt.Rows[i]["P_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.CAT_ID = dt.Rows[i]["CAT_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        rt.M_ID = dt.Rows[i]["M_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["M_ID"]);
                        rt.F_ID = dt.Rows[i]["F_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["F_ID"]);
                        rt.QUANTITY = dt.Rows[i]["QUANTITY"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["QUANTITY"]);
                        rt.PRICE = Convert.ToDecimal(dt.Rows[i]["PRICE"]);
                        rt.HSN_CODE = Convert.ToString(dt.Rows[i]["HSN_CODE"]);
                        rt.SERIAL_NO = Convert.ToString(dt.Rows[i]["SERIAL_NO"]);
                        rt.IS_INVOICE_FOR_SPAREPARTS = dt.Rows[i]["IS_INVOICE_FOR_SPAREPARTS"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["IS_INVOICE_FOR_SPAREPARTS"]);
                        rt.TOTAL_AMOUNT = Convert.ToDecimal(dt.Rows[i]["TOTAL_AMOUNT"]);
                        rt.INC_ALL_TAXES = Convert.ToInt32(dt.Rows[i]["INC_ALL_TAXES"]);
                        rt.GST = dt.Rows[i]["GST"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["GST"]);
                        rt.TAX_AMOUNT = dt.Rows[i]["TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["TAX_AMOUNT"]);
                        rt.AMOUNT_INC_TAX = dt.Rows[i]["AMOUNT_INC_TAX"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["AMOUNT_INC_TAX"]);
                        rt.EMP_ID = dt.Rows[i]["EMP_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["EMP_ID"]);
                        rt.COMMENTS = (dt.Rows[i]["COMMENTS"]).ToString();
                        rt.ADMIN_REMARK = (dt.Rows[i]["ADMIN_REMARK"]).ToString();
                        rt.WARRANTY_IN_DMY = (dt.Rows[i]["WARRANTY_IN_DMY"]).ToString();
                        rt.WARRANTY_PERIOD = dt.Rows[i]["WARRANTY_PERIOD"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["WARRANTY_PERIOD"]);
                        rt.OTHER_SERVICES_AMOUNT = dt.Rows[i]["OTHER_SERVICES_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["OTHER_SERVICES_AMOUNT"]);
                        rt.DISPATCHED_THROUGH = (dt.Rows[i]["DISPATCHED_THROUGH"]).ToString();
                        rt.PAYMENT_TERMS_DETAILS = (dt.Rows[i]["PAYMENT_TERMS_DETAILS"]).ToString();
                        rt.DESTINATION = (dt.Rows[i]["DESTINATION"]).ToString();
                        rt.NO_OF_TRANSDUCER = dt.Rows[i]["NO_OF_TRANSDUCER"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["NO_OF_TRANSDUCER"]);
                        rt.SERIAL_NO_OF_TUBE = (dt.Rows[i]["SERIAL_NO_OF_TUBE"]).ToString();
                        rt.SOFTWARE_VERSION = (dt.Rows[i]["SOFTWARE_VERSION"]).ToString();
                        rt.PNDT_ACKNOWLEDGEMENT_IMAGE = (dt.Rows[i]["PNDT_ACKNOWLEDGEMENT_IMAGE"]).ToString();
                        rt.PNDT_CERTIFICATE_IMAGE = (dt.Rows[i]["PNDT_CERTIFICATE_IMAGE"]).ToString();
                        rt.WARRANTY_FROM = (dt.Rows[i]["WARRANTY_FROM"]).ToString();
                        rt.WARRANTY_TO = (dt.Rows[i]["WARRANTY_TO"]).ToString();
                        rt.INSTALLATION_DATE = (dt.Rows[i]["INSTALLATION_DATE"]).ToString();
                        rt.PO_NUMBER = (dt.Rows[i]["PO_NUMBER"]).ToString();
                        rt.PNDT_NO = (dt.Rows[i]["PNDT_NO"]).ToString();
                        rt.PNDT_ACK_NO = (dt.Rows[i]["PNDT_ACK_NO"]).ToString();
                        rt.PO_DATE = (dt.Rows[i]["PO_DATE"]).ToString();
                        rt.EXPIRY_DATE = (dt.Rows[i]["EXPIRY_DATE"]).ToString();
                        rt.INVOICE_PO_NUMBER = (dt.Rows[i]["INVOICE_PO_NUMBER"]).ToString();
                        rt.MRP = (dt.Rows[i]["MRP"]).ToString();
                        if ((dt.Rows[i]["IGST"]).ToString().ToLower() == "true")
                        {
                            rt.IGST = "Yes";
                        }
                        else
                        {
                            rt.IGST = "No";
                        }
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
            return rt;
        }

        public static PrintInvoice GetInvoiceForPrint(long invoiceID)
        {
            cmd = new SqlCommand("GetInvoicePrintDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@INVOICE_ID", invoiceID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            ds = new DataSet();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(ds);
            DataTable dt_DC = new DataTable();
            dt_DC = ds.Tables[0];

            DataTable dt_Product = new DataTable();
            dt_Product = ds.Tables[1];

            DataTable dt_ProductAccessories = new DataTable();
            dt_ProductAccessories = ds.Tables[2];

            DataTable dt_ProductSpareParts = new DataTable();
            dt_ProductSpareParts = ds.Tables[3];
            con.Close();
            PrintInvoice rt;

            rt = new PrintInvoice();

            if (dt_DC != null)
            {
                for (int i = 0; i < dt_DC.Rows.Count; i++)
                {
                    try
                    {
                        rt.INVOICE_ID = Convert.ToInt32(dt_DC.Rows[i]["INVOICE_ID"]);
                        rt.BANK_ID = Convert.ToInt64(dt_DC.Rows[i]["BANK_ID"]);
                        rt.INVOICE_NUMBER = Convert.ToString(dt_DC.Rows[i]["INVOICE_NUMBER"]);
                        rt.DC_NUMBER = Convert.ToString(dt_DC.Rows[i]["DC_NUMBER"]);
                        rt.PI_NUMBER = Convert.ToString(dt_DC.Rows[i]["PI_NUMBER"]);
                        rt.INVOICE_DATE = (dt_DC.Rows[i]["INVOICE_DATE"]).ToString();
                        rt.CUSTOMER_GSTIN_NUMBER = (dt_DC.Rows[i]["CUSTOMER_GSTIN_NUMBER"]).ToString();
                        rt.CUSTOMER_NAME = (dt_DC.Rows[i]["CUSTOMER_NAME"]).ToString();
                        rt.FIRM_NAME = (dt_DC.Rows[i]["FIRM_NAME"]).ToString();
                        rt.ENGINEER_NAME = (dt_DC.Rows[i]["ENGINEER_NAME"]).ToString();
                        rt.CONTACT_NO = (dt_DC.Rows[i]["CONTACT_NO"]).ToString();
                        rt.CUSTOMER_ADDRESS = (dt_DC.Rows[i]["CUSTOMER_ADDRESS"]).ToString();
                        rt.CUSTOMER_CONSIGNEE_ADDRESS = (dt_DC.Rows[i]["CUSTOMER_CONSIGNEE_ADDRESS"]).ToString();
                        rt.CONSIGNEE_ZIP_CODE = (dt_DC.Rows[i]["CONSIGNEE_ZIP_CODE"]).ToString();
                        rt.ZIP_CODE = (dt_DC.Rows[i]["ZIP_CODE"]).ToString();
                        rt.DESTINATION = (dt_DC.Rows[i]["DESTINATION"]).ToString();
                        rt.DISPATCHED_THROUGH = (dt_DC.Rows[i]["DISPATCHED_THROUGH"]).ToString();
                        rt.PAYMENT_TERMS_DETAILS = (dt_DC.Rows[i]["PAYMENT_TERMS_DETAILS"]).ToString();
                        rt.TOTAL_AMOUNT = Convert.ToDecimal(dt_DC.Rows[i]["TOTAL_AMOUNT"]);
                        rt.INC_ALL_TAXES = Convert.ToInt32(dt_DC.Rows[i]["INC_ALL_TAXES"]);
                        rt.GST = dt_DC.Rows[i]["GST"] is DBNull ? (int?)null : Convert.ToInt32(dt_DC.Rows[i]["GST"]);
                        rt.TAX_AMOUNT = dt_DC.Rows[i]["TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_DC.Rows[i]["TAX_AMOUNT"]);
                        //rt.AMOUNT_INC_TAX = dt_DC.Rows[i]["AMOUNT_INC_TAX"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_DC.Rows[i]["AMOUNT_INC_TAX"]);
                        rt.AMOUNT_INC_TAX = Convert.ToDecimal(dt_DC.Rows[i]["AMOUNT_INC_TAX"]);
                        rt.PNDT_ACKNOWLEDGEMENT_IMAGE = (dt_DC.Rows[i]["PNDT_ACKNOWLEDGEMENT_IMAGE"]).ToString();
                        rt.PNDT_CERTIFICATE_IMAGE = (dt_DC.Rows[i]["PNDT_CERTIFICATE_IMAGE"]).ToString();
                        rt.NO_OF_TRANSDUCER = dt_DC.Rows[i]["NO_OF_TRANSDUCER"] is DBNull ? (int?)null : Convert.ToInt32(dt_DC.Rows[i]["NO_OF_TRANSDUCER"]);
                        rt.SERIAL_NO_OF_TUBE = (dt_DC.Rows[i]["SERIAL_NO_OF_TUBE"]).ToString();
                        rt.IS_INVOICE_FOR_SPAREPARTS = dt_DC.Rows[i]["IS_INVOICE_FOR_SPAREPARTS"] is DBNull ? (int?)null : Convert.ToInt32(dt_DC.Rows[i]["IS_INVOICE_FOR_SPAREPARTS"]);
                        rt.WARRANTY_IN_DMY = (dt_DC.Rows[i]["WARRANTY_IN_DMY"]).ToString();
                        rt.WARRANTY_PERIOD = dt_DC.Rows[i]["WARRANTY_PERIOD"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_DC.Rows[i]["WARRANTY_PERIOD"]);
                        rt.WARRANTY_FROM = (dt_DC.Rows[i]["WARRANTY_FROM"]).ToString();
                        rt.WARRANTY_TO = (dt_DC.Rows[i]["WARRANTY_TO"]).ToString();
                        rt.INSTALLATION_DATE = (dt_DC.Rows[i]["INSTALLATION_DATE"]).ToString();
                        rt.PO_NUMBER = (dt_DC.Rows[i]["PO_NUMBER"]).ToString();
                        rt.PO_DATE = Convert.ToString(dt_DC.Rows[i]["PO_DATE"]);
                        rt.PNDT_NO = (dt_DC.Rows[i]["PNDT_NO"]).ToString();
                        rt.PNDT_ACK_NO = (dt_DC.Rows[i]["PNDT_ACK_NO"]).ToString();
                        rt.PNDT_ACK_NO = (dt_DC.Rows[i]["PNDT_ACK_NO"]).ToString();
                        rt.COMMENTS = (dt_DC.Rows[i]["COMMENTS"]).ToString();
                        rt.ProductList = GetIMProducts(dt_Product, dt_ProductAccessories, dt_ProductSpareParts);
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
            return rt;
        }

        public static List<IMProducts> GetIMProducts(DataTable dt_Product, DataTable dt_ProductAccessories, DataTable dt_ProductSpareParts)
        {
            IMProducts rt;
            List<IMProducts> FinalreportList = new List<IMProducts>();
            if (dt_Product != null)
            {
                for (int i = 0; i < dt_Product.Rows.Count; i++)
                {
                    rt = new IMProducts();
                    try
                    {
                        rt.P_ID = Convert.ToInt32(dt_Product.Rows[i]["P_ID"]);
                        rt.PRODUCT_NAME = Convert.ToString(dt_Product.Rows[i]["PRODUCT_NAME"]);
                        rt.M_NAME = Convert.ToString(dt_Product.Rows[i]["M_NAME"]);
                        rt.QUANTITY = dt_Product.Rows[i]["QUANTITY"] is DBNull ? (int?)null : Convert.ToInt32(dt_Product.Rows[i]["QUANTITY"]);
                        rt.CAT_ID = dt_Product.Rows[i]["CAT_ID"] is DBNull ? (long?)null : Convert.ToInt32(dt_Product.Rows[i]["CAT_ID"]);
                        rt.CAT_NAME = Convert.ToString(dt_Product.Rows[i]["CAT_NAME"]);
                        rt.IS_WITH_PROBE = dt_Product.Rows[i]["IS_WITH_PROBE"] is DBNull ? (int?)null : Convert.ToInt32(dt_Product.Rows[i]["IS_WITH_PROBE"]);
                        rt.PRICE = dt_Product.Rows[i]["PRICE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_Product.Rows[i]["PRICE"]);
                        rt.SERIAL_NO = Convert.ToString(dt_Product.Rows[i]["SERIAL_NO"]);
                        rt.HSN_CODE = Convert.ToString(dt_Product.Rows[i]["HSN_CODE"]);
                        rt.TOTAL_ACCESSORIES_COUNT = Convert.ToInt32(dt_Product.Rows[i]["TOTAL_ACCESSORIES_COUNT"]);
                        rt.TOTAL_SPAREPART_COUNT = Convert.ToInt32(dt_Product.Rows[i]["TOTAL_SPAREPART_COUNT"]);
                        rt.AccessoriesList = GetIMProductAccessories(rt.P_ID, dt_ProductAccessories);
                        rt.SparePartsList = GetIMProductSpareParts(rt.P_ID, dt_ProductSpareParts);

                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }
        public static List<IMProductAccessories> GetIMProductAccessories(int P_ID, DataTable dt_ProductAccessories)
        {
            IMProductAccessories rt;
            List<IMProductAccessories> FinalreportList = new List<IMProductAccessories>();
            if (dt_ProductAccessories != null)
            {
                for (int i = 0; i < dt_ProductAccessories.Rows.Count; i++)
                {
                    rt = new IMProductAccessories();
                    try
                    {
                        if (Convert.ToInt32(dt_ProductAccessories.Rows[i]["P_ID"]) == P_ID)
                        {
                            rt.STD_ACC_NAME = Convert.ToString(dt_ProductAccessories.Rows[i]["STD_ACC_NAME"]);
                            rt.PART_QTY = dt_ProductAccessories.Rows[i]["PART_QTY"] is DBNull ? (int?)null : Convert.ToInt32(dt_ProductAccessories.Rows[i]["PART_QTY"]);
                            rt.PART_PRICE = dt_ProductAccessories.Rows[i]["PART_PRICE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_ProductAccessories.Rows[i]["PART_PRICE"]);
                            rt.SERIAL_NO = Convert.ToString(dt_ProductAccessories.Rows[i]["SERIAL_NO"]);
                            rt.HSN_CODE = Convert.ToString(dt_ProductAccessories.Rows[i]["HSN_CODE"]);
                            //rt.PART_TAXABLE_VALUE = dt_ProductAccessories.Rows[i]["PART_TAXABLE_VALUE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_ProductAccessories.Rows[i]["PART_TAXABLE_VALUE"]);
                            //rt.PART_TAX_AMOUNT = dt_ProductAccessories.Rows[i]["PART_TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_ProductAccessories.Rows[i]["PART_TAX_AMOUNT"]);
                            //rt.PART_TAXABLE_VALUE = Convert.ToDecimal(dt_ProductAccessories.Rows[i]["PART_TAXABLE_VALUE"]);
                            //rt.PART_TAX_AMOUNT = Convert.ToDecimal(dt_ProductAccessories.Rows[i]["PART_TAX_AMOUNT"]);
                            rt.PART_TAXABLE_VALUE = Convert.ToString(dt_ProductAccessories.Rows[i]["PART_TAXABLE_VALUE"]);
                            rt.PART_TAX_AMOUNT = Convert.ToString(dt_ProductAccessories.Rows[i]["PART_TAX_AMOUNT"]);
                            FinalreportList.Add(rt);
                        }

                    }
                    catch (Exception ex)
                    {
                    }

                }
            }
            return FinalreportList;
        }

        public static List<IMProductSpareParts> GetIMProductSpareParts(int P_ID, DataTable dt_ProductSpareParts)
        {
            IMProductSpareParts rt;
            List<IMProductSpareParts> FinalreportList = new List<IMProductSpareParts>();
            if (dt_ProductSpareParts != null)
            {
                for (int i = 0; i < dt_ProductSpareParts.Rows.Count; i++)
                {
                    rt = new IMProductSpareParts();
                    try
                    {
                        if (Convert.ToInt32(dt_ProductSpareParts.Rows[i]["P_ID"]) == P_ID)
                        {
                            rt.SPARE_PART = Convert.ToString(dt_ProductSpareParts.Rows[i]["SPARE_PART"]);
                            rt.PART_QTY = dt_ProductSpareParts.Rows[i]["PART_QTY"] is DBNull ? (int?)null : Convert.ToInt32(dt_ProductSpareParts.Rows[i]["PART_QTY"]);
                            rt.PART_PRICE = dt_ProductSpareParts.Rows[i]["PART_PRICE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_ProductSpareParts.Rows[i]["PART_PRICE"]);
                            rt.HSN_CODE = Convert.ToString(dt_ProductSpareParts.Rows[i]["HSN_CODE"]);
                            rt.SERIAL_NO = Convert.ToString(dt_ProductSpareParts.Rows[i]["SERIAL_NO"]);
                            //rt.PART_TAXABLE_VALUE = dt_ProductSpareParts.Rows[i]["PART_TAXABLE_VALUE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_ProductSpareParts.Rows[i]["PART_TAXABLE_VALUE"]);
                            //rt.PART_TAX_AMOUNT = dt_ProductSpareParts.Rows[i]["PART_TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_ProductSpareParts.Rows[i]["PART_TAX_AMOUNT"]);
                            rt.PART_TAXABLE_VALUE = Convert.ToString(dt_ProductSpareParts.Rows[i]["PART_TAXABLE_VALUE"]);
                            rt.PART_TAX_AMOUNT = Convert.ToString(dt_ProductSpareParts.Rows[i]["PART_TAX_AMOUNT"]);
                            FinalreportList.Add(rt);
                        }

                    }
                    catch (Exception ex)
                    {
                    }

                }
            }
            return FinalreportList;
        }


        //Invoice : Medtronic Accessories
        public static List<IM_MedtronicAccessories> Get_IM_MedtronicAccessories(int? invoiceID, long empID)
        {
            cmd = new SqlCommand("Get_Invoice_MedtronicAccessories", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_ID", empID);
            cmd.Parameters.AddWithValue("@INVOICE_ID", invoiceID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            IM_MedtronicAccessories rt;
            List<IM_MedtronicAccessories> FinalreportList = new List<IM_MedtronicAccessories>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new IM_MedtronicAccessories();
                    try
                    {
                        rt.INVOICE_MED_ACC_ID = Convert.ToInt32(dt.Rows[i]["INVOICE_MED_ACC_ID"]);
                        rt.INVOICE_FOR = (dt.Rows[i]["INVOICE_FOR"].ToString());
                        rt.INVOICE_ID = dt.Rows[i]["INVOICE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["INVOICE_ID"]);
                        rt.MED_ACC_ID = Convert.ToInt32(dt.Rows[i]["MED_ACC_ID"]);
                        rt.ACCESSORY_CODE = (dt.Rows[i]["ACCESSORY_CODE"].ToString());
                        rt.ACCESSORY_NAME = (dt.Rows[i]["ACCESSORY_NAME"].ToString());
                        rt.HSN_CODE = (dt.Rows[i]["HSN_CODE"].ToString());
                        rt.SERIAL_NO = (dt.Rows[i]["SERIAL_NO"].ToString());
                        rt.PART_QTY = Convert.ToInt32(dt.Rows[i]["PART_QTY"]);
                        rt.PART_PRICE = dt.Rows[i]["PART_PRICE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["PART_PRICE"]);
                        rt.EMP_ID = Convert.ToInt32(dt.Rows[i]["EMP_ID"]);
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"].ToString());
                        rt.GST_PERCENTAGE = dt.Rows[i]["GST_PERCENTAGE"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["GST_PERCENTAGE"]);
                        rt.PART_TAXABLE_VALUE = dt.Rows[i]["PART_TAXABLE_VALUE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["PART_TAXABLE_VALUE"]);
                        rt.PART_TAX_AMOUNT = dt.Rows[i]["PART_TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["PART_TAX_AMOUNT"]);
                        rt.BATCH_NO = (dt.Rows[i]["BATCH_NO"].ToString());
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }

            return FinalreportList;
        }
        public static int AddIM_MedtronicAccessories(IM_MedtronicAccessories tb_params)
        {
            try
            {
                cmd = new SqlCommand("Insert_TB_Invoice_MedtronicAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMP_ID", tb_params.EMP_ID);
                cmd.Parameters.AddWithValue("@INVOICE_MED_ACC_ID", tb_params.INVOICE_MED_ACC_ID);
                cmd.Parameters.AddWithValue("@INVOICE_ID", tb_params.INVOICE_ID);
                cmd.Parameters.AddWithValue("@INVOICE_FOR", tb_params.INVOICE_FOR);
                cmd.Parameters.AddWithValue("@MED_ACC_ID", tb_params.MED_ACC_ID);
                cmd.Parameters.AddWithValue("@SERIAL_NO", tb_params.SERIAL_NO);
                cmd.Parameters.AddWithValue("@HSN_CODE", tb_params.HSN_CODE);
                cmd.Parameters.AddWithValue("@PART_QTY", tb_params.PART_QTY);
                cmd.Parameters.AddWithValue("@PART_PRICE", tb_params.PART_PRICE);
                cmd.Parameters.AddWithValue("@BATCH_NO", tb_params.BATCH_NO);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                return i;
            }
            catch (Exception ex)
            {
                throw ex;

            }

        }

        public static int Delete_IM_MedtronicAccessories(string invoiceFor, int imMedtronicAccID,long empId)
        {
            try
            {
                cmd = new SqlCommand("Delete_Invoice_MedtronicAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@INVOICE_FOR", invoiceFor);
                cmd.Parameters.AddWithValue("@INVOICE_MED_ACC_ID", imMedtronicAccID);
                cmd.Parameters.AddWithValue("@EMP_ID", empId);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                return i;
            }
            catch (Exception ex)
            {
                throw ex;

            }

        }

        public static IM_MedtronicAccessories_ForPrint Get_IM_MedtronicAccessories_ForPrint(int invoiceID, long empID)
        {
            cmd = new SqlCommand("Get_Invoice_MedtronicAccessories_ForPrint", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_ID", empID);
            cmd.Parameters.AddWithValue("@INVOICE_ID", invoiceID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            ds = new DataSet();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(ds);
            DataTable dt_DC = new DataTable();
            dt_DC = ds.Tables[0];
            DataTable dt_Product = new DataTable();
            dt_Product = ds.Tables[1];
            con.Close();
            IM_MedtronicAccessories_ForPrint rt;
            rt = new IM_MedtronicAccessories_ForPrint();
            if (dt_DC != null)
            {
                for (int i = 0; i < dt_DC.Rows.Count; i++)
                {
                    try
                    {
                        rt.INVOICE_ID = Convert.ToInt32(dt_DC.Rows[i]["INVOICE_ID"]);
                        rt.INVOICE_NUMBER = Convert.ToString(dt_DC.Rows[i]["INVOICE_NUMBER"]);
                        rt.DC_NUMBER = Convert.ToString(dt_DC.Rows[i]["DC_NUMBER"]);
                        rt.PI_NUMBER = Convert.ToString(dt_DC.Rows[i]["PI_NUMBER"]);
                        rt.INVOICE_DATE = (dt_DC.Rows[i]["INVOICE_DATE"]).ToString();
                        rt.GSTIN_NUMBER = (dt_DC.Rows[i]["GSTIN_NUMBER"]).ToString();
                        rt.CUSTOMER_NAME = (dt_DC.Rows[i]["CUSTOMER_NAME"]).ToString();
                        rt.FIRM_NAME = (dt_DC.Rows[i]["FIRM_NAME"]).ToString();
                        rt.CONTACT_NO = (dt_DC.Rows[i]["CONTACT_NO"]).ToString();
                        rt.CUSTOMER_ADDRESS = (dt_DC.Rows[i]["CUSTOMER_ADDRESS"]).ToString();
                        rt.ZIP_CODE = (dt_DC.Rows[i]["ZIP_CODE"]).ToString();
                        rt.BANK_ID = Convert.ToInt64(dt_DC.Rows[i]["BANK_ID"]);
                        rt.CUSTOMER_CONSIGNEE_ADDRESS = (dt_DC.Rows[i]["CUSTOMER_CONSIGNEE_ADDRESS"]).ToString();
                        rt.CONSIGNEE_ZIP_CODE = (dt_DC.Rows[i]["CONSIGNEE_ZIP_CODE"]).ToString();
                        rt.DESTINATION = (dt_DC.Rows[i]["DESTINATION"]).ToString();
                        rt.DISPATCHED_THROUGH = (dt_DC.Rows[i]["DISPATCHED_THROUGH"]).ToString();
                        rt.PAYMENT_TERMS_DETAILS = (dt_DC.Rows[i]["PAYMENT_TERMS_DETAILS"]).ToString();
                        rt.TOTAL_AMOUNT = Convert.ToDecimal(dt_DC.Rows[i]["TOTAL_AMOUNT"]);
                        rt.INC_ALL_TAXES = Convert.ToInt32(dt_DC.Rows[i]["INC_ALL_TAXES"]);
                        rt.GST = dt_DC.Rows[i]["GST"] is DBNull ? (int?)null : Convert.ToInt32(dt_DC.Rows[i]["GST"]);
                        rt.TAX_AMOUNT = dt_DC.Rows[i]["TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_DC.Rows[i]["TAX_AMOUNT"]);
                        rt.AMOUNT_INC_TAX = dt_DC.Rows[i]["AMOUNT_INC_TAX"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_DC.Rows[i]["AMOUNT_INC_TAX"]);
                        rt.PNDT_ACKNOWLEDGEMENT_IMAGE = (dt_DC.Rows[i]["PNDT_ACKNOWLEDGEMENT_IMAGE"]).ToString();
                        rt.PNDT_CERTIFICATE_IMAGE = (dt_DC.Rows[i]["PNDT_CERTIFICATE_IMAGE"]).ToString();
                        rt.NO_OF_TRANSDUCER = dt_DC.Rows[i]["NO_OF_TRANSDUCER"] is DBNull ? (int?)null : Convert.ToInt32(dt_DC.Rows[i]["NO_OF_TRANSDUCER"]);
                        rt.SERIAL_NO_OF_TUBE = (dt_DC.Rows[i]["SERIAL_NO_OF_TUBE"]).ToString();
                        rt.IS_INVOICE_FOR_SPAREPARTS = dt_DC.Rows[i]["IS_INVOICE_FOR_SPAREPARTS"] is DBNull ? (int?)null : Convert.ToInt32(dt_DC.Rows[i]["IS_INVOICE_FOR_SPAREPARTS"]);
                        rt.WARRANTY_IN_DMY = (dt_DC.Rows[i]["WARRANTY_IN_DMY"]).ToString();
                        rt.WARRANTY_PERIOD = dt_DC.Rows[i]["WARRANTY_PERIOD"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_DC.Rows[i]["WARRANTY_PERIOD"]);
                        rt.WARRANTY_FROM = (dt_DC.Rows[i]["WARRANTY_FROM"]).ToString();
                        rt.WARRANTY_TO = (dt_DC.Rows[i]["WARRANTY_TO"]).ToString();
                        rt.INSTALLATION_DATE = (dt_DC.Rows[i]["INSTALLATION_DATE"]).ToString();
                        rt.PO_NUMBER = (dt_DC.Rows[i]["PO_NUMBER"]).ToString();
                        rt.PO_DATE = (dt_DC.Rows[i]["PO_DATE"]).ToString();
                        rt.PNDT_NO = (dt_DC.Rows[i]["PNDT_NO"]).ToString();
                        rt.PNDT_ACK_NO = (dt_DC.Rows[i]["PNDT_ACK_NO"]).ToString();
                        rt.COMMENTS = (dt_DC.Rows[i]["COMMENTS"]).ToString();
                        rt.ProductList = IM_MedtronicAccessories_Products(dt_Product);
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
            return rt;
        }
        public static List<IM_MedtronicAccessories_Products> IM_MedtronicAccessories_Products(DataTable dt)
        {
            IM_MedtronicAccessories_Products rt;
            List<IM_MedtronicAccessories_Products> FinalreportList = new List<IM_MedtronicAccessories_Products>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new IM_MedtronicAccessories_Products();
                    try
                    {
                        int recIndex = FinalreportList.FindIndex(x => x.MED_ACC_ID == Convert.ToInt32(dt.Rows[i]["MED_ACC_ID"]));
                        if (recIndex == -1)
                        {
                            rt.MED_ACC_ID = Convert.ToInt32(dt.Rows[i]["MED_ACC_ID"]);
                            rt.INVOICE_FOR = (dt.Rows[i]["INVOICE_FOR"].ToString());
                            rt.ACCESSORY_CODE = (dt.Rows[i]["ACCESSORY_CODE"].ToString());
                            rt.ACCESSORY_NAME = (dt.Rows[i]["ACCESSORY_NAME"].ToString());
                            rt.HSN_CODE = (dt.Rows[i]["HSN_CODE"].ToString());
                            //rt.SERIAL_NO = (dt.Rows[i]["SERIAL_NO"].ToString());
                            
                            //rt.CAT_ID = dt.Rows[i]["CAT_ID"] is DBNull ? (long?)null : Convert.ToInt32(dt.Rows[i]["CAT_ID"]);
                            //rt.CAT_NAME = Convert.ToString(dt.Rows[i]["CAT_NAME"]);
                            //rt.IS_WITH_PROBE = dt.Rows[i]["IS_WITH_PROBE"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["IS_WITH_PROBE"]);
                            rt.GST_PERCENTAGE = Convert.ToInt32(dt.Rows[i]["GST_PERCENTAGE"]);
                            rt.PART_QTY = Convert.ToInt32(dt.Rows[i]["PART_QTY"]);
                            rt.PART_TAXABLE_VALUE = dt.Rows[i]["PART_TAXABLE_VALUE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["PART_TAXABLE_VALUE"]);
                            rt.PART_TAX_AMOUNT = dt.Rows[i]["PART_TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["PART_TAX_AMOUNT"]);
                            rt.BATCH_NO = (dt.Rows[i]["BATCH_NO"].ToString());
                            rt.EXPIRY_DATE = (dt.Rows[i]["EXPIRY_DATE"].ToString());
                            rt.MRP = (dt.Rows[i]["MRP"].ToString());

                            rt.SerialNoList = new List<IM_MedtronicAccessories_SerialNo> {
                            new IM_MedtronicAccessories_SerialNo{ SERIAL_NO = (dt.Rows[i]["SERIAL_NO"].ToString()), BATCH_NO = (dt.Rows[i]["BATCH_NO"].ToString())} };
                            FinalreportList.Add(rt);
                        }
                        else
                        {
                            FinalreportList[recIndex].PART_QTY = /*FinalreportList[recIndex].PART_QTY +*/ Convert.ToInt32(dt.Rows[i]["PART_QTY"]);

                            FinalreportList[recIndex].PART_TAXABLE_VALUE = FinalreportList[recIndex].PART_TAXABLE_VALUE + (dt.Rows[i]["PART_TAXABLE_VALUE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["PART_TAXABLE_VALUE"]));
                            FinalreportList[recIndex].PART_TAX_AMOUNT = FinalreportList[recIndex].PART_TAX_AMOUNT + (dt.Rows[i]["PART_TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["PART_TAX_AMOUNT"]));

                            FinalreportList[recIndex].SerialNoList.Add(
                            new IM_MedtronicAccessories_SerialNo { SERIAL_NO = (dt.Rows[i]["SERIAL_NO"].ToString()), BATCH_NO = (dt.Rows[i]["BATCH_NO"].ToString()) });
                        }
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
            return FinalreportList;
        }

        public static int DeleteUploadedDocument(DeleteUploadedDocumentParams tb_params)
        {
            try
            {
                cmd = new SqlCommand("Delete_UploadedDocuments", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@DELETE_DOC_FOR", tb_params.DELETE_DOC_FOR); //Quotation / AMC-CMS / Receipt
                cmd.Parameters.AddWithValue("@RECORD_ID", tb_params.RECORD_ID); //Null / 1 / 2
                cmd.Parameters.AddWithValue("@DOCUMENT_TYPE", tb_params.DOCUMENT_TYPE); //Null / 1 / 2
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                return i;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //////////////////////////////////////////

        public static List<StockPartSerialNoList> GetPartSerialNoListById(long id, int? INVOICE_ACCESSORIES_ID, int? INVOICE_SPAREPART_ID, int? invoiceID, long? P_STOCK_ID,string CUSTOMER_TYPE)
        {
            cmd = new SqlCommand("Panel_GetPartSerialNoList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PART_ID", id);
            cmd.Parameters.AddWithValue("@INVOICE_ACCESSORIES_ID", INVOICE_ACCESSORIES_ID);
            cmd.Parameters.AddWithValue("@INVOICE_SPAREPART_ID", INVOICE_SPAREPART_ID);
            cmd.Parameters.AddWithValue("@INVOICE_ID", invoiceID);
            cmd.Parameters.AddWithValue("@P_STOCK_ID", P_STOCK_ID);
            cmd.Parameters.AddWithValue("@CUSTOMER_TYPE", CUSTOMER_TYPE);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            StockPartSerialNoList rt;
            List<StockPartSerialNoList> FinalreportList = new List<StockPartSerialNoList>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new StockPartSerialNoList();
                    try
                    {

                        rt.SP_STOCK_ID = Convert.ToInt64(dt.Rows[i]["SP_STOCK_ID"]);
                        rt.SP_STOCK_NO = dt.Rows[i]["SP_STOCK_NO"].ToString();
                        rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.PART_ID = Convert.ToInt64(dt.Rows[i]["PART_ID"]);
                        rt.PART_TYPE_ID = Convert.ToInt32(dt.Rows[i]["PART_TYPE_ID"]);
                        rt.PART_SERIAL_NO = dt.Rows[i]["PART_SERIAL_NO"].ToString();
                        rt.PART_PRICE = dt.Rows[i]["PART_PRICE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["PART_PRICE"]);
                        rt.HSN_CODE = dt.Rows[i]["HSN_CODE"].ToString();
                        rt.INVOICE_ID = dt.Rows[i]["INVOICE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["INVOICE_ID"]);
                        rt.ASSIGN_TO = dt.Rows[i]["ASSIGN_TO"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["ASSIGN_TO"]);
                        rt.ASSIGN_ON_DATE = dt.Rows[i]["ASSIGN_ON_DATE"].ToString();
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }

            return FinalreportList;
        }

        public static List<StockProductSerialNoList> GetProductSerialNoListById(long id, int? invoiceID)
        {
            cmd = new SqlCommand("Panel_GetProductSerialNoList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PART_ID", id);
            cmd.Parameters.AddWithValue("@INVOICE_ID", invoiceID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            StockProductSerialNoList rt;
            List<StockProductSerialNoList> FinalreportList = new List<StockProductSerialNoList>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new StockProductSerialNoList();
                    try
                    {
                        rt.P_STOCK_ID = Convert.ToInt64(dt.Rows[i]["P_STOCK_ID"]);
                        rt.P_STOCK_NO = dt.Rows[i]["P_STOCK_NO"].ToString();
                        rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.P_SERIAL_NO = dt.Rows[i]["P_SERIAL_NO"].ToString();
                        rt.HSN_CODE = dt.Rows[i]["HSN_CODE"].ToString();
                        rt.INVOICE_ID = dt.Rows[i]["INVOICE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["INVOICE_ID"]);
                        rt.ASSIGN_TO = dt.Rows[i]["ASSIGN_TO"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["ASSIGN_TO"]);
                        rt.ASSIGN_ON_DATE = dt.Rows[i]["ASSIGN_ON_DATE"].ToString();
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }

            return FinalreportList;
        }



        public static List<StockPartSerialNoList> GetMedtronicPartSerialNoListById(long id, int? INVOICE_ACCESSORIES_ID, int? invoiceID, long? P_STOCK_ID, string CUSTOMER_TYPE)
        {
            cmd = new SqlCommand("Panel_GetMedtronicPartSerialNoList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PART_ID", id);
            cmd.Parameters.AddWithValue("@INVOICE_ACCESSORIES_ID", INVOICE_ACCESSORIES_ID);
            cmd.Parameters.AddWithValue("@INVOICE_ID", invoiceID);
            cmd.Parameters.AddWithValue("@P_STOCK_ID", P_STOCK_ID);
            cmd.Parameters.AddWithValue("@CUSTOMER_TYPE", CUSTOMER_TYPE);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            StockPartSerialNoList rt;
            List<StockPartSerialNoList> FinalreportList = new List<StockPartSerialNoList>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new StockPartSerialNoList();
                    try
                    {

                        rt.SP_STOCK_ID = Convert.ToInt64(dt.Rows[i]["SP_STOCK_ID"]);
                        rt.SP_STOCK_NO = dt.Rows[i]["SP_STOCK_NO"].ToString();
                        rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.PART_ID = Convert.ToInt64(dt.Rows[i]["PART_ID"]);
                        rt.PART_TYPE_ID = Convert.ToInt32(dt.Rows[i]["PART_TYPE_ID"]);
                        rt.PART_SERIAL_NO = dt.Rows[i]["PART_SERIAL_NO"].ToString();
                        rt.PART_PRICE = dt.Rows[i]["PART_PRICE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["PART_PRICE"]);
                        rt.HSN_CODE = dt.Rows[i]["HSN_CODE"].ToString();
                        rt.INVOICE_ID = dt.Rows[i]["INVOICE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["INVOICE_ID"]);
                        rt.ASSIGN_TO = dt.Rows[i]["ASSIGN_TO"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["ASSIGN_TO"]);
                        rt.ASSIGN_ON_DATE = dt.Rows[i]["ASSIGN_ON_DATE"].ToString();
                        rt.BATCH_NO = dt.Rows[i]["BATCH_NO"].ToString();
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }

            return FinalreportList;
        }
    }
}