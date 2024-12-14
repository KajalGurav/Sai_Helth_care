using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sai_Helth_care.Models;
using System.Web.Helpers;
using System.Drawing.Imaging;
using System.IO;
using System.Web.Hosting;
using static Sai_Helth_care.Models.SalaryWages;
using System.Net.Mail;
using System.Device.Location;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Employee_RegiController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        // GET: Employee_Regi
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
            public string ROLE_ID { get; set; }
            public string START_DATE { get; set; }
            public string END_DATE { get; set; }
        }
        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("Get_Tb_EmployeeMaster_Count", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
                cmd.Parameters.AddWithValue("@START_DATE", tB_Admin.START_DATE);
                cmd.Parameters.AddWithValue("@END_DATE", tB_Admin.END_DATE);
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
            cmd = new SqlCommand("Panel_Get_Tb_EmployeeMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
            cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
            cmd.Parameters.AddWithValue("@START_DATE", tB_Admin.START_DATE);
            cmd.Parameters.AddWithValue("@END_DATE", tB_Admin.END_DATE);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            EmployeeMaster rt;
            List<EmployeeMaster> FinalreportList = new List<EmployeeMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new EmployeeMaster();
                    try
                    {
                        rt.EMP_ID = Convert.ToInt64(dt.Rows[i]["EMP_ID"]);
                        rt.COMPANY_ID = dt.Rows[i]["COMPANY_ID"] is DBNull ? (long?) null : Convert.ToInt64(dt.Rows[i]["COMPANY_ID"]);
                        rt.DEPARTMENT_ID = Convert.ToInt64(dt.Rows[i]["DEPARTMENT_ID"]);
                        rt.DESIGNATION_ID = Convert.ToInt64(dt.Rows[i]["DESIGNATION_ID"]);
                        rt.STATE_ID = Convert.ToInt64(dt.Rows[i]["STATE_ID"]);
                        rt.CITY_ID = Convert.ToInt64(dt.Rows[i]["CITY_ID"]);
                        rt.COMPANY_NAME = (dt.Rows[i]["COMPANY_NAME"].ToString());
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"].ToString());
                        rt.DEP_NAME = (dt.Rows[i]["DEP_NAME"].ToString());
                        rt.DESI_NAME = (dt.Rows[i]["DESI_NAME"].ToString());
                        rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"].ToString());
                        rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.ALTERNATE_CONT_NO = (dt.Rows[i]["ALTERNATE_CONT_NO"]).ToString();
                        rt.EMAIL = (dt.Rows[i]["EMAIL"]).ToString();
                        rt.ALTERNATE_EMAIL = (dt.Rows[i]["ALTERNATE_EMAIL"]).ToString();
                        rt.EMP_DOB = (dt.Rows[i]["EMP_DOB"]).ToString();
                        rt.PERMENENT_ADDRESS = (dt.Rows[i]["PERMENENT_ADDRESS"]).ToString();
                        rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.SALERY_PER_MONTH = (dt.Rows[i]["SALERY_PER_MONTH"]).ToString();
                        rt.MARRIED_STATUS = (dt.Rows[i]["MARRIED_STATUS"]).ToString();
                        rt.PHYSICAL_DUSABILITY = (dt.Rows[i]["PHYSICAL_DUSABILITY"]).ToString();
                        rt.BANK_NAME = (dt.Rows[i]["BANK_NAME"]).ToString();
                        rt.ACCOUNT_NO = (dt.Rows[i]["ACCOUNT_NO"]).ToString();
                        rt.IFSC_CODE = (dt.Rows[i]["IFSC_CODE"]).ToString();
                        rt.UPLOD_BANK_PASS = (dt.Rows[i]["UPLOD_BANK_PASS"]).ToString();
                        rt.PAN_CARD_NO = (dt.Rows[i]["PAN_CARD_NO"]).ToString();
                        rt.ADHAR_CARD_NO = (dt.Rows[i]["ADHAR_CARD_NO"]).ToString();
                        rt.PASSWORD = (dt.Rows[i]["PASSWORD"]).ToString();
                        rt.UPLOD_ADHAR_CARD = (dt.Rows[i]["UPLOD_ADHAR_CARD"]).ToString();
                        rt.UPLOD_PAN_CARD = (dt.Rows[i]["UPLOD_PAN_CARD"]).ToString();
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

        public JsonResult GetCompany()
        {
            var _getadmin = db.TB_CompanyMaster.Where(z => z.STATUS == "Active").OrderBy(s => s.COMPANY_NAME).Select(s => new { s.COMPANY_ID, s.COMPANY_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDepartment()
        {
            var _getadmin = db.Tb_Department.Where(z => z.STATUS == "Active").OrderBy(s => s.DEP_NAME).Select(s => new { s.DEP_ID, s.DEP_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDesignaton(long id)
        {
            var _getadmin = db.Tb_Designation.Where(z => z.STATUS == "Active" && z.DEP_ID == id).Select(s => new { s.DEP_ID, s.DESI_ID, s.DESI_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetState()
        {
            var _getadmin = db.TB_StateMaster.Where(z => z.STATUS == "Active").OrderBy(s => s.STATE_NAME).Select(s => new { s.STATE_ID, s.STATE_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCity(long id)
        {
            var _getadmin = db.TB_CityMaster.Where(z => z.STATUS == "Active" && z.STATE_ID == id).OrderBy(s => s.CITY_NAME).Select(s => new { s.STATE_ID, s.CITY_ID, s.CITY_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmployeeList()
        {
            var _getadmin = db.Tb_EmployeeMaster.Where(z => z.STATUS == "Active").OrderBy(o=>o.EMP_NAME).Select(s => new { s.EMP_ID, s.EMP_NAME,s.EMAIL, s.CONTACT_NO, s.ALTERNATE_CONT_NO, s.ALTERNATE_EMAIL, s.SALERY_PER_MONTH, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddAdmin(EmployeeMaster tB_admin)
        {
            
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOD_ADHAR_CARD == "Yes")
                {
                    string fileName2 = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;
                    fileName2 = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName3 = fileName2;
                    tB_admin.UPLOD_ADHAR_CARD = Master.serverurl + "/UploadedImages/" + fileName2;
                    fileName2 = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName2);

                    if (tB_admin.UPLOD_ADHAR_CARD != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName3), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.UPLOD_ADHAR_CARD = null;
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOD_BANK_PASS == "Yes")
                {
                    string fileName = tB_admin.ImageName1;
                    string extension = tB_admin.ImageExtension1;
                    fileName = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName1 = fileName;
                    tB_admin.UPLOD_BANK_PASS = Master.serverurl + "/UploadedImages/" + fileName;
                    fileName = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName);

                    if (tB_admin.UPLOD_BANK_PASS != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data1);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName1), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.UPLOD_BANK_PASS = null;
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOD_PAN_CARD == "Yes")
                {
                    string fileName4 = tB_admin.ImageName2;
                    string extension = tB_admin.ImageExtension2;
                    fileName4 = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName5 = fileName4;
                    tB_admin.UPLOD_PAN_CARD = Master.serverurl + "/UploadedImages/" + fileName4;
                    fileName4 = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName4);

                    if (tB_admin.UPLOD_PAN_CARD != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data2);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName5), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.UPLOD_PAN_CARD = null;
                }
            }
            catch (Exception ex)
            {
            }
            try
            {

                cmd = new SqlCommand("Insert_Tb_EmployeeMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMP_NAME", tB_admin.EMP_NAME);
                cmd.Parameters.AddWithValue("@COMPANY_ID", tB_admin.COMPANY_ID);
                cmd.Parameters.AddWithValue("@CONTACT_NO", tB_admin.CONTACT_NO);
                cmd.Parameters.AddWithValue("@ALTERNATE_CONT_NO", tB_admin.ALTERNATE_CONT_NO);
                cmd.Parameters.AddWithValue("@EMAIL", tB_admin.EMAIL);
                cmd.Parameters.AddWithValue("@ALTERNATE_EMAIL", tB_admin.ALTERNATE_EMAIL);
                cmd.Parameters.AddWithValue("@EMP_DOB", tB_admin.EMP_DOB);
                cmd.Parameters.AddWithValue("@DEPARTMENT_ID", tB_admin.DEPARTMENT_ID);
                cmd.Parameters.AddWithValue("@DESIGNATION_ID", tB_admin.DESIGNATION_ID);
                cmd.Parameters.AddWithValue("@PERMENENT_ADDRESS", tB_admin.PERMENENT_ADDRESS);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_admin.STATE_ID);
                cmd.Parameters.AddWithValue("@CITY_ID", tB_admin.CITY_ID);
                cmd.Parameters.AddWithValue("@ZIP_CODE", tB_admin.ZIP_CODE);
                cmd.Parameters.AddWithValue("@SALERY_PER_MONTH", tB_admin.SALERY_PER_MONTH);
                cmd.Parameters.AddWithValue("@MARRIED_STATUS", tB_admin.MARRIED_STATUS);
                cmd.Parameters.AddWithValue("@PHYSICAL_DUSABILITY", tB_admin.PHYSICAL_DUSABILITY);
                cmd.Parameters.AddWithValue("@BANK_NAME", tB_admin.BANK_NAME);
                cmd.Parameters.AddWithValue("@ACCOUNT_NO", tB_admin.ACCOUNT_NO);
                cmd.Parameters.AddWithValue("@IFSC_CODE", tB_admin.IFSC_CODE);
                cmd.Parameters.AddWithValue("@PAN_CARD_NO", tB_admin.PAN_CARD_NO);
                cmd.Parameters.AddWithValue("@ADHAR_CARD_NO", tB_admin.ADHAR_CARD_NO);
                cmd.Parameters.AddWithValue("@PASSWORD", tB_admin.PASSWORD);
                cmd.Parameters.AddWithValue("@UPLOD_BANK_PASS", tB_admin.UPLOD_BANK_PASS);
                cmd.Parameters.AddWithValue("@UPLOD_ADHAR_CARD", tB_admin.UPLOD_ADHAR_CARD);
                cmd.Parameters.AddWithValue("@UPLOD_PAN_CARD", tB_admin.UPLOD_PAN_CARD);
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

        public ActionResult EditAdmin(EmployeeMaster tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOD_ADHAR_CARD == "Yes")
                {
                    string fileName2 = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;
                    fileName2 = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName3 = fileName2;
                    tB_admin.UPLOD_ADHAR_CARD = Master.serverurl + "/UploadedImages/" + fileName2;
                    fileName2 = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName2);

                    if (tB_admin.UPLOD_ADHAR_CARD != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName3), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.UPLOD_ADHAR_CARD = null;
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOD_BANK_PASS == "Yes")
                {
                    string fileName = tB_admin.ImageName1;
                    string extension = tB_admin.ImageExtension1;
                    fileName = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName1 = fileName;
                    tB_admin.UPLOD_BANK_PASS = Master.serverurl + "/UploadedImages/" + fileName;
                    fileName = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName);

                    if (tB_admin.UPLOD_BANK_PASS != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data1);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName1), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.UPLOD_BANK_PASS = null;
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOD_PAN_CARD == "Yes")
                {
                    string fileName4 = tB_admin.ImageName2;
                    string extension = tB_admin.ImageExtension2;
                    fileName4 = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName5 = fileName4;
                    tB_admin.UPLOD_PAN_CARD = Master.serverurl + "/UploadedImages/" + fileName4;
                    fileName4 = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName4);

                    if (tB_admin.UPLOD_PAN_CARD != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data2);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName5), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.UPLOD_PAN_CARD = null;
                }
            }
            catch (Exception ex)
            {
            }
            try
            {

                cmd = new SqlCommand("Update_Tb_EmployeeMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMP_NAME", tB_admin.EMP_NAME);
                cmd.Parameters.AddWithValue("@COMPANY_ID", tB_admin.COMPANY_ID);
                cmd.Parameters.AddWithValue("@CONTACT_NO", tB_admin.CONTACT_NO);
                cmd.Parameters.AddWithValue("@ALTERNATE_CONT_NO", tB_admin.ALTERNATE_CONT_NO);
                cmd.Parameters.AddWithValue("@EMAIL", tB_admin.EMAIL);
                cmd.Parameters.AddWithValue("@ALTERNATE_EMAIL", tB_admin.ALTERNATE_EMAIL);
                cmd.Parameters.AddWithValue("@EMP_DOB", tB_admin.EMP_DOB);
                cmd.Parameters.AddWithValue("@DEPARTMENT_ID", tB_admin.DEPARTMENT_ID);
                cmd.Parameters.AddWithValue("@DESIGNATION_ID", tB_admin.DESIGNATION_ID);
                cmd.Parameters.AddWithValue("@PERMENENT_ADDRESS", tB_admin.PERMENENT_ADDRESS);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_admin.STATE_ID);
                cmd.Parameters.AddWithValue("@CITY_ID", tB_admin.CITY_ID);
                cmd.Parameters.AddWithValue("@ZIP_CODE", tB_admin.ZIP_CODE);
                cmd.Parameters.AddWithValue("@SALERY_PER_MONTH", tB_admin.SALERY_PER_MONTH);
                cmd.Parameters.AddWithValue("@MARRIED_STATUS", tB_admin.MARRIED_STATUS);
                cmd.Parameters.AddWithValue("@PHYSICAL_DUSABILITY", tB_admin.PHYSICAL_DUSABILITY);
                cmd.Parameters.AddWithValue("@BANK_NAME", tB_admin.BANK_NAME);
                cmd.Parameters.AddWithValue("@ACCOUNT_NO", tB_admin.ACCOUNT_NO);
                cmd.Parameters.AddWithValue("@IFSC_CODE", tB_admin.IFSC_CODE);
                cmd.Parameters.AddWithValue("@PAN_CARD_NO", tB_admin.PAN_CARD_NO);
                cmd.Parameters.AddWithValue("@ADHAR_CARD_NO", tB_admin.ADHAR_CARD_NO);
                cmd.Parameters.AddWithValue("@PASSWORD", tB_admin.PASSWORD);
                cmd.Parameters.AddWithValue("@UPLOD_BANK_PASS", tB_admin.UPLOD_BANK_PASS);
                cmd.Parameters.AddWithValue("@UPLOD_ADHAR_CARD", tB_admin.UPLOD_ADHAR_CARD);
                cmd.Parameters.AddWithValue("@UPLOD_PAN_CARD", tB_admin.UPLOD_PAN_CARD);
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID);
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

        public ActionResult EmployeeDetails()
        {
            return View();
        }

        public JsonResult GetEmployeeDetails(int EMP_ID)
        {
            cmd = new SqlCommand("GetEmployeeDetailsByID", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_ID", EMP_ID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            EmployeeMaster rt = new EmployeeMaster();            
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    try
                    {
                        rt.EMP_ID = Convert.ToInt64(dt.Rows[i]["EMP_ID"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"].ToString());
                        rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"].ToString());
                        rt.ALTERNATE_CONT_NO = (dt.Rows[i]["ALTERNATE_CONT_NO"]).ToString();
                        rt.EMAIL = (dt.Rows[i]["EMAIL"]).ToString();
                        rt.PERMENENT_ADDRESS = (dt.Rows[i]["PERMENENT_ADDRESS"]).ToString();
                        rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"].ToString());
                        rt.STATE_NAME = (dt.Rows[i]["STATE_NAME"].ToString());
                        rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.DESI_NAME = (dt.Rows[i]["DESI_NAME"].ToString());
                        rt.DEP_NAME = (dt.Rows[i]["DEP_NAME"].ToString());
                        rt.MARRIED_STATUS = (dt.Rows[i]["MARRIED_STATUS"]).ToString();
                        rt.PHYSICAL_DUSABILITY = (dt.Rows[i]["PHYSICAL_DUSABILITY"]).ToString();
                        rt.SALERY_PER_MONTH = (dt.Rows[i]["SALERY_PER_MONTH"]).ToString();
                        rt.BANK_NAME = (dt.Rows[i]["BANK_NAME"]).ToString();
                        rt.ACCOUNT_NO = (dt.Rows[i]["ACCOUNT_NO"]).ToString();
                        rt.IFSC_CODE = (dt.Rows[i]["IFSC_CODE"]).ToString();
                        rt.ADHAR_CARD_NO = (dt.Rows[i]["ADHAR_CARD_NO"]).ToString();
                        rt.PAN_CARD_NO = (dt.Rows[i]["PAN_CARD_NO"]).ToString();
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                    }
                    catch (Exception ex)
                    {
                    }
                    
                }

            }
            var _Monthlyreport = rt;
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Details()
        {
            return View();
        }

        ////////////////////////////////////Admin Permission Model/////////////////////////////

        public ActionResult AddUpdate(AdminPermission tB_Admin)
        {
            int i = 0;
            //long id = Convert.ToInt64(Session["ADMIN_ID"]);
            try
            {
                cmd = new SqlCommand("Add_Update_AdminPermission", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMP_ID", tB_Admin.EMP_ID);

                cmd.Parameters.AddWithValue("@Customer_Master", tB_Admin.Customer_Master);
                cmd.Parameters.AddWithValue("@Regular_Customer", tB_Admin.Regular_Customer);
                cmd.Parameters.AddWithValue("@AERB_Customer", tB_Admin.AERB_Customer);
                cmd.Parameters.AddWithValue("@Medtronic_Customer", tB_Admin.Medtronic_Customer);
                cmd.Parameters.AddWithValue("@Mindray_Customer", tB_Admin.Mindray_Customer);
                cmd.Parameters.AddWithValue("@Customer_Service", tB_Admin.Customer_Service);

                cmd.Parameters.AddWithValue("@Service_Call_Assign", tB_Admin.Service_Call_Assign);
                cmd.Parameters.AddWithValue("@Regular", tB_Admin.Regular);
                cmd.Parameters.AddWithValue("@AERB", tB_Admin.AERB);
                cmd.Parameters.AddWithValue("@Medtronic", tB_Admin.Medtronic);

                cmd.Parameters.AddWithValue("@Mindray", tB_Admin.Mindray);
                cmd.Parameters.AddWithValue("@Sales_Lead", tB_Admin.Sales_Lead);
                cmd.Parameters.AddWithValue("@Regular_Product_Master", tB_Admin.Regular_Product_Master);
                cmd.Parameters.AddWithValue("@Category", tB_Admin.Category);

                cmd.Parameters.AddWithValue("@Manufacturer", tB_Admin.Manufacturer);
                cmd.Parameters.AddWithValue("@Regular_Product", tB_Admin.Regular_Product);
                cmd.Parameters.AddWithValue("@Spare_Part", tB_Admin.Spare_Part);
                cmd.Parameters.AddWithValue("@URD_Product_Purchase", tB_Admin.URD_Product_Purchase);


                cmd.Parameters.AddWithValue("@Standard_Accessories", tB_Admin.Standard_Accessories);
                cmd.Parameters.AddWithValue("@Mindray_Product_Master", tB_Admin.Mindray_Product_Master);
                cmd.Parameters.AddWithValue("@Mindray_Product", tB_Admin.Mindray_Product);
                cmd.Parameters.AddWithValue("@Probe_Specifications", tB_Admin.Probe_Specifications);
                cmd.Parameters.AddWithValue("@Medtronic_Products_List", tB_Admin.Medtronic_Products_List);
                cmd.Parameters.AddWithValue("@Medtronic_Product", tB_Admin.Medtronic_Product);

                cmd.Parameters.AddWithValue("@Main_System", tB_Admin.Main_System);
                cmd.Parameters.AddWithValue("@Attachments", tB_Admin.Attachments);
                cmd.Parameters.AddWithValue("@Tools", tB_Admin.Tools);
                cmd.Parameters.AddWithValue("@Incentive", tB_Admin.Incentive);
                cmd.Parameters.AddWithValue("@Incentive_Master", tB_Admin.Incentive_Master);
                cmd.Parameters.AddWithValue("@Incentive_Scheme", tB_Admin.Incentive_Scheme);


                cmd.Parameters.AddWithValue("@Quotation_Master", tB_Admin.Quotation_Master);
                cmd.Parameters.AddWithValue("@Regular_Quotation", tB_Admin.Regular_Quotation);
                cmd.Parameters.AddWithValue("@AERB_Quotation", tB_Admin.AERB_Quotation);
                cmd.Parameters.AddWithValue("@Medtronic_Quotation", tB_Admin.Medtronic_Quotation);
                cmd.Parameters.AddWithValue("@Mindray_Quotation", tB_Admin.Mindray_Quotation);
                cmd.Parameters.AddWithValue("@Report_Master", tB_Admin.Report_Master);

                cmd.Parameters.AddWithValue("@Attendance_Report", tB_Admin.Attendance_Report);

                cmd.Parameters.AddWithValue("@Leave_Report", tB_Admin.Leave_Report);
                cmd.Parameters.AddWithValue("@Monthly_Salary_Report", tB_Admin.Monthly_Salary_Report);
                cmd.Parameters.AddWithValue("@Daily_Activity", tB_Admin.Daily_Activity);
                cmd.Parameters.AddWithValue("@Delivery_Challan", tB_Admin.Delivery_Challan);


                cmd.Parameters.AddWithValue("@Regular_DC", tB_Admin.Regular_DC);
                cmd.Parameters.AddWithValue("@AERB_DC", tB_Admin.AERB_DC);
                cmd.Parameters.AddWithValue("@Medtronic_DC", tB_Admin.Medtronic_DC);
                cmd.Parameters.AddWithValue("@Mindray_DC", tB_Admin.Mindray_DC);
                cmd.Parameters.AddWithValue("@AMC_CMC_Master", tB_Admin.AMC_CMC_Master);
                cmd.Parameters.AddWithValue("@AMC_CMC_Regular", tB_Admin.AMC_CMC_Regular);
                cmd.Parameters.AddWithValue("@AMC_CMC_AERB", tB_Admin.AMC_CMC_AERB);
                cmd.Parameters.AddWithValue("@AMC_CMC_Medtronic", tB_Admin.AMC_CMC_Medtronic);

                cmd.Parameters.AddWithValue("@AMC_CMC_Mindray", tB_Admin.AMC_CMC_Mindray);
                cmd.Parameters.AddWithValue("@Payment_Receipt", tB_Admin.Payment_Receipt);

                cmd.Parameters.AddWithValue("@Payment_Receipt_Regular", tB_Admin.Payment_Receipt_Regular);
                cmd.Parameters.AddWithValue("@Payment_Receipt_AERB", tB_Admin.Payment_Receipt_AERB);
                cmd.Parameters.AddWithValue("@Payment_Receipt_Medtronic", tB_Admin.Payment_Receipt_Medtronic);
                cmd.Parameters.AddWithValue("@Payment_Receipt_Mindray", tB_Admin.Payment_Receipt_Mindray);
                cmd.Parameters.AddWithValue("@Salary_Wages", tB_Admin.Salary_Wages);
                cmd.Parameters.AddWithValue("@Salary_Increment", tB_Admin.Salary_Increment);
                cmd.Parameters.AddWithValue("@Advance_Salary", tB_Admin.Advance_Salary);
                cmd.Parameters.AddWithValue("@Employee_Loan", tB_Admin.Employee_Loan);

                cmd.Parameters.AddWithValue("@Setting", tB_Admin.Setting);
                cmd.Parameters.AddWithValue("@Company_Master", tB_Admin.Company_Master);

                cmd.Parameters.AddWithValue("@Employee_Registration", tB_Admin.Employee_Registration);
                cmd.Parameters.AddWithValue("@Solution_Bank", tB_Admin.Solution_Bank);
                cmd.Parameters.AddWithValue("@Department_Master", tB_Admin.Department_Master);
                cmd.Parameters.AddWithValue("@Designation_Master", tB_Admin.Designation_Master);
                cmd.Parameters.AddWithValue("@City_Master", tB_Admin.City_Master);
                cmd.Parameters.AddWithValue("@Vender_Registration", tB_Admin.Vender_Registration);

                cmd.Parameters.AddWithValue("@Invoice_Master", tB_Admin.Invoice_Master);
                cmd.Parameters.AddWithValue("@Invoice_Regular", tB_Admin.Invoice_Regular);
                cmd.Parameters.AddWithValue("@Invoice_AERB", tB_Admin.Invoice_AERB);
                cmd.Parameters.AddWithValue("@Invoice_Medtronic", tB_Admin.Invoice_Medtronic);
                cmd.Parameters.AddWithValue("@Invoice_Mindray", tB_Admin.Invoice_Mindray);
                
                cmd.Parameters.AddWithValue("@Vendor_PO_Master", tB_Admin.Vendor_PO_Master);
                cmd.Parameters.AddWithValue("@Vendor_PO_Regular", tB_Admin.Vendor_PO_Regular);
                cmd.Parameters.AddWithValue("@Vendor_PO_AERB", tB_Admin.Vendor_PO_AERB);
                cmd.Parameters.AddWithValue("@Vendor_PO_Medtronic", tB_Admin.Vendor_PO_Medtronic);
                cmd.Parameters.AddWithValue("@Vendor_PO_Mindray", tB_Admin.Vendor_PO_Mindray);

                cmd.Parameters.AddWithValue("@Employee_Expense_Master", tB_Admin.Employee_Expense_Master);



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
            }
            return Json(new { success = i });
        }

        public JsonResult getModuleUpdate1(int id)
        {
            try
            {
                var _getadmin = db.TB_AdminPermission.Where(z => z.EMP_ID == id).Select(s => new
                {

                    s.EMP_ID,
                    s.Customer_Master,
                    s.Regular_Customer,
                    s.AERB_Customer,
                    s.Medtronic_Customer,
                    s.Mindray_Customer,
                    s.Customer_Service,
                    s.Service_Call_Assign,
                    s.Regular,
                    s.AERB,
                    s.Medtronic,
                    s.Mindray,
                    s.Sales_Lead,
                    s.Regular_Product_Master,
                    s.Category,
                    s.Manufacturer,
                    s.Regular_Product,
                    s.Spare_Part,
                    s.URD_Product_Purchase,
                    s.Standard_Accessories,
                    s.Mindray_Product_Master,
                    s.Mindray_Product,
                    s.Probe_Specifications,
                    s.Medtronic_Products_List,
                    s.Medtronic_Product,
                    s.Main_System,
                    s.Attachments,
                    s.Tools,
                    s.Incentive,
                    s.Incentive_Master,
                    s.Incentive_Scheme,
                    s.Quotation_Master,
                    s.Regular_Quotation,
                    s.AERB_Quotation,
                    s.Medtronic_Quotation,
                    s.Mindray_Quotation,
                    s.Report_Master,
                    s.Attendance_Report,
                    s.Leave_Report,
                    s.Monthly_Salary_Report,
                    s.Daily_Activity,
                    s.Delivery_Challan,
                    s.Regular_DC,
                    s.AERB_DC,
                    s.Medtronic_DC,
                    s.Mindray_DC,
                    s.AMC_CMC_Master,
                    s.AMC_CMC_Regular,
                    s.AMC_CMC_AERB,
                    s.AMC_CMC_Medtronic,
                    s.AMC_CMC_Mindray,
                    s.Payment_Receipt,
                    s.Payment_Receipt_Regular,
                    s.Payment_Receipt_AERB,
                    s.Payment_Receipt_Medtronic,
                    s.Payment_Receipt_Mindray,
                    s.Salary_Wages,
                    s.Salary_Increment,
                    s.Advance_Salary,
                    s.Employee_Loan,
                    s.Setting,
                    s.Company_Master,
                    s.Employee_Registration,
                    s.Department_Master,
                    s.Designation_Master,
                    s.Vender_Registration,
                    s.Solution_Bank,
                    s.City_Master,
                    s.Invoice_Master,
                    s.Invoice_Regular,
                    s.Invoice_AERB,
                    s.Invoice_Medtronic,
                    s.Invoice_Mindray,
                    s.Vendor_PO_Master,
                    s.Vendor_PO_Regular,
                    s.Vendor_PO_AERB,
                    s.Vendor_PO_Medtronic,
                    s.Vendor_PO_Mindray,
                    s.Employee_Expense_Master
                }).FirstOrDefault();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public string ChangeStatus(long id)
        {
            Tb_EmployeeMaster tB_Admin = db.Tb_EmployeeMaster.Where(b => b.EMP_ID == id).SingleOrDefault();
            if (tB_Admin.STATUS == "Active")
            {
                tB_Admin.STATUS = "Deactive";
                db.SaveChanges();
            }
            else
            {
                tB_Admin.STATUS = "Active";
                db.SaveChanges();
            }
            return "Status change Successfully.";
        }

        public ActionResult TourMap(long EMP_ID)
        {
            Session["EMP_ID"] = EMP_ID;
            return View();
        }

        public JsonResult GetTourMap(EmployeeMaster tB_Admin)
        {
            double a = 0;
            long id = Convert.ToInt64(Session["EMP_ID"]);
            cmd = new SqlCommand("Panel_GetEmpLocation", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_ID", id);
            cmd.Parameters.AddWithValue("@DATE", tB_Admin.DATE);

            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            EmployeeMaster rt;
            List<EmployeeMaster> FinalreportList = new List<EmployeeMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new EmployeeMaster();
                    try
                    {
                        //rt.EMP_ID = (dt.Rows[i]["EMPLOYEE_ID"]).ToString();
                        rt.LATITUDE = (dt.Rows[i]["LATITUDE"]).ToString();
                        rt.LONGITUDE = (dt.Rows[i]["LONGITUDE"]).ToString();
                        rt.TIME = (dt.Rows[i]["TIME"]).ToString();
                        rt.TYPE = (dt.Rows[i]["TYPE"]).ToString();
                        if (i != 0)
                        {
                            var sCoord = new GeoCoordinate(double.Parse(dt.Rows[i]["LATITUDE"].ToString()), double.Parse(dt.Rows[i]["LONGITUDE"].ToString()));
                            var eCoord = new GeoCoordinate(double.Parse(dt.Rows[i - 1]["LATITUDE"].ToString()), double.Parse(dt.Rows[1 - 1]["LONGITUDE"].ToString()));
                            a += sCoord.GetDistanceTo(eCoord) / 1000;
                            string s = a.ToString("0.00");
                            rt.Distance = s;
                        }
                        else
                        {
                            rt.Distance = "0";
                        }

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
    }
}