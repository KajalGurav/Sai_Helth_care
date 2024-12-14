using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;


namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class MedtronicProductController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        // GET: MedtronicProduct
        public ActionResult Index()
        {
            return View();
        }

        public class Search_Admin
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public string PRODUCT_NAME { get; set; }
        }

        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("Get_Tb_MedtronicProduct_Count", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PRODUCT_NAME", tB_Admin.PRODUCT_NAME);
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
            cmd = new SqlCommand("Panel_Get_Tb_MedtronicProduct", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@PRODUCT_NAME", tB_Admin.PRODUCT_NAME);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            MedtronicAccessories rt;
            List<MedtronicAccessories> FinalreportList = new List<MedtronicAccessories>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new MedtronicAccessories();
                    try
                    {
                        
                        rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"].ToString());
                        rt.HSN_CODE = (dt.Rows[i]["HSN_CODE"].ToString());
                        rt.MRP = Convert.ToDecimal(dt.Rows[i]["MRP"]);
                        rt.BASIC_PRICE = Convert.ToDecimal(dt.Rows[i]["BASIC_PRICE"]);
                        rt.GST_PERCENTAGE = Convert.ToInt32(dt.Rows[i]["GST_PERCENTAGE"]);
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


        public ActionResult AddAdmin(MedtronicAccessories tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Insert_TB_MedtronicProduct", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PRODUCT_NAME", tB_admin.PRODUCT_NAME);
                cmd.Parameters.AddWithValue("@HSN_CODE", tB_admin.HSN_CODE);
                cmd.Parameters.AddWithValue("@MRP", tB_admin.MRP);
                cmd.Parameters.AddWithValue("@BASIC_PRICE", tB_admin.BASIC_PRICE);
                cmd.Parameters.AddWithValue("@GST_PERCENTAGE", tB_admin.GST_PERCENTAGE);
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




        public ActionResult EditAdmin(MedtronicAccessories tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Update_TB_MedtronicProduct", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@P_ID", tB_admin.P_ID);
                cmd.Parameters.AddWithValue("@PRODUCT_NAME", tB_admin.PRODUCT_NAME);
                cmd.Parameters.AddWithValue("@HSN_CODE", tB_admin.HSN_CODE);
                cmd.Parameters.AddWithValue("@MRP", tB_admin.MRP);
                cmd.Parameters.AddWithValue("@BASIC_PRICE", tB_admin.BASIC_PRICE);
                cmd.Parameters.AddWithValue("@GST_PERCENTAGE", tB_admin.GST_PERCENTAGE);
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