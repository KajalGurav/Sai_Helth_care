using OfficeOpenXml;
using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Web.Mvc;
using static Sai_Helth_care.Models.QuotationDAL;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Quotation_RegistrationController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();
        private static readonly Dictionary<string, int> QuotationTypeMapping = new Dictionary<string, int>
        {
            { "Regular", 1 },{ "AERB", 2 },{ "Medtronic", 3 },{ "Carestream", 4 },{ "Mindray", 5 }
        };


        // GET: Quotation_Registration
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
            public string QUOTATION_TYPE { get; set; }
            public int PNDT_NO { get; set; }
            public string REG_DATE { get; set; }
            public string PO_DATE { get; set; }
            public string CUSTOMER_NAME { get; set; }
            public string QUOTATION_NO { get; set; }
            public string QUOTATION_DATE { get; set; }
            public string STATUS { get; set; }

        }

        public JsonResult TotalRecordCount(SearchQuotationParams tB_Admin)
        {
            try
            {
                int count = QuotationDAL.GetQuotationsTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult GetAllQuotationList(SearchQuotationParams tB_params)
        {
            try
            {
                var customerList = QuotationDAL.GetQuotationList(tB_params);
                return Json(customerList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult GetAllPurchaseOrderList(SearchQuotationParams tB_params)
        {
            try
            {
                var customerList = QuotationDAL.GetPurchaseOrderList(tB_params);
                return Json(customerList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public ActionResult QueAdd()
        {
            return View();
        }

        public JsonResult GetCustomerList(long? id)
        {
            if (id == null)
            {
                var _getadmin = db.Tb_CustomerMaster.Where(z => z.STATUS == "Active" && z.CUSTOMER_NAME != "").OrderBy(s => s.CUSTOMER_NAME).Select(s => new { s.Customer_ID, s.CUSTOMER_NAME, s.FIRM_NAME, s.STATUS, s.REG_DATE, s.BILLING_ADDRESS }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var _getadmin = db.Tb_CustomerMaster.Where(z => z.STATUS == "Active" && z.CUSTOMER_TYPE_ID == id && z.CUSTOMER_NAME != "").OrderBy(s => s.CUSTOMER_NAME).Select(s => new { s.Customer_ID, s.CUSTOMER_NAME, s.FIRM_NAME, s.STATUS, s.REG_DATE, s.BILLING_ADDRESS }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult GetCustomer(long? id)
        {
            var _getadmin = db.Tb_CustomerMaster.Where(z => z.STATUS == "Active" && z.Customer_ID == id).OrderBy(s => s.CUSTOMER_NAME).Select(s => new { s.Customer_ID, s.CUSTOMER_NAME, s.FIRM_NAME, s.STATUS, s.REG_DATE, s.BILLING_ADDRESS }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFirmList(long? id)
        {
            if (id == 0 || id == null)
            {
                var _getadmin = db.Tb_FirmMaster.Where(z => z.STATUS == "Active").OrderBy(s => s.FIRM_NAME).Select(s => new { s.CUSTOMER_ID, s.F_ID, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var _getadmin = db.Tb_FirmMaster.Where(z => z.STATUS == "Active" && z.CUSTOMER_ID == id).OrderBy(s => s.FIRM_NAME).Select(s => new { s.CUSTOMER_ID, s.F_ID, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetCmpnyBankDetails(long bankid)
        {
            int cid = Convert.ToInt32(Session["COMPANY_ID"]);
            if (cid == 0)
            {
                cid = 1;
            }
            var _Monthlyreport = CommonCode.GetProducQotatDetails.GetBankDetailsById(cid, bankid);
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
            //var _getcompanyDetails = db.TB_CompanyMaster.Where(z => z.COMPANY_ID == cid).FirstOrDefault();
            //return Json(_getcompanyDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddQuotation(QuotationMaster tB_admin)
        {
            try
            {
                int i = QuotationDAL.AddQuotation(tB_admin);
                if (i == -1)
                {
                    return Json(new { success = false });

                }
                else
                {
                    //var res = EditFirm(tB_admin);
                    return Json(new { success = true });
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ActionResult UpdateQuotation(QuotationMaster tB_admin)
        {
            try
            {
                int i = QuotationDAL.UpdateQuotation(tB_admin);
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

        public JsonResult GetQuotationDetailsForUpdate(long quotationID)
        {
            try
            {
                var quotationDetails = QuotationDAL.GetQuotationDetailsForUpdate(quotationID);
                return Json(quotationDetails, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult GetLatestRecordByType(string idType)
        {
            var _Monthlyreport = CommonCode.GetProducQotatDetails.GetLatestRecordByType(idType);
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ViewQuote()
        {
            return View();
        }

        public JsonResult GetRegularQotDetails(long id)
        {
            cmd = new SqlCommand("Get_QuotationDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Q_ID", id);
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            ds = new DataSet();
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
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
                        rt.Q_ID = Convert.ToInt64(dt.Rows[i]["Q_ID"]);
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.CUSTOMER_TYPE_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_TYPE_ID"]);
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
                        rt.IS_REFURGISHED = (dt.Rows[i]["IS_REFURGISHED"]).ToString();
                        rt.BANK_ID = Convert.ToInt64(dt.Rows[i]["BANK_ID"]);
                        rt.AERB_OR_PNDT = (dt.Rows[i]["AERB_OR_PNDT"]).ToString();
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
                        if ((dt.Rows[i]["C_NAME"]).ToString().ToLower() == "true")
                        {
                            rt.C_NAME = "Yes";
                        }
                        else
                        {
                            rt.C_NAME = "No";
                        }
                        rt.TAX_PERCENTAGE = Convert.ToInt32(dt.Rows[i]["TAX_PERCENTAGE"]);
                        rt.PAYMENT_TERM_DETAILS = (dt.Rows[i]["PAYMENT_TERM_DETAILS"]).ToString();
                        //rt.C_NAME = (dt.Rows[i]["C_NAME"]).ToString();
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        rt.SUBJECT = (dt.Rows[i]["SUBJECT"]).ToString();
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

        public JsonResult GetProduct(byte productTypeID, string Type)
        {
            if (Type == "New")
            {
                var _getadmin = db.Tb_Product
              .Where(z => z.STATUS == "Active" && z.PT_ID == productTypeID)
              .OrderBy(x => x.PRODUCT_NAME)
              .Select(s => new { s.P_ID, s.PRODUCT_NAME, s.STATUS }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }

            else if (Type == "Regular")
            {
                var _getadmin = db.Tb_Product
              .Where(z => z.STATUS == "Active" && z.PT_ID == 1 && z.CAT_ID == productTypeID)
              .OrderBy(x => x.PRODUCT_NAME)
              .Select(s => new { s.P_ID, s.PRODUCT_NAME, s.STATUS }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }

            else if (Type == "Medtronic")
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
             .Where(z => z.STATUS == "Active" && z.CAT_ID == productTypeID)
             .OrderBy(x => x.PRODUCT_NAME)
             .Select(s => new { s.P_ID, s.PRODUCT_NAME, s.STATUS }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetSparepart(long id)
        {
            var _getadmin = db.Tb_SparePart.Where(z => z.STATUS == "Working" && z.P_ID == id).Select(s => new { s.P_ID, s.SP_ID, s.PRICE, s.SPARE_PART, s.STATUS }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStdAccPart(long id)
        {
            var _getadmin = db.Tb_StdAccessoriesMaster.Where(z => z.STATUS == "Active" && z.P_ID == id).Select(s => new { s.STD_ID, s.P_ID, s.STD_ACC_NAME, s.STATUS, s.PRICE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddProductDetails(QuotationMaster tb_Admin)
        {
            bool result = false;

            bool IsSTDAcc = false;
            if (tb_Admin.IS_WITH_STANDARD_ACC == "Yes")
            {
                IsSTDAcc = true;
            }

            try
            {
                cmd = new SqlCommand("Insert_QuotationProductDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@P_ID", tb_Admin.P_ID);
                cmd.Parameters.AddWithValue("@Q_ID", tb_Admin.Q_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_Admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@PRODUCT_QUANTITY", tb_Admin.PRODUCT_QUANTITY);
                cmd.Parameters.AddWithValue("@PROCUCT_PRICE", tb_Admin.PROCUCT_PRICE);
                //cmd.Parameters.AddWithValue("@SP_ID", SP_ID);
                cmd.Parameters.AddWithValue("@SP_ID", tb_Admin.SP_ID);//"1,2,3"
                cmd.Parameters.AddWithValue("@IS_WITH_STANDARD_ACC", IsSTDAcc);
                cmd.Parameters.AddWithValue("@SPPRICE_ID", tb_Admin.SPPRICE_ID);//"1,2,3"
                cmd.Parameters.AddWithValue("@SPQ_ID", tb_Admin.SPQ_ID);//"1,2,3"
                cmd.Parameters.AddWithValue("@STD_ID", tb_Admin.STD_ID);//"1,2,3"
                cmd.Parameters.AddWithValue("@STDQ_ID", tb_Admin.STDQ_ID);//"1,2,3"
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

        public ActionResult UpdateProductDetails(QuotationMaster tb_Admin)
        {
            bool result = false;

            bool IsSTDAcc = false;
            if (tb_Admin.IS_WITH_STANDARD_ACC == "Yes")
            {
                IsSTDAcc = true;
            }

            try
            {
                cmd = new SqlCommand("Update_QuotationProductDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@P_ID", tb_Admin.P_ID);
                cmd.Parameters.AddWithValue("@QUOTATION_ID", tb_Admin.QUOTATION_ID);
                cmd.Parameters.AddWithValue("@Q_ID", tb_Admin.Q_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_Admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@PRODUCT_QUANTITY", tb_Admin.PRODUCT_QUANTITY);
                cmd.Parameters.AddWithValue("@PROCUCT_PRICE", tb_Admin.PROCUCT_PRICE);
                //cmd.Parameters.AddWithValue("@SP_ID", SP_ID);
                cmd.Parameters.AddWithValue("@SP_ID", tb_Admin.SP_ID);//"1,2,3"
                cmd.Parameters.AddWithValue("@IS_WITH_STANDARD_ACC", IsSTDAcc);
                cmd.Parameters.AddWithValue("@SPPRICE_ID", tb_Admin.SPPRICE_ID);//"1,2,3"
                cmd.Parameters.AddWithValue("@SPQ_ID", tb_Admin.SPQ_ID);//"1,2,3"
                cmd.Parameters.AddWithValue("@STD_ID", tb_Admin.STD_ID);//"1,2,3"
                cmd.Parameters.AddWithValue("@STDQ_ID", tb_Admin.STDQ_ID);//"1,2,3"
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

        public JsonResult GetProductDetails(long id)
        {
            //var _Monthlyreport = CommonCode.GetProducQotatDetails.getdata(Convert.ToInt32(Session["Q_ID"]));
            var _Monthlyreport = CommonCode.GetProducQotatDetails.getdata(id);
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);

            #region OldCode

            //List<ProductQuotaion> FinalreportList = new List<ProductQuotaion>();
            //ProductQuotaion rt;
            //long id = Convert.ToInt32(Session["Q_ID"]);
            //cmd = new SqlCommand("Get_Tb_QuotationProductDetails", con);
            //cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@Q_ID", id);
            //sda = new SqlDataAdapter(cmd);
            //dt = new DataTable();
            //ds = new DataSet();
            //sda.Fill(ds);
            //if (ds != null) 
            //{
            //    dt = ds.Tables[0];                              
            //    if (dt != null)
            //    {                    
            //        for (int i = 0; i < dt.Rows.Count; i++)
            //        {
            //            rt = new ProductQuotaion();
            //            try
            //            {
            //                rt.QUOTATION_ID = Convert.ToInt64(dt.Rows[i]["QUOTATION_ID"]);
            //                rt.AccID = Convert.ToInt64(dt.Rows[i]["AccID"]);
            //                rt.PRODUCTNAME = (dt.Rows[i]["PRODUCTNAME"].ToString());
            //                rt.SPARE_PART = (dt.Rows[i]["SPARE_PART"].ToString());
            //                rt.QUANTITY = (dt.Rows[i]["QUANTITY"].ToString());
            //                rt.PRODUCTPRICE = (dt.Rows[i]["PRODUCTPRICE"].ToString());
            //                rt.ACCPRICE = (dt.Rows[i]["ACCPRICE"].ToString());

            //                FinalreportList.Add(rt);

            //            }
            //            catch (Exception ex)
            //            {
            //            }

            //        }
            //    }
            //}            
            //var _Monthlyreport = FinalreportList;
            //return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
            #endregion OldCode
        }

        public JsonResult GetProductQuotDetails(int id)
        {
            var searchParam = id;
            var _Monthlyreport = CommonCode.GetProducQotatDetails.getdata(searchParam);
            List<String> Product = _Monthlyreport.Select(x => x.PRODUCTNAME).Distinct().ToList();
            var _Quantityreport = CommonCode.GetProducQotatDetails.getdataQuantity(searchParam);
            var _SparePricereport = CommonCode.GetProducQotatDetails.getdataSparePrice(searchParam);
            var _StdAccreport = CommonCode.GetProducQotatDetails.getdataStdAcc(searchParam);
            var _StdQuantityreport = CommonCode.GetProducQotatDetails.getdataStdQuantity(searchParam);

            //Dictionary<String,List<String>> ProdList = new Dictionary<String,List<String>>();
            List<ProdList> prodLists = new List<ProdList>();
            foreach (String pid in Product)
            {
                List<SparePart> obj = new List<SparePart>();
                List<StdAccList> objStd = new List<StdAccList>();
                ProdList prlst = new ProdList();
                var objP = (from i in _Monthlyreport
                            select new { i.P_ID, i.AccID, i.PRODUCTNAME, i.QUANTITY, i.PRODUCTPRICE, i.IS_WITH_STANDARD_ACC, i.M_ID, i.M_NAME, i.CAT_ID, i.CAT_NAME, i.PRODUCT_HSN_CODE, i.HSN_CODE, i.QUOTATION_TYPE, i.CUSTOMER_TYPE_ID, i.AMOUNT_WITHOUT_TAX, i.TAX_AMOUNT, i.AMOUNT_WITH_TAX, i.TAX_PERCENTAGE, i.AMOUNT_INC_TAX }).Distinct().Where(x => x.PRODUCTNAME == pid);

                var objS = (from i in _Monthlyreport
                            select new { i.QUOTATION_ID, i.AccID, i.SPARE_PART, i.ACCPRICE, i.PRODUCTNAME, i.HSN_CODE, i.QUOTATION_TYPE, i.CUSTOMER_TYPE_ID, i.AMOUNT_WITHOUT_TAX, i.TAX_AMOUNT, i.AMOUNT_WITH_TAX, i.TAX_PERCENTAGE, i.AMOUNT_INC_TAX }).Where(x => x.PRODUCTNAME == pid);

                List<SparePart> spareList = new List<SparePart>();
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
                    spareList.Add(new SparePart { QUOTATION_ID = item.QUOTATION_ID, AccID = item.AccID, SPARE_PART = item.SPARE_PART, ACCPRICE = price, PRODUCTNAME = item.PRODUCTNAME, HSN_CODE = item.HSN_CODE, QUOTATION_TYPE = item.QUOTATION_TYPE, CUSTOMER_TYPE_ID = item.CUSTOMER_TYPE_ID, AMOUNT_WITHOUT_TAX = item.AMOUNT_WITHOUT_TAX, TAX_AMOUNT = item.TAX_AMOUNT, AMOUNT_WITH_TAX = item.AMOUNT_WITH_TAX, TAX_PERCENTAGE = item.TAX_PERCENTAGE, AMOUNT_INC_TAX = item.AMOUNT_INC_TAX });
                }

                var objQ = (from i in _Quantityreport
                            select new { i.QuantID, i.PRODUCTNAME }).Where(x => x.PRODUCTNAME == pid);

                var objSPrice = (from i in _SparePricereport
                                 select new { i.PriceID, i.PRODUCTNAME }).Where(x => x.PRODUCTNAME == pid);

                var objAcc = (from i in _StdAccreport
                              select new { i.StdAccID, i.STD_ACC_NAME, i.PRODUCTNAME, i.HSN_CODE, i.QUOTATION_ID }).Distinct().Where(x => x.PRODUCTNAME == pid);

                List<StdAccList> stdAccList = new List<StdAccList>();
                foreach (var item in objAcc)
                {
                    stdAccList.Add(new StdAccList { StdAccID = item.StdAccID, STD_ACC_NAME = item.STD_ACC_NAME, PRODUCTNAME = item.PRODUCTNAME, HSN_CODE = item.HSN_CODE, QUOTATION_ID = item.QUOTATION_ID });
                }

                var objStdQ = (from i in _StdQuantityreport
                               select new { i.StdQuantID, i.PRODUCTNAME }).Where(x => x.PRODUCTNAME == pid);

                foreach (var item in stdAccList)
                {
                    if (item.STD_ACC_NAME == "" || item.STD_ACC_NAME == null)
                    {
                        continue;
                    }
                    else
                    {
                        StdAccList strobj = new StdAccList();
                        strobj.StdAccID = item.StdAccID;
                        strobj.STD_ACC_NAME = item.STD_ACC_NAME;
                        strobj.HSN_CODE = item.HSN_CODE;
                        strobj.QUOTATION_ID = item.QUOTATION_ID;
                        int pos = 0;
                        if (objStdQ.Count() >= 1)
                        {
                            pos = stdAccList.IndexOf(item);
                            strobj.STDACC_QUANTITY = objStdQ.Select(x => x.StdQuantID).ElementAt(pos);
                        }
                        objStd.Add(strobj);
                    }
                }

                foreach (var item in spareList)
                {
                    if (item.SPARE_PART == "" || item.SPARE_PART == null)
                    {
                        continue;
                    }
                    else
                    {
                        SparePart strobj = new SparePart();
                        strobj.AccID = item.AccID;
                        strobj.SPARE_PART = item.SPARE_PART;
                        strobj.HSN_CODE = item.HSN_CODE;
                        strobj.QUOTATION_TYPE = item.QUOTATION_TYPE;
                        strobj.CUSTOMER_TYPE_ID = item.CUSTOMER_TYPE_ID;
                        strobj.AMOUNT_WITHOUT_TAX = item.AMOUNT_WITHOUT_TAX;
                        strobj.TAX_AMOUNT = item.TAX_AMOUNT;
                        strobj.AMOUNT_WITH_TAX = item.AMOUNT_WITH_TAX;
                        strobj.TAX_PERCENTAGE = item.TAX_PERCENTAGE;
                        strobj.AMOUNT_INC_TAX = item.AMOUNT_INC_TAX;
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
                            strobj.SPARE_QUANTITY = objQ.Select(x => x.QuantID).ElementAt(pos);
                        }
                        if (objSPrice.Count() >= 1)
                        {
                            pricePos = spareList.IndexOf(item);
                            strobj.ACCPRICE = objSPrice.Select(x => x.PriceID).ElementAt(pricePos);
                        }
                        obj.Add(strobj);
                    }
                }

                prlst.PRODUCTNAME = pid;

                foreach (var item in objP)
                {
                    prlst.QUANTITY = item.QUANTITY;
                    prlst.PRODUCTPRICE = item.PRODUCTPRICE;
                    prlst.IS_WITH_STANDARD_ACC = "";
                    if (item.IS_WITH_STANDARD_ACC == true)
                    {
                        prlst.IS_WITH_STANDARD_ACC = " with Standard Accessories";
                    }
                    prlst.P_ID = item.P_ID;
                    prlst.M_NAME = item.M_NAME;
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
                }

                prlst.SPARE_PARTLIST = obj;
                prlst.STD_ACC_LIST = objStd;
                prodLists.Add(prlst);
            }
            return Json(prodLists, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetProducDetails(int quoteId)
        {
            var _Monthlyreport = CommonCode.GetProducQotatDetails.getdata(quoteId);
            List<String> Product = _Monthlyreport.Select(x => x.PRODUCTNAME).Distinct().ToList();

            List<ProducList> prodLists = new List<ProducList>();
            foreach (String id in Product)
            {
                ProducList prlst = new ProducList();
                var objP = (from i in _Monthlyreport
                            select new { i.QUOTATION_ID, i.P_ID, i.PRODUCTNAME, i.QUANTITY, i.PRODUCTPRICE, i.IS_WITH_STANDARD_ACC }).Distinct().Where(x => x.PRODUCTNAME == id);

                prlst.PRODUCTNAME = id;
                foreach (var item in objP)
                {
                    prlst.QUOTATION_ID = item.QUOTATION_ID;
                    prlst.QUANTITY = item.QUANTITY;
                    prlst.PRODUCTPRICE = item.PRODUCTPRICE;
                    prlst.P_ID = item.P_ID;
                    prlst.IS_WITH_STANDARD_ACC = "No";
                    if (item.IS_WITH_STANDARD_ACC == true)
                    {
                        prlst.IS_WITH_STANDARD_ACC = "Yes";
                    }
                }
                prodLists.Add(prlst);
            }
            return Json(prodLists, JsonRequestBehavior.AllowGet);

        }

        public ActionResult Delete_Admin(QuotationMaster tB_admin)
        {
            try
            {
                //cmd = new SqlCommand("Delete_Tb_QuotationProductDetails", con);
                cmd = new SqlCommand("RemoveItem_Tb_QuotationProductDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@QUOTATION_ID", tB_admin.QUOTATION_ID);
                cmd.Parameters.AddWithValue("@SPAREPART", tB_admin.SPARE_PART);
                cmd.Parameters.AddWithValue("@PRODUCT_NAME", tB_admin.PRODUCT_NAME);
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

        public ActionResult UpdateQuotationDetails(QuotationMaster tB_admin)
        {
            try
            {
                //long id1 = Convert.ToInt64(Session["Q_ID"]);
                bool amtIncTax = false;
                if (tB_admin.AMOUNT_INC_TAX.ToLower() == "including")
                {
                    amtIncTax = true;
                }

                bool isSplWarranty = false;
                if (tB_admin.IS_SPL_WARRANTY.ToLower() == "yes")
                {
                    isSplWarranty = true;
                }

                bool is_refurbished = false;
                if (tB_admin.IS_REFURGISHED.ToLower() == "true")
                {
                    is_refurbished = true;
                }

                bool cName = false;
                if (tB_admin.C_NAME.ToLower() == "yes")
                {
                    cName = true;
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
                cmd.Parameters.AddWithValue("@Q_ID", tB_admin.Q_ID);
                cmd.Parameters.AddWithValue("@C_NAME", cName);
                cmd.Parameters.AddWithValue("@SUBJECT", tB_admin.SUBJECT);
                cmd.Parameters.AddWithValue("@IS_REFURGISHED", is_refurbished);
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

        public ActionResult Medtronic()
        {
            return View();
        }

        public ActionResult Carestream()
        {
            return View();
        }

        public ActionResult Mindray()
        {
            return View();
        }

        public ActionResult AddUpdateQuotation()
        {
            return View();
        }

        public ActionResult MedtronicViewQuote()
        {
            return View();
        }

        public ActionResult AddMedtronicQuotProduct(MedtronicQuotationProduct tB_admin)
        {
            try
            {
                int i = MedtronicProductDAL.AddMedtronicQuotationProductAccessories(tB_admin);
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

        public JsonResult GetMedtronicQuotationProductList(long id)
        {
            try
            {
                List<MedtronicQuotationProduct> obj = MedtronicProductDAL.GetMedtronicQuotationProductList(id);

                return Json(obj);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public ActionResult DeleteMedtronicQuotationProductAccessories(long quotID, long productID, int? medAccessoriesID)
        {
            try
            {
                int i = MedtronicProductDAL.DeleteMedtronicQuotationProductAccessories(quotID, productID, medAccessoriesID);
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

        public JsonResult GetProductData(long id)
        {
            var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active" && z.PT_ID == id).OrderBy(s => s.PRODUCT_NAME).Select(s => new { s.P_ID, s.PRODUCT_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CustomerDetails(string CustType)
        {
            Session["CustType"] = CustType;
            return View();
        }

        public ActionResult QuotationMasterExport(string CustType, string QUOTATION_NO)
        {
            // Set the license context
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            // Validate parameters
            if (string.IsNullOrEmpty(CustType) || string.IsNullOrEmpty(QUOTATION_NO))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "Invalid parameters.");
            }

            if (!QuotationTypeMapping.TryGetValue(CustType, out int qid))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "Invalid customer type");
            }

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("QuotationData");

                // Fetch data from the database
                var quotations = from am in db.Tb_QuotationMaster
                                 join tc in db.Tb_CustomerMaster on am.CUSTOMER_ID equals tc.Customer_ID into tcGroup
                                 from tc in tcGroup.DefaultIfEmpty()
                                 join city in db.TB_CityMaster on tc.CITY_ID equals city.CITY_ID into cityGroup
                                 from city in cityGroup.DefaultIfEmpty()
                                 join tfm in db.Tb_FirmMaster on am.CUSTOMER_ID equals tfm.CUSTOMER_ID into tfmGroup
                                 from tfm in tfmGroup.DefaultIfEmpty()
                                 where am.Q_ID == Convert.ToInt64(qid) // Ensure Q_ID is of the correct type (string or long)
                                 orderby am.Q_ID descending
                                 select new
                                 {
                                     am.Q_ID,
                                     am.CUSTOMER_ID,
                                     am.QUOTATION_TYPE,
                                     am.QUOTATION_NO,
                                     FIRM_ID = tfm.F_ID,
                                     tc.FIRM_NAME,
                                     tc.CUSTOMER_NAME,
                                     am.PNDT_STATUS,
                                     am.PNDT_NO,
                                     am.PAYMENT_TERM,
                                     am.NOTE,
                                     AERB_OR_PNDT = am.AERB_OR_PNDT ?? string.Empty,
                                     am.STATUS,
                                     REG_DATE = am.REG_DATE.HasValue ? am.REG_DATE.Value.ToString("dd/MM/yyyy") : string.Empty,
                                     QUOTATION_DATE = am.QUOTATION_DATE.HasValue ? am.QUOTATION_DATE.Value.ToString("dd/MM/yyyy") : string.Empty,
                                     PO_DATE = am.PO_DATE.HasValue ? am.PO_DATE.Value.ToString("dd/MM/yyyy") : string.Empty,
                                     FIRM_ADDRESS = tc.BILLING_ADDRESS + ", " + (city != null ? city.CITY_NAME : string.Empty),
                                     tc.ZIP_CODE,
                                     tc.EMAIL,
                                     tc.CONTACT_NO
                                 };

                var result = quotations.ToList();

                // Add headers
                worksheet.Cells[1, 1].Value = "Sr.No.";
                worksheet.Cells[1, 2].Value = "Customer Name";
                worksheet.Cells[1, 3].Value = "Firm Name";
                worksheet.Cells[1, 4].Value = "Quote Date";
                worksheet.Cells[1, 5].Value = "Quote No";
                worksheet.Cells[1, 6].Value = "Quotation For";
                worksheet.Cells[1, 7].Value = "PNDT Status";
                worksheet.Cells[1, 8].Value = "Status";
                worksheet.Cells[1, 9].Value = "PNDT No";
                worksheet.Cells[1, 10].Value = "Reg Date";
                worksheet.Cells[1, 11].Value = "P.O Date";

                // Add data
                for (int i = 0; i < result.Count; i++)
                {
                    worksheet.Cells[i + 2, 1].Value = i + 1; // Sr.No.
                    worksheet.Cells[i + 2, 2].Value = result[i].CUSTOMER_NAME;
                    worksheet.Cells[i + 2, 3].Value = result[i].FIRM_NAME;
                    worksheet.Cells[i + 2, 4].Value = result[i].QUOTATION_DATE;
                    worksheet.Cells[i + 2, 5].Value = result[i].QUOTATION_NO;
                    worksheet.Cells[i + 2, 6].Value = result[i].AERB_OR_PNDT;
                    worksheet.Cells[i + 2, 7].Value = result[i].PNDT_STATUS;
                    worksheet.Cells[i + 2, 8].Value = result[i].STATUS;
                    worksheet.Cells[i + 2, 9].Value = result[i].PNDT_NO;
                    worksheet.Cells[i + 2, 10].Value = result[i].REG_DATE;
                    worksheet.Cells[i + 2, 11].Value = result[i].PO_DATE;
                }

                // Save the package to stream
                var stream = new MemoryStream();
                package.SaveAs(stream);
                stream.Position = 0;

                string excelName = $"QuotaionMaster_{qid}_{DateTime.Now:yyyyMMddHHmmssfff}.xlsx";

                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
            }
        }
    }

}
