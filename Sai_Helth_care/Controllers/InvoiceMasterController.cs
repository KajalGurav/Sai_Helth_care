using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using static Sai_Helth_care.Models.QuotationDAL;
using System.Net;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class InvoiceMasterController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        // GET: InvoiceMaster
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult TotalRecordCount(SearchQuotationParams tB_Admin)
        {
            try
            {
                int count = InvoiceMasterDAL.GetInvoiceMasterTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult GetInvoiceMasterList(SearchQuotationParams tB_params)
        {
            try
            {
                var invoiceList = InvoiceMasterDAL.GetInvoiceMasterList(tB_params);
                return Json(invoiceList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult GetInvoiceDetailsForUpdate(long INVOICE_ID)
        {
            try
            {
                var invoiceList = InvoiceMasterDAL.GetInvoiceDetailsForUpdate(INVOICE_ID);
                return Json(invoiceList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult GetInvoiceForPrint(long INVOICE_ID)
        {
            try
            {
                var invoiceList = InvoiceMasterDAL.GetInvoiceForPrint(INVOICE_ID);
                return Json(invoiceList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ActionResult AddUpdateInvoice(InvoiceMaster tB_admin)
        {
            try
            {
                long adminId = Convert.ToInt64(Session["EMP_ID"]);
                tB_admin.ADMIN_ID = adminId;
                int i = InvoiceMasterDAL.AddUpdateInvoice(tB_admin);
                if (i == -1)
                {
                    return Json(new { success = false });
                }
                else
                {
                    return Json(new { success = true });
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult GetInvoiceDCById(int id)
        {
            var _getadmin = db.TB_InvoiceMaster.Where(c => c.INVOICE_ID == id).Select(s => new { s.INVOICE_ID, s.CHALLAN_IMAGE }).FirstOrDefault();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateChallanImage(InvoiceMaster tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.CHALLAN_IMAGE == "Yes")
                {
                    string fileName = tB_admin.ImageName2;
                    string extension = tB_admin.ImageExtension2;
                    
                    string fileName1;
                    if (extension.ToLower() == ".pdf")
                    {
                        fileName = "InvoiceDeliveryChallan" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                        tB_admin.CHALLAN_IMAGE = Master.serverurl + "/UploadedImages/PDF/" + fileName;
                        fileName1 = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/UploadedImages/PDF/"), fileName);
                    }
                    else
                    {
                        fileName = "InvoiceDeliveryChallan" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                        tB_admin.CHALLAN_IMAGE = Master.serverurl + "/UploadedImages/" + fileName;
                        fileName1 = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/UploadedImages/"), fileName);
                    }


                    if (tB_admin.CHALLAN_IMAGE != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data2);

                        if (extension.ToLower() == ".pdf")
                        {
                            System.IO.File.WriteAllBytes(HostingEnvironment.MapPath("~/UploadedImages/PDF/" + fileName), imageByteData);

                        }
                        else
                        {
                            MemoryStream mem = new MemoryStream(imageByteData);
                            System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                            if (extension.ToLower() == ".png")
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
                    tB_admin.CHALLAN_IMAGE = "";
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                long adminId = Convert.ToInt64(Session["EMP_ID"]);
                tB_admin.ADMIN_ID = adminId;
                cmd = new SqlCommand("Update_TB_InvoiceDeliveryChallanImage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ADMIN_ID", tB_admin.ADMIN_ID);
                cmd.Parameters.AddWithValue("@CHALLAN_IMAGE", tB_admin.CHALLAN_IMAGE);
                cmd.Parameters.AddWithValue("@INVOICE_ID", tB_admin.INVOICE_ID);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                if (i == -1)
                {
                    return Json(new { success = false });

                }
                else
                {
                    return Json(new { success = true });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult GetInvoiceIRById(int id)
        {
            var _getadmin = db.TB_InvoiceMaster.Where(c => c.INVOICE_ID == id).Select(s => new { s.INVOICE_ID, s.INSTALLATION_REPORT_IMAGE }).FirstOrDefault();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateIRImage(InvoiceMaster tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.INSTALLATION_REPORT_IMAGE == "Yes")
                {
                    string fileName = tB_admin.ImageName3;
                    string extension = tB_admin.ImageExtension3;

                    string fileName1;
                    if (extension.ToLower() == ".pdf")
                    {
                        fileName = "InstallationReport" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                        tB_admin.INSTALLATION_REPORT_IMAGE = Master.serverurl + "/UploadedImages/PDF/" + fileName;
                        fileName1 = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/UploadedImages/PDF/"), fileName);
                    }
                    else
                    {
                        fileName = "InstallationReport" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                        tB_admin.INSTALLATION_REPORT_IMAGE = Master.serverurl + "/UploadedImages/" + fileName;
                        fileName1 = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/UploadedImages/"), fileName);
                    }


                    if (tB_admin.INSTALLATION_REPORT_IMAGE != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data3);

                        if (extension.ToLower() == ".pdf")
                        {
                            System.IO.File.WriteAllBytes(HostingEnvironment.MapPath("~/UploadedImages/PDF/" + fileName), imageByteData);

                        }
                        else
                        {
                            MemoryStream mem = new MemoryStream(imageByteData);
                            System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                            if (extension.ToLower() == ".png")
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
                    tB_admin.INSTALLATION_REPORT_IMAGE = "";
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                long adminId = Convert.ToInt64(Session["EMP_ID"]);
                tB_admin.ADMIN_ID = adminId;
                cmd = new SqlCommand("Update_TB_InvoiceInstallationReportImage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ADMIN_ID", tB_admin.ADMIN_ID);
                cmd.Parameters.AddWithValue("@INSTALLATION_REPORT_IMAGE", tB_admin.INSTALLATION_REPORT_IMAGE);
                cmd.Parameters.AddWithValue("@INVOICE_ID", tB_admin.INVOICE_ID);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                if (i == -1)
                {
                    return Json(new { success = false });

                }
                else
                {
                    return Json(new { success = true });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult Get_IM_SparePartsAndAccessories(long? Q_ID, long ? INVOICE_ID)
        {
            long id = Convert.ToInt32(Session["EMP_ID"]);
            cmd = new SqlCommand("Get_Invoice_SparePartsAndAccessories", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_ID",id);
            cmd.Parameters.AddWithValue("@Q_ID", Q_ID);
            cmd.Parameters.AddWithValue("@INVOICE_ID", INVOICE_ID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            IM_SparePartsAndAccessories rt;
            List<IM_SparePartsAndAccessories> FinalreportList = new List<IM_SparePartsAndAccessories>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new IM_SparePartsAndAccessories();
                    try
                    {
                        rt.INVOICE_FOR = (dt.Rows[i]["INVOICE_FOR"].ToString());
                        rt.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                        rt.INVOICE_ID = dt.Rows[i]["INVOICE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["INVOICE_ID"]);
                        rt.SP_ACCESSORIES_ID = Convert.ToInt32(dt.Rows[i]["SP_ACCESSORIES_ID"]);
                        rt.SP_ACCESSORIES_NAME = (dt.Rows[i]["SP_ACCESSORIES_NAME"].ToString());
                        rt.PART_QTY = Convert.ToInt32(dt.Rows[i]["PART_QTY"]);
                        rt.PART_PRICE = Convert.ToDecimal(dt.Rows[i]["PART_PRICE"]);
                        rt.HSN_CODE = Convert.ToString(dt.Rows[i]["HSN_CODE"]);
                        rt.SERIAL_NO = Convert.ToString(dt.Rows[i]["SERIAL_NO"]);
                        rt.EMP_ID = Convert.ToInt32(dt.Rows[i]["EMP_ID"]);
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            var _Monthlyreport = FinalreportList;
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }
       
        public JsonResult AddPartsAccessories(InvoicePartsAccessories tb_AddPartsAccessories)
        {
            try
            {
                cmd = new SqlCommand("Insert_TB_InvoicePartsAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMP_ID", Convert.ToInt32(Session["EMP_ID"]));
                cmd.Parameters.AddWithValue("@INVOICE_ID", tb_AddPartsAccessories.INVOICE_ID);
                cmd.Parameters.AddWithValue("@INVOICE_For", tb_AddPartsAccessories.INVOICE_For);
                cmd.Parameters.AddWithValue("@STD_ID", tb_AddPartsAccessories.STD_ID);
                cmd.Parameters.AddWithValue("@SP_ID", tb_AddPartsAccessories.SP_ID);
                cmd.Parameters.AddWithValue("@PART_QTY", tb_AddPartsAccessories.PART_QTY);
                cmd.Parameters.AddWithValue("@PART_PRICE", tb_AddPartsAccessories.PART_PRICE);
                cmd.Parameters.AddWithValue("@HSN_CODE", tb_AddPartsAccessories.HSN_CODE);
                cmd.Parameters.AddWithValue("@SERIAL_NO", tb_AddPartsAccessories.SERIAL_NO);
                cmd.Parameters.AddWithValue("@QUOTATION_ID", tb_AddPartsAccessories.QUOTATION_ID);
                cmd.Parameters.AddWithValue("@Q_ID", tb_AddPartsAccessories.Q_ID);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                return Json(new { success = i });
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public JsonResult Delete_IM_SparePartsAndAccessories(IM_SparePartsAndAccessories tb_IM_SparePartsAndAccessories)
        {
            long EMP_ID = Convert.ToInt64(Session["EMP_ID"]);
            try
            {
                cmd = new SqlCommand("Delete_Invoice_SparePartsAndAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@INVOICE_FOR", tb_IM_SparePartsAndAccessories.INVOICE_FOR);
                cmd.Parameters.AddWithValue("@EMP_ID", EMP_ID);
                cmd.Parameters.AddWithValue("@ID", tb_IM_SparePartsAndAccessories.ID);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                return Json(new { success = i });
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        
        public ActionResult InvoiceAddUpdate()
        {
            return View();
        }

        public ActionResult MedtronicInvoiceAddUpdate()
        {
            return View();
        }

        public JsonResult Get_IM_MedtronicAccessories(int? INVOICE_ID)
        {
            try
            {
                long empId = Convert.ToInt64(Session["EMP_ID"]);
                var deliveryChallanList = InvoiceMasterDAL.Get_IM_MedtronicAccessories(INVOICE_ID, empId);
                return Json(deliveryChallanList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult Add_IM_MedtronicAccessories(IM_MedtronicAccessories tb_AddAccessories)
        {
            try
            {
                int empId = Convert.ToInt32(Session["EMP_ID"]);
                tb_AddAccessories.EMP_ID = empId;
                int i = InvoiceMasterDAL.AddIM_MedtronicAccessories(tb_AddAccessories);
                return Json(new { success = i });

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult Delete_IM_MedtronicAccessories(IM_MedtronicAccessories tb_IM_Accessories)
        {
            try
            {
                long empId = Convert.ToInt64(Session["EMP_ID"]);
                int i = InvoiceMasterDAL.Delete_IM_MedtronicAccessories(tb_IM_Accessories.INVOICE_FOR, tb_IM_Accessories.INVOICE_MED_ACC_ID, empId);
                return Json(new { success = i });
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public JsonResult Get_IM_MedtronicAccessories_ForPrint(int INVOICE_ID)
        {
            try
            {
                int empId = Convert.ToInt32(Session["EMP_ID"]);
                var invoiceList = InvoiceMasterDAL.Get_IM_MedtronicAccessories_ForPrint(INVOICE_ID, empId);
                return Json(invoiceList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult DeleteUploadedDocument(DeleteUploadedDocumentParams tb_Admin)
        {
            try
            {
                int i = InvoiceMasterDAL.DeleteUploadedDocument(tb_Admin);
                return Json(new { success = i });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ActionResult DownloadDocument(string FilePath)
        {
            try 
            {
                using (var client = new WebClient())
                {
                    byte[] fileBytes = client.DownloadData(FilePath);
                    string fileName = FilePath.Substring(FilePath.LastIndexOf('/') + 1);
                    string fileExtension = FilePath.Substring(FilePath.LastIndexOf('.') + 1);
                    string contentType = string.Empty;
                    // Setting the content disposition header
                    Response.AddHeader("Content-Disposition", "attachment; filename=" + fileName);
                    if (fileExtension == "pdf")
                    {
                        contentType = "application/pdf";
                    }
                    else if (fileExtension == "jpeg" || fileExtension == "jpg")
                    {
                        contentType = "image/jpeg";
                    }
                    else if (fileExtension == "png")
                    {
                        contentType = "image/png";
                    }
                    return File(fileBytes, contentType);
                }
            }
            catch(Exception ex)
            {
                return null;
            }
            
        }

        public JsonResult GetPartSerialNoListById(long id, int? INVOICE_ACCESSORIES_ID, int? INVOICE_SPAREPART_ID, int? invoiceID, long? P_STOCK_ID, string CUSTOMER_TYPE)
        {
            try
            {
                var serialNoList = InvoiceMasterDAL.GetPartSerialNoListById(id, INVOICE_ACCESSORIES_ID, INVOICE_SPAREPART_ID, invoiceID, P_STOCK_ID, CUSTOMER_TYPE);
                return Json(serialNoList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult UpdatePartsAccessories(IM_SparePartsAndAccessories tb_AddPartsAccessories)
        {
            try
            {
                cmd = new SqlCommand("Update_TB_InvoicePartsAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@INVOICE_PART_ID", tb_AddPartsAccessories.ID);
                cmd.Parameters.AddWithValue("@EMP_ID", Convert.ToInt32(Session["EMP_ID"]));
                cmd.Parameters.AddWithValue("@INVOICE_ID", tb_AddPartsAccessories.INVOICE_ID);
                cmd.Parameters.AddWithValue("@INVOICE_For", tb_AddPartsAccessories.INVOICE_FOR);
                cmd.Parameters.AddWithValue("@PART_PRICE", tb_AddPartsAccessories.PART_PRICE);
                cmd.Parameters.AddWithValue("@HSN_CODE", tb_AddPartsAccessories.HSN_CODE);
                cmd.Parameters.AddWithValue("@SERIAL_NO", tb_AddPartsAccessories.SERIAL_NO);
                cmd.Parameters.AddWithValue("@BATCH_NO", tb_AddPartsAccessories.BATCH_NO);
                cmd.Parameters.AddWithValue("@EXPIRY_DATE", tb_AddPartsAccessories.EXPIRY_DATE1);
                cmd.Parameters.AddWithValue("@MRP", tb_AddPartsAccessories.MRP1);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                return Json(new { success = i });
            }
            catch (Exception ex)
            {
                throw ex;

            }

        }

        public JsonResult GetProductSerialNoListById(long id, int? invoiceID)
        {
            try
            {
                var serialNoList = InvoiceMasterDAL.GetProductSerialNoListById(id, invoiceID);
                return Json(serialNoList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult GetMedtronicPartSerialNoListById(long id, int? INVOICE_ACCESSORIES_ID, int? invoiceID, long? P_STOCK_ID, string CUSTOMER_TYPE)
        {
            try
            {
                var serialNoList = InvoiceMasterDAL.GetMedtronicPartSerialNoListById(id, INVOICE_ACCESSORIES_ID,  invoiceID, P_STOCK_ID, CUSTOMER_TYPE);
                return Json(serialNoList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}