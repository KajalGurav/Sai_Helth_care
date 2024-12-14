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
    public class ManufacturerController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;


        // GET: Manufacturer
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
                cmd = new SqlCommand("Get_Tb_Manufacturer_Count", con);
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
            cmd = new SqlCommand("Panel_Get_Tb_Manufacturer", con);
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

                        rt.M_ID = Convert.ToInt64(dt.Rows[i]["M_ID"]);
                        rt.CAT_ID = Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        rt.CAT_NAME = (dt.Rows[i]["CAT_NAME"].ToString());
                        rt.M_NAME = (dt.Rows[i]["M_NAME"].ToString());
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
        public ActionResult AddAdmin(Category tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Insert_Tb_Manufacturer", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CAT_ID", tB_admin.CAT_ID);
                cmd.Parameters.AddWithValue("@M_NAME", tB_admin.M_NAME);

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
                cmd = new SqlCommand("Update_Tb_Manufacturer", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CAT_ID", tB_admin.CAT_ID);
                cmd.Parameters.AddWithValue("@M_NAME", tB_admin.M_NAME);
                cmd.Parameters.AddWithValue("@M_ID", tB_admin.M_ID);
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
            Tb_Manufacturer tB_Admin = db.Tb_Manufacturer.Where(b => b.M_ID == id).SingleOrDefault();
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


        public ActionResult ExportToExcel(string ManfName)
        {
            // Set the license context
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            // Initialize the package
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("ManufactureData");

                // Define headers
                worksheet.Cells[1, 1].Value = "Category Name";
                worksheet.Cells[1, 2].Value = "Manufacture Name";
                worksheet.Cells[1, 3].Value = "Reg Date";
                worksheet.Cells[1, 4].Value = "Status";

                // Fetch data based on the manufacturer name
                var result = from c in db.TB_Category
                             join m in db.Tb_Manufacturer
                             on c.CAT_ID equals m.CAT_ID into cm
                             from manufacturer in cm.DefaultIfEmpty()
                             where manufacturer.M_NAME.Contains(ManfName)
                             select new
                             {
                                 CategoryName = c.CAT_NAME,
                                 ManufactureName = manufacturer.M_NAME,
                                 RegDate = manufacturer.REG_DATE,
                                 Status = manufacturer.STATUS
                             };

                var product = result.ToList();

                // Add data to worksheet
                for (int i = 0; i < product.Count; i++)
                {
                    var item = product[i];
                    worksheet.Cells[i + 2, 1].Value = item.CategoryName;
                    worksheet.Cells[i + 2, 2].Value = item.ManufactureName;
                    worksheet.Cells[i + 2, 3].Value = item.RegDate.HasValue ? item.RegDate.Value.ToString("yyyy-MM-dd") : "No Date";
                    worksheet.Cells[i + 2, 4].Value = item.Status;
                }

                // Save the package to a memory stream
                var stream = new MemoryStream();
                package.SaveAs(stream);
                stream.Position = 0;

                // Define file name
                string excelName = $"ManufactureData_{DateTime.Now.ToString("yyyyMMddHHmmssfff")}.xlsx";

                // Return the file result
                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
            }
        }


    }
}