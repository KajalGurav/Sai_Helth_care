using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sai_Helth_care.Models;
using static Sai_Helth_care.Models.QuotationDAL;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class PaymentReceiptController : Controller
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
            public string STARTING_DATE { get; set; }
            public string ENDING_DATE { get; set; }
        }
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult TotalRecordCount(SearchQuotationParams tB_Admin)
        {
            try
            {
                int count = PaymentReceiptDAL.GetPaymentReceiptTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult GetPaymentReceiptList(SearchQuotationParams tB_params)
        {
            try
            {
                var customerList = PaymentReceiptDAL.GetPaymentReceiptList(tB_params);
                return Json(customerList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public ActionResult AddEditAdmin(PaymentReceipt tB_admin)
        {
            try
            {
                int i = PaymentReceiptDAL.AddUpdatePaymentReceipt(tB_admin);
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
       
        public JsonResult GetLatestRecordByType(string idType)
        {
            cmd = new SqlCommand("SP_GetTB_LatestRecordByType", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@TYPE", idType);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            LatestRecordByType rt;
            List<LatestRecordByType> FinalreportList = new List<LatestRecordByType>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new LatestRecordByType();
                    try
                    {
                        rt.ID = Convert.ToInt64(dt.Rows[i]["ID"]);
                        rt.LATEST_RECORD_NO = dt.Rows[i]["LATEST_RECORD_NO"].ToString();
                        rt.RECORD_NO_NEW = dt.Rows[i]["RECORD_NO_NEW"].ToString();
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

        public JsonResult GetReferenceNoByType(ReferenceNoByType tb_Admin)
        {
            long id = Convert.ToInt64(Session["Customer_ID"]);
            if(tb_Admin.CUSTOMER_ID !=0)
            {
                id=tb_Admin.CUSTOMER_ID;
            }

            cmd = new SqlCommand("GetReferenceNoByType", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@REF_TYPE", tb_Admin.TYPE);
            cmd.Parameters.AddWithValue("@CUSTOMER_ID", id);
            cmd.Parameters.AddWithValue("@FIRM_ID", tb_Admin.FIRM_ID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            ReferenceNoList rt;
            List<ReferenceNoList> FinalreportList = new List<ReferenceNoList>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new ReferenceNoList();
                    try
                    {
                        rt.Quot_ID = dt.Rows[i]["Quot_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["Quot_ID"]);
                        rt.REF_NO_LIST = dt.Rows[i]["REF_NO_LIST"].ToString();
                        rt.RECEIPT_FOR = dt.Rows[i]["RECEIPT_FOR"].ToString();
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

        public JsonResult GetProducDetails(PaymentTypeProdDetails tb_Admin)
        {
            long? custType = null;
            var cusType = db.Tb_CustomerMaster.Where(z => z.STATUS == "Active" && z.Customer_ID == tb_Admin.CUSTOMER_ID).Select(s => new { s.Customer_ID, s.FIRM_NAME, s.CUSTOMER_TYPE_ID, s.STATUS, s.REG_DATE }).ToList();
            custType = cusType[0].CUSTOMER_TYPE_ID;
            
            if (tb_Admin.PTYPE == "Quotation" || tb_Admin.PTYPE == "PurchaseOrder")
            {
                if (custType == 5)
                {
                    
                    long Id = 0;

                    if (tb_Admin.PTYPE == "Quotation")
                    {
                        if (tb_Admin.Q_ID != 0)
                        {
                            Id = tb_Admin.Q_ID;
                        }
                        else
                        {
                            var Q_id = db.Tb_QuotationMaster.Where(z => z.QUOTATION_NO == tb_Admin.ID && z.CUSTOMER_ID == tb_Admin.CUSTOMER_ID).Select(s => new { s.Q_ID }).ToList();
                            if (Q_id[0].Q_ID.ToString() != string.Empty)
                            {
                                Id = Q_id[0].Q_ID;
                            }
                        }
                    }
                    else
                    {
                        if (tb_Admin.Q_ID != 0)
                        {
                            Id = tb_Admin.Q_ID;
                        }
                        else
                        {
                            var Q_id = db.Tb_QuotationMaster.Where(z => z.PURCHASE_ORDER_NO == tb_Admin.ID && z.CUSTOMER_ID == tb_Admin.CUSTOMER_ID).Select(s => new { s.Q_ID }).ToList();
                            if (Q_id[0].Q_ID.ToString() != string.Empty)
                            {
                                Id = Q_id[0].Q_ID;
                            }
                        }
                    }

                    var _Monthlyreport = CommonCode.GetProducQotatDetails.getdataMindray(Id);
                    List<String> Product = _Monthlyreport.Select(x => x.PRODUCTNAME).Distinct().ToList();



                    //Dictionary<String,List<String>> ProdList = new Dictionary<String,List<String>>();
                    List<MProdList> prodLists = new List<MProdList>();
                    foreach (String pid in Product)
                    {
                        List<ProbePart> obj = new List<ProbePart>();
                        MProdList prlst = new MProdList();
                        var objP = (from i in _Monthlyreport
                                    select new { i.PRODUCTNAME, i.QUANTITY, i.PRODUCTPRICE, i.IS_WITH_PROBE_ACC}).Distinct().Where(x => x.PRODUCTNAME == pid);

                        var objS = (from i in _Monthlyreport
                                    select new { i.PROBE_NAME, i.ACCPRICE, i.PRODUCTNAME }).Distinct().Where(x => x.PRODUCTNAME == pid);
                        foreach (var item in objS)
                        {
                            if (item.PROBE_NAME == "" || item.PROBE_NAME == null)
                            {
                                continue;
                            }
                            else
                            {
                                ProbePart strobj = new ProbePart();
                                strobj.PROBE_NAME = item.PROBE_NAME;
                                if (item.ACCPRICE == "" || item.ACCPRICE == null)
                                {
                                    strobj.ACCPRICE = 0;
                                }
                                else
                                {
                                    strobj.ACCPRICE = Convert.ToDecimal(item.ACCPRICE);
                                }
                                obj.Add(strobj);
                            }
                        }
                        prlst.PRODUCTNAME = pid;
                        foreach (var item in objP)
                        {
                            prlst.QUANTITY = item.QUANTITY;
                            prlst.PRODUCTPRICE = item.PRODUCTPRICE;
                            prlst.IS_WITH_PROBE_ACC = "";
                            if (item.IS_WITH_PROBE_ACC == true)
                            {
                                prlst.IS_WITH_PROBE_ACC = " with "+ obj.Count + " Probes";
                            }
                        }
                        prlst.PROBE_PARTLIST = obj;
                        prlst.CUSTOMER_TYPE_ID = custType;
                        prodLists.Add(prlst);
                        
                    }
                    return Json(prodLists, JsonRequestBehavior.AllowGet);
                }
                else if(custType == 1)
                {
                    long Id = 0;

                    if (tb_Admin.PTYPE == "Quotation")
                    {
                        if (tb_Admin.Q_ID != 0)
                        {
                            Id = tb_Admin.Q_ID;
                        }
                        else
                        {
                            var Q_id = db.Tb_QuotationMaster.Where(z => z.QUOTATION_NO == tb_Admin.ID && z.CUSTOMER_ID == tb_Admin.CUSTOMER_ID).Select(s => new { s.Q_ID }).ToList();
                            if (Q_id[0].Q_ID.ToString() != string.Empty)
                            {
                                Id = Q_id[0].Q_ID;
                            }
                            else
                            {
                                Id = Convert.ToInt32(tb_Admin.ID.Substring(9));
                            }
                        }
                        
                    }
                    else
                    {
                        if (tb_Admin.Q_ID != 0)
                        {
                            Id = tb_Admin.Q_ID;
                        }
                        else
                        {
                            var Q_id = db.Tb_QuotationMaster.Where(z => z.PURCHASE_ORDER_NO == tb_Admin.ID && z.CUSTOMER_ID == tb_Admin.CUSTOMER_ID).Select(s => new { s.Q_ID }).ToList();
                            if (Q_id[0].Q_ID.ToString() != string.Empty)
                            {
                                Id = Q_id[0].Q_ID;
                            }
                            else
                            {
                                Id = Convert.ToInt32(tb_Admin.ID.Substring(7));
                            }
                        }
                    }

                    var _Monthlyreport = CommonCode.GetProducQotatDetails.getdata(Id);
                    List<String> Product = _Monthlyreport.Select(x => x.PRODUCTNAME).Distinct().ToList();



                    //Dictionary<String,List<String>> ProdList = new Dictionary<String,List<String>>();
                    List<ProdList> prodLists = new List<ProdList>();
                    foreach (String pid in Product)
                    {
                        List<SparePart> obj = new List<SparePart>();
                        ProdList prlst = new ProdList();
                        var objP = (from i in _Monthlyreport
                                    select new { i.PRODUCTNAME, i.QUANTITY, i.PRODUCTPRICE, i.IS_WITH_STANDARD_ACC, i.M_ID, i.M_NAME }).Distinct().Where(x => x.PRODUCTNAME == pid);

                        var objS = (from i in _Monthlyreport
                                    select new { i.SPARE_PART, i.ACCPRICE, i.PRODUCTNAME }).Distinct().Where(x => x.PRODUCTNAME == pid);
                        foreach (var item in objS)
                        {
                            if (item.SPARE_PART == "" || item.SPARE_PART == null)
                            {
                                continue;
                            }
                            else
                            {
                                SparePart strobj = new SparePart();
                                strobj.SPARE_PART = item.SPARE_PART;
                                if (item.ACCPRICE == "" || item.ACCPRICE == null)
                                {
                                    strobj.ACCPRICE = 0;
                                }
                                else
                                {
                                    strobj.ACCPRICE = Convert.ToInt64(item.ACCPRICE);
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
                            prlst.M_NAME = item.M_NAME;
                        }
                        prlst.SPARE_PARTLIST = obj;
                        prlst.CUSTOMER_TYPE_ID = custType;
                        prodLists.Add(prlst);
                    }
                    return Json(prodLists, JsonRequestBehavior.AllowGet);
                }
            }
            else if(tb_Admin.PTYPE == "AMC" || tb_Admin.PTYPE == "CMC")
            {
                var _Monthlyreport = CommonCode.GetProducQotatDetails.getPaymentTypeData(tb_Admin.PTYPE, tb_Admin.ID, tb_Admin.Q_ID);

                return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
            }
            return Json(new EmptyResult(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCustomerQuoteDetails(PaymentTypeProdDetails tb_Admin)
        {
            var cusType = db.Tb_CustomerMaster.Where(z => z.STATUS == "Active" && z.Customer_ID == tb_Admin.CUSTOMER_ID).Select(s => new { s.Customer_ID, s.FIRM_NAME, s.CUSTOMER_TYPE_ID, s.STATUS, s.REG_DATE }).ToList();
            long Id = 0;
            string PO_NUMBER="";
            List<QuotationMaster> FinalreportList = new List<QuotationMaster>();
            if (cusType[0].CUSTOMER_TYPE_ID == 5)
            {

                if (tb_Admin.PTYPE == "Quotation")
                {
                    if(tb_Admin.Q_ID != 0)
                    {
                        Id=tb_Admin.Q_ID;
                    }
                    else{
                        var Q_id = db.Tb_QuotationMaster.Where(z => z.QUOTATION_NO == tb_Admin.ID && z.CUSTOMER_ID == tb_Admin.CUSTOMER_ID).Select(s => new { s.Q_ID }).ToList();
                        if (Q_id[0].Q_ID.ToString() != string.Empty)
                        {
                            Id = Q_id[0].Q_ID;
                        }
                        else
                        {
                            Id = Convert.ToInt64(tb_Admin.ID.Substring(9));
                        }
                    }
                }
                else
                {
                    if (tb_Admin.Q_ID != 0)
                    {
                        Id = tb_Admin.Q_ID;
                    }
                    else
                    {
                        var Q_id = db.Tb_QuotationMaster.Where(z => z.PURCHASE_ORDER_NO == tb_Admin.ID && z.CUSTOMER_ID == tb_Admin.CUSTOMER_ID).Select(s => new { s.Q_ID }).ToList();
                        if (Q_id[0].Q_ID.ToString() != string.Empty)
                        {
                            Id = Q_id[0].Q_ID;
                        }
                        else
                        {
                            Id = Convert.ToInt64(tb_Admin.ID.Substring(7));
                        }
                    }
                    
                }
                cmd = new SqlCommand("GetCustomerQuotePaymentDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@ADMIN_ID", 1);
                cmd.Parameters.AddWithValue("@Q_ID", Id);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_Admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", cusType[0].CUSTOMER_TYPE_ID);

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
                QuotationMaster rt;

                if (dt != null)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        rt = new QuotationMaster();
                        try
                        {
                            rt.Q_ID = Convert.ToInt64(dt.Rows[i]["Q_ID"]);
                            rt.QUOTATION_DATE = Convert.ToString(dt.Rows[i]["QUOTATION_DATE"]);
                            rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                            rt.PNDT_STATUS = (dt.Rows[i]["PNDT_STATUS"].ToString());
                            rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                            rt.QUOTATION_TYPE = (dt.Rows[i]["QUOTATION_TYPE"]).ToString();
                            rt.PNDT_NO = (dt.Rows[i]["PNDT_NO"]).ToString();
                            rt.PO_DATE = (dt.Rows[i]["PO_DATE"]).ToString();
                            rt.PAYMENT_TERM = (dt.Rows[i]["PAYMENT_TERM"]).ToString();
                            //16-06-2023 Rajendra
                            rt.NOTE = (dt.Rows[i]["NOTE"]).ToString(); //Remarks and Note are Same for Quotation and PO
                            rt.CUSTOMER_TYPE_ID = dt.Rows[i]["CUSTOMER_TYPE_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CUSTOMER_TYPE_ID"]);
                            rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"].ToString());
                            rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"]).ToString();
                            rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"]).ToString();
                            rt.EMAIL = (dt.Rows[i]["EMAIL"]).ToString();
                            rt.BILLING_ADDRESS = (dt.Rows[i]["BILLING_ADDRESS"]).ToString();
                            rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                            rt.SHIPPING_ADDRESS = (dt.Rows[i]["SHIPPING_ADDRESS"]).ToString();
                            rt.SHIPPING_ZIP_CODE = (dt.Rows[i]["SHIPPING_ZIP_CODE"]).ToString();
                            rt.STATE_ID = (dt.Rows[i]["STATE_ID"]).ToString();
                            rt.STATE_NAME = (dt.Rows[i]["STATE_NAME"]).ToString();
                            rt.CITY_ID = (dt.Rows[i]["CITY_ID"]).ToString();
                            rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"]).ToString();
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
                            rt.TAX_PERCENTAGE = Convert.ToInt32(dt.Rows[i]["TAX_PERCENTAGE"]);
                            rt.PAYMENT_TERM_DETAILS = (dt.Rows[i]["PAYMENT_TERM_DETAILS"]).ToString();
                            rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                        }
                        catch (Exception ex)
                        {
                        }
                        FinalreportList.Add(rt);
                    }
                }
            }
            else
            {
                if (tb_Admin.PTYPE == "Quotation")
                {
                    if (tb_Admin.Q_ID != 0)
                    {
                        Id = tb_Admin.Q_ID;
                    }
                    else
                    {
                        var Q_id = db.Tb_QuotationMaster.Where(z => z.QUOTATION_NO == tb_Admin.ID && z.CUSTOMER_ID == tb_Admin.CUSTOMER_ID).Select(s => new { s.Q_ID }).ToList();
                        if (Q_id[0].Q_ID.ToString() != string.Empty)
                        {
                            Id = Q_id[0].Q_ID;
                        }
                        else
                        {
                            Id = Convert.ToInt64(tb_Admin.ID.Substring(9));
                        }
                    }
                }
                else if (tb_Admin.PTYPE == "Invoice")
                {
                    // Assuming 'db' is your database context and 'tb_Admin' is an object that contains 'Q_ID'
                     PO_NUMBER = db.TB_InvoiceMaster
                        .Where(z => z.INVOICE_ID == tb_Admin.Q_ID)  
                        .Select(s => s.PO_NUMBER)  // No need to create a new anonymous type
                        .FirstOrDefault();         // Get the single PO_NUMBER or default if not found
                                                   //int i1 = PO_NUMBER.PO_NUMBER();
                }
                else
                {
                    if (tb_Admin.Q_ID != 0)
                    {
                        Id = tb_Admin.Q_ID;
                    }
                    else
                    {
                        var Q_id = db.Tb_QuotationMaster.Where(z => z.PURCHASE_ORDER_NO == tb_Admin.ID && z.CUSTOMER_ID == tb_Admin.CUSTOMER_ID).Select(s => new { s.Q_ID }).ToList();
                        if (Q_id[0].Q_ID.ToString() != string.Empty)
                        {
                            Id = Q_id[0].Q_ID;
                        }
                        else
                        {
                            Id = Convert.ToInt64(tb_Admin.ID.Substring(7));
                        }
                    }
                    
                }
                cmd = new SqlCommand("GetCustomerQuotePaymentDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@ADMIN_ID", 1);
                cmd.Parameters.AddWithValue("@Q_ID", Id);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_Admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", cusType[0].CUSTOMER_TYPE_ID);
                cmd.Parameters.AddWithValue("@PO_NUMBER", PO_NUMBER);

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
                QuotationMaster rt;
                
                if (dt != null)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        rt = new QuotationMaster();
                        try
                        {
                            rt.Q_ID = Convert.ToInt64(dt.Rows[i]["Q_ID"]);
                            rt.QUOTATION_DATE = Convert.ToString(dt.Rows[i]["QUOTATION_DATE"]);
                            rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                            rt.PNDT_STATUS = (dt.Rows[i]["PNDT_STATUS"].ToString());
                            rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                            rt.QUOTATION_TYPE = (dt.Rows[i]["QUOTATION_TYPE"]).ToString();
                            rt.PNDT_NO = (dt.Rows[i]["PNDT_NO"]).ToString();
                            rt.PO_DATE = (dt.Rows[i]["PO_DATE"]).ToString();
                            rt.PAYMENT_TERM = (dt.Rows[i]["PAYMENT_TERM"]).ToString();
                            //16-06-2023 Rajendra
                            rt.NOTE = (dt.Rows[i]["NOTE"]).ToString(); //Remarks and Note are Same for Quotation and PO
                            rt.CUSTOMER_TYPE_ID = dt.Rows[i]["CUSTOMER_TYPE_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CUSTOMER_TYPE_ID"]);
                            rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"].ToString());
                            rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"]).ToString();
                            rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"]).ToString();
                            rt.EMAIL = (dt.Rows[i]["EMAIL"]).ToString();
                            rt.BILLING_ADDRESS = (dt.Rows[i]["BILLING_ADDRESS"]).ToString();
                            rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                            rt.SHIPPING_ADDRESS = (dt.Rows[i]["SHIPPING_ADDRESS"]).ToString();
                            rt.SHIPPING_ZIP_CODE = (dt.Rows[i]["SHIPPING_ZIP_CODE"]).ToString();
                            rt.STATE_ID = (dt.Rows[i]["STATE_ID"]).ToString();
                            rt.STATE_NAME = (dt.Rows[i]["STATE_NAME"]).ToString();
                            rt.CITY_ID = (dt.Rows[i]["CITY_ID"]).ToString();
                            rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"]).ToString();
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
                            rt.TAX_PERCENTAGE = Convert.ToInt32(dt.Rows[i]["TAX_PERCENTAGE"]);
                            rt.PAYMENT_TERM_DETAILS = (dt.Rows[i]["PAYMENT_TERM_DETAILS"]).ToString();
                            rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                        }
                        catch (Exception ex)
                        {
                        }
                        FinalreportList.Add(rt);
                    }
                }
            }
            
            var _Monthlyreport = FinalreportList;
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProductDetails(PaymentTypeProdDetails tb_Admin)
        {
            int Id = 0;
            if (tb_Admin.PTYPE == "Quotation")
            {
                Id = Convert.ToInt32(tb_Admin.ID.Substring(9));
            }
            else
            {
                Id = Convert.ToInt32(tb_Admin.ID.Substring(7));
            }
            var _Monthlyreport = CommonCode.GetProducQotatDetails.getdata(Id);
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCustomerList()
        {
            var _getadmin = db.Tb_CustomerMaster.Where(z => z.STATUS == "Active").OrderBy(o => o.CUSTOMER_NAME).Select(s => new { s.Customer_ID, s.CUSTOMER_NAME, s.FIRM_NAME, s.CUSTOMER_TYPE_ID, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFirmList(long? id)
        {
            if(id == 0 || id==null)
            {
                var _getadmin = db.Tb_FirmMaster.Where(z => z.STATUS == "Active").Select(s => new { s.CUSTOMER_ID, s.F_ID, s.FIRM_NAME, s.CUSTOMER_TYPE_ID, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var _getadmin = db.Tb_FirmMaster.Where(z => z.STATUS == "Active" && z.CUSTOMER_ID == id).Select(s => new { s.CUSTOMER_ID, s.F_ID, s.FIRM_NAME, s.CUSTOMER_TYPE_ID, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            
        }

        public JsonResult GetPaymentReceiptDetails(PaymentReceipt tB_admin)
        {
            long? cid = Convert.ToInt64(Session["Customer_ID"]);
            long? fid = Convert.ToInt64(Session["FIRM_ID"]);
            if (tB_admin.CUSTOMER_ID != 0)
            {
                cid = tB_admin.CUSTOMER_ID;
            }
            if (tB_admin.FIRM_ID != 0)
            {
                cid = tB_admin.FIRM_ID;
            }

            cmd = new SqlCommand("GetPaymentReceiptDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@R_ID", tB_admin.R_ID);
            cmd.Parameters.AddWithValue("@PAYMENT_RECEIPT_NO", tB_admin.PAYMENT_RECEIPT_NO);
            cmd.Parameters.AddWithValue("@CUSTOMER_ID", cid);
            cmd.Parameters.AddWithValue("@FIRM_ID", fid);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            PaymentReceipt rt;
            List<PaymentReceipt> FinalreportList = new List<PaymentReceipt>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new PaymentReceipt();
                    try
                    {
                        rt.R_ID = Convert.ToInt64(dt.Rows[i]["R_ID"]);
                        rt.PAYMENT_RECEIPT_NO = Convert.ToString(dt.Rows[i]["PAYMENT_RECEIPT_NO"]);
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        rt.FIRM_ID = Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
                        rt.Q_ID = Convert.ToInt64(dt.Rows[i]["Q_ID"]);
                        rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"]).ToString();
                        rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"]).ToString();
                        rt.FIRM_ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.PAYMENT_REF_NO = (dt.Rows[i]["PAYMENT_REF_NO"]).ToString();
                        rt.PAYMENT_RECEIPT_TYPE = (dt.Rows[i]["PAYMENT_RECEIPT_TYPE"]).ToString();
                        rt.PAYMENT_TYPE = (dt.Rows[i]["PAYMENT_TYPE"]).ToString();
                        rt.RECIEPT_FOR = (dt.Rows[i]["RECIEPT_FOR"]).ToString(); //Remarks and Note are Same for Quotation and PO
                        rt.PAYMENT_AMOUNT = Convert.ToInt64(dt.Rows[i]["PAYMENT_AMOUNT"]);
                        rt.AMOUNT_RECEIVED = Convert.ToInt64(dt.Rows[i]["AMOUNT_RECEIVED"]);
                        rt.AMOUNT_REMAINING = Convert.ToInt64(dt.Rows[i]["AMOUNT_REMAINING"]);
                        rt.STATE_ID = Convert.ToInt64(dt.Rows[i]["STATE_ID"]);
                        rt.STATE_NAME = (dt.Rows[i]["STATE_NAME"]).ToString();
                        rt.CITY_ID = Convert.ToInt64(dt.Rows[i]["CITY_ID"]);
                        rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"]).ToString();
                        rt.TXN_ID = (dt.Rows[i]["TXN_ID"]).ToString();
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        rt.RECEIPT_GEN_DATE = (dt.Rows[i]["RECEIPT_GEN_DATE"]).ToString();
                        rt.CHEQUE_DATE = (dt.Rows[i]["CHEQUE_DATE"]).ToString();
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

        public JsonResult GetPaymentCompanyDetails()
        {
            int cid = Convert.ToInt32(Session["COMPANY_ID"]);
            var _getcompanyDetails = db.TB_CompanyMaster.Where(z => z.COMPANY_ID == cid).Select(a => new { a.COMPANY_ID, a.COMPANY_REG_ADDRESS, a.ZIP_CODE, a.COMPANY_NAME }).FirstOrDefault();
            return Json(_getcompanyDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PaymentReceiptAddUpdate()
        {
            return View();
        }


    }
}