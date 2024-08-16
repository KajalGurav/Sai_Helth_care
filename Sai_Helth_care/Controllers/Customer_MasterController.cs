using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using Sai_Helth_care.Models;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.Remoting.Lifetime;
using System.Web.Hosting;
using System.Globalization;
using static Sai_Helth_care.Models.CustomerDAL;
using static Sai_Helth_care.Models.QuotationDAL;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Customer_MasterController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public ActionResult Index()
        {
            return View();
        }
       
        public JsonResult TotalRecordCount(SearchCustomersParams tB_Admin)
        {
            try
            {
                int count = CustomerDAL.GetCustomersTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult GetAllCustomers(SearchCustomersParams tB_params)
        {

            try
            {
                var customerList = CustomerDAL.GetCustomerList(tB_params);
                return Json(customerList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public ActionResult AddAdmin(CustomerMaster tB_admin)
        {
            try
            {
                int i = CustomerDAL.AddCustomer(tB_admin);
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

                throw ex;
            }
        }

        [NonAction]
        public int AddFirm(CustomerMaster tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Insert_Into_Tb_FirmMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FIRM_NAME", tB_admin.FIRM_NAME);
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", 1);
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tB_admin.CUSTOMER_NAME);
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
                    return i;
                }
                else
                {
                    return i;
                }
            }
            catch (Exception ex)
            {
                return -1;
            }

        }

        public JsonResult GetState()
        {
            var _getadmin = db.TB_StateMaster
                .Where(z => z.STATUS == "Active")
                .OrderBy(s => s.STATE_NAME) // Order by state name
                .Select(s => new { s.STATE_ID, s.STATE_NAME, s.STATUS, s.REG_DATE })
                .ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetCity(long id)
        {
            var _getadmin = db.TB_CityMaster
                .Where(z => z.STATUS == "Active" && z.STATE_ID == id)
                .OrderBy(s => s.CITY_NAME) // Order by city name
                .Select(s => new { s.STATE_ID, s.CITY_ID, s.CITY_NAME, s.STATUS, s.REG_DATE })
                .ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);

        }

        public ActionResult EditAdmin(CustomerMaster tB_admin)
        {

            try
            {
                int i = CustomerDAL.UpdateCustomer(tB_admin);
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
                throw ex;
            }
        }

        [NonAction]
        public int EditFirm(CustomerMaster tB_admin)
        {

            try
            {
                cmd = new SqlCommand("Insert_Into_Tb_FirmMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FIRM_NAME", tB_admin.FIRM_NAME);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.Customer_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", 3);
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
                    return i;
                }
                else
                {
                    return i;
                }
            }
            catch (Exception ex)
            {
                return -1;
            }

        }

        public ActionResult AERBCustomer()
        {
            return View();
        }
        public ActionResult Medtronic()
        {
            return View();
        }
        public ActionResult Carestream()
        {
            return View();
        }

        //public ActionResult CustomerDetails()
        //{
        //    return View();
        //}

        public ActionResult CustomerDetails(string CustType)
        {
            Session["CustType"] = CustType;
            return View();
        }

        public JsonResult GetCustomerDetailsForUpdate(long customerID)
        {
            try
            {
                var customerDetails = CustomerDAL.GetCustomerDetailsForUpdate(customerID);
                return Json(customerDetails, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult GetCustomerDetails(long id)
        {
            try
            {
                var customerList = CustomerDAL.GetCustomerDetails(id);
                return Json(customerList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult GetCustomerQuoteDetails(long id)
        {
            try
            {
                var customerList = QuotationDAL.GetCustomerQuotationList(id);
                return Json(customerList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult GetCustomerList()
        {
            long c_id = Convert.ToInt64(Session["COMPANY_ID"]);
            var _getadmin = db.Tb_CustomerMaster.Where(z => z.STATUS == "Active" && z.COMPANY_ID == c_id).OrderBy(o => o.CUSTOMER_NAME).Select(s => new { s.Customer_ID, s.CUSTOMER_NAME, s.FIRM_NAME, s.CUSTOMER_TYPE_ID, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFirmList(long? id)
        {
            if (id == 0 || id == null)
            {
                var _getadmin = db.Tb_FirmMaster.Where(z => z.STATUS == "Active").Select(s => new { s.CUSTOMER_ID, s.F_ID, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var _getadmin = db.Tb_FirmMaster.Where(z => z.STATUS == "Active" && z.CUSTOMER_ID == id).Select(s => new { s.CUSTOMER_ID, s.F_ID, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult GetCompanyDetails()
        {
            int cid = Convert.ToInt32(Session["COMPANY_ID"]);
            var _getcompanyDetails = db.TB_CompanyMaster.Where(z => z.COMPANY_ID == cid).Select(a=> new {a.COMPANY_ID,a.COMPANY_REG_ADDRESS,a.ZIP_CODE,a.COMPANY_NAME,a.COMPANY_LETTERHEAD }).FirstOrDefault();
            return Json(_getcompanyDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GenerateUniqueCode(GenerateUniqueCodeParams tb_Admin)
        {
            try
            {
                long companyID = Convert.ToInt64(Session["COMPANY_ID"]);
                var customerList = QuotationDAL.GenerateUniqueCode(tb_Admin, companyID);
                return Json(customerList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public ActionResult UpdateQuotationPODetails(QuotationMaster tB_admin)
        {
            try
            {
                long id1 = Convert.ToInt64(Session["Q_ID"]);
                if (tB_admin.Q_ID.ToString() != string.Empty)
                {
                    id1 = tB_admin.Q_ID;
                }
                cmd = new SqlCommand("Update_Tb_AllQuotationPO", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PO_DATE", DateTime.ParseExact(tB_admin.PO_DATE, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                cmd.Parameters.AddWithValue("@AMOUNT_WITHOUT_TAX", tB_admin.AMOUNT_WITHOUT_TAX);
                cmd.Parameters.AddWithValue("@TAX_AMOUNT", tB_admin.TAX_AMOUNT);
                cmd.Parameters.AddWithValue("@AMOUNT_WITH_TAX", tB_admin.AMOUNT_WITH_TAX);
                cmd.Parameters.AddWithValue("@PAYMENT_TERM_DETAILS", tB_admin.PAYMENT_TERM_DETAILS);
                cmd.Parameters.AddWithValue("@QUOTATION_NO", tB_admin.QUOTATION_NO);
                cmd.Parameters.AddWithValue("@NOTE", tB_admin.NOTE);
                cmd.Parameters.AddWithValue("@Q_ID", id1);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE", tB_admin.CUSTOMER_TYPE_ID);
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

        public ActionResult AERBCustomerDetails()
        {
            return View();
        }


        public ActionResult MindrayCustomerDetails()
        {
            return View();
        }

        public ActionResult AddUpdateCustomer()
        {
            return View();
        }

        public string ChangeStatus(long id)
        {
            Tb_CustomerMaster tB_admin = db.Tb_CustomerMaster.Where(b => b.Customer_ID == id).SingleOrDefault();
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

        public JsonResult GetProductList1(long id)
        {
            string CustType = Convert.ToString(Session["CustType"]);

            if (CustType == "Regular")
            {
                var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active" && z.CAT_ID == id && z.PT_ID == 1).OrderBy(o => o.PRODUCT_NAME).Select(s => new { s.P_ID, s.CAT_ID, s.PRODUCT_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }

            else if (CustType == "Mindray")
            {
                var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active" && z.CAT_ID == id && z.PT_ID == 2).OrderBy(o => o.PRODUCT_NAME).Select(s => new { s.P_ID, s.CAT_ID, s.PRODUCT_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active" && z.CAT_ID == id).OrderBy(o => o.PRODUCT_NAME).Select(s => new { s.P_ID, s.CAT_ID, s.PRODUCT_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
        }
    }
}