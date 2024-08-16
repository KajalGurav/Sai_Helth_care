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
    public class StateMasterController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        // GET: StateMaster
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
        }

        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("Get_State_Count", con);
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
            cmd = new SqlCommand("panel_Getstate", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ADMIN_ID", 1);
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
            STATE rt;
            List<STATE> FinalreportList = new List<STATE>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new STATE();
                    try
                    {
                        rt.STATE_ID = Convert.ToInt64(dt.Rows[i]["STATE_ID"]);
                        rt.STATE_NAME = (dt.Rows[i]["STATE_NAME"].ToString());
                        rt.STATUS = (dt.Rows[i]["STATUS"].ToString());
                        //  rt.REG_DATE = (dt.Rows[i]["REG_DATE"].ToString());
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



        public JsonResult GetadminById(int id)
        {
            var _getadmin = db.TB_StateMaster.Where(z => z.STATE_ID == id).OrderBy(s => s.STATE_NAME).Select(s => new
            {
                s.STATE_ID,
                s.STATE_NAME,
                s.REG_DATE,
                s.STATUS
            }).FirstOrDefault();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }





        public ActionResult AddAdmin_Record(STATE tB_admin)
        {

            try
            {
                cmd = new SqlCommand("panel_Insertstate", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@STATE_NAME", tB_admin.STATE_NAME);


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



        public ActionResult EditAdmin(STATE tB_Admin)
        {

            try
            {
                cmd = new SqlCommand("Update_TB_state", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
                cmd.Parameters.AddWithValue("@STATE_NAME", tB_Admin.STATE_NAME);
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
            TB_StateMaster tB_admin = db.TB_StateMaster.Where(b => b.STATE_ID == id).SingleOrDefault();
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



        public JsonResult GetSTATEById(int id)
        {
            var _getadmin =
                db.TB_StateMaster.Where(a => a.STATE_ID == id).OrderBy(s => s.STATE_NAME)
                .Select(s => new
                {
                    s.STATE_ID,
                    s.STATE_NAME,
                    s.STATUS,
                    s.REG_DATE
                }).FirstOrDefault();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }



    }
}