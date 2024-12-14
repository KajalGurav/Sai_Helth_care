using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sai_Helth_care.Models;
using OfficeOpenXml;
using System.IO;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class PRoduct_MasterController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        // CATEGORY TABLE ALL FUNCTION

        // GET: PRoduct_Master
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Sparepart()
        {
            return View();
        }

        public ActionResult Productcategory()
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
                cmd = new SqlCommand("Get_TB_Category_Count", con);
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
            cmd = new SqlCommand("Panel_Get_TB_Category", con);
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

                        rt.CAT_ID = Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        rt.CAT_NAME = (dt.Rows[i]["CAT_NAME"].ToString());
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



        public ActionResult AddAdmin(Category tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Insert_TB_Category", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CAT_NAME", tB_admin.CAT_NAME);

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
                cmd = new SqlCommand("Update_TB_Category", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CAT_NAME", tB_admin.CAT_NAME);
                cmd.Parameters.AddWithValue("@CAT_ID", tB_admin.CAT_ID);
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
            TB_Category tB_Admin = db.TB_Category.Where(b => b.CAT_ID == id).SingleOrDefault();
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

        public ActionResult ExportToExcel(string ProductName)
        {
            // Set the license context
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            // Initialize the package
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("CustomerData");

                // Define headers
                worksheet.Cells[1, 1].Value = "Category Name";
                worksheet.Cells[1, 2].Value = "Status";
                worksheet.Cells[1, 3].Value = "Reg Date";
                
                // Fetch data based on the customer name
                var query = db.TB_Category.AsQueryable();

                if (!string.IsNullOrEmpty(ProductName))
                {
                    query = query.Where(c => c.CAT_NAME.Contains(ProductName));
                }

                var product = query.ToList();

                // Add data to worksheet
                for (int i = 0; i < product.Count; i++)
                {
                    var customer = product[i];
                    worksheet.Cells[i + 2, 1].Value = customer.CAT_NAME;
                    worksheet.Cells[i + 2, 2].Value = customer.STATUS;
                    worksheet.Cells[i + 2, 3].Value = customer.REG_DATE;
                  
                }

                // Save the package to a memory stream
                var stream = new MemoryStream();
                package.SaveAs(stream);
                stream.Position = 0;

                // Define file name
                string excelName = $"ProductData_{DateTime.Now.ToString("yyyyMMddHHmmssfff")}.xlsx";

                // Return the file result
                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
            }
        }

    }
}










