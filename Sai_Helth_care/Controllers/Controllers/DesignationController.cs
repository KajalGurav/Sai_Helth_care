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
    public class DesignationController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        // GET: Designation

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
                cmd = new SqlCommand("Get_Tb_Designation_Count", con);
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
            cmd = new SqlCommand("Panel_Get_Tb_Designation", con);
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
            Designation rt;
            List<Designation> FinalreportList = new List<Designation>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new Designation();
                    try
                    {
                        rt.DESI_ID = Convert.ToInt64(dt.Rows[i]["DESI_ID"]);
                        rt.DEP_ID = Convert.ToInt64(dt.Rows[i]["DEP_ID"]);
                        rt.DEP_NAME = (dt.Rows[i]["DEP_NAME"].ToString());
                        rt.DESI_NAME = (dt.Rows[i]["DESI_NAME"].ToString());
                        rt.STATUS = (dt.Rows[i]["STATUS"].ToString());
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"].ToString());
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


        public JsonResult GetDepartment()
        {
            var _getadmin = db.Tb_Department.Where(z => z.STATUS == "Active").Select(s => new { s.DEP_ID, s.DEP_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }


        public ActionResult AddAdmin(Designation tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Insert_Tb_Designation", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@DESI_NAME", tB_admin.DESI_NAME);
                cmd.Parameters.AddWithValue("@DEP_ID", tB_admin.DEP_ID);

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

        public ActionResult EditAdmin(Designation tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Update_Tb_Designation", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@DESI_NAME", tB_admin.DESI_NAME);
                cmd.Parameters.AddWithValue("@DEP_ID", tB_admin.DEP_ID);
                cmd.Parameters.AddWithValue("@DESI_ID", tB_admin.DESI_ID);
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
            Tb_Designation tB_Admin = db.Tb_Designation.Where(b => b.DESI_ID == id).SingleOrDefault();
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

    }
}