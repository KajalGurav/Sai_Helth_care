using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sai_Helth_care.Models;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class CityMasterController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        // GET: CityMaster
        public ActionResult Index()
        {
            return View();
        }


        public class Search_Admin
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public string FARMER_NAME { get; set; }
            public string CITY_ID { get; set; }
        }

        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("Get_City_Count", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
                cmd.Parameters.AddWithValue("@CITY_ID", tB_Admin.CITY_ID);
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
            cmd = new SqlCommand("panel_GetCityMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ADMIN_ID", 1);
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
            cmd.Parameters.AddWithValue("@CITY_ID", tB_Admin.CITY_ID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            CITY rt;
            List<CITY> FinalreportList = new List<CITY>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new CITY();
                    try
                    {
                        rt.STATE_ID = Convert.ToInt64(dt.Rows[i]["STATE_ID"]);
                        rt.CITY_ID = Convert.ToInt64(dt.Rows[i]["CITY_ID"]);
                        rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"].ToString());
                        rt.STATE_NAME = (dt.Rows[i]["STATE_NAME"].ToString());
                        rt.STATUS = (dt.Rows[i]["STATUS"].ToString());
                        rt.REG_DATE = Convert.ToDateTime(dt.Rows[i]["REG_DATE"]).ToString("dd/MM/yyyy");
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


        public JsonResult GetStateById()
        {
            var _GetState = db.TB_StateMaster.Where(a => a.STATUS == "Active").Select(s => new { s.STATE_ID, s.STATE_NAME }).OrderBy(a => a.STATE_NAME).ToList();
            return Json(_GetState, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddAdmin_Record(CITY tB_admin)
        {

            try
            {
                cmd = new SqlCommand("panel_InsertTB_CityMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@STATE_ID", tB_admin.STATE_ID);
                cmd.Parameters.AddWithValue("@CITY_NAME", tB_admin.CITY_NAME);
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



        public ActionResult EditAdmin(CITY tB_admin)
        {

            try
            {
                cmd = new SqlCommand("Update_TB_CityMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@STATE_ID", tB_admin.STATE_ID);
                cmd.Parameters.AddWithValue("@CITY_ID", tB_admin.CITY_ID);
                cmd.Parameters.AddWithValue("@CITY_NAME", tB_admin.CITY_NAME);

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
            TB_CityMaster tB_admin = db.TB_CityMaster.Where(b => b.CITY_ID == id).SingleOrDefault();
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



        public JsonResult GetadminById(int id)
        {
            var _getadmin = db.TB_CityMaster.Where(z => z.CITY_ID == id).Select(s => new { s.CITY_ID, s.CITY_NAME,s.TB_StateMaster.STATE_NAME, s.STATUS, s.REG_DATE, s.STATE_ID }).FirstOrDefault();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

    }
}