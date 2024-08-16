using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class ProductStockMangementController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        // GET: SparePart

        public ActionResult Index()
        {
            return View();
        }


        public class Search_Admin
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public string SEARCH_NAME { get; set; }
            public string START_DATE { get; set; }
            public string END_DATE { get; set; }
            public int P_TYPE { get; set; }
            public int CAT_ID { get; set; }
            public int M_ID { get; set; }
            public int P_ID { get; set; }

        }

        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("Panel_GetProductStockEntryCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@SEARCH_NAME", tB_Admin.SEARCH_NAME);
                cmd.Parameters.AddWithValue("@START_DATE", tB_Admin.START_DATE);
                cmd.Parameters.AddWithValue("@END_DATE", tB_Admin.END_DATE);
                cmd.Parameters.AddWithValue("@P_TYPE", tB_Admin.P_TYPE);
                cmd.Parameters.AddWithValue("@CAT_ID", tB_Admin.CAT_ID);
                cmd.Parameters.AddWithValue("@M_ID", tB_Admin.M_ID);
                cmd.Parameters.AddWithValue("@P_ID", tB_Admin.P_ID);
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
            cmd = new SqlCommand("Panel_GetProductStockEntryList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@SEARCH_NAME", tB_Admin.SEARCH_NAME);
            cmd.Parameters.AddWithValue("@START_DATE", tB_Admin.START_DATE);
            cmd.Parameters.AddWithValue("@END_DATE", tB_Admin.END_DATE);
            cmd.Parameters.AddWithValue("@M_ID", tB_Admin.M_ID);
            cmd.Parameters.AddWithValue("@P_ID", tB_Admin.P_ID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            ProductStockEntry rt;
            List<ProductStockEntry> FinalreportList = new List<ProductStockEntry>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new ProductStockEntry();
                    try
                    {
                        rt.P_STOCK_ID = dt.Rows[i]["P_STOCK_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["P_STOCK_ID"]);
                        rt.P_STOCK_NO = dt.Rows[i]["P_STOCK_NO"].ToString();
                        rt.STOCK_ENTRY_DATE = dt.Rows[i]["STOCK_ENTRY_DATE"].ToString();
                        rt.CAT_ID = dt.Rows[i]["CAT_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        rt.M_ID = dt.Rows[i]["M_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["M_ID"]);
                        rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.P_QTY = Convert.ToInt32(dt.Rows[i]["P_QTY"]);
                        rt.P_SERIAL_NO = dt.Rows[i]["P_SERIAL_NO"].ToString();
                        rt.IS_URD_SUPPLIER = Convert.ToInt32(dt.Rows[i]["IS_URD_SUPPLIER"]);
                        rt.URD_SUPPLIER_ID = dt.Rows[i]["URD_SUPPLIER_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["URD_SUPPLIER_ID"]);
                        rt.VENDOR_SUPPLIER_ID = dt.Rows[i]["VENDOR_SUPPLIER_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["VENDOR_SUPPLIER_ID"]);
                        rt.SUPPLIER_NAME = dt.Rows[i]["SUPPLIER_NAME"].ToString();
                        rt.SUPPLIER_CONTACT_PERSON = dt.Rows[i]["SUPPLIER_CONTACT_PERSON"].ToString();
                        rt.DEPART_FROM = dt.Rows[i]["DEPART_FROM"].ToString();
                        rt.INVOICE_NO = dt.Rows[i]["INVOICE_NO"].ToString();
                        rt.DC_NO = dt.Rows[i]["DC_NO"].ToString();
                        rt.ARRIVE_AT = dt.Rows[i]["ARRIVE_AT"].ToString();
                        rt.VEHICAL_NO = dt.Rows[i]["VEHICAL_NO"].ToString();
                        rt.MATERIAL_RECEIVED_DATE = dt.Rows[i]["MATERIAL_RECEIVED_DATE"].ToString();
                        rt.COMMENTS = dt.Rows[i]["COMMENTS"].ToString();
                        rt.SHIPMENT_DETAILS = dt.Rows[i]["SHIPMENT_DETAILS"].ToString();
                        rt.EMPLOYEE_ID = dt.Rows[i]["EMPLOYEE_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["EMPLOYEE_ID"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"]).ToString();
                        rt.PENDING_QTY = dt.Rows[i]["PENDING_QTY"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["PENDING_QTY"]);
                        rt.INVOICE_ID = dt.Rows[i]["INVOICE_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["INVOICE_ID"]);
                        rt.INVOICE_NUMBER = dt.Rows[i]["INVOICE_NUMBER"].ToString();
                        rt.DC_NUMBER = dt.Rows[i]["DC_NUMBER"].ToString();
                        rt.ASSIGN_TO = dt.Rows[i]["ASSIGN_TO"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["ASSIGN_TO"]);
                        rt.CUSTOMER_NAME = dt.Rows[i]["CUSTOMER_NAME"].ToString();
                        rt.CUSTOMER_TYPE = dt.Rows[i]["CUSTOMER_TYPE"].ToString();
                        rt.ASSIGN_ON_DATE = dt.Rows[i]["ASSIGN_ON_DATE"].ToString();
                        rt.STATUS = (dt.Rows[i]["STATUS"].ToString());
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"].ToString());
                        rt.HSN_CODE = dt.Rows[i]["HSN_CODE"].ToString();
                        rt.PRODUCT_TYPE = dt.Rows[i]["PRODUCT_TYPE"].ToString();
                        rt.PRODUCT_NAME = dt.Rows[i]["PRODUCT_NAME"].ToString();
                        rt.M_NAME = dt.Rows[i]["M_NAME"].ToString();
                        rt.CAT_NAME = dt.Rows[i]["CAT_NAME"].ToString();

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

        public JsonResult GetCustomerList()
        {
            long c_id = Convert.ToInt64(Session["COMPANY_ID"]);
            var _getadmin = db.Tb_CustomerMaster.Where(z => z.STATUS == "Active" && (c_id == 0 || z.COMPANY_ID == c_id)).OrderBy(x => x.FIRM_NAME).Select(s => new { s.Customer_ID, s.CUSTOMER_NAME, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);

        } 
        
        public JsonResult GetVendorList()
        {
            var _getadmin = db.Tb_VendorRegistration.Where(z => z.STATUS == "Active").OrderBy(x => x.VENDOR_COMPANY).Select(s => new { s.V_ID, s.VENDOR_COMPANY, s.VENDOR_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);

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

        public JsonResult GetManufacturerList()
        {
            var _getadmin = db.Tb_Manufacturer.Where(z => z.STATUS == "Active").Select(s => new { s.M_ID, s.M_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProduct(long? id)
        {
            if (id == null)
            {
                var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active").OrderBy(s => s.PRODUCT_NAME).Select(s => new { s.P_ID, s.PRODUCT_NAME, s.PT_ID, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active" && z.M_ID == id).Select(s => new { s.P_ID, s.PRODUCT_NAME, s.PT_ID, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult GetProductList()
        {
            var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active").OrderBy(s => s.PRODUCT_NAME).Select(s => new { s.P_ID, s.PRODUCT_NAME, s.PT_ID, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddUpdateAdmin(ProductStockEntry tB_admin)
        {
            long id = Convert.ToInt64(Session["COMPANY_ID"]);
            try
            {
             cmd= new SqlCommand("Panel_AddUpdateProductStockEntry",con);
                cmd.CommandType=CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@P_STOCK_ID",tB_admin.P_STOCK_ID);
                cmd.Parameters.AddWithValue("@STOCK_ENTRY_DATE",tB_admin.STOCK_ENTRY_DATE);
                cmd.Parameters.AddWithValue("@P_ID",tB_admin.P_ID);
                cmd.Parameters.AddWithValue("@P_QTY",tB_admin.P_QTY);
                cmd.Parameters.AddWithValue("@P_SERIAL_NO",tB_admin.P_SERIAL_NO);
                cmd.Parameters.AddWithValue("@IS_URD_SUPPLIER",tB_admin.IS_URD_SUPPLIER);
                cmd.Parameters.AddWithValue("@URD_SUPPLIER_ID",tB_admin.URD_SUPPLIER_ID);
                cmd.Parameters.AddWithValue("@VENDOR_SUPPLIER_ID",tB_admin.VENDOR_SUPPLIER_ID);
                cmd.Parameters.AddWithValue("@DEPART_FROM",tB_admin.DEPART_FROM);
                cmd.Parameters.AddWithValue("@INVOICE_NO", tB_admin.INVOICE_NO);
                cmd.Parameters.AddWithValue("@DC_NO", tB_admin.DC_NO);
                cmd.Parameters.AddWithValue("@ARRIVE_AT",tB_admin.ARRIVE_AT);
                cmd.Parameters.AddWithValue("@VEHICAL_NO",tB_admin.VEHICAL_NO);
                cmd.Parameters.AddWithValue("@MATERIAL_RECEIVED_DATE",tB_admin.MATERIAL_RECEIVED_DATE);
                cmd.Parameters.AddWithValue("@COMMENTS",tB_admin.COMMENTS);
                cmd.Parameters.AddWithValue("@SHIPMENT_DETAILS",tB_admin.SHIPMENT_DETAILS);
                cmd.Parameters.AddWithValue("@EMPLOYEE_ID",tB_admin.EMPLOYEE_ID);
                cmd.Parameters.AddWithValue("@PENDING_QTY",tB_admin.PENDING_QTY);
                cmd.Parameters.AddWithValue("@HSN_CODE",tB_admin.HSN_CODE);
                cmd.Parameters.AddWithValue("@PRODUCT_TYPE",tB_admin.PRODUCT_TYPE);
                cmd.Parameters.AddWithValue("@ACTION",tB_admin.ACTION);
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);

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



        public ActionResult ProductStockExport(Search_Admin tB_Admin)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                string sFileName = "Product Stock Report.xls";
                sb.Append("<table style='1px solid black; font-size:12px;' border='1'>");
                sb.Append("<tr>");
                sb.Append("<td><b>Sr No</b></td>");
                sb.Append("<td><b>Stock ID</b></td>");
                sb.Append("<td><b>Stock Entry Date</b></td>");
                sb.Append("<td><b>Category Name</b></td>");
                sb.Append("<td><b>Manufacturer Name</b></td>");
                sb.Append("<td><b>Product Name</b></td>");
                sb.Append("<td><b>Product Quantity</b></td>");
                sb.Append("<td><b>Product Serial No</b></td>");
                sb.Append("<td><b>HSN Code</b></td>");
                sb.Append("<td><b>Product Type</b></td>");
                sb.Append("<td><b>Is URD Supplier</b></td>");
                sb.Append("<td><b>URD Supplier ID</b></td>");
                sb.Append("<td><b>Vendor Supplier ID</b></td>");
                sb.Append("<td><b>Supplier Name</b></td>");
                sb.Append("<td><b>Supplier Contact Person</b></td>");
                sb.Append("<td><b>Depart From</b></td>");
                sb.Append("<td><b>Invoice No</b></td>");
                sb.Append("<td><b>DC No</b></td>");
                sb.Append("<td><b>Arrive At</b></td>");
                sb.Append("<td><b>Vehicle No</b></td>");
                sb.Append("<td><b>Material Received Date</b></td>");
                sb.Append("<td><b>Comments</b></td>");
                sb.Append("<td><b>Shipment Details</b></td>");
                sb.Append("<td><b>Employee ID</b></td>");
                sb.Append("<td><b>Employee Name</b></td>");
                sb.Append("<td><b>Pending Quantity</b></td>");
                sb.Append("<td><b>Customer Invoice ID</b></td>");
                sb.Append("<td><b>Customer Invoice Number</b></td>");
                sb.Append("<td><b>Customer DC Number</b></td>");
                sb.Append("<td><b>Assign To Id</b></td>");
                sb.Append("<td><b>Customer Name</b></td>");
                sb.Append("<td><b>Customer Type</b></td>");
                sb.Append("<td><b>Assign On Date</b></td>");
                sb.Append("<td><b>Status</b></td>");
                sb.Append("<td><b>Registration Date</b></td>");
                sb.Append("</tr>");

                cmd = new SqlCommand("Panel_GetProductStockEntryListExport", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@SEARCH_NAME", tB_Admin.SEARCH_NAME);
                cmd.Parameters.AddWithValue("@START_DATE", tB_Admin.START_DATE);
                cmd.Parameters.AddWithValue("@END_DATE", tB_Admin.END_DATE);
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                sda = new SqlDataAdapter(cmd);
                dt = new DataTable();
                sda.Fill(dt);
                con.Close();
                ProductStockEntry rt;
                if (dt != null)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        rt = new ProductStockEntry();

                        rt.P_STOCK_ID = dt.Rows[i]["P_STOCK_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["P_STOCK_ID"]);
                        rt.P_STOCK_NO = dt.Rows[i]["P_STOCK_NO"].ToString();
                        rt.STOCK_ENTRY_DATE = dt.Rows[i]["STOCK_ENTRY_DATE"].ToString();
                        rt.CAT_ID = dt.Rows[i]["CAT_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        rt.M_ID = dt.Rows[i]["M_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["M_ID"]);
                        rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.P_QTY = Convert.ToInt32(dt.Rows[i]["P_QTY"]);
                        rt.P_SERIAL_NO = dt.Rows[i]["P_SERIAL_NO"].ToString();
                        rt.IS_URD_SUPPLIER = Convert.ToInt32(dt.Rows[i]["IS_URD_SUPPLIER"]);
                        rt.URD_SUPPLIER_ID = dt.Rows[i]["URD_SUPPLIER_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["URD_SUPPLIER_ID"]);
                        rt.VENDOR_SUPPLIER_ID = dt.Rows[i]["VENDOR_SUPPLIER_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["VENDOR_SUPPLIER_ID"]);
                        rt.SUPPLIER_NAME = dt.Rows[i]["SUPPLIER_NAME"].ToString();
                        rt.SUPPLIER_CONTACT_PERSON = dt.Rows[i]["SUPPLIER_CONTACT_PERSON"].ToString();
                        rt.DEPART_FROM = dt.Rows[i]["DEPART_FROM"].ToString();
                        rt.INVOICE_NO = dt.Rows[i]["INVOICE_NO"].ToString();
                        rt.DC_NO = dt.Rows[i]["DC_NO"].ToString();
                        rt.ARRIVE_AT = dt.Rows[i]["ARRIVE_AT"].ToString();
                        rt.VEHICAL_NO = dt.Rows[i]["VEHICAL_NO"].ToString();
                        rt.MATERIAL_RECEIVED_DATE = dt.Rows[i]["MATERIAL_RECEIVED_DATE"].ToString();
                        rt.COMMENTS = dt.Rows[i]["COMMENTS"].ToString();
                        rt.SHIPMENT_DETAILS = dt.Rows[i]["SHIPMENT_DETAILS"].ToString();
                        rt.EMPLOYEE_ID = dt.Rows[i]["EMPLOYEE_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["EMPLOYEE_ID"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"]).ToString();
                        rt.PENDING_QTY = dt.Rows[i]["PENDING_QTY"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["PENDING_QTY"]);
                        rt.INVOICE_ID = dt.Rows[i]["INVOICE_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["INVOICE_ID"]);
                        rt.INVOICE_NUMBER = dt.Rows[i]["INVOICE_NUMBER"].ToString();
                        rt.DC_NUMBER = dt.Rows[i]["DC_NUMBER"].ToString();
                        rt.ASSIGN_TO = dt.Rows[i]["ASSIGN_TO"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["ASSIGN_TO"]);
                        rt.CUSTOMER_NAME = dt.Rows[i]["CUSTOMER_NAME"].ToString();
                        rt.CUSTOMER_TYPE = dt.Rows[i]["CUSTOMER_TYPE"].ToString();
                        rt.ASSIGN_ON_DATE = dt.Rows[i]["ASSIGN_ON_DATE"].ToString();
                        rt.STATUS = (dt.Rows[i]["STATUS"].ToString());
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"].ToString());
                        rt.HSN_CODE = dt.Rows[i]["HSN_CODE"].ToString();
                        rt.PRODUCT_TYPE = dt.Rows[i]["PRODUCT_TYPE"].ToString();
                        rt.PRODUCT_NAME = dt.Rows[i]["PRODUCT_NAME"].ToString();
                        rt.M_NAME = dt.Rows[i]["M_NAME"].ToString();
                        rt.CAT_NAME = dt.Rows[i]["CAT_NAME"].ToString();

                        string IS_URD = rt.IS_URD_SUPPLIER == 0 ? "No" : "Yes";

                        sb.Append("<tr>");
                        sb.Append("<td>" + (i + 1) + "</td>");
                        sb.Append("<td>" + rt.P_STOCK_NO + "</td>");
                        sb.Append("<td>" + rt.STOCK_ENTRY_DATE + "</td>");
                        sb.Append("<td>" + rt.CAT_NAME + "</td>");
                        sb.Append("<td>" + rt.M_NAME + "</td>");
                        sb.Append("<td>" + rt.PRODUCT_NAME + "</td>");
                        sb.Append("<td>" + rt.P_QTY + "</td>");
                        sb.Append("<td>" + rt.P_SERIAL_NO + "</td>");
                        sb.Append("<td>" + rt.HSN_CODE + "</td>");
                        sb.Append("<td>" + rt.PRODUCT_TYPE + "</td>");
                        sb.Append("<td>" + IS_URD + "</td>");
                        sb.Append("<td>" + rt.URD_SUPPLIER_ID + "</td>");
                        sb.Append("<td>" + rt.VENDOR_SUPPLIER_ID + "</td>");
                        sb.Append("<td>" + rt.SUPPLIER_NAME + "</td>");
                        sb.Append("<td>" + rt.SUPPLIER_CONTACT_PERSON + "</td>");
                        sb.Append("<td>" + rt.DEPART_FROM + "</td>");
                        sb.Append("<td>" + rt.INVOICE_NO + "</td>");
                        sb.Append("<td>" + rt.DC_NO + "</td>");
                        sb.Append("<td>" + rt.ARRIVE_AT + "</td>");
                        sb.Append("<td>" + rt.VEHICAL_NO + "</td>");
                        sb.Append("<td>" + rt.MATERIAL_RECEIVED_DATE + "</td>");
                        sb.Append("<td>" + rt.COMMENTS + "</td>");
                        sb.Append("<td>" + rt.SHIPMENT_DETAILS + "</td>");
                        sb.Append("<td>" + rt.EMPLOYEE_ID + "</td>");
                        sb.Append("<td>" + rt.EMP_NAME + "</td>");
                        sb.Append("<td>" + rt.PENDING_QTY + "</td>");
                        sb.Append("<td>" + rt.INVOICE_ID + "</td>");
                        sb.Append("<td>" + rt.INVOICE_NUMBER + "</td>");
                        sb.Append("<td>" + rt.DC_NUMBER + "</td>");
                        sb.Append("<td>" + rt.ASSIGN_TO + "</td>");
                        sb.Append("<td>" + rt.CUSTOMER_NAME + "</td>");
                        sb.Append("<td>" + rt.CUSTOMER_TYPE + "</td>");
                        sb.Append("<td>" + rt.ASSIGN_ON_DATE + "</td>");
                        sb.Append("<td>" + rt.STATUS + "</td>");
                        sb.Append("<td>" + rt.REG_DATE + "</td>");
                        sb.Append("</tr>");
                    }
                }
                sb.Append("</table>");

                HttpContext.Response.AddHeader("content-disposition", "attachment; filename=" + sFileName);
                this.Response.ContentType = "application/vnd.ms-excel";
                byte[] buffer = System.Text.Encoding.UTF8.GetBytes(sb.ToString());
                return File(buffer, "application/vnd.ms-excel");
            }
            catch(Exception ex)
            {
                return HttpNotFound("No data found");
            }
            
        }
    }
}