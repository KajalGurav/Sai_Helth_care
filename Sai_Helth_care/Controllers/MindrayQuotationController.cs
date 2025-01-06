using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sai_Helth_care.Models;
using System.Text.RegularExpressions;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class MindrayQuotationController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        static DataSet ds;

        // GET: MindrayQuotation
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
            public string STARTING_DATE { get; set; }
            public string ENDING_DATE { get; set; }
        }

        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("Get_TB_MindrayQuotation_Count", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
                cmd.Parameters.AddWithValue("@STARTING_DATE", tB_Admin.STARTING_DATE);
                cmd.Parameters.AddWithValue("@ENDING_DATE", tB_Admin.ENDING_DATE);
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
            cmd = new SqlCommand("SP_GetTB_MindrayQuotation", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
            cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
            cmd.Parameters.AddWithValue("@STARTING_DATE", tB_Admin.STARTING_DATE);
            cmd.Parameters.AddWithValue("@ENDING_DATE", tB_Admin.ENDING_DATE);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            QuotationMaster rt;
            List<QuotationMaster> FinalreportList = new List<QuotationMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new QuotationMaster();
                    try
                    {
                        rt.MQ_ID = Convert.ToInt64(dt.Rows[i]["MQ_ID"]);
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.FIRM_ID = Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        rt.QUOTATION_NO = (dt.Rows[i]["QUOTATION_NO"].ToString());
                        rt.QUOTATION_TYPE = (dt.Rows[i]["QUOTATION_TYPE"].ToString());
                        rt.QUOTATION_DATE = (dt.Rows[i]["QUOTATION_DATE"].ToString());
                        rt.PNDT_STATUS = (dt.Rows[i]["PNDT_STATUS"]).ToString();
                        rt.PNDT_NO = (dt.Rows[i]["PNDT_NO"]).ToString();
                        rt.PO_DATE = (dt.Rows[i]["PO_DATE"]).ToString();
                        rt.PAYMENT_TERM = (dt.Rows[i]["PAYMENT_TERM"]).ToString();
                        rt.NOTE = (dt.Rows[i]["NOTE"]).ToString();
                        rt.BANK_ID = Convert.ToInt64(dt.Rows[i]["BANK_ID"]);
                        rt.AERB_OR_PNDT = (dt.Rows[i]["AERB_OR_PNDT"]).ToString();
                        rt.SELECT_PRODUCT_IS_NEW = (dt.Rows[i]["SELECT_PRODUCT_IS_NEW"]).ToString();
                        rt.QUOTATION_FOR_SPARE_PART = (dt.Rows[i]["QUOTATION_FOR_SPARE_PART"]).ToString();
                        rt.QUANTITY = (dt.Rows[i]["QUANTITY"]).ToString();
                        rt.PRODUCT_PRICE = (dt.Rows[i]["PRODUCT_PRICE"]).ToString();
                        rt.MODIFY_PRODUCT_PRICE = (dt.Rows[i]["MODIFY_PRODUCT_PRICE"]).ToString();
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();

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

        public JsonResult GetLatestRecordByType(string idType)
        {
            var _Monthlyreport = CommonCode.GetProducQotatDetails.GetLatestRecordByType(idType);
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }

        public ActionResult QueAdd()
        {
            return View();
        }

        public JsonResult GetCustomerList()
        {
            long c_id = Convert.ToInt64(Session["COMPANY_ID"]);
            var _getadmin = db.Tb_CustomerMaster.Where(z => z.STATUS == "Active" && z.CUSTOMER_TYPE_ID == 5 && z.COMPANY_ID == c_id).OrderBy(x => x.CUSTOMER_NAME).Select(s => new { s.Customer_ID, s.CUSTOMER_NAME, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
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


        public JsonResult GetCmpnyBankDetails(long bankid)
        {
            int cid = Convert.ToInt32(Session["COMPANY_ID"]);
            var _Monthlyreport = CommonCode.GetProducQotatDetails.GetBankDetailsById(cid, bankid);
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
            //int cid = Convert.ToInt32(Session["COMPANY_ID"]);
            //var _getcompanyDetails = db.TB_CompanyMaster.Where(z => z.COMPANY_ID == cid).FirstOrDefault();
            //return Json(_getcompanyDetails, JsonRequestBehavior.AllowGet);
        }


        public ActionResult AddAdmin(QuotationMaster tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Insert_Tb_MindrayQuotationMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@QUOTATION_TYPE", tB_admin.QUOTATION_TYPE);
                cmd.Parameters.AddWithValue("@QUOTATION_NO", tB_admin.QUOTATION_NO);
                cmd.Parameters.AddWithValue("@FIRM_ID", tB_admin.FIRM_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@QUOTATION_DATE", tB_admin.QUOTATION_DATE);
                cmd.Parameters.AddWithValue("@PNDT_STATUS", tB_admin.PNDT_STATUS);
                cmd.Parameters.AddWithValue("@PNDT_NO", tB_admin.PNDT_NO);
                cmd.Parameters.AddWithValue("@STATUS", tB_admin.STATUS);
                if (tB_admin.PO_DATE == null)
                {
                    cmd.Parameters.AddWithValue("@PO_DATE", tB_admin.PO_DATE);
                }
                else
                {
                    if (tB_admin.PO_DATE.Length == 10)
                    {
                        cmd.Parameters.AddWithValue("@QPO_DATE", tB_admin.PO_DATE);
                    }
                    else
                    {
                        var date = Convert.ToDateTime(tB_admin.PO_DATE);
                        cmd.Parameters.AddWithValue("@PO_DATE", date);
                    }
                }
                cmd.Parameters.AddWithValue("@PAYMENT_TERM", tB_admin.PAYMENT_TERM);
                cmd.Parameters.AddWithValue("@NOTE", tB_admin.NOTE);
                cmd.Parameters.AddWithValue("@AERB_OR_PNDT", tB_admin.AERB_OR_PNDT);
                cmd.Parameters.AddWithValue("@BANK_ID", tB_admin.BANK_ID);
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

        public ActionResult UpdateProductDetails(QuotationMaster tB_Admin)
        {
            bool result = false;
            bool IsSTDAcc = tB_Admin.IS_WITH_PROBE_ACC == "Yes";

            try
            {
                using (var con = new SqlConnection(connectionString))
                {
                    using (var cmd = new SqlCommand("Update_MQuotationProductDetails", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@MP_ID", tB_Admin.MP_ID);
                        cmd.Parameters.AddWithValue("@MQ_ID", Convert.ToInt64(Session["Q_ID"]));
                        cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_Admin.CUSTOMER_ID);
                        cmd.Parameters.AddWithValue("@PRODUCT_QUANTITY", tB_Admin.PRODUCT_QUANTITY ?? string.Empty);
                        cmd.Parameters.AddWithValue("@PROCUCT_PRICE", tB_Admin.PROCUCT_PRICE ?? string.Empty);
                        cmd.Parameters.AddWithValue("@PS_ID", tB_Admin.PS_ID ?? string.Empty);
                        cmd.Parameters.AddWithValue("@IS_WITH_PROBE_ACC", IsSTDAcc);
                        cmd.Parameters.AddWithValue("@PSQ_ID", tB_Admin.PSQ_ID ?? string.Empty);
                        cmd.Parameters.AddWithValue("@PSPRICE_ID", tB_Admin.PSPRICE_ID ?? string.Empty);

                        con.Open();
                        int rowsAffected = Convert.ToInt32(cmd.ExecuteScalar());
                        result = rowsAffected > 0;
                    }
                }

                if (result)
                {
                    return Json(new { success = true, message = "Product updated successfully." });
                }
                else
                {
                    return Json(new { success = false, errorCode = "PRODUCT_NOT_FOUND", message = "Product not found to update." });
                }
            }
            catch (SqlException sqlEx)
            {
                System.Diagnostics.Debug.WriteLine("SQL Error: " + sqlEx.Message);
                return Json(new { success = false, message = "Database error occurred." });
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("Error: " + ex.Message);
                return Json(new { success = false, message = "An unexpected error occurred." });
            }
        }



        public ActionResult EditAdmin(QuotationMaster tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Update_Tb_MindrayQuotationMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@QUOTATION_TYPE", tB_admin.QUOTATION_TYPE);
                cmd.Parameters.AddWithValue("@QUOTATION_NO", tB_admin.QUOTATION_NO);
                cmd.Parameters.AddWithValue("@FIRM_ID", tB_admin.FIRM_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.CUSTOMER_ID);
                // cmd.Parameters.AddWithValue("@QUOTATION_DATE", tB_admin.QUOTATION_DATE);
                cmd.Parameters.AddWithValue("@PNDT_STATUS", tB_admin.PNDT_STATUS);
                cmd.Parameters.AddWithValue("@PNDT_NO", tB_admin.PNDT_NO);
                cmd.Parameters.AddWithValue("@STATUS", tB_admin.STATUS);
                cmd.Parameters.AddWithValue("@PO_DATE", tB_admin.PO_DATE);
                cmd.Parameters.AddWithValue("@PAYMENT_TERM", tB_admin.PAYMENT_TERM);
                cmd.Parameters.AddWithValue("@NOTE", tB_admin.NOTE);
                cmd.Parameters.AddWithValue("@AERB_OR_PNDT", tB_admin.AERB_OR_PNDT);
                cmd.Parameters.AddWithValue("@BANK_ID", tB_admin.BANK_ID);
                cmd.Parameters.AddWithValue("@MQ_ID", tB_admin.MQ_ID);
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

        public ActionResult ViewQuote(long id)
        {
            Session["Q_ID"] = id;
            return View();
        }

        public JsonResult GetMindrayProduct(byte productTypeID, string Type)
        {
            if (Type == "New")
            {
                var _getadmin = db.Tb_Product
              .Where(z => z.STATUS == "Active" && z.PT_ID == productTypeID)
              .OrderBy(x => x.PRODUCT_NAME)
              .Select(s => new { s.P_ID, s.PRODUCT_NAME, s.STATUS }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }

            else
            {
                var _getadmin = db.Tb_Product
             .Where(z => z.STATUS == "Active" && z.CAT_ID == productTypeID && z.PT_ID == 2)
             .OrderBy(x => x.PRODUCT_NAME)
             .Select(s => new { s.P_ID, s.PRODUCT_NAME, s.STATUS }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetRegularQotDetails()
        {
            long id = Convert.ToInt64(Session["Q_ID"]);
            cmd = new SqlCommand("Get_QuotationDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Q_ID", id);
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            ds = new DataSet();
            sda.Fill(ds);
            dt = ds.Tables[0];
            QuotationMaster rt;
            List<QuotationMaster> FinalreportList = new List<QuotationMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new QuotationMaster();
                    try
                    {
                        rt.MQ_ID = Convert.ToInt64(dt.Rows[i]["MQ_ID"]);
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.FIRM_ID = Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"].ToString());
                        rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"].ToString());
                        rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"].ToString());
                        rt.EMAIL = (dt.Rows[i]["EMAIL"].ToString());
                        rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"].ToString());
                        rt.QUOTATION_NO = (dt.Rows[i]["QUOTATION_NO"].ToString());
                        rt.QUOTATION_TYPE = (dt.Rows[i]["QUOTATION_TYPE"].ToString());
                        rt.QUOTATION_DATE = (dt.Rows[i]["QUOTATION_DATE"].ToString());
                        rt.PNDT_STATUS = (dt.Rows[i]["PNDT_STATUS"]).ToString();
                        rt.PNDT_NO = (dt.Rows[i]["PNDT_NO"]).ToString();
                        rt.PO_DATE = (dt.Rows[i]["PO_DATE"]).ToString();
                        rt.PAYMENT_TERM = (dt.Rows[i]["PAYMENT_TERM"]).ToString();
                        rt.NOTE = (dt.Rows[i]["NOTE"]).ToString();
                        rt.BANK_ID = Convert.ToInt64(dt.Rows[i]["BANK_ID"]);
                        rt.AERB_OR_PNDT = (dt.Rows[i]["AERB_OR_PNDT"]).ToString();
                        //
                        rt.WARRANTY_IN_DMY = (dt.Rows[i]["WARRANTY_IN_DMY"]).ToString();
                        rt.WARRANTY_PERIOD = Convert.ToInt32(dt.Rows[i]["WARRANTY_PERIOD"]);
                        rt.AMOUNT_WITHOUT_TAX = Convert.ToInt64(dt.Rows[i]["AMOUNT_WITHOUT_TAX"]);
                        rt.TAX_AMOUNT = Convert.ToInt64(dt.Rows[i]["TAX_AMOUNT"]);
                        rt.AMOUNT_WITH_TAX = Convert.ToInt64(dt.Rows[i]["AMOUNT_WITH_TAX"]);
                        if ((dt.Rows[i]["AMOUNT_INC_TAX"]).ToString().ToLower() == "true")
                        {
                            rt.AMOUNT_INC_TAX = "Including";
                        }
                        else
                        {
                            rt.AMOUNT_INC_TAX = "Excluding";
                        }

                        if ((dt.Rows[i]["IS_SPL_WARRANTY"]).ToString().ToLower() == "true")
                        {
                            rt.IS_SPL_WARRANTY = "Yes";
                        }
                        else
                        {
                            rt.IS_SPL_WARRANTY = "No";
                        }
                        rt.TAX_PERCENTAGE = Convert.ToInt32(dt.Rows[i]["TAX_PERCENTAGE"]);
                        rt.PAYMENT_TERM_DETAILS = (dt.Rows[i]["PAYMENT_TERM_DETAILS"]).ToString();
                        //
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
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


        //public JsonResult GetRegularQotDetails()
        //{
        //    long id = Convert.ToInt64(Session["MQ_ID"]);
        //    cmd = new SqlCommand("Get_MindrayQuotationDetails", con);
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    cmd.Parameters.AddWithValue("@MQ_ID", id);
        //    sda = new SqlDataAdapter(cmd);
        //    dt = new DataTable();
        //    ds = new DataSet();
        //    sda.Fill(ds);
        //    dt = ds.Tables[0];
        //    QuotationMaster rt;
        //    List<QuotationMaster> FinalreportList = new List<QuotationMaster>();
        //    if (dt != null)
        //    {
        //        for (int i = 0; i < dt.Rows.Count; i++)
        //        {
        //            rt = new QuotationMaster();
        //            try
        //            {
        //                rt.MQ_ID = Convert.ToInt64(dt.Rows[i]["MQ_ID"]);
        //                rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
        //                rt.FIRM_ID = Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
        //                rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
        //                rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"].ToString());
        //                rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"].ToString());
        //                rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"].ToString());
        //                rt.EMAIL = (dt.Rows[i]["EMAIL"].ToString());
        //                rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"].ToString());
        //                rt.QUOTATION_NO = (dt.Rows[i]["QUOTATION_NO"].ToString());
        //                rt.QUOTATION_TYPE = (dt.Rows[i]["QUOTATION_TYPE"].ToString());
        //                rt.QUOTATION_DATE = (dt.Rows[i]["QUOTATION_DATE"].ToString());
        //                rt.PNDT_STATUS = (dt.Rows[i]["PNDT_STATUS"]).ToString();
        //                rt.PNDT_NO = (dt.Rows[i]["PNDT_NO"]).ToString();
        //                rt.PO_DATE = (dt.Rows[i]["PO_DATE"]).ToString();
        //                rt.PAYMENT_TERM = (dt.Rows[i]["PAYMENT_TERM"]).ToString();
        //                rt.NOTE = (dt.Rows[i]["NOTE"]).ToString();
        //                rt.BANK_ID = Convert.ToInt64(dt.Rows[i]["BANK_ID"]);
        //                rt.AERB_OR_PNDT = (dt.Rows[i]["AERB_OR_PNDT"]).ToString();
        //                //
        //                rt.WARRANTY_IN_DMY = (dt.Rows[i]["WARRANTY_IN_DMY"]).ToString();
        //                rt.WARRANTY_PERIOD = Convert.ToInt32(dt.Rows[i]["WARRANTY_PERIOD"]);
        //                rt.AMOUNT_WITHOUT_TAX = Convert.ToInt64(dt.Rows[i]["AMOUNT_WITHOUT_TAX"]);
        //                rt.TAX_AMOUNT = Convert.ToInt64(dt.Rows[i]["TAX_AMOUNT"]);
        //                rt.AMOUNT_WITH_TAX = Convert.ToInt64(dt.Rows[i]["AMOUNT_WITH_TAX"]);
        //                if ((dt.Rows[i]["AMOUNT_INC_TAX"]).ToString().ToLower() == "true")
        //                {
        //                    rt.AMOUNT_INC_TAX = "Including";
        //                }
        //                else
        //                {
        //                    rt.AMOUNT_INC_TAX = "Excluding";
        //                }

        //                if ((dt.Rows[i]["IS_SPL_WARRANTY"]).ToString().ToLower() == "true")
        //                {
        //                    rt.IS_SPL_WARRANTY = "Yes";
        //                }
        //                else
        //                {
        //                    rt.IS_SPL_WARRANTY = "No";
        //                }
        //                rt.TAX_PERCENTAGE = Convert.ToInt32(dt.Rows[i]["TAX_PERCENTAGE"]);
        //                rt.PAYMENT_TERM_DETAILS = (dt.Rows[i]["PAYMENT_TERM_DETAILS"]).ToString();
        //                //
        //                rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
        //                rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
        //            }
        //            catch (Exception ex)
        //            {
        //            }
        //            FinalreportList.Add(rt);
        //        }
        //    }
        //    var _Monthlyreport = FinalreportList;
        //    return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        //}

        public JsonResult GetProduct()
        {
            var _getadmin = db.Tb_MindrayProduct.Where(z => z.STATUS == "Active").OrderBy(x => x.PRODUCT_NAME).Select(s => new { s.MP_ID, s.PRODUCT_NAME, s.STATUS }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProbepart(long id)
        {
            var _getadmin = db.Tb_ProbeSpecificationsPart.Where(z => z.STATUS == "Active" && z.MP_ID == id).OrderBy(x => x.PROBE_NAME).Select(s => new { s.MP_ID, s.PS_ID, s.PRICE, s.PROBE_NAME, s.STATUS }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }


        //public JsonResult GetStdAccPart(long id)
        //{
        //    var _getadmin = db.Tb_StdAccessoriesMaster.Where(z => z.STATUS == "Active" && z.P_ID == id).Select(s => new { s.STD_ID, s.P_ID, s.STD_ACC_NAME, s.STATUS }).ToList();
        //    return Json(_getadmin, JsonRequestBehavior.AllowGet);
        //}


        public ActionResult AddProductDetails(QuotationMaster tb_Admin)
        {
            bool result = false;

            //string SP_ID;
            bool IsSTDAcc = false;
            if (tb_Admin.IS_WITH_PROBE_ACC == "Yes")
            {
                IsSTDAcc = true;
            }
            long id1 = Convert.ToInt64(Session["Q_ID"]);
            //string[] splitString = Regex.Split(tb_Admin.SP_ID, @",");
            try
            {
                cmd = new SqlCommand("Insert_MQuotationProductDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@MP_ID", tb_Admin.MP_ID);
                cmd.Parameters.AddWithValue("@MQ_ID", id1);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_Admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@PRODUCT_QUANTITY", tb_Admin.PRODUCT_QUANTITY);
                cmd.Parameters.AddWithValue("@PROCUCT_PRICE", tb_Admin.PROCUCT_PRICE);
                //cmd.Parameters.AddWithValue("@SP_ID", SP_ID);
                cmd.Parameters.AddWithValue("@PS_ID", tb_Admin.PS_ID);//"1,2,3"
                cmd.Parameters.AddWithValue("@IS_WITH_PROBE_ACC", IsSTDAcc);
                cmd.Parameters.AddWithValue("@PSQ_ID", tb_Admin.PSQ_ID);//"1,2,3"
                cmd.Parameters.AddWithValue("@PSPRICE_ID", tb_Admin.PSPRICE_ID);//"1,2,3"
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int z = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                if (z == -1)
                {
                    result = false;
                    //return Json(new { success = false });
                    //result = false;
                }
                else
                {
                    //return Json(new { success = true });
                    result = true;
                }
            }
            catch (Exception ex)
            {
            }
            #region oldcode
            //for (int i = 0; i < splitString.Length; i++)
            //{
            //    if (splitString[i] != "")
            //    {
            //        string s = splitString[i];
            //        string[] splitStringNew = Regex.Split(splitString[i], @"/");
            //        SP_ID = Convert.ToInt64(splitStringNew[0]).ToString();
            //        try
            //        {
            //            cmd = new SqlCommand("Insert_QuotationProductDetails", con);
            //            cmd.CommandType = CommandType.StoredProcedure;
            //            cmd.Parameters.AddWithValue("@P_ID", tb_Admin.P_ID);
            //            cmd.Parameters.AddWithValue("@Q_ID", id1);
            //            cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_Admin.CUSTOMER_ID);
            //            cmd.Parameters.AddWithValue("@PRODUCT_QUANTITY", tb_Admin.PRODUCT_QUANTITY);
            //            cmd.Parameters.AddWithValue("@PROCUCT_PRICE", tb_Admin.PROCUCT_PRICE);
            //            cmd.Parameters.AddWithValue("@SP_ID", SP_ID);
            //            //cmd.Parameters.AddWithValue("@SP_ID", tb_Admin.SP_ID);//"1,2,3"
            //            cmd.Connection = con;
            //            if (con.State == System.Data.ConnectionState.Open)
            //            {
            //                con.Close();
            //            }
            //            con.Open();
            //            int z = Convert.ToInt32(cmd.ExecuteScalar());
            //            con.Close();
            //            if (z == -1)
            //            {
            //                //return Json(new { success = false });
            //                //result = false;
            //            }
            //            else
            //            {
            //                //return Json(new { success = true });
            //                result = true;
            //            }
            //        }
            //        catch (Exception ex)
            //        {
            //        }

            //    }

            //}//for (int i = 0; i < splitString.Length; i++)
            #endregion oldcode
            if (result)
            {
                return Json(new { success = true });
            }
            else
            {
                return Json(new { success = false });
            }
            //return View("Index");

        }







        //public JsonResult GetProductDetails()
        //{
        //    var _Monthlyreport = CommonCode.GetProducQotatDetails.getdataMindray(Convert.ToInt32(Session["MQ_ID"]));
        //    return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        //    #region oldcode

        //    //long id = Convert.ToInt64(Session["Q_ID"]);
        //    //cmd = new SqlCommand("Get_Tb_QuotationProductDetails", con);
        //    //cmd.CommandType = CommandType.StoredProcedure;
        //    //cmd.Parameters.AddWithValue("@Q_ID", id);

        //    //sda = new SqlDataAdapter(cmd);
        //    //dt = new DataTable();
        //    //ds = new DataSet();
        //    //sda.Fill(ds);
        //    //dt = ds.Tables[0];
        //    //QuotationMaster rt;
        //    //List<QuotationMaster> FinalreportList = new List<QuotationMaster>();
        //    //if (dt != null)
        //    //{
        //    //    for (int i = 0; i < dt.Rows.Count; i++)
        //    //    {
        //    //        rt = new QuotationMaster();
        //    //        try
        //    //        {
        //    //            rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
        //    //            rt.QUOTATION_ID = Convert.ToInt64(dt.Rows[i]["QUOTATION_ID"]);
        //    //            rt.PRODUCT_ID = Convert.ToInt64(dt.Rows[i]["PRODUCT_ID"]);
        //    //            rt.SPAREPART_ID_LIST = Convert.ToInt64(dt.Rows[i]["SPAREPART_ID_LIST"]);
        //    //            rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"].ToString());
        //    //            rt.SPARE_PART = (dt.Rows[i]["SPARE_PART"].ToString());
        //    //            rt.PRICE = (dt.Rows[i]["PRICE"].ToString());
        //    //            rt.PRODUCT_QUANTITY = (dt.Rows[i]["PRODUCT_QUANTITY"].ToString());
        //    //            rt.PROCUCT_PRICE = (dt.Rows[i]["PROCUCT_PRICE"]).ToString();
        //    //            rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
        //    //            rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
        //    //        }
        //    //        catch (Exception ex)
        //    //        {
        //    //        }
        //    //        FinalreportList.Add(rt);
        //    //    }
        //    //}
        //    //var _Monthlyreport = FinalreportList;
        //    //return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        //    #endregion
        //}

        public JsonResult GetProductDetails()
        {
            var _Monthlyreport = CommonCode.GetProducQotatDetails.getdataMindray(Convert.ToInt32(Session["Q_ID"]));
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
            #region oldcode

            //long id = Convert.ToInt64(Session["Q_ID"]);
            //cmd = new SqlCommand("Get_Tb_QuotationProductDetails", con);
            //cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@Q_ID", id);

            //sda = new SqlDataAdapter(cmd);
            //dt = new DataTable();
            //ds = new DataSet();
            //sda.Fill(ds);
            //dt = ds.Tables[0];
            //QuotationMaster rt;
            //List<QuotationMaster> FinalreportList = new List<QuotationMaster>();
            //if (dt != null)
            //{
            //    for (int i = 0; i < dt.Rows.Count; i++)
            //    {
            //        rt = new QuotationMaster();
            //        try
            //        {
            //            rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
            //            rt.QUOTATION_ID = Convert.ToInt64(dt.Rows[i]["QUOTATION_ID"]);
            //            rt.PRODUCT_ID = Convert.ToInt64(dt.Rows[i]["PRODUCT_ID"]);
            //            rt.SPAREPART_ID_LIST = Convert.ToInt64(dt.Rows[i]["SPAREPART_ID_LIST"]);
            //            rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"].ToString());
            //            rt.SPARE_PART = (dt.Rows[i]["SPARE_PART"].ToString());
            //            rt.PRICE = (dt.Rows[i]["PRICE"].ToString());
            //            rt.PRODUCT_QUANTITY = (dt.Rows[i]["PRODUCT_QUANTITY"].ToString());
            //            rt.PROCUCT_PRICE = (dt.Rows[i]["PROCUCT_PRICE"]).ToString();
            //            rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
            //            rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
            //        }
            //        catch (Exception ex)
            //        {
            //        }
            //        FinalreportList.Add(rt);
            //    }
            //}
            //var _Monthlyreport = FinalreportList;
            //return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
            #endregion
        }
        //Remove Accessories( SPARE_PART )

        public JsonResult GetProductQuotDetails(int? id)
        {
            var searchParam = Convert.ToInt32(Session["Q_ID"]);
            if (id != null)
            {
                searchParam = Convert.ToInt32(id);
            }
            var _Monthlyreport = CommonCode.GetProducQotatDetails.getdataMindray(searchParam);
            List<String> Product = _Monthlyreport.Select(x => x.PRODUCTNAME).Distinct().ToList();
            var _Quantityreport = CommonCode.GetProducQotatDetails.getdataMQuantity(searchParam);
            var _ProbePricereport = CommonCode.GetProducQotatDetails.getdataProbePrice(searchParam);
            //var _StdAccreport = CommonCode.GetProducQotatDetails.getdataStdAcc(searchParam);


            //Dictionary<String,List<String>> ProdList = new Dictionary<String,List<String>>();
            List<MProdList> prodLists = new List<MProdList>();
            foreach (String pid in Product)
            {
                List<ProbePart> obj = new List<ProbePart>();
                //List<StdAccList> objStd = new List<StdAccList>();
                MProdList prlst = new MProdList();
                var objP = (from i in _Monthlyreport
                            select new { i.QUOTATION_ID, i.MP_ID, i.AccID, i.PRODUCTNAME, i.M_NAME, i.QUANTITY, i.PRODUCTPRICE, i.IS_WITH_PROBE_ACC, i.PRODUCT_IMAGE, i.CONFIGURATION, i.DESCRIPTION, i.M_ID, i.CAT_ID, i.CAT_NAME, i.HSN_CODE, i.PRODUCT_HSN_CODE, i.QUOTATION_TYPE, i.CUSTOMER_TYPE_ID, i.AMOUNT_WITHOUT_TAX, i.TAX_AMOUNT, i.AMOUNT_WITH_TAX, i.TAX_PERCENTAGE, i.AMOUNT_INC_TAX }).Distinct().Where(x => x.PRODUCTNAME == pid);
                //List<string> objSparePart = _Monthlyreport.Where(x => x.PRODUCTNAME == id).Select(x =>  x.SPARE_PART).ToList();
                //List<string> objSparePartPrice = _Monthlyreport.Where(x => x.PRODUCTNAME == id).Select(x => x.ACCPRICE).ToList();
                //List<SparePart> objSpare = _Monthlyreport.Where(x => x.PRODUCTNAME == id).Select(x => new List<SparePart>() { x.SPARE_PART, x.ACCPRICE }).ToList();
                var objS = (from i in _Monthlyreport
                            select new { i.QUOTATION_ID, i.AccID, i.PROBE_NAME, i.ACCPRICE, i.PRODUCTNAME, i.HSN_CODE, i.PRODUCT_HSN_CODE, i.QUOTATION_TYPE, i.CUSTOMER_TYPE_ID, i.AMOUNT_WITHOUT_TAX, i.TAX_AMOUNT, i.AMOUNT_WITH_TAX, i.TAX_PERCENTAGE, i.AMOUNT_INC_TAX }).Distinct().Where(x => x.PRODUCTNAME == pid);
                List<ProbePart> spareList = new List<ProbePart>();
                foreach (var item in objS)
                {
                    decimal price = 0;
                    if (item.ACCPRICE == "" || item.ACCPRICE == null)
                    {
                        price = 0;
                    }
                    else
                    {
                        price = Convert.ToDecimal(item.ACCPRICE);
                    }
                    spareList.Add(new ProbePart { QUOTATION_ID = item.QUOTATION_ID, AccID = item.AccID, PROBE_NAME = item.PROBE_NAME, ACCPRICE = price, PRODUCTNAME = item.PRODUCTNAME, HSN_CODE = item.HSN_CODE, QUOTATION_TYPE = item.QUOTATION_TYPE, CUSTOMER_TYPE_ID = item.CUSTOMER_TYPE_ID, AMOUNT_WITHOUT_TAX = item.AMOUNT_WITHOUT_TAX, TAX_AMOUNT = item.TAX_AMOUNT, AMOUNT_WITH_TAX = item.AMOUNT_WITH_TAX, TAX_PERCENTAGE = item.TAX_PERCENTAGE, AMOUNT_INC_TAX = item.AMOUNT_INC_TAX });
                }

                var objQ = (from i in _Quantityreport
                            select new { i.QuantID, i.PRODUCTNAME }).Where(x => x.PRODUCTNAME == pid);


                var objSPrice = (from i in _ProbePricereport
                                 select new { i.PriceID, i.PRODUCTNAME }).Where(x => x.PRODUCTNAME == pid);
                //var objAcc = (from i in _StdAccreport
                //              select new { i.StdAccID, i.STD_ACC_NAME, i.PRODUCTNAME }).Distinct().Where(x => x.PRODUCTNAME == pid);

                //foreach (var item in objAcc)
                //{
                //    if (item.STD_ACC_NAME == "" || item.STD_ACC_NAME == null)
                //    {
                //        continue;
                //    }
                //    else
                //    {
                //        StdAccList strobj = new StdAccList();
                //        strobj.STD_ACC_NAME = item.STD_ACC_NAME;
                //        objStd.Add(strobj);
                //    }
                //}

                foreach (var item in spareList)
                {
                    if (item.PROBE_NAME == "" || item.PROBE_NAME == null)
                    {
                        continue;
                    }
                    else
                    {
                        ProbePart strobj = new ProbePart();
                        strobj.AccID = item.AccID;
                        strobj.PROBE_NAME = item.PROBE_NAME;
                        strobj.QUOTATION_TYPE = item.QUOTATION_TYPE;
                        strobj.CUSTOMER_TYPE_ID = item.CUSTOMER_TYPE_ID;
                        strobj.AMOUNT_WITHOUT_TAX = item.AMOUNT_WITHOUT_TAX;
                        strobj.TAX_AMOUNT = item.TAX_AMOUNT;
                        strobj.AMOUNT_WITH_TAX = item.AMOUNT_WITH_TAX;
                        strobj.TAX_PERCENTAGE = item.TAX_PERCENTAGE;
                        strobj.AMOUNT_INC_TAX = item.AMOUNT_INC_TAX;
                        strobj.HSN_CODE = item.HSN_CODE;
                        strobj.QUOTATION_ID = item.QUOTATION_ID;
                        if (item.ACCPRICE == 0)
                        {
                            strobj.ACCPRICE = 0;
                        }
                        else
                        {
                            strobj.ACCPRICE = Convert.ToInt64(item.ACCPRICE);
                        }
                        int pos = 0;
                        int pricePos = 0;
                        if (objQ.Count() >= 1)
                        {
                            pos = spareList.IndexOf(item);
                            strobj.PROBE_QUANTITY = objQ.Select(x => x.QuantID).ElementAt(pos);
                        }
                        if (objSPrice.Count() >= 1)
                        {
                            pricePos = spareList.IndexOf(item);
                            strobj.ACCPRICE = objSPrice.Select(x => x.PriceID).ElementAt(pricePos);
                        }
                        obj.Add(strobj);
                    }
                }
                //ProdList.Add(id,SparePart);
                prlst.PRODUCTNAME = pid;
                foreach (var item in objP)
                {
                    prlst.QUANTITY = item.QUANTITY;
                    prlst.PRODUCTPRICE = item.PRODUCTPRICE;
                    prlst.IS_WITH_PROBE_ACC = "No";
                    if (item.IS_WITH_PROBE_ACC == true)
                    {
                        prlst.IS_WITH_PROBE_ACC = "Yes";
                    }
                    prlst.PRODUCT_IMAGE = item.PRODUCT_IMAGE;
                    prlst.DESCRIPTION = item.DESCRIPTION;
                    prlst.CONFIGURATION = item.CONFIGURATION;
                    prlst.M_NAME = item.M_NAME;
                    prlst.P_ID = item.MP_ID;
                    prlst.M_ID = item.M_ID;
                    prlst.CAT_ID = item.CAT_ID;
                    prlst.CAT_NAME = item.CAT_NAME;
                    prlst.HSN_CODE = item.PRODUCT_HSN_CODE;
                    prlst.QUOTATION_TYPE = item.QUOTATION_TYPE;
                    prlst.CUSTOMER_TYPE_ID = item.CUSTOMER_TYPE_ID;
                    prlst.AMOUNT_WITHOUT_TAX = item.AMOUNT_WITHOUT_TAX;
                    prlst.TAX_AMOUNT = item.TAX_AMOUNT;
                    prlst.AMOUNT_WITH_TAX = item.AMOUNT_WITH_TAX;
                    prlst.TAX_PERCENTAGE = item.TAX_PERCENTAGE;
                    prlst.AMOUNT_INC_TAX = item.AMOUNT_INC_TAX;
                    //prlst.QUOTATION_ID = item.QUOTATION_ID;
                }
                prlst.PROBE_PARTLIST = obj;
                prodLists.Add(prlst);
            }
            return Json(prodLists, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetProducDetails()
        {
            var _Monthlyreport = CommonCode.GetProducQotatDetails.getdataMindray(Convert.ToInt32(Session["Q_ID"]));
            List<String> Product = _Monthlyreport.Select(x => x.PRODUCTNAME).Distinct().ToList();



            //Dictionary<String,List<String>> ProdList = new Dictionary<String,List<String>>();
            List<MProducList> prodLists = new List<MProducList>();
            foreach (String id in Product)
            {
                MProducList prlst = new MProducList();
                var objP = (from i in _Monthlyreport
                            select new { i.QUOTATION_ID, i.PRODUCTNAME, i.QUANTITY, i.PRODUCTPRICE, i.IS_WITH_PROBE_ACC, i.PRODUCT_IMAGE, i.CONFIGURATION, i.DESCRIPTION }).Distinct().Where(x => x.PRODUCTNAME == id);

                prlst.PRODUCTNAME = id;
                foreach (var item in objP)
                {
                    prlst.QUOTATION_ID = item.QUOTATION_ID;
                    prlst.QUANTITY = item.QUANTITY;
                    prlst.PRODUCTPRICE = item.PRODUCTPRICE;
                    prlst.IS_WITH_PROBE_ACC = "No";
                    if (item.IS_WITH_PROBE_ACC == true)
                    {
                        prlst.IS_WITH_PROBE_ACC = "Yes";
                    }
                    prlst.PRODUCT_IMAGE = item.PRODUCT_IMAGE;
                    prlst.DESCRIPTION = item.DESCRIPTION;
                    prlst.CONFIGURATION = item.CONFIGURATION;
                }
                prodLists.Add(prlst);
            }
            return Json(prodLists, JsonRequestBehavior.AllowGet);

        }
        public ActionResult Delete_Admin(QuotationMaster tB_admin)
        {
            try
            {
                int i = CommonCode.Delete_Admin.deleteDataMindray(tB_admin.QUOTATION_ID, tB_admin.PROBE_NAME, tB_admin.PRODUCT_NAME);
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

        public ActionResult UpdateQuotationDetails(QuotationMaster tB_admin)
        {
            try
            {
                //long id1 = Convert.ToInt64(Session["MQ_ID"]);
                long id1 = Convert.ToInt64(Session["Q_ID"]);
                bool amtIncTax = false;
                if (tB_admin.AMOUNT_INC_TAX.ToLower() == "including")
                {
                    amtIncTax = true;
                }
                tB_admin.IS_MINDRAY = "true";

                bool isSplWarranty = false;
                if (tB_admin.IS_SPL_WARRANTY.ToLower() == "yes")
                {
                    isSplWarranty = true;
                }

                cmd = new SqlCommand("Update_Tb_AllQuotationMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@WARRANTY_IN_DMY", tB_admin.WARRANTY_IN_DMY);
                cmd.Parameters.AddWithValue("@WARRANTY_PERIOD", tB_admin.WARRANTY_PERIOD);
                cmd.Parameters.AddWithValue("@AMOUNT_WITHOUT_TAX", tB_admin.AMOUNT_WITHOUT_TAX);
                cmd.Parameters.AddWithValue("@TAX_AMOUNT", tB_admin.TAX_AMOUNT);
                cmd.Parameters.AddWithValue("@AMOUNT_WITH_TAX", tB_admin.AMOUNT_WITH_TAX);
                cmd.Parameters.AddWithValue("@TAX_PERCENTAGE", tB_admin.TAX_PERCENTAGE);
                cmd.Parameters.AddWithValue("@AMOUNT_INC_TAX", amtIncTax);
                cmd.Parameters.AddWithValue("@IS_SPL_WARRANTY", isSplWarranty);
                cmd.Parameters.AddWithValue("@NOTE", tB_admin.NOTE);
                cmd.Parameters.AddWithValue("@IS_MINDRAY", tB_admin.IS_MINDRAY);
                cmd.Parameters.AddWithValue("@Q_ID", id1);
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