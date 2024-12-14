using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sai_Helth_care.Models;
using System.Web.UI.WebControls;
using System.Drawing.Imaging;
using System.IO;
using System.Web.Hosting;
using System.Web.Helpers;
//using System.Xml.Linq;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class AERBCustomerController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        // GET: AERBCustomer
        public ActionResult Index()
        {
            return View();
        }

        public class Search_Admin
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public string FARMER_NAME { get; set; }
            public string STATE_ID { get; set; }
            public string STARTING_DATE { get; set; }
            public string ENDING_DATE { get; set; }
        }

        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("Get_TB_AERB_Customer_Count", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
                //cmd.Parameters.AddWithValue("@STARTING_DATE", tB_Admin.STARTING_DATE);
                //cmd.Parameters.AddWithValue("@ENDING_DATE", tB_Admin.ENDING_DATE);
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
                //throw ex;
            }
            return Json(new { success = i }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetallAdmin(Search_Admin tB_Admin)
        {
            cmd = new SqlCommand("SP_GetTB_Aerb_Customer", con);
            cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@ADMIN_ID", 1);
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
            cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
            // cmd.Parameters.AddWithValue("@STARTING_DATE", tB_Admin.STARTING_DATE);
            // cmd.Parameters.AddWithValue("@ENDING_DATE", tB_Admin.ENDING_DATE);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            CustomerMaster rt;
            List<CustomerMaster> FinalreportList = new List<CustomerMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new CustomerMaster();
                    try
                    {
                        rt.Customer_ID = Convert.ToInt64(dt.Rows[i]["Customer_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"].ToString());
                        //rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"].ToString());
                        rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"]).ToString();
                        rt.ALTERNATE_CONTACT_NO = (dt.Rows[i]["ALTERNATE_CONTACT_NO"]).ToString();
                        rt.EMAIL = (dt.Rows[i]["EMAIL"]).ToString();
                        rt.ALTERNATE_EMAIL = (dt.Rows[i]["ALTERNATE_EMAIL"]).ToString();
                        rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.UNIT = (dt.Rows[i]["UNIT"]).ToString();
                        rt.ADD_EQUIPMENT = (dt.Rows[i]["ADD_EQUIPMENT"]).ToString();
                        rt.ELORA_USER_ID = (dt.Rows[i]["ELORA_USER_ID"]).ToString();
                        rt.ELORA_PASSWORD = (dt.Rows[i]["ELORA_PASSWORD"]).ToString();
                        rt.NO_OF_TLD = (dt.Rows[i]["NO_OF_TLD"]).ToString();
                        rt.DOCUMENT_STATUS = (dt.Rows[i]["DOCUMENT_STATUS"]).ToString();
                        rt.REGISTRATION_STATUS = (dt.Rows[i]["REGISTRATION_STATUS"]).ToString();
                        rt.REPORT_STATUS = (dt.Rows[i]["REPORT_STATUS"]).ToString();
                        rt.TOTAL_AMOUNT = (dt.Rows[i]["TOTAL_AMOUNT"]).ToString();
                        rt.BALANCE_PAYMENT = (dt.Rows[i]["BALANCE_PAYMENT"]).ToString();
                        rt.CHEQUE_NO = (dt.Rows[i]["CHEQUE_NO"]).ToString();
                        rt.QA_DONE_BY = (dt.Rows[i]["QA_DONE_BY"]).ToString();
                        rt.QA_DONE_ON_DATE = (dt.Rows[i]["QA_DONE_ON_DATE"]).ToString();
                        rt.QA_SALE_PERSON = (dt.Rows[i]["QA_SALE_PERSON"]).ToString();
                        rt.QA_DUE_DATE = (dt.Rows[i]["QA_DUE_DATE"]).ToString();
                        rt.QA_PERSON_COMMISSON = (dt.Rows[i]["QA_PERSON_COMMISSON"]).ToString();
                        rt.UPLOD_DOCUMETN = (dt.Rows[i]["UPLOD_DOCUMETN"]).ToString();
                        rt.COMMENT = (dt.Rows[i]["COMMENT"]).ToString();
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();

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
            var _getadmin = db.Tb_EmployeeMaster.Where(z => z.STATUS == "Active").Select(s => new { s.EMP_ID, s.EMP_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddAdmin(CustomerMaster tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOD_DOCUMETN == "Yes")
                {
                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;
                    fileName = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName1 = fileName;
                    tB_admin.UPLOD_DOCUMETN = Master.serverurl + "/Images/" + fileName;
                    fileName = Path.Combine(Server.MapPath("~/Images/"), fileName);

                    if (tB_admin.UPLOD_DOCUMETN != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/Images/" + fileName1), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.UPLOD_DOCUMETN = "";
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                cmd = new SqlCommand("Insert_Aerb_customer", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tB_admin.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@FIRM_NAME", tB_admin.FIRM_NAME);
                //cmd.Parameters.AddWithValue("@FIRM_ADDRESS", tB_admin.FIRM_ADDRESS);
                cmd.Parameters.AddWithValue("@CONTACT_NO", tB_admin.CONTACT_NO);
                cmd.Parameters.AddWithValue("@ALTERNATE_CONTACT_NO", tB_admin.ALTERNATE_CONTACT_NO);
                cmd.Parameters.AddWithValue("@EMAIL", tB_admin.EMAIL);
                cmd.Parameters.AddWithValue("@ALTERNATE_EMAIL", tB_admin.ALTERNATE_EMAIL);
                cmd.Parameters.AddWithValue("@UNIT", tB_admin.UNIT);
                cmd.Parameters.AddWithValue("@ADD_EQUIPMENT", tB_admin.ADD_EQUIPMENT);
                cmd.Parameters.AddWithValue("@ELORA_USER_ID", tB_admin.ELORA_USER_ID);
                cmd.Parameters.AddWithValue("@ELORA_PASSWORD", tB_admin.ELORA_PASSWORD);
                cmd.Parameters.AddWithValue("@NO_OF_TLD", tB_admin.NO_OF_TLD);
                cmd.Parameters.AddWithValue("@DOCUMENT_STATUS", tB_admin.DOCUMENT_STATUS);
                cmd.Parameters.AddWithValue("@REGISTRATION_STATUS", tB_admin.REGISTRATION_STATUS);
                cmd.Parameters.AddWithValue("@REPORT_STATUS", tB_admin.REPORT_STATUS);
                cmd.Parameters.AddWithValue("@TOTAL_AMOUNT", tB_admin.TOTAL_AMOUNT);
                cmd.Parameters.AddWithValue("@BALANCE_PAYMENT", tB_admin.BALANCE_PAYMENT);
                cmd.Parameters.AddWithValue("@CHEQUE_NO", tB_admin.CHEQUE_NO);
                cmd.Parameters.AddWithValue("@QA_DONE_BY", tB_admin.QA_DONE_BY);
                cmd.Parameters.AddWithValue("@QA_DONE_ON_DATE", tB_admin.QA_DONE_ON_DATE);
                cmd.Parameters.AddWithValue("@QA_SALE_PERSON", tB_admin.QA_SALE_PERSON);
                cmd.Parameters.AddWithValue("@QA_DUE_DATE", tB_admin.QA_DUE_DATE);
                cmd.Parameters.AddWithValue("@QA_PERSON_COMMISSON", tB_admin.QA_PERSON_COMMISSON);
                cmd.Parameters.AddWithValue("@ZIP_CODE", tB_admin.ZIP_CODE);
                cmd.Parameters.AddWithValue("@UPLOD_DOCUMETN", tB_admin.UPLOD_DOCUMETN);
                cmd.Parameters.AddWithValue("@COMMENT", tB_admin.COMMENT);
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





        public ActionResult EditAdmin(CustomerMaster tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOD_DOCUMETN == "Yes")
                {
                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;
                    fileName = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName1 = fileName;
                    tB_admin.UPLOD_DOCUMETN = Master.serverurl + "/Images/" + fileName;
                    fileName = Path.Combine(Server.MapPath("~/Images/"), fileName);

                    if (tB_admin.UPLOD_DOCUMETN != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/Images/" + fileName1), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.UPLOD_DOCUMETN = "";
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                cmd = new SqlCommand("Update_Aerb_customer", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tB_admin.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@FIRM_NAME", tB_admin.FIRM_NAME);
                //cmd.Parameters.AddWithValue("@FIRM_ADDRESS", tB_admin.FIRM_ADDRESS);
                cmd.Parameters.AddWithValue("@CONTACT_NO", tB_admin.CONTACT_NO);
                cmd.Parameters.AddWithValue("@ALTERNATE_CONTACT_NO", tB_admin.ALTERNATE_CONTACT_NO);
                cmd.Parameters.AddWithValue("@EMAIL", tB_admin.EMAIL);
                cmd.Parameters.AddWithValue("@ALTERNATE_EMAIL", tB_admin.ALTERNATE_EMAIL);
                cmd.Parameters.AddWithValue("@UNIT", tB_admin.UNIT);
                cmd.Parameters.AddWithValue("@ADD_EQUIPMENT", tB_admin.ADD_EQUIPMENT);
                cmd.Parameters.AddWithValue("@ELORA_USER_ID", tB_admin.ELORA_USER_ID);
                cmd.Parameters.AddWithValue("@ELORA_PASSWORD", tB_admin.ELORA_PASSWORD);
                cmd.Parameters.AddWithValue("@NO_OF_TLD", tB_admin.NO_OF_TLD);
                cmd.Parameters.AddWithValue("@DOCUMENT_STATUS", tB_admin.DOCUMENT_STATUS);
                cmd.Parameters.AddWithValue("@REGISTRATION_STATUS", tB_admin.REGISTRATION_STATUS);
                cmd.Parameters.AddWithValue("@REPORT_STATUS", tB_admin.REPORT_STATUS);
                cmd.Parameters.AddWithValue("@TOTAL_AMOUNT", tB_admin.TOTAL_AMOUNT);
                cmd.Parameters.AddWithValue("@BALANCE_PAYMENT", tB_admin.BALANCE_PAYMENT);
                cmd.Parameters.AddWithValue("@CHEQUE_NO", tB_admin.CHEQUE_NO);
                cmd.Parameters.AddWithValue("@QA_DONE_BY", tB_admin.QA_DONE_BY);
                cmd.Parameters.AddWithValue("@QA_DONE_ON_DATE", tB_admin.QA_DONE_ON_DATE);
                cmd.Parameters.AddWithValue("@QA_SALE_PERSON", tB_admin.QA_SALE_PERSON);
                cmd.Parameters.AddWithValue("@QA_DUE_DATE", tB_admin.QA_DUE_DATE);
                cmd.Parameters.AddWithValue("@QA_PERSON_COMMISSON", tB_admin.QA_PERSON_COMMISSON);
                cmd.Parameters.AddWithValue("@ZIP_CODE", tB_admin.ZIP_CODE);
                cmd.Parameters.AddWithValue("@UPLOD_DOCUMETN", tB_admin.UPLOD_DOCUMETN);
                cmd.Parameters.AddWithValue("@COMMENT", tB_admin.COMMENT);
                cmd.Parameters.AddWithValue("@Customer_ID", tB_admin.Customer_ID);

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



    }
}