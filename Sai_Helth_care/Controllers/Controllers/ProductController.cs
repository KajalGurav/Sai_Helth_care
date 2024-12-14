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
    public class ProductController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        // GET: Product
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
                cmd = new SqlCommand("Get_Tb_Product_Count", con);
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
            cmd = new SqlCommand("Panel_Get_Tb_Product", con);
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
            Category rt;
            List<Category> FinalreportList = new List<Category>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new Category();
                    try
                    {
                        
                        rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.CAT_ID = dt.Rows[i]["CAT_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        rt.M_ID = dt.Rows[i]["M_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["M_ID"]);
                        rt.CAT_NAME = (dt.Rows[i]["CAT_NAME"].ToString());
                        rt.M_NAME = (dt.Rows[i]["M_NAME"].ToString());
                      //  rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"].ToString());
                        rt.HSN_CODE = (dt.Rows[i]["HSN_CODE"].ToString());
                        rt.LETTER_REF_NO = (dt.Rows[i]["LETTER_REF_NO"].ToString());
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

        public JsonResult GetCategory()
        {
            var _getadmin = db.TB_Category.Where(z => z.STATUS == "Active").OrderBy(s => s.CAT_NAME).Select(s => new { s.CAT_ID, s.CAT_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetManufacturer(long id)
        {
            var _getadmin = db.Tb_Manufacturer.Where(z => z.STATUS == "Active" && z.CAT_ID == id).Select(s => new { s.M_ID, s.M_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddAdmin(Category tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Insert_Tb_Product", con);
                cmd.CommandType = CommandType.StoredProcedure;
              //  cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tB_admin.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@CAT_ID", tB_admin.CAT_ID);
                cmd.Parameters.AddWithValue("@M_ID", tB_admin.M_ID);
                cmd.Parameters.AddWithValue("@PRODUCT_NAME", tB_admin.PRODUCT_NAME);
                cmd.Parameters.AddWithValue("@HSN_CODE", tB_admin.HSN_CODE);
               // cmd.Parameters.AddWithValue("@LETTER_REF_NO", tB_admin.LETTER_REF_NO);
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




        public ActionResult EditAdmin(Category tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Update_Tb_Product", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CAT_ID", tB_admin.CAT_ID);
                cmd.Parameters.AddWithValue("@M_ID", tB_admin.M_ID);
                cmd.Parameters.AddWithValue("@PRODUCT_NAME", tB_admin.PRODUCT_NAME);
                cmd.Parameters.AddWithValue("@HSN_CODE", tB_admin.HSN_CODE);
                cmd.Parameters.AddWithValue("@P_ID", tB_admin.P_ID);
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
            Tb_Product tB_Admin = db.Tb_Product.Where(b => b.P_ID == id).SingleOrDefault();
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