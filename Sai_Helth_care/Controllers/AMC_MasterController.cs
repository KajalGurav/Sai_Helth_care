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
    public class AMC_MasterController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        DataSet ds = new DataSet();
        public class Search_Admin
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public string FARMER_NAME { get; set; }
            public string STATE_ID { get; set; }
            public int CUSTOMER_TYPE_ID { get; set; }
            public long COMPANY_ID { get; set; }
            public string STARTING_DATE { get; set; }
            public string ENDING_DATE { get; set; }
        }
        // GET: AMC_Master
        public ActionResult Index(string CustType)
        {
            Session["CustType"] = CustType;
            return View();
        }

        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            long id = Convert.ToInt64(Session["COMPANY_ID"]);
            if (id == 0)
            {
                id = tB_Admin.COMPANY_ID;
            }
            try
            {
                cmd = new SqlCommand("Get_TB_AMC_Count", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
                //cmd.Parameters.AddWithValue("@COMPANY_ID", tB_Admin.COMPANY_ID);
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tB_Admin.CUSTOMER_TYPE_ID);
                //cmd.Parameters.AddWithValue("@STARTING_DATE", tB_Admin.STARTING_DATE);
                //cmd.Parameters.AddWithValue("@ENDING_DATE", tB_Admin.ENDING_DATE);
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
            long id = Convert.ToInt64(Session["COMPANY_ID"]);

            if (id == 0)
            {
                id = tB_Admin.COMPANY_ID;
            }

            cmd = new SqlCommand("SP_GetTB_AMC_Records", con);
            cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@ADMIN_ID", 1);
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
            cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
           // cmd.Parameters.AddWithValue("@COMPANY_ID", tB_Admin.COMPANY_ID);
            cmd.Parameters.AddWithValue("@COMPANY_ID", id);
            cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tB_Admin.CUSTOMER_TYPE_ID);
            // cmd.Parameters.AddWithValue("@STARTING_DATE", tB_Admin.STARTING_DATE);
            // cmd.Parameters.AddWithValue("@ENDING_DATE", tB_Admin.ENDING_DATE);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            AMC_CMCMaster rt;
            List<AMC_CMCMaster> FinalreportList = new List<AMC_CMCMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new AMC_CMCMaster();
                    try
                    {
                        rt.AMC_CMC_ID = Convert.ToInt64(dt.Rows[i]["AMC_CMC_ID"]);
                        rt.CONTRACT_DOCUMENT_NO = dt.Rows[i]["CONTRACT_DOCUMENT_NO"].ToString();
                        rt.CONTRACT_TYPE = dt.Rows[i]["CONTRACT_TYPE"].ToString();
                        rt.CONTRACT_PERIOD = Convert.ToInt32(dt.Rows[i]["CONTRACT_PERIOD"]);
                        rt.CONTRACT_DATE = dt.Rows[i]["CONTRACT_DATE"].ToString();
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"]).ToString();
                        rt.FIRM_ID = Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
                        rt.CUSTOMER_FIRM_NAME = (dt.Rows[i]["CUSTOMER_FIRM_NAME"]).ToString();
                        //
                        rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"]).ToString();
                        rt.ALTERNATE_CONTACT_NO = (dt.Rows[i]["ALTERNATE_CONTACT_NO"]).ToString();
                        rt.CUSTOMER_FIRM_NAME = (dt.Rows[i]["CUSTOMER_FIRM_NAME"]).ToString();
                        rt.EMAIL = (dt.Rows[i]["EMAIL"]).ToString();
                        rt.BILLING_ADDRESS = (dt.Rows[i]["BILLING_ADDRESS"]).ToString();
                        rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"]).ToString();
                        rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.CITY_ID = Convert.ToInt64(dt.Rows[i]["CITY_ID"]);
                        rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"]).ToString();
                        rt.STATE_ID = Convert.ToInt64(dt.Rows[i]["STATE_ID"]);
                        rt.STATE_NAME = (dt.Rows[i]["STATE_NAME"]).ToString();
                        rt.SHIPPING_ADDRESS = (dt.Rows[i]["SHIPPING_ADDRESS"]).ToString();
                        rt.SHIPPING_ZIP_CODE = (dt.Rows[i]["SHIPPING_ZIP_CODE"]).ToString();
                        rt.SHIP_STATE_ID = Convert.ToInt64(dt.Rows[i]["SHIP_STATE_ID"]);
                        rt.SHIP_STATE_NAME = (dt.Rows[i]["SHIP_STATE_NAME"]).ToString();
                        rt.SHIP_CITY_ID = Convert.ToInt64(dt.Rows[i]["SHIP_CITY_ID"]);
                        rt.SHIP_CITY_NAME = (dt.Rows[i]["SHIP_CITY_NAME"]).ToString();
                        rt.M_NAME = (dt.Rows[i]["M_NAME"]).ToString();
                        rt.BALANCE_AMOUNT = Convert.ToInt64(dt.Rows[i]["BALANCE_AMOUNT"]);
                        //
                        rt.CAT_ID = dt.Rows[i]["CAT_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"]).ToString();
                        rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.MODEL_NAME = (dt.Rows[i]["MODEL_NAME"]).ToString();
                        rt.MODEL_SERIAL_NO = (dt.Rows[i]["MODEL_SERIAL_NO"]).ToString();
                        rt.CONTRACT_FROM = (dt.Rows[i]["CONTRACT_FROM"]).ToString();
                        rt.CONTRACT_TO = (dt.Rows[i]["CONTRACT_TO"]).ToString();
                        rt.PM_VISIT = (dt.Rows[i]["PM_VISIT"]).ToString();
                        rt.CM_VISIT = (dt.Rows[i]["CM_VISIT"]).ToString();
                        rt.IS_FEES_INC_GST = Convert.ToBoolean(dt.Rows[i]["IS_FEES_INC_GST"]);
                        rt.FEES = Convert.ToInt64(dt.Rows[i]["FEES"]);
                        rt.FEES_IN_GST = Convert.ToInt64(dt.Rows[i]["FEES_IN_GST"]);
                        rt.GST_PERCENTAGE = dt.Rows[i]["GST_PERCENTAGE"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["GST_PERCENTAGE"]); 
                        rt.PAID_FEES = Convert.ToInt64(dt.Rows[i]["PAID_FEES"]);
                        rt.FEES_PAID_BY = (dt.Rows[i]["FEES_PAID_BY"]).ToString();
                        rt.COMMENTS = (dt.Rows[i]["COMMENTS"]).ToString();
                        rt.AMC_CMC_STATUS = (dt.Rows[i]["AMC_CMC_STATUS"]).ToString();
                        rt.CUSTOMER_TYPE = Convert.ToInt32(dt.Rows[i]["CUSTOMER_TYPE"]);
                        rt.BANK_ID = dt.Rows[i]["BANK_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["BANK_ID"]);
                        rt.CONTRACT_TYPE_DETAILS = (dt.Rows[i]["CONTRACT_TYPE_DETAILS"]).ToString();
                        rt.VisitDates = (dt.Rows[i]["VisitDates"]).ToString();

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

        public ActionResult AddAdmin(AMC_CMCMaster tB_admin)
        {
            try
            {
                long adminId = Convert.ToInt64(Session["EMP_ID"]);
                cmd = new SqlCommand("Insert_AMC_CMC_Record", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CONTRACT_DOCUMENT_NO", tB_admin.CONTRACT_DOCUMENT_NO);
                cmd.Parameters.AddWithValue("@CONTRACT_TYPE", tB_admin.CONTRACT_TYPE);
                cmd.Parameters.AddWithValue("@CONTRACT_PERIOD", tB_admin.CONTRACT_PERIOD);
                cmd.Parameters.AddWithValue("@CONTRACT_DATE", tB_admin.CONTRACT_DATE);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tB_admin.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@FIRM_ID", tB_admin.FIRM_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_FIRM_NAME", tB_admin.CUSTOMER_FIRM_NAME);
                cmd.Parameters.AddWithValue("@CAT_ID", tB_admin.CAT_ID);
                cmd.Parameters.AddWithValue("@PRODUCT_NAME", tB_admin.PRODUCT_NAME);
                cmd.Parameters.AddWithValue("@MODEL_ID", tB_admin.P_ID);
                cmd.Parameters.AddWithValue("@MODEL_NAME", tB_admin.MODEL_NAME);
                cmd.Parameters.AddWithValue("@MODEL_SERIAL_NO", tB_admin.MODEL_SERIAL_NO);
                cmd.Parameters.AddWithValue("@CONTRACT_FROM", tB_admin.CONTRACT_FROM);
                cmd.Parameters.AddWithValue("@CONTRACT_TO", tB_admin.CONTRACT_TO);
                cmd.Parameters.AddWithValue("@PM_VISIT", tB_admin.PM_VISIT);
                cmd.Parameters.AddWithValue("@CM_VISIT", tB_admin.CM_VISIT);
                cmd.Parameters.AddWithValue("@IS_FEES_INC_GST", tB_admin.IS_FEES_INC_GST);
                cmd.Parameters.AddWithValue("@FEES", tB_admin.FEES);
                cmd.Parameters.AddWithValue("@FEES_IN_GST", tB_admin.FEES_IN_GST);
                cmd.Parameters.AddWithValue("@GST_PERCENTAGE", tB_admin.GST_PERCENTAGE);
                cmd.Parameters.AddWithValue("@PAID_FEES", tB_admin.PAID_FEES);
                cmd.Parameters.AddWithValue("@FEES_PAID_BY", tB_admin.FEES_PAID_BY);
                cmd.Parameters.AddWithValue("@COMMENTS", tB_admin.COMMENTS);
                cmd.Parameters.AddWithValue("@AMC_CMC_STATUS", tB_admin.AMC_CMC_STATUS);
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE", tB_admin.CUSTOMER_TYPE.ToString());
                cmd.Parameters.AddWithValue("@ADMIN_ID", adminId);
                cmd.Parameters.AddWithValue("@BANK_ID", tB_admin.BANK_ID);
                cmd.Parameters.AddWithValue("@CONTRACT_TYPE_DETAILS", tB_admin.CONTRACT_TYPE_DETAILS);
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

        
        public ActionResult EditAdmin(AMC_CMCMaster tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Update_AMC_CMC_Record", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CONTRACT_DOCUMENT_NO", tB_admin.CONTRACT_DOCUMENT_NO);
                cmd.Parameters.AddWithValue("@CONTRACT_TYPE", tB_admin.CONTRACT_TYPE);
                cmd.Parameters.AddWithValue("@CONTRACT_PERIOD", tB_admin.CONTRACT_PERIOD);
                cmd.Parameters.AddWithValue("@CONTRACT_DATE", tB_admin.CONTRACT_DATE);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", Convert.ToInt64(tB_admin.CUSTOMER_ID));
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tB_admin.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@FIRM_ID", tB_admin.FIRM_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_FIRM_NAME", tB_admin.CUSTOMER_FIRM_NAME);
                cmd.Parameters.AddWithValue("@CAT_ID", tB_admin.CAT_ID);
                cmd.Parameters.AddWithValue("@PRODUCT_NAME", tB_admin.PRODUCT_NAME);
                cmd.Parameters.AddWithValue("@MODEL_ID", tB_admin.P_ID);
                cmd.Parameters.AddWithValue("@MODEL_NAME", tB_admin.MODEL_NAME);
                cmd.Parameters.AddWithValue("@MODEL_SERIAL_NO", tB_admin.MODEL_SERIAL_NO);
                cmd.Parameters.AddWithValue("@CONTRACT_FROM", tB_admin.CONTRACT_FROM);
                cmd.Parameters.AddWithValue("@CONTRACT_TO", tB_admin.CONTRACT_TO);
                cmd.Parameters.AddWithValue("@PM_VISIT", tB_admin.PM_VISIT);
                cmd.Parameters.AddWithValue("@CM_VISIT", tB_admin.CM_VISIT);
                cmd.Parameters.AddWithValue("@IS_FEES_INC_GST", tB_admin.IS_FEES_INC_GST);
                cmd.Parameters.AddWithValue("@FEES", tB_admin.FEES);
                cmd.Parameters.AddWithValue("@FEES_IN_GST", tB_admin.FEES_IN_GST);
                cmd.Parameters.AddWithValue("@GST_PERCENTAGE", tB_admin.GST_PERCENTAGE);
                cmd.Parameters.AddWithValue("@PAID_FEES", tB_admin.PAID_FEES);
                cmd.Parameters.AddWithValue("@FEES_PAID_BY", tB_admin.FEES_PAID_BY);
                cmd.Parameters.AddWithValue("@COMMENTS", tB_admin.COMMENTS);
                cmd.Parameters.AddWithValue("@AMC_CMC_STATUS", tB_admin.AMC_CMC_STATUS);
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE", tB_admin.CUSTOMER_TYPE.ToString());
                cmd.Parameters.AddWithValue("@BANK_ID", Convert.ToInt64(tB_admin.BANK_ID));
                cmd.Parameters.AddWithValue("@CONTRACT_TYPE_DETAILS", tB_admin.CONTRACT_TYPE_DETAILS);
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

      
        public JsonResult GetLatestRecord()
        {
            cmd = new SqlCommand("SP_GetTB_AMC_LatestRecord", con);
            cmd.CommandType = CommandType.StoredProcedure;
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            AMC_CMCLatestRecord rt;
            List<AMC_CMCLatestRecord> FinalreportList = new List<AMC_CMCLatestRecord>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new AMC_CMCLatestRecord();
                    try
                    {
                        rt.AMC_CMC_ID = Convert.ToInt64(dt.Rows[i]["AMC_CMC_ID"]);
                        rt.CONTRACT_DOCUMENT_NO = dt.Rows[i]["CONTRACT_DOCUMENT_NO"].ToString();
                        rt.CONTRACT_DOCUMENT_NO_NEW = dt.Rows[i]["CONTRACT_DOCUMENT_NO_NEW"].ToString();
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
            var _getadmin = db.Tb_CustomerMaster.Where(z => z.STATUS == "Active" && z.COMPANY_ID == c_id).OrderBy(o=>o.CUSTOMER_NAME).Select(s => new { s.Customer_ID, s.CUSTOMER_NAME, s.FIRM_NAME,s.CUSTOMER_TYPE_ID, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFirmList(long? id)
        {
            if (id == 0 || id == null)
            {
                long? CustId = 0;
                var _getadmin = db.Tb_FirmMaster.Where(z => z.STATUS == "Active").Select(s => new { s.CUSTOMER_ID, s.F_ID, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
                foreach (var item in _getadmin)
                {
                    CustId = item.CUSTOMER_ID;
                    break;
                }
                if (CustId == 0 || CustId == null)
                {
                    Session["CUSTOMER_ID"] = 0;
                }
                else
                {
                    Session["CUSTOMER_ID"] = CustId;
                }
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            else
            {
                long? CustId = 0;
                var _getadmin = db.Tb_FirmMaster.Where(z => z.STATUS == "Active" && z.CUSTOMER_ID == id).Select(s => new { s.CUSTOMER_ID, s.F_ID, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
                foreach (var item in _getadmin)
                {
                    CustId = item.CUSTOMER_ID;
                    break;
                }
                if (CustId==0 || CustId == null)
                {
                    Session["CUSTOMER_ID"] = 0;
                }
                else
                {
                    Session["CUSTOMER_ID"] = CustId;
                }
                
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetCategoryList()
        {
            var _getadmin = db.TB_Category.Where(z => z.STATUS == "Active").OrderBy(o => o.CAT_NAME).Select(s => new { s.CAT_ID, s.CAT_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);

            //long id = Convert.ToInt64(Session["CUSTOMER_ID"]);
            //if (id == 0)
            //{
            //    var _getadmin = db.TB_Category.Where(z => z.STATUS == "Active").OrderBy(o => o.CAT_NAME).Select(s => new { s.CAT_ID, s.CAT_NAME, s.STATUS, s.REG_DATE }).ToList();
            //    return Json(_getadmin, JsonRequestBehavior.AllowGet);
            //}
            //else
            //{
            //    long? custType = null;
            //    var cust = db.Tb_CustomerMaster.Where(z => z.Customer_ID == id).Select(s => new { s.CUSTOMER_TYPE_ID }).ToList();
            //    foreach(var item in cust)
            //    {
            //        custType=item.CUSTOMER_TYPE_ID;
            //    }
            //    if (custType == 5)
            //    {
            //        var _getadmin = db.TB_Category.Where(z => z.STATUS == "Active" && z.CAT_ID == 7).OrderBy(o => o.CAT_NAME).Select(s => new { s.CAT_ID, s.CAT_NAME, s.STATUS, s.REG_DATE }).ToList();
            //        return Json(_getadmin, JsonRequestBehavior.AllowGet);
            //    }
            //    else
            //    {
            //        var _getadmin = db.TB_Category.Where(z => z.STATUS == "Active" && z.CAT_ID != 7).OrderBy(o => o.CAT_NAME).Select(s => new { s.CAT_ID, s.CAT_NAME, s.STATUS, s.REG_DATE }).ToList();
            //        return Json(_getadmin, JsonRequestBehavior.AllowGet);
            //    }
            //}
            
            
        }

        public JsonResult GetProductList(long id)
        {

            var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active" && z.CAT_ID == id).OrderBy(o => o.PRODUCT_NAME).Select(s => new { s.P_ID, s.CAT_ID, s.PRODUCT_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
            //if (id == 7)
            //{
            //    var _getadmin = db.Tb_MindrayProduct.Where(z => z.STATUS == "Active").OrderBy(o => o.PRODUCT_NAME).Select(s => new { s.MP_ID,  s.PRODUCT_NAME, s.STATUS, s.REG_DATE }).ToList();
            //    return Json(_getadmin, JsonRequestBehavior.AllowGet);
            //}
            //else {
            //    var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active" && z.CAT_ID == id).OrderBy(o => o.PRODUCT_NAME).Select(s => new { s.P_ID, s.CAT_ID, s.PRODUCT_NAME, s.STATUS, s.REG_DATE }).ToList();
            //    return Json(_getadmin, JsonRequestBehavior.AllowGet);
            //}
            
        }

        public JsonResult GetProductList1(long id)
        {
            string CustType = Convert.ToString(Session["CustType"]);

            if (CustType== "Regular")
            {
                var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active" && z.CAT_ID == id && z.PT_ID==1).OrderBy(o => o.PRODUCT_NAME).Select(s => new { s.P_ID, s.CAT_ID, s.PRODUCT_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }

            else if (CustType== "Mindray")
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
        public ActionResult CreateAmc()
        {
            return View();
        }



        public ActionResult UpdateAmc()
        {
            return View();
        }

        public JsonResult GetAMCCMCDetails(AMC_CMCMaster tB_admin)
        {
            //long cid = Convert.ToInt64(Session["Customer_ID"]);
            //long fid = Convert.ToInt64(Session["FIRM_ID"]);
            //if (tB_admin.CUSTOMER_ID != 0)
            //{
            //    cid = tB_admin.CUSTOMER_ID;
            //}
            //if (tB_admin.FIRM_ID != 0)
            //{
            //    cid = tB_admin.FIRM_ID;
            //}

            cmd = new SqlCommand("GetAMCCMCDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@AMC_CMC_ID", tB_admin.AMC_CMC_ID);
            cmd.Parameters.AddWithValue("@CONTRACT_DOCUMENT_NO", tB_admin.CONTRACT_DOCUMENT_NO);
            cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.CUSTOMER_ID);
            cmd.Parameters.AddWithValue("@COMPANY_ID", tB_admin.AMC_COMPANY_ID);
            cmd.Parameters.AddWithValue("@FIRM_ID", tB_admin.FIRM_ID);
            cmd.Parameters.AddWithValue("@FARMER_NAME", tB_admin.FARMER_NAME);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            AMC_CMCMaster rt;
            List<AMC_CMCMaster> FinalreportList = new List<AMC_CMCMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new AMC_CMCMaster();
                    try
                    {
                        rt.AMC_CMC_ID = Convert.ToInt64(dt.Rows[i]["AMC_CMC_ID"]);
                        rt.CONTRACT_DOCUMENT_NO = dt.Rows[i]["CONTRACT_DOCUMENT_NO"].ToString();
                        rt.CONTRACT_TYPE = dt.Rows[i]["CONTRACT_TYPE"].ToString();
                        rt.CONTRACT_PERIOD = Convert.ToInt32(dt.Rows[i]["CONTRACT_PERIOD"]);
                        rt.CONTRACT_DATE = dt.Rows[i]["CONTRACT_DATE"].ToString();
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"]).ToString();
                        rt.FIRM_ID = Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
                        rt.CUSTOMER_FIRM_NAME = (dt.Rows[i]["CUSTOMER_FIRM_NAME"]).ToString();
                        //
                        rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"]).ToString();
                        rt.ALTERNATE_CONTACT_NO = (dt.Rows[i]["ALTERNATE_CONTACT_NO"]).ToString();
                        rt.CUSTOMER_FIRM_NAME = (dt.Rows[i]["CUSTOMER_FIRM_NAME"]).ToString();
                        rt.EMAIL = (dt.Rows[i]["EMAIL"]).ToString();
                        rt.BILLING_ADDRESS = (dt.Rows[i]["BILLING_ADDRESS"]).ToString();
                        rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"]).ToString();
                        rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.CITY_ID = Convert.ToInt64(dt.Rows[i]["CITY_ID"]);
                        rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"]).ToString();
                        rt.STATE_ID = Convert.ToInt64(dt.Rows[i]["STATE_ID"]);
                        rt.STATE_NAME = (dt.Rows[i]["STATE_NAME"]).ToString();
                        rt.SHIPPING_ADDRESS = (dt.Rows[i]["SHIPPING_ADDRESS"]).ToString();
                        rt.SHIPPING_ZIP_CODE = (dt.Rows[i]["SHIPPING_ZIP_CODE"]).ToString();
                        rt.SHIP_STATE_ID = Convert.ToInt64(dt.Rows[i]["SHIP_STATE_ID"]);
                        rt.SHIP_STATE_NAME = (dt.Rows[i]["SHIP_STATE_NAME"]).ToString();
                        rt.SHIP_CITY_ID = Convert.ToInt64(dt.Rows[i]["SHIP_CITY_ID"]);
                        rt.SHIP_CITY_NAME = (dt.Rows[i]["SHIP_CITY_NAME"]).ToString();
                        rt.M_NAME = (dt.Rows[i]["M_NAME"]).ToString();
                        rt.BALANCE_AMOUNT = Convert.ToInt64(dt.Rows[i]["BALANCE_AMOUNT"]);
                        //
                        rt.CAT_ID = dt.Rows[i]["CAT_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"]).ToString();
                        rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.MODEL_NAME = (dt.Rows[i]["MODEL_NAME"]).ToString();
                        rt.MODEL_SERIAL_NO = (dt.Rows[i]["MODEL_SERIAL_NO"]).ToString();
                        rt.CONTRACT_FROM = (dt.Rows[i]["CONTRACT_FROM"]).ToString();
                        rt.CONTRACT_TO = (dt.Rows[i]["CONTRACT_TO"]).ToString();
                        rt.PM_VISIT = (dt.Rows[i]["PM_VISIT"]).ToString();
                        rt.CM_VISIT = (dt.Rows[i]["CM_VISIT"]).ToString();
                        rt.FEES = Convert.ToInt64(dt.Rows[i]["FEES"]);
                        rt.FEES_IN_GST = Convert.ToInt64(dt.Rows[i]["FEES_IN_GST"]);
                        rt.GST_PERCENTAGE = dt.Rows[i]["GST_PERCENTAGE"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["GST_PERCENTAGE"]);
                        rt.PAID_FEES = Convert.ToInt64(dt.Rows[i]["PAID_FEES"]);
                        rt.FEES_PAID_BY = (dt.Rows[i]["FEES_PAID_BY"]).ToString();
                        rt.COMMENTS = (dt.Rows[i]["COMMENTS"]).ToString();
                        rt.AMC_CMC_STATUS = (dt.Rows[i]["AMC_CMC_STATUS"]).ToString();
                        rt.CUSTOMER_TYPE = Convert.ToInt32(dt.Rows[i]["CUSTOMER_TYPE"]);

                        rt.BANK_ID = dt.Rows[i]["BANK_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["BANK_ID"]);
                        rt.IS_FEES_INC_GST = Convert.ToBoolean(dt.Rows[i]["IS_FEES_INC_GST"]);

                        rt.CONTRACT_TYPE_DETAILS = (dt.Rows[i]["CONTRACT_TYPE_DETAILS"]).ToString();
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

        public ActionResult MedtronicAMC_CMC()
        {
            return View();
        }

        public ActionResult UpcomingPmCm(int? CustType)
        {
            Session["CUSTOMER_TYPE_ID"] = CustType;
            return View();
        }

        public JsonResult GetUpcomingPmCm()
        {
            long id = Convert.ToInt64(Session["CUSTOMER_TYPE_ID"]);
            long c_id = Convert.ToInt64(Session["COMPANY_ID"]);

            cmd = new SqlCommand("Get_UpcomingPmCmVisit", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", id);
            cmd.Parameters.AddWithValue("@COMPANY_ID", c_id);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            AMC_CMCMaster rt;
            List<AMC_CMCMaster> FinalreportList = new List<AMC_CMCMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new AMC_CMCMaster();
                    try
                    {
                        rt.CONTRACT_DOCUMENT_NO = dt.Rows[i]["CONTRACT_DOCUMENT_NO"].ToString();
                        rt.CONTRACT_TYPE = dt.Rows[i]["CONTRACT_TYPE"].ToString();
                        rt.CONTRACT_PERIOD = Convert.ToInt32(dt.Rows[i]["CONTRACT_PERIOD"]);
                        rt.AMC_CMC_ID = Convert.ToInt32(dt.Rows[i]["AMC_CMC_ID"]);
                        rt.CUSTOMER_ID = Convert.ToInt32(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"]).ToString();
                        rt.CUSTOMER_FIRM_NAME = (dt.Rows[i]["CUSTOMER_FIRM_NAME"]).ToString();
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"]).ToString();
                        rt.MODEL_NAME = (dt.Rows[i]["MODEL_NAME"]).ToString();
                        rt.MODEL_SERIAL_NO = (dt.Rows[i]["MODEL_SERIAL_NO"]).ToString();
                        rt.CONTRACT_FROM = (dt.Rows[i]["CONTRACT_FROM"]).ToString();
                        rt.CONTRACT_TO = (dt.Rows[i]["CONTRACT_TO"]).ToString();
                        rt.PM_VISIT = (dt.Rows[i]["PM_VISIT"]).ToString();
                        rt.CM_VISIT = (dt.Rows[i]["CM_VISIT"]).ToString();
                        rt.VisitDate = (dt.Rows[i]["VisitDate"]).ToString();
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

        public ActionResult UpcomingExpiry()
        {
            return View();
        }

        public JsonResult getAmcDetail(long id)
        {
            var _getadmin = db.Tb_AMC_CMC_Master.Where(z => z.AMC_CMC_ID == id).Select(s => new { s.CUSTOMER_ID, s.FIRM_ID, s.CAT_ID, s.MODEL_ID }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUpcomingExpiry(Search_Admin obj)
        {
            cmd = new SqlCommand("Get_UpcomingAmcExpiry", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", 0);
            cmd.Parameters.AddWithValue("@SearchKeyword", obj.FARMER_NAME);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            AMC_CMCMaster rt;
            List<AMC_CMCMaster> FinalreportList = new List<AMC_CMCMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new AMC_CMCMaster();
                    try
                    {
                        rt.CONTRACT_DOCUMENT_NO = dt.Rows[i]["CONTRACT_DOCUMENT_NO"].ToString();
                        rt.CONTRACT_TYPE = dt.Rows[i]["CONTRACT_TYPE"].ToString();
                        rt.CONTRACT_PERIOD = Convert.ToInt32(dt.Rows[i]["CONTRACT_PERIOD"]);
                        rt.AMC_CMC_ID = Convert.ToInt32(dt.Rows[i]["AMC_CMC_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"]).ToString();
                        rt.CUSTOMER_FIRM_NAME = (dt.Rows[i]["CUSTOMER_FIRM_NAME"]).ToString();
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"]).ToString();
                        rt.MODEL_NAME = (dt.Rows[i]["MODEL_NAME"]).ToString();
                        rt.MODEL_SERIAL_NO = (dt.Rows[i]["MODEL_SERIAL_NO"]).ToString();
                        rt.CONTRACT_FROM = (dt.Rows[i]["CONTRACT_FROM"]).ToString();
                        rt.CONTRACT_TO = (dt.Rows[i]["CONTRACT_TO"]).ToString();
                        rt.PM_VISIT = (dt.Rows[i]["PM_VISIT"]).ToString();
                        rt.CM_VISIT = (dt.Rows[i]["CM_VISIT"]).ToString();
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
    }
}