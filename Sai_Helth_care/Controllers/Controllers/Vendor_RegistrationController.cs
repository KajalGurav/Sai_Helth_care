using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sai_Helth_care.Models;
using System.Net;
using System.Web.Helpers;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Vendor_RegistrationController : Controller
    {

        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        // GET: Vendor_Registration
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
        }
        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("Get_Tb_VendorRegistration_Count", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
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
            cmd = new SqlCommand("Panel_Get_Tb_VendorRegistration", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
            cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            VendorRegistration rt;
            List<VendorRegistration> FinalreportList = new List<VendorRegistration>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new VendorRegistration();
                    try
                    {
                        rt.V_ID = Convert.ToInt64(dt.Rows[i]["V_ID"]);
                        rt.COMPANY_ID = Convert.ToInt64(dt.Rows[i]["COMPANY_ID"]);
                        rt.STATE_ID = Convert.ToInt64(dt.Rows[i]["STATE_ID"]);
                        rt.CITY_ID = Convert.ToInt64(dt.Rows[i]["CITY_ID"]);
                        rt.VENDOR_NAME = (dt.Rows[i]["VENDOR_NAME"]).ToString();
                        rt.VENDOR_COMPANY = (dt.Rows[i]["VENDOR_COMPANY"]).ToString();
                        rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"]).ToString();
                        rt.ALTERNATE_CONTACT_NO = (dt.Rows[i]["ALTERNATE_CONTACT_NO"]).ToString();
                        rt.EMAIL = (dt.Rows[i]["EMAIL"]).ToString();
                        rt.ALTERNATE_EMAIL = (dt.Rows[i]["ALTERNATE_EMAIL"]).ToString();
                        rt.ADDRESS = (dt.Rows[i]["ADDRESS"]).ToString();
                        rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.PAN_CARD_NO = (dt.Rows[i]["PAN_CARD_NO"]).ToString();
                        rt.GST_NO = (dt.Rows[i]["GST_NO"]).ToString();
                        rt.TIN_NO = (dt.Rows[i]["TIN_NO"]).ToString();
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

        public ActionResult AddAdmin(VendorRegistration tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Insert_Tb_VendorRegistration", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@COMPANY_ID", tB_admin.COMPANY_ID);
                cmd.Parameters.AddWithValue("@VENDOR_NAME", tB_admin.VENDOR_NAME);
                cmd.Parameters.AddWithValue("@VENDOR_COMPANY", tB_admin.VENDOR_COMPANY);
                cmd.Parameters.AddWithValue("@CONTACT_NO", tB_admin.CONTACT_NO);
                cmd.Parameters.AddWithValue("@ALTERNATE_CONTACT_NO", tB_admin.ALTERNATE_CONTACT_NO);
                cmd.Parameters.AddWithValue("@EMAIL", tB_admin.EMAIL);
                cmd.Parameters.AddWithValue("@ALTERNATE_EMAIL", tB_admin.ALTERNATE_EMAIL);
                cmd.Parameters.AddWithValue("@ADDRESS", tB_admin.ADDRESS);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_admin.STATE_ID);
                cmd.Parameters.AddWithValue("@CITY_ID", tB_admin.CITY_ID);
                cmd.Parameters.AddWithValue("@ZIP_CODE", tB_admin.ZIP_CODE);
                cmd.Parameters.AddWithValue("@PAN_CARD_NO", tB_admin.PAN_CARD_NO);
                cmd.Parameters.AddWithValue("@GST_NO", tB_admin.GST_NO);
                cmd.Parameters.AddWithValue("@TIN_NO", tB_admin.TIN_NO);
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




        public ActionResult EditAdmin(VendorRegistration tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Update_Tb_VendorRegistration", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@COMPANY_ID", tB_admin.COMPANY_ID);
                cmd.Parameters.AddWithValue("@VENDOR_NAME", tB_admin.VENDOR_NAME);
                cmd.Parameters.AddWithValue("@VENDOR_COMPANY", tB_admin.VENDOR_COMPANY);
                cmd.Parameters.AddWithValue("@CONTACT_NO", tB_admin.CONTACT_NO);
                cmd.Parameters.AddWithValue("@ALTERNATE_CONTACT_NO", tB_admin.ALTERNATE_CONTACT_NO);
                cmd.Parameters.AddWithValue("@EMAIL", tB_admin.EMAIL);
                cmd.Parameters.AddWithValue("@ALTERNATE_EMAIL", tB_admin.ALTERNATE_EMAIL);
                cmd.Parameters.AddWithValue("@ADDRESS", tB_admin.ADDRESS);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_admin.STATE_ID);
                cmd.Parameters.AddWithValue("@CITY_ID", tB_admin.CITY_ID);
                cmd.Parameters.AddWithValue("@ZIP_CODE", tB_admin.ZIP_CODE);
                cmd.Parameters.AddWithValue("@PAN_CARD_NO", tB_admin.PAN_CARD_NO);
                cmd.Parameters.AddWithValue("@GST_NO", tB_admin.GST_NO);
                cmd.Parameters.AddWithValue("@TIN_NO", tB_admin.TIN_NO);
                cmd.Parameters.AddWithValue("@V_ID", tB_admin.V_ID);
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

        public string ChangeStatus(long id)
        {
            Tb_VendorRegistration tB_admin = db.Tb_VendorRegistration.Where(b => b.V_ID == id).SingleOrDefault();
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


    }
}