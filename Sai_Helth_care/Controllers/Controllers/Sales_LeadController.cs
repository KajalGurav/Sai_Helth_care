using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Web.Hosting;
using Sai_Helth_care.Models;
using System.Drawing.Imaging;
using System.Diagnostics;
using System.Text;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Sales_LeadController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        public ActionResult Index()
        {
            return View();
        }

        public class Search_Admin
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public long EMP_ID { get; set; }
            public string FARMER_NAME { get; set; }
            public string STATE_ID { get; set; }
            public string STARTING_DATE { get; set; }
            public string ENDING_DATE { get; set; }
        }

        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            long id = Convert.ToInt64(Session["COMPANY_ID"]);
            try
            {
                cmd = new SqlCommand("Get_TB_Leads_Count", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
                cmd.Parameters.AddWithValue("@EMP_ID", tB_Admin.EMP_ID);
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
            return Json(new { success = i }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetallAdmin(Search_Admin tB_Admin)
        {
            long id = Convert.ToInt64(Session["COMPANY_ID"]);
            cmd = new SqlCommand("SP_Panel_Get_TB_Leads", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
            cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
            cmd.Parameters.AddWithValue("@EMP_ID", tB_Admin.EMP_ID);
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
            SalesLeed rt;
            List<SalesLeed> FinalreportList = new List<SalesLeed>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new SalesLeed();
                    try
                    {
                        rt.DSR_LEAD_ID = Convert.ToInt64(dt.Rows[i]["DSR_LEAD_ID"]);
                        rt.EMP_ID = Convert.ToInt64(dt.Rows[i]["EMP_ID"]);
                       // rt.CITY_ID = Convert.ToInt64(dt.Rows[i]["CITY_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"].ToString());
                        rt.MOBILE_NO = (dt.Rows[i]["MOBILE_NO"]).ToString();
                        rt.EMAIL_ID = (dt.Rows[i]["EMAIL_ID"]).ToString();
                        rt.MODALITY = (dt.Rows[i]["MODALITY"]).ToString();
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"]).ToString();
                        rt.PROJECHTED_MODEL = (dt.Rows[i]["PROJECHTED_MODEL"]).ToString();
                        rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"]).ToString();
                        rt.CUSTOMER_REQUIREMENT = (dt.Rows[i]["CUSTOMER_REQUIREMENT"]).ToString();
                        rt.SALES_PERSON_COMMITMENTS = (dt.Rows[i]["SALES_PERSON_COMMITMENTS"]).ToString();
                        rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"]).ToString();
                        rt.FORCASTED_MONTH = (dt.Rows[i]["FORCASTED_MONTH"]).ToString();
                        rt.PRICE = (dt.Rows[i]["PRICE"]).ToString();
                        rt.BUY_PERCENT = (dt.Rows[i]["BUY_PERCENT"]).ToString();
                        rt.ENQUIRY_TYPE = (dt.Rows[i]["ENQUIRY_TYPE"]).ToString();
                        rt.UPLOAD_VISITING_CARD = (dt.Rows[i]["UPLOAD_VISITING_CARD"]).ToString();
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                        rt.DSR_DATE = (dt.Rows[i]["DSR_DATE"]).ToString();


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

        public JsonResult GetEmployee()
        {
            var _getadmin = db.Tb_EmployeeMaster.Where(z => z.STATUS == "Active" && (z.DEPARTMENT_ID==1 || z.DEPARTMENT_ID == 18)).OrderBy(s => s.EMP_NAME).Select(s => new { s.EMP_ID, s.EMP_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddAdmin(SalesLeed tB_admin)
        {
            long id = Convert.ToInt64(Session["COMPANY_ID"]);
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOAD_VISITING_CARD == "Yes")
                {
                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;
                    fileName = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName1 = fileName;
                    tB_admin.UPLOAD_VISITING_CARD = Master.serverurl + "/UploadedImages/" + fileName;
                    fileName = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName);

                    if (tB_admin.UPLOAD_VISITING_CARD != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName1), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.UPLOAD_VISITING_CARD = null;
                }
            }
            catch (Exception ex)
            {
            }

            try
            {
                cmd = new SqlCommand("Panel_Insert_TB_Leads", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tB_admin.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@FIRM_NAME", tB_admin.FIRM_NAME);
                cmd.Parameters.AddWithValue("@DSR_DATE", tB_admin.DSR_DATE);
                cmd.Parameters.AddWithValue("@FIRM_ADDRESS", tB_admin.FIRM_ADDRESS);
                cmd.Parameters.AddWithValue("@MOBILE_NO", tB_admin.MOBILE_NO);
                cmd.Parameters.AddWithValue("@EMAIL_ID", tB_admin.EMAIL_ID);
                cmd.Parameters.AddWithValue("@MODALITY", tB_admin.MODALITY);
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID);
                cmd.Parameters.AddWithValue("@CITY_NAME", tB_admin.CITY_NAME);
                cmd.Parameters.AddWithValue("@PROJECHTED_MODEL", tB_admin.PROJECHTED_MODEL);
                cmd.Parameters.AddWithValue("@CUSTOMER_REQUIREMENT", tB_admin.CUSTOMER_REQUIREMENT);
                cmd.Parameters.AddWithValue("@SALES_PERSON_COMMITMENTS", tB_admin.SALES_PERSON_COMMITMENTS);
                cmd.Parameters.AddWithValue("@FORCASTED_MONTH", tB_admin.FORCASTED_MONTH);
                cmd.Parameters.AddWithValue("@PRICE", tB_admin.PRICE);
                cmd.Parameters.AddWithValue("@BUY_PERCENT", tB_admin.BUY_PERCENT);
                cmd.Parameters.AddWithValue("@ENQUIRY_TYPE", tB_admin.ENQUIRY_TYPE);
                cmd.Parameters.AddWithValue("@UPLOAD_VISITING_CARD", tB_admin.UPLOAD_VISITING_CARD);
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);
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

        public ActionResult EditAdmin(SalesLeed tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOAD_VISITING_CARD == "Yes")
                {
                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;
                    fileName = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName1 = fileName;
                    tB_admin.UPLOAD_VISITING_CARD = Master.serverurl + "/UploadedImages/" + fileName;
                    fileName = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName);

                    if (tB_admin.UPLOAD_VISITING_CARD != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName1), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    //tB_admin.UPLOAD_VISITING_CARD = "";
                }
            }
            catch (Exception ex)
            {
            }

            try
            {
                cmd = new SqlCommand("Panel_Update_TB_Leads", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tB_admin.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@FIRM_NAME", tB_admin.FIRM_NAME);
                cmd.Parameters.AddWithValue("@DSR_DATE", tB_admin.DSR_DATE);
                cmd.Parameters.AddWithValue("@FIRM_ADDRESS", tB_admin.FIRM_ADDRESS);
                cmd.Parameters.AddWithValue("@MOBILE_NO", tB_admin.MOBILE_NO);
                cmd.Parameters.AddWithValue("@EMAIL_ID", tB_admin.EMAIL_ID);
                cmd.Parameters.AddWithValue("@MODALITY", tB_admin.MODALITY);
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID);
                cmd.Parameters.AddWithValue("@CITY_NAME", tB_admin.CITY_NAME);
                cmd.Parameters.AddWithValue("@PROJECHTED_MODEL", tB_admin.PROJECHTED_MODEL);
                cmd.Parameters.AddWithValue("@CUSTOMER_REQUIREMENT", tB_admin.CUSTOMER_REQUIREMENT);
                cmd.Parameters.AddWithValue("@SALES_PERSON_COMMITMENTS", tB_admin.SALES_PERSON_COMMITMENTS);
                cmd.Parameters.AddWithValue("@FORCASTED_MONTH", tB_admin.FORCASTED_MONTH);
                cmd.Parameters.AddWithValue("@PRICE", tB_admin.PRICE);
                cmd.Parameters.AddWithValue("@BUY_PERCENT", tB_admin.BUY_PERCENT);
                cmd.Parameters.AddWithValue("@ENQUIRY_TYPE", tB_admin.ENQUIRY_TYPE);
                cmd.Parameters.AddWithValue("@UPLOAD_VISITING_CARD", tB_admin.UPLOAD_VISITING_CARD);
                cmd.Parameters.AddWithValue("@DSR_LEAD_ID", tB_admin.DSR_LEAD_ID);
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

        public ActionResult SalesLeadExport(Search_Admin tB_Admin)
        {
            StringBuilder sb = new StringBuilder();
            string sFileName = "Sales Lead Report.xls";
            sb.Append("<table style='1px solid black; font-size:12px;' border='1'>");
            sb.Append("<tr>");
            sb.Append("<td><b>Sr No</b></td>");
            sb.Append("<td><b>DSR No.</b></td>");
            sb.Append("<td><b>DSR Date</b></td>");
            sb.Append("<td><b>Sales Person Name</b></td>");
            sb.Append("<td><b>Customer Name</b></td>");
            sb.Append("<td><b>Firm Name</b></td>");
            sb.Append("<td><b>Firm Address</b></td>");
            sb.Append("<td><b>Modility</b></td>");
            sb.Append("<td><b>Buy %</b></td>");
            sb.Append("<td><b>Projected Model</b></td>");
            sb.Append("<td><b>Forcasted Month</b></td>");
            sb.Append("<td><b>Price (In Lac)</b></td>");
            sb.Append("<td><b>Enquiry Type</b></td>");
            sb.Append("</tr>");

            cmd = new SqlCommand("Panel_ExportSalesLead", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_ID", tB_Admin.EMP_ID);
            cmd.CommandTimeout = 3000000;
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            sda.Fill(dt);
            con.Close();
            SalesLeed rt;
            DateTime currentDate = DateTime.Now;
            int daysInMonth = DateTime.DaysInMonth(currentDate.Year, currentDate.Month);


            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new SalesLeed();

                    rt.DSR_LEAD_ID = Convert.ToInt64(dt.Rows[i]["DSR_LEAD_ID"]);
                    rt.EMP_ID = Convert.ToInt64(dt.Rows[i]["EMP_ID"]);
                    rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                    rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"].ToString());
                    rt.MOBILE_NO = (dt.Rows[i]["MOBILE_NO"]).ToString();
                    rt.EMAIL_ID = (dt.Rows[i]["EMAIL_ID"]).ToString();
                    rt.MODALITY = (dt.Rows[i]["MODALITY"]).ToString();
                    rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"]).ToString();
                    rt.PROJECHTED_MODEL = (dt.Rows[i]["PROJECHTED_MODEL"]).ToString();
                    rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"]).ToString();
                    rt.CUSTOMER_REQUIREMENT = (dt.Rows[i]["CUSTOMER_REQUIREMENT"]).ToString();
                    rt.SALES_PERSON_COMMITMENTS = (dt.Rows[i]["SALES_PERSON_COMMITMENTS"]).ToString();
                    rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"]).ToString();
                    rt.FORCASTED_MONTH = (dt.Rows[i]["FORCASTED_MONTH"]).ToString();
                    rt.PRICE = (dt.Rows[i]["PRICE"]).ToString();
                    rt.BUY_PERCENT = (dt.Rows[i]["BUY_PERCENT"]).ToString();
                    rt.ENQUIRY_TYPE = (dt.Rows[i]["ENQUIRY_TYPE"]).ToString();
                    rt.UPLOAD_VISITING_CARD = (dt.Rows[i]["UPLOAD_VISITING_CARD"]).ToString();
                    rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                    rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                    rt.DSR_DATE = (dt.Rows[i]["DSR_DATE"]).ToString();

                    sb.Append("<tr>");
                    sb.Append("<td>" + (i + 1) + "</td>");
                    sb.Append("<td>" + rt.DSR_LEAD_ID + "</td>");
                    sb.Append("<td>" + rt.DSR_DATE + "</td>");
                    sb.Append("<td>" + rt.EMP_NAME + "</td>");
                    sb.Append("<td>" + rt.CUSTOMER_NAME + "</td>");
                    sb.Append("<td>" + rt.FIRM_NAME + "</td>");
                    sb.Append("<td>" + rt.FIRM_ADDRESS + "</td>");
                    sb.Append("<td>" + rt.MODALITY + "</td>");
                    sb.Append("<td>" + rt.BUY_PERCENT + "</td>");
                    sb.Append("<td>" + rt.PROJECHTED_MODEL + "</td>");
                    sb.Append("<td>" + rt.FORCASTED_MONTH + "</td>");
                    sb.Append("<td>" + rt.PRICE + "</td>");
                    sb.Append("<td>" + rt.ENQUIRY_TYPE + "</td>");
                    sb.Append("</tr>");
                }
            }
            sb.Append("</table>");


            HttpContext.Response.AddHeader("content-disposition", "attachment;  filename = " + sFileName);
            this.Response.ContentType = "application/vnd.ms-excel";
            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(sb.ToString());
            return File(buffer, "application/vnd.ms-excel");
        }


    }
}