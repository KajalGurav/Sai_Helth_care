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
using OfficeOpenXml;

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

        private static readonly Dictionary<string, int> CustomerTypeMapping = new Dictionary<string, int>
        {
            { "Regular", 1 },{ "AERB", 2 },{ "Medtronic", 3 },{ "Carestream", 4 },{ "Mindray", 5 }
        };

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

        public ActionResult InvoiceMasterExport(string CustType, int invoiceno)
        {
            // Set the license context for EPPlus
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            // Check if the CustType exists in the dictionary
            if (!CustomerTypeMapping.TryGetValue(CustType, out int invoiceId))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "Invalid customer type");
            }

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("InvoiceData");

                // Fetch data from the database, filtering by customer name and customer type
                var query = from im in db.TB_InvoiceMaster
                            join cm in db.Tb_CustomerMaster on im.Customer_ID equals cm.Customer_ID into cmGroup
                            from cm in cmGroup.DefaultIfEmpty()
                            join em in db.Tb_EmployeeMaster on im.EMP_ID equals em.EMP_ID into emGroup
                            from em in emGroup.DefaultIfEmpty()
                            join fm in db.Tb_FirmMaster on im.F_ID equals fm.F_ID into fmGroup
                            from fm in fmGroup.DefaultIfEmpty()
                            join city in db.TB_CityMaster on cm.CITY_ID equals city.CITY_ID into cityGroup
                            from city in cityGroup.DefaultIfEmpty()
                            join sCity in db.TB_CityMaster on cm.SHIP_CITY_ID equals sCity.CITY_ID into sCityGroup
                            from sCity in sCityGroup.DefaultIfEmpty()
                            where im.INVOICE_ID == invoiceId && cm.CUSTOMER_NAME.Contains(CustType)
                            select new
                            {
                                im.INVOICE_ID,
                                im.INVOICE_NUMBER,
                                INVOICE_DATE = im.INVOICE_DATE.HasValue ? im.INVOICE_DATE.Value.ToString("dd/MM/yyyy") : "",
                                cm.CUSTOMER_NAME,
                                fm.FIRM_NAME,
                                cm.CONTACT_NO,
                                CUSTOMER_ADDRESS = cm.BILLING_ADDRESS + ", " + city.CITY_NAME,
                                CUSTOMER_CONSIGNEE_ADDRESS = (cm.SHIPPING_ADDRESS ?? cm.BILLING_ADDRESS) + ", " + (sCity.CITY_NAME ?? city.CITY_NAME),
                                im.TOTAL_AMOUNT,
                                ENGINEER_NAME = em.EMP_NAME,
                               
                            };

                var result = query.ToList();

                if (!result.Any())
                {
                    return new HttpStatusCodeResult(HttpStatusCode.NotFound, "No records found for the specified customer name.");
                }

                // Set headers in the Excel file
                worksheet.Cells[1, 1].Value = "Sr. No.";
                worksheet.Cells[1, 2].Value = "Invoice No.";
                worksheet.Cells[1, 3].Value = "Invoice Date";
                worksheet.Cells[1, 4].Value = "Customer Name";
                worksheet.Cells[1, 5].Value = "Firm Name";
                worksheet.Cells[1, 6].Value = "Contact No";
                worksheet.Cells[1, 7].Value = "Customer Address";
                worksheet.Cells[1, 8].Value = "Consignee Address";
                worksheet.Cells[1, 9].Value = "Total Amount";
                worksheet.Cells[1, 10].Value = "Engineer Name";
                worksheet.Cells[1, 11].Value = "PO Date";

                // Add data rows
                for (int i = 0; i < result.Count; i++)
                {
                    worksheet.Cells[i + 2, 1].Value = i + 1; // Sr. No.
                    worksheet.Cells[i + 2, 2].Value = result[i].INVOICE_NUMBER;
                    worksheet.Cells[i + 2, 3].Value = result[i].INVOICE_DATE;
                    worksheet.Cells[i + 2, 4].Value = result[i].CUSTOMER_NAME;
                    worksheet.Cells[i + 2, 5].Value = result[i].FIRM_NAME;
                    worksheet.Cells[i + 2, 6].Value = result[i].CONTACT_NO;
                    worksheet.Cells[i + 2, 7].Value = result[i].CUSTOMER_ADDRESS;
                    worksheet.Cells[i + 2, 8].Value = result[i].CUSTOMER_CONSIGNEE_ADDRESS;
                    worksheet.Cells[i + 2, 9].Value = result[i].TOTAL_AMOUNT;
                    worksheet.Cells[i + 2, 10].Value = result[i].ENGINEER_NAME;
                 
                }

                // Auto-fit columns for all the content
                worksheet.Cells.AutoFitColumns();

                // Convert the package to a memory stream
                var stream = new MemoryStream();
                package.SaveAs(stream);
                stream.Position = 0;

                // Generate the file name
                string excelName = $"InvoiceData_{CustType}_{DateTime.Now:yyyyMMddHHmmssfff}.xlsx";

                // Return the Excel file as a download
                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
            }
        }



    }
}