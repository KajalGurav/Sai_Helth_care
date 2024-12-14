using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using Sai_Helth_care.Models;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.Remoting.Lifetime;
using System.Web.Hosting;
using System.Globalization;
using static Sai_Helth_care.Models.CustomerDAL;
using static Sai_Helth_care.Models.QuotationDAL;
using System.Text;

using OfficeOpenXml;
using System.Web.Helpers;
using Microsoft.Ajax.Utilities;
using System.Net;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Customer_MasterController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        private static SqlCommand cmd;
        private static SqlDataAdapter sda;
        private static SqlDataReader sdr;
        private static DataTable dt, dt1;
        private DataSet ds = new DataSet();

        private static readonly Dictionary<string, int> CustomerTypeMapping = new Dictionary<string, int>
        {
            { "Regular", 1 },{ "AERB", 2 },{ "Medtronic", 3 },{ "Carestream", 4 },{ "Mindray", 5 }
        };

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult TotalRecordCount(SearchCustomersParams tB_Admin)
        {
            try
            {
                int count = CustomerDAL.GetCustomersTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult GetAllCustomers(SearchCustomersParams tB_params)
        {
            try
            {
                var customerList = CustomerDAL.GetCustomerList(tB_params);
                return Json(customerList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ActionResult AddAdmin(CustomerMaster tB_admin)
        {
            try
            {
                int i = CustomerDAL.AddCustomer(tB_admin);
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

        [NonAction]
        public int AddFirm(CustomerMaster tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Insert_Into_Tb_FirmMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FIRM_NAME", tB_admin.FIRM_NAME);
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", 1);
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tB_admin.CUSTOMER_NAME);
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
                    return i;
                }
                else
                {
                    return i;
                }
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public JsonResult GetState()
        {
            var _getadmin = db.TB_StateMaster
                .Where(z => z.STATUS == "Active")
                .OrderBy(s => s.STATE_NAME) // Order by state name
                .Select(s => new { s.STATE_ID, s.STATE_NAME, s.STATUS, s.REG_DATE })
                .ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCity(long id)
        {
            var _getadmin = db.TB_CityMaster
                .Where(z => z.STATUS == "Active" && z.STATE_ID == id)
                .OrderBy(s => s.CITY_NAME) // Order by city name
                .Select(s => new { s.STATE_ID, s.CITY_ID, s.CITY_NAME, s.STATUS, s.REG_DATE })
                .ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public ActionResult EditAdmin(CustomerMaster tB_admin)
        {
            try
            {
                int i = CustomerDAL.UpdateCustomer(tB_admin);
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

        [NonAction]
        public int EditFirm(CustomerMaster tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Insert_Into_Tb_FirmMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FIRM_NAME", tB_admin.FIRM_NAME);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.Customer_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", 3);
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
                    return i;
                }
                else
                {
                    return i;
                }
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public ActionResult AERBCustomer()
        {
            return View();
        }

        public ActionResult Medtronic()
        {
            return View();
        }

        public ActionResult Carestream()
        {
            return View();
        }

        //public ActionResult CustomerDetails()
        //{
        //    return View();
        //}

        public ActionResult CustomerDetails(string CustType)
        {
            Session["CustType"] = CustType;
            return View();
        }

        public JsonResult GetCustomerDetailsForUpdate(long customerID)
        {
            try
            {
                var customerDetails = CustomerDAL.GetCustomerDetailsForUpdate(customerID);
                return Json(customerDetails, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult GetCustomerDetails(long id)
        {
            try
            {
                var customerList = CustomerDAL.GetCustomerDetails(id);
                return Json(customerList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult GetCustomerQuoteDetails(long id)
        {
            try
            {
                var customerList = QuotationDAL.GetCustomerQuotationList(id);
                return Json(customerList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult GetCustomerList()
        {
            long c_id = Convert.ToInt64(Session["COMPANY_ID"]);
            var _getadmin = db.Tb_CustomerMaster.Where(z => z.STATUS == "Active" && z.COMPANY_ID == c_id).OrderBy(o => o.CUSTOMER_NAME).Select(s => new { s.Customer_ID, s.CUSTOMER_NAME, s.FIRM_NAME, s.CUSTOMER_TYPE_ID, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFirmList(long? id)
        {
            if (id == 0 || id == null)
            {
                var _getadmin = db.Tb_FirmMaster.Where(z => z.STATUS == "Active").Select(s => new { s.CUSTOMER_ID, s.F_ID, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var _getadmin = db.Tb_FirmMaster.Where(z => z.STATUS == "Active" && z.CUSTOMER_ID == id).Select(s => new { s.CUSTOMER_ID, s.F_ID, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetCompanyDetails()
        {
            int cid = Convert.ToInt32(Session["COMPANY_ID"]);
            var _getcompanyDetails = db.TB_CompanyMaster.Where(z => z.COMPANY_ID == cid).Select(a => new { a.COMPANY_ID, a.COMPANY_REG_ADDRESS, a.ZIP_CODE, a.COMPANY_NAME, a.COMPANY_LETTERHEAD }).FirstOrDefault();
            return Json(_getcompanyDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GenerateUniqueCode(GenerateUniqueCodeParams tb_Admin)
        {
            try
            {
                long companyID = Convert.ToInt64(Session["COMPANY_ID"]);
                var customerList = QuotationDAL.GenerateUniqueCode(tb_Admin, companyID);
                return Json(customerList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ActionResult UpdateQuotationPODetails(QuotationMaster tB_admin)
        {
            try
            {
                long id1 = Convert.ToInt64(Session["Q_ID"]);
                if (tB_admin.Q_ID.ToString() != string.Empty)
                {
                    id1 = tB_admin.Q_ID;
                }
                cmd = new SqlCommand("Update_Tb_AllQuotationPO", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PO_DATE", DateTime.ParseExact(tB_admin.PO_DATE, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                cmd.Parameters.AddWithValue("@AMOUNT_WITHOUT_TAX", tB_admin.AMOUNT_WITHOUT_TAX);
                cmd.Parameters.AddWithValue("@TAX_AMOUNT", tB_admin.TAX_AMOUNT);
                cmd.Parameters.AddWithValue("@AMOUNT_WITH_TAX", tB_admin.AMOUNT_WITH_TAX);
                cmd.Parameters.AddWithValue("@PAYMENT_TERM_DETAILS", tB_admin.PAYMENT_TERM_DETAILS);
                cmd.Parameters.AddWithValue("@QUOTATION_NO", tB_admin.QUOTATION_NO);
                cmd.Parameters.AddWithValue("@NOTE", tB_admin.NOTE);
                cmd.Parameters.AddWithValue("@Q_ID", id1);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE", tB_admin.CUSTOMER_TYPE_ID);
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
            }
            return View("Index");
        }

        public ActionResult AERBCustomerDetails()
        {
            return View();
        }

        public ActionResult MindrayCustomerDetails()
        {
            return View();
        }

        public ActionResult AddUpdateCustomer()
        {
            return View();
        }

        public string ChangeStatus(long id)
        {
            Tb_CustomerMaster tB_admin = db.Tb_CustomerMaster.Where(b => b.Customer_ID == id).SingleOrDefault();
            if (tB_admin.STATUS == "Active")
            {
                tB_admin.STATUS = "Deactive";
                db.SaveChanges();
            }
            else
            {
                tB_admin.STATUS = "Active";
                db.SaveChanges();
            }
            return "Status change Successfully.";
        }

        public JsonResult GetProductList1(long id)
        {
            string CustType = Convert.ToString(Session["CustType"]);

            if (CustType == "Regular")
            {
                var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active" && z.CAT_ID == id && z.PT_ID == 1).OrderBy(o => o.PRODUCT_NAME).Select(s => new { s.P_ID, s.CAT_ID, s.PRODUCT_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            else if (CustType == "Mindray")
            {
                var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active" && z.CAT_ID == id && z.PT_ID == 2).OrderBy(o => o.PRODUCT_NAME).Select(s => new { s.P_ID, s.CAT_ID, s.PRODUCT_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active" && z.CAT_ID == id).OrderBy(o => o.PRODUCT_NAME).Select(s => new { s.P_ID, s.CAT_ID, s.PRODUCT_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult CustomerMasterExport(CustomerMaster tB_Admin)    /*Added By Kajal Gurav 22/08/2023*/
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                string sFileName = "Product Stock Report.xls";
                sb.Append("<table style='1px solid black; font-size:12px;' border='1'>");
                sb.Append("<tr>");
                sb.Append("<td><b>Sr. No.</b></td>");
                sb.Append("<td><b>Customer Name</b></td>");
                sb.Append("<td><b>Firm Name</b></td>");
                sb.Append("<td><b>Firm Place</b></td>");
                sb.Append("<td><b>Contact No.</b></td>");
                sb.Append("<td><b>Email Id</b></td>");
                sb.Append("<td><b>GST NO.</b></td>");
                sb.Append("<td><b>Status</b></td>");
                sb.Append("<td><b>Reg Date</b></td>");

                sb.Append("</tr>");

                cmd = new SqlCommand("ExportCustomerData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@SEARCH_NAME", tB_Admin.CUSTOMER_NAME);

                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                sda = new SqlDataAdapter(cmd);
                dt = new DataTable();
                sda.Fill(dt);
                con.Close();
                CustomerMaster rt;
                if (dt != null)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        rt = new CustomerMaster();

                        rt.Customer_ID = Convert.ToInt32(dt.Rows[i]["Customer_ID"]);
                        rt.CUSTOMER_NAME = dt.Rows[i]["CUSTOMER_NAME"].ToString();

                        rt.FIRM_NAME = dt.Rows[i]["FIRM_NAME"].ToString();
                        rt.EMAIL = dt.Rows[i]["EMAIL"].ToString();
                        rt.CONTACT_NO = dt.Rows[i]["CONTACT_NO"].ToString();
                        rt.GST_NO = dt.Rows[i]["GST_NO"].ToString();
                        rt.STATUS = dt.Rows[i]["STATUS"].ToString();
                        rt.REG_DATE = dt.Rows[i]["REG_DATE"].ToString();

                        sb.Append("<tr>");
                        sb.Append("<td>" + (i + 1) + "</td>");
                        sb.Append("<td>" + rt.Customer_ID + "</td>");
                        sb.Append("<td>" + rt.CUSTOMER_NAME + "</td>");

                        sb.Append("<td>" + rt.FIRM_NAME + "</td>");
                        sb.Append("<td>" + rt.EMAIL + "</td>");
                        sb.Append("<td>" + rt.CONTACT_NO + "</td>");
                        sb.Append("<td>" + rt.GST_NO + "</td>");
                        sb.Append("<td>" + rt.STATUS + "</td>");
                        sb.Append("<td>" + rt.REG_DATE + "</td>");

                        sb.Append("</tr>");
                    }
                }
                sb.Append("</table>");

                HttpContext.Response.AddHeader("content-disposition", "attachment; filename=" + sFileName);
                this.Response.ContentType = "application/vnd.ms-excel";
                byte[] buffer = System.Text.Encoding.UTF8.GetBytes(sb.ToString());
                return File(buffer, "application/vnd.ms-excel");
            }
            catch (Exception ex)
            {
                return HttpNotFound("No data found");
            }
        }

        //public ActionResult ExportToExcel(string CustType)
        //{
        //    // Set the license context
        //    ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

        //    // Check if the CustType exists in the dictionary
        //    if (!CustomerTypeMapping.TryGetValue(CustType, out int customerTypeId))
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "Invalid customer type");
        //    }

        //    using (var package = new ExcelPackage())
        //    {
        //        var worksheet = package.Workbook.Worksheets.Add("CustomerData");

        //        // Fetch data from the database
        //        var customers = db.Tb_CustomerMaster.Where(c => c.CUSTOMER_TYPE_ID == customerTypeId).ToList();

        //        // Add headers
        //        worksheet.Cells[1, 1].Value = "Customer ID";
        //        worksheet.Cells[1, 2].Value = "Customer Name";
        //        worksheet.Cells[1, 3].Value = "Firm Name";
        //        worksheet.Cells[1, 4].Value = "Contact No";
        //        worksheet.Cells[1, 5].Value = "Alternate Contact No";
        //        worksheet.Cells[1, 6].Value = "Email";
        //        worksheet.Cells[1, 7].Value = "Alternate Email";
        //        worksheet.Cells[1, 8].Value = "Billing Address";
        //        worksheet.Cells[1, 9].Value = "Shipping Address";
        //        worksheet.Cells[1, 10].Value = "State ID";
        //        worksheet.Cells[1, 11].Value = "City ID";
        //        worksheet.Cells[1, 12].Value = "Zip Code";
        //        worksheet.Cells[1, 13].Value = "Degree of Customer";
        //        worksheet.Cells[1, 14].Value = "PAN No";
        //        worksheet.Cells[1, 15].Value = "GST No";
        //        worksheet.Cells[1, 16].Value = "TIN No";
        //        worksheet.Cells[1, 17].Value = "PNDT No";
        //        worksheet.Cells[1, 18].Value = "PNDT Validity";
        //        worksheet.Cells[1, 19].Value = "Upload PNDT Certificate";
        //        worksheet.Cells[1, 20].Value = "Upload PAN Certificate";
        //        worksheet.Cells[1, 21].Value = "Address";
        //        worksheet.Cells[1, 22].Value = "Unit";
        //        worksheet.Cells[1, 23].Value = "Add Equipment";
        //        worksheet.Cells[1, 24].Value = "Elora User ID";
        //        worksheet.Cells[1, 25].Value = "Elora Password";
        //        worksheet.Cells[1, 26].Value = "No of TLD";
        //        worksheet.Cells[1, 27].Value = "Document Status";
        //        worksheet.Cells[1, 28].Value = "Registration Status";
        //        worksheet.Cells[1, 29].Value = "Report Status";
        //        worksheet.Cells[1, 30].Value = "Total Amount";
        //        worksheet.Cells[1, 31].Value = "Balance Payment";
        //        worksheet.Cells[1, 32].Value = "Cheque No";
        //        worksheet.Cells[1, 33].Value = "QA Done By";
        //        worksheet.Cells[1, 34].Value = "QA Done On Date";
        //        worksheet.Cells[1, 35].Value = "QA Sale Person";
        //        worksheet.Cells[1, 36].Value = "QA Due Date";
        //        worksheet.Cells[1, 37].Value = "QA Person Commission";
        //        worksheet.Cells[1, 38].Value = "Upload Document";
        //        worksheet.Cells[1, 39].Value = "Comment";
        //        worksheet.Cells[1, 40].Value = "Branch Name";
        //        worksheet.Cells[1, 41].Value = "Status";
        //        worksheet.Cells[1, 42].Value = "Reg Date";
        //        worksheet.Cells[1, 43].Value = "Company ID";
        //        worksheet.Cells[1, 44].Value = "Shipping Zip Code";
        //        worksheet.Cells[1, 45].Value = "Ship State ID";
        //        worksheet.Cells[1, 46].Value = "Ship City ID";
        //        worksheet.Cells[1, 47].Value = "Customer Type ID";
        //        worksheet.Cells[1, 48].Value = "City Name Delete";
        //        worksheet.Cells[1, 49].Value = "State Name Delete";
        //        worksheet.Cells[1, 50].Value = "Cust Code Delete";

        //        // Add data
        //        for (int i = 0; i < customers.Count; i++)
        //        {
        //            worksheet.Cells[i + 2, 1].Value = customers[i].Customer_ID;
        //            worksheet.Cells[i + 2, 2].Value = customers[i].CUSTOMER_NAME;
        //            worksheet.Cells[i + 2, 3].Value = customers[i].FIRM_NAME;
        //            worksheet.Cells[i + 2, 4].Value = customers[i].CONTACT_NO;
        //            worksheet.Cells[i + 2, 5].Value = customers[i].ALTERNATE_CONTACT_NO;
        //            worksheet.Cells[i + 2, 6].Value = customers[i].EMAIL;
        //            worksheet.Cells[i + 2, 7].Value = customers[i].ALTERNATE_EMAIL;
        //            worksheet.Cells[i + 2, 8].Value = customers[i].BILLING_ADDRESS;
        //            worksheet.Cells[i + 2, 9].Value = customers[i].SHIPPING_ADDRESS;
        //            worksheet.Cells[i + 2, 10].Value = customers[i].STATE_ID;
        //            worksheet.Cells[i + 2, 11].Value = customers[i].CITY_ID;
        //            worksheet.Cells[i + 2, 12].Value = customers[i].ZIP_CODE;
        //            worksheet.Cells[i + 2, 13].Value = customers[i].DEGREE_OF_CUSTOMER;
        //            worksheet.Cells[i + 2, 14].Value = customers[i].PAN_NO;
        //            worksheet.Cells[i + 2, 15].Value = customers[i].GST_NO;
        //            worksheet.Cells[i + 2, 16].Value = customers[i].TIN_NO;
        //            worksheet.Cells[i + 2, 17].Value = customers[i].PNDT_NO;
        //            worksheet.Cells[i + 2, 18].Value = customers[i].PNDT_VALIDITY;
        //            worksheet.Cells[i + 2, 19].Value = customers[i].UPLOAD_PNDT_CERTIFICATE;
        //            worksheet.Cells[i + 2, 20].Value = customers[i].UPLOAD_PAN_CERTIFICATE;
        //            worksheet.Cells[i + 2, 21].Value = customers[i].ADDRESS;
        //            worksheet.Cells[i + 2, 22].Value = customers[i].UNIT;
        //            worksheet.Cells[i + 2, 23].Value = customers[i].ADD_EQUIPMENT;
        //            worksheet.Cells[i + 2, 24].Value = customers[i].ELORA_USER_ID;
        //            worksheet.Cells[i + 2, 25].Value = customers[i].ELORA_PASSWORD;
        //            worksheet.Cells[i + 2, 26].Value = customers[i].NO_OF_TLD;
        //            worksheet.Cells[i + 2, 27].Value = customers[i].DOCUMENT_STATUS;
        //            worksheet.Cells[i + 2, 28].Value = customers[i].REGISTRATION_STATUS;
        //            worksheet.Cells[i + 2, 29].Value = customers[i].REPORT_STATUS;
        //            worksheet.Cells[i + 2, 30].Value = customers[i].TOTAL_AMOUNT;
        //            worksheet.Cells[i + 2, 31].Value = customers[i].BALANCE_PAYMENT;
        //            worksheet.Cells[i + 2, 32].Value = customers[i].CHEQUE_NO;
        //            worksheet.Cells[i + 2, 33].Value = customers[i].QA_DONE_BY;
        //            worksheet.Cells[i + 2, 34].Value = customers[i].QA_DONE_ON_DATE;
        //            worksheet.Cells[i + 2, 35].Value = customers[i].QA_SALE_PERSON;
        //            worksheet.Cells[i + 2, 36].Value = customers[i].QA_DUE_DATE;
        //            worksheet.Cells[i + 2, 37].Value = customers[i].QA_PERSON_COMMISSON;
        //            worksheet.Cells[i + 2, 38].Value = customers[i].UPLOD_DOCUMETN;
        //            worksheet.Cells[i + 2, 39].Value = customers[i].COMMENT;
        //            worksheet.Cells[i + 2, 40].Value = customers[i].BRANCH_NAME;
        //            worksheet.Cells[i + 2, 41].Value = customers[i].STATUS;
        //            worksheet.Cells[i + 2, 42].Value = customers[i].REG_DATE;
        //            worksheet.Cells[i + 2, 43].Value = customers[i].COMPANY_ID;
        //            worksheet.Cells[i + 2, 44].Value = customers[i].SHIPPING_ZIP_CODE;
        //            worksheet.Cells[i + 2, 45].Value = customers[i].SHIP_STATE_ID;
        //            worksheet.Cells[i + 2, 46].Value = customers[i].SHIP_CITY_ID;
        //            worksheet.Cells[i + 2, 47].Value = customers[i].CUSTOMER_TYPE_ID;
        //            worksheet.Cells[i + 2, 48].Value = customers[i].CITY_NAME_DELETE;
        //            worksheet.Cells[i + 2, 49].Value = customers[i].STATE_NAME_DELETE;
        //            worksheet.Cells[i + 2, 50].Value = customers[i].CUST_CODE_DELETE;
        //        }

        //        var stream = new MemoryStream();
        //        package.SaveAs(stream);
        //        stream.Position = 0;

        //        string excelName = $"CustomerData_{CustType}_{DateTime.Now.ToString("yyyyMMddHHmmssfff")}.xlsx";

        //        return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        //    }
        //}
        public ActionResult ExportToExcel(string customerName)
        {
            // Set the license context
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            // Initialize the package
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("CustomerData");

                // Define headers
                worksheet.Cells[1, 1].Value = "Customer ID";
                worksheet.Cells[1, 2].Value = "Customer Name";
                worksheet.Cells[1, 3].Value = "Firm Name";
                worksheet.Cells[1, 4].Value = "Contact No";
                worksheet.Cells[1, 5].Value = "Alternate Contact No";
                worksheet.Cells[1, 6].Value = "Email";
                worksheet.Cells[1, 7].Value = "Alternate Email";
                worksheet.Cells[1, 8].Value = "Billing Address";
                worksheet.Cells[1, 9].Value = "Shipping Address";
                worksheet.Cells[1, 10].Value = "State ID";
                worksheet.Cells[1, 11].Value = "City ID";
                worksheet.Cells[1, 12].Value = "Zip Code";
                worksheet.Cells[1, 13].Value = "Degree of Customer";
                worksheet.Cells[1, 14].Value = "PAN No";
                worksheet.Cells[1, 15].Value = "GST No";
                worksheet.Cells[1, 16].Value = "TIN No";
                worksheet.Cells[1, 17].Value = "PNDT No";
                worksheet.Cells[1, 18].Value = "PNDT Validity";
                worksheet.Cells[1, 19].Value = "Upload PNDT Certificate";
                worksheet.Cells[1, 20].Value = "Upload PAN Certificate";
                worksheet.Cells[1, 21].Value = "Address";
                worksheet.Cells[1, 22].Value = "Unit";
                worksheet.Cells[1, 23].Value = "Add Equipment";
                worksheet.Cells[1, 24].Value = "Elora User ID";
                worksheet.Cells[1, 25].Value = "Elora Password";
                worksheet.Cells[1, 26].Value = "No of TLD";
                worksheet.Cells[1, 27].Value = "Document Status";
                worksheet.Cells[1, 28].Value = "Registration Status";
                worksheet.Cells[1, 29].Value = "Report Status";
                worksheet.Cells[1, 30].Value = "Total Amount";
                worksheet.Cells[1, 31].Value = "Balance Payment";
                worksheet.Cells[1, 32].Value = "Cheque No";
                worksheet.Cells[1, 33].Value = "QA Done By";
                worksheet.Cells[1, 34].Value = "QA Done On Date";
                worksheet.Cells[1, 35].Value = "QA Sale Person";
                worksheet.Cells[1, 36].Value = "QA Due Date";
                worksheet.Cells[1, 37].Value = "QA Person Commission";
                worksheet.Cells[1, 38].Value = "Upload Document";
                worksheet.Cells[1, 39].Value = "Comment";
                worksheet.Cells[1, 40].Value = "Branch Name";
                worksheet.Cells[1, 41].Value = "Status";
                worksheet.Cells[1, 42].Value = "Reg Date";
                worksheet.Cells[1, 43].Value = "Company ID";
                worksheet.Cells[1, 44].Value = "Shipping Zip Code";
                worksheet.Cells[1, 45].Value = "Ship State ID";
                worksheet.Cells[1, 46].Value = "Ship City ID";
                worksheet.Cells[1, 47].Value = "Customer Type ID";
                worksheet.Cells[1, 48].Value = "City Name Delete";
                worksheet.Cells[1, 49].Value = "State Name Delete";
                worksheet.Cells[1, 50].Value = "Cust Code Delete";

                // Fetch data based on the customer name
                var query = db.Tb_CustomerMaster.AsQueryable();

                if (!string.IsNullOrEmpty(customerName))
                {
                    query = query.Where(c => c.CUSTOMER_NAME.Contains(customerName));
                }

                var customers = query.ToList();

                // Add data to worksheet
                for (int i = 0; i < customers.Count; i++)
                {
                    var customer = customers[i];
                    worksheet.Cells[i + 2, 1].Value = customer.Customer_ID;
                    worksheet.Cells[i + 2, 2].Value = customer.CUSTOMER_NAME;
                    worksheet.Cells[i + 2, 3].Value = customer.FIRM_NAME;
                    worksheet.Cells[i + 2, 4].Value = customer.CONTACT_NO;
                    worksheet.Cells[i + 2, 5].Value = customer.ALTERNATE_CONTACT_NO;
                    worksheet.Cells[i + 2, 6].Value = customer.EMAIL;
                    worksheet.Cells[i + 2, 7].Value = customer.ALTERNATE_EMAIL;
                    worksheet.Cells[i + 2, 8].Value = customer.BILLING_ADDRESS;
                    worksheet.Cells[i + 2, 9].Value = customer.SHIPPING_ADDRESS;
                    worksheet.Cells[i + 2, 10].Value = customer.STATE_ID;
                    worksheet.Cells[i + 2, 11].Value = customer.CITY_ID;
                    worksheet.Cells[i + 2, 12].Value = customer.ZIP_CODE;
                    worksheet.Cells[i + 2, 13].Value = customer.DEGREE_OF_CUSTOMER;
                    worksheet.Cells[i + 2, 14].Value = customer.PAN_NO;
                    worksheet.Cells[i + 2, 15].Value = customer.GST_NO;
                    worksheet.Cells[i + 2, 16].Value = customer.TIN_NO;
                    worksheet.Cells[i + 2, 17].Value = customer.PNDT_NO;
                    worksheet.Cells[i + 2, 18].Value = customer.PNDT_VALIDITY;
                    worksheet.Cells[i + 2, 19].Value = customer.UPLOAD_PNDT_CERTIFICATE;
                    worksheet.Cells[i + 2, 20].Value = customer.UPLOAD_PAN_CERTIFICATE;
                    worksheet.Cells[i + 2, 21].Value = customer.ADDRESS;
                    worksheet.Cells[i + 2, 22].Value = customer.UNIT;
                    worksheet.Cells[i + 2, 23].Value = customer.ADD_EQUIPMENT;
                    worksheet.Cells[i + 2, 24].Value = customer.ELORA_USER_ID;
                    worksheet.Cells[i + 2, 25].Value = customer.ELORA_PASSWORD;
                    worksheet.Cells[i + 2, 26].Value = customer.NO_OF_TLD;
                    worksheet.Cells[i + 2, 27].Value = customer.DOCUMENT_STATUS;
                    worksheet.Cells[i + 2, 28].Value = customer.REGISTRATION_STATUS;
                    worksheet.Cells[i + 2, 29].Value = customer.REPORT_STATUS;
                    worksheet.Cells[i + 2, 30].Value = customer.TOTAL_AMOUNT;
                    worksheet.Cells[i + 2, 31].Value = customer.BALANCE_PAYMENT;
                    worksheet.Cells[i + 2, 32].Value = customer.CHEQUE_NO;
                    worksheet.Cells[i + 2, 33].Value = customer.QA_DONE_BY;
                    worksheet.Cells[i + 2, 34].Value = customer.QA_DONE_ON_DATE;
                    worksheet.Cells[i + 2, 35].Value = customer.QA_SALE_PERSON;
                    worksheet.Cells[i + 2, 36].Value = customer.QA_DUE_DATE;
                    worksheet.Cells[i + 2, 37].Value = customer.QA_PERSON_COMMISSON;
                    worksheet.Cells[i + 2, 38].Value = customer.UPLOD_DOCUMETN;
                    worksheet.Cells[i + 2, 39].Value = customer.COMMENT;
                    worksheet.Cells[i + 2, 40].Value = customer.BRANCH_NAME;
                    worksheet.Cells[i + 2, 41].Value = customer.STATUS;
                    worksheet.Cells[i + 2, 42].Value = customer.REG_DATE;
                    worksheet.Cells[i + 2, 43].Value = customer.COMPANY_ID;
                    worksheet.Cells[i + 2, 44].Value = customer.SHIPPING_ZIP_CODE;
                    worksheet.Cells[i + 2, 45].Value = customer.SHIP_STATE_ID;
                    worksheet.Cells[i + 2, 46].Value = customer.SHIP_CITY_ID;
                    worksheet.Cells[i + 2, 47].Value = customer.CUSTOMER_TYPE_ID;
                    worksheet.Cells[i + 2, 48].Value = customer.CITY_NAME_DELETE;
                    worksheet.Cells[i + 2, 49].Value = customer.STATE_NAME_DELETE;
                    worksheet.Cells[i + 2, 50].Value = customer.CUST_CODE_DELETE;
                }

                // Save the package to a memory stream
                var stream = new MemoryStream();
                package.SaveAs(stream);
                stream.Position = 0;

                // Define file name
                string excelName = $"CustomerData_{DateTime.Now.ToString("yyyyMMddHHmmssfff")}.xlsx";

                // Return the file result
                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
            }
        }

    }
}