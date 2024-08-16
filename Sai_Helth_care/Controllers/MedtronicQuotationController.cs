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
using Sai_Helth_care.CommonCode;
using System.Drawing.Imaging;
using System.IO;
using System.Web.Hosting;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class MedtronicQuotationController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        static DataSet ds;

        // GET: MedtronicQuotation
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
                cmd = new SqlCommand("Get_TB_MedtronicQuotation_Count", con);
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
                con.Close();
                //throw ex;
            }
            return Json(new { success = i }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetallAdmin(Search_Admin tB_Admin)
        {
            cmd = new SqlCommand("SP_GetTB_MedtronicQuotation", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
            cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
            cmd.Parameters.AddWithValue("@STARTING_DATE", tB_Admin.STARTING_DATE);
            cmd.Parameters.AddWithValue("@ENDING_DATE", tB_Admin.ENDING_DATE);
            //if (con.State == System.Data.ConnectionState.Open)
            //{
            //    con.Close();
            //}
            //con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            //con.Close();
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
                        //rt.CAT_ID = Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        //rt.M_ID = Convert.ToInt64(dt.Rows[i]["M_ID"]);
                        //rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.FIRM_ID = Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        rt.QUOTATION_TYPE = (dt.Rows[i]["QUOTATION_TYPE"].ToString());
                        rt.QUOTATION_DATE = (dt.Rows[i]["QUOTATION_DATE"].ToString());
                        rt.PNDT_STATUS = (dt.Rows[i]["PNDT_STATUS"]).ToString();
                        rt.PNDT_NO = (dt.Rows[i]["PNDT_NO"]).ToString();
                        rt.PO_DATE = (dt.Rows[i]["PO_DATE"]).ToString();
                        rt.PAYMENT_TERM = (dt.Rows[i]["PAYMENT_TERM"]).ToString();
                        rt.NOTE = (dt.Rows[i]["NOTE"]).ToString();
                        rt.SELECT_PRODUCT_IS_NEW = (dt.Rows[i]["SELECT_PRODUCT_IS_NEW"]).ToString();
                        rt.QUOTATION_FOR_SPARE_PART = (dt.Rows[i]["QUOTATION_FOR_SPARE_PART"]).ToString();
                        rt.QUNATITY = (dt.Rows[i]["QUNATITY"]).ToString();
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


        public JsonResult GetProduct()
        {
            var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active").OrderBy(x => x.PRODUCT_NAME).Select(s => new { s.P_ID, s.PRODUCT_NAME, s.STATUS }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSparepart(long id)
        {
            var _getadmin = db.Tb_SparePart.Where(z => z.STATUS == "Active" && z.P_ID == id).OrderBy(x => x.SPARE_PART).Select(s => new { s.P_ID, s.SP_ID, s.PRICE, s.SPARE_PART, s.STATUS }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStdAccPart(long id)
        {
            var _getadmin = db.Tb_StdAccessoriesMaster.Where(z => z.STATUS == "Active" && z.P_ID == id).Select(s => new { s.STD_ID, s.P_ID, s.STD_ACC_NAME, s.STATUS }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }


        public ActionResult MedtronicQueAdd()
        {
            return View();
        }


     
        public ActionResult AddAdmin(QuotationMaster tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Insert_Tb_MedtronicQuotationMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@QUOTATION_TYPE", tB_admin.QUOTATION_TYPE);
                cmd.Parameters.AddWithValue("@QUOTATION_NO", tB_admin.QUOTATION_NO);
                cmd.Parameters.AddWithValue("@FIRM_ID", tB_admin.FIRM_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@QUOTATION_DATE", tB_admin.QUOTATION_DATE);
                cmd.Parameters.AddWithValue("@PNDT_STATUS", tB_admin.PNDT_STATUS);
                cmd.Parameters.AddWithValue("@PNDT_NO", tB_admin.PNDT_NO);
                cmd.Parameters.AddWithValue("@STATUS", tB_admin.STATUS);
                var date = Convert.ToDateTime(tB_admin.PO_DATE);
                cmd.Parameters.AddWithValue("@PO_DATE", date);
                cmd.Parameters.AddWithValue("@PAYMENT_TERM", tB_admin.PAYMENT_TERM);
                cmd.Parameters.AddWithValue("@NOTE", tB_admin.NOTE);
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
        public ActionResult EditAdmin(QuotationMaster tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Update_Tb_RegularQuotationMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@QUOTATION_TYPE", tB_admin.QUOTATION_TYPE);
                cmd.Parameters.AddWithValue("@QUOTATION_NO", tB_admin.QUOTATION_NO);
                cmd.Parameters.AddWithValue("@FIRM_ID", tB_admin.FIRM_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@PNDT_STATUS", tB_admin.PNDT_STATUS);
                cmd.Parameters.AddWithValue("@PNDT_NO", tB_admin.PNDT_NO);
                cmd.Parameters.AddWithValue("@STATUS", tB_admin.STATUS);
                cmd.Parameters.AddWithValue("@PO_DATE", tB_admin.PO_DATE);
                cmd.Parameters.AddWithValue("@PAYMENT_TERM", tB_admin.PAYMENT_TERM);
                cmd.Parameters.AddWithValue("@NOTE", tB_admin.NOTE);
                cmd.Parameters.AddWithValue("@Q_ID", tB_admin.Q_ID);
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

        public JsonResult GetLatestRecordByType(string idType)
        {
            var _Monthlyreport = CommonCode.GetProducQotatDetails.GetLatestRecordByType(idType);
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCustomerList()
        {
            long c_id = Convert.ToInt64(Session["COMPANY_ID"]);
            var _getadmin = db.Tb_CustomerMaster.Where(z => z.STATUS == "Active" && z.CUSTOMER_TYPE_ID == 3 && z.COMPANY_ID == c_id).OrderBy(x => x.CUSTOMER_NAME).Select(s => new { s.Customer_ID, s.CUSTOMER_NAME, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
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

        public JsonResult GetCmpnyBankDetails()
        {
            int cid = Convert.ToInt32(Session["COMPANY_ID"]);
            var _getcompanyDetails = db.TB_CompanyMaster.Where(z => z.COMPANY_ID == cid).FirstOrDefault();
            return Json(_getcompanyDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ViewQuote(long id)
        {
            Session["Q_ID"] = id;
            return View();
        }


        public JsonResult GetMedtronicQotDetails()
        {
            List<QuotationMaster> FinalreportList = new List<QuotationMaster>();
            QuotationMaster rt;
            long id = Convert.ToInt64(Session["Q_ID"]);
            cmd = new SqlCommand("Get_QuotationDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Q_ID", id);
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            ds = new DataSet();
           
            sda.Fill(ds);  
            if (ds != null)
            {
                dt = ds.Tables[0];
                if (dt != null)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        rt = new QuotationMaster();
                        try
                        {
                            rt.Q_ID = Convert.ToInt64(dt.Rows[i]["Q_ID"]);
                            //rt.CAT_ID = Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                            //rt.M_ID = Convert.ToInt64(dt.Rows[i]["M_ID"]);
                            //rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
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
                            //  rt.SELECT_PRODUCT_IS_NEW = (dt.Rows[i]["SELECT_PRODUCT_IS_NEW"]).ToString();
                            //   rt.QUOTATION_FOR_SPARE_PART = (dt.Rows[i]["QUOTATION_FOR_SPARE_PART"]).ToString();
                            //  rt.QUNATITY = (dt.Rows[i]["QUNATITY"]).ToString();
                            //   rt.PRODUCT_PRICE = (dt.Rows[i]["PRODUCT_PRICE"]).ToString();
                            //  rt.MODIFY_PRODUCT_PRICE = (dt.Rows[i]["MODIFY_PRODUCT_PRICE"]).ToString();
                            rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                            rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();

                            FinalreportList.Add(rt);
                        }
                        catch (Exception ex)
                        {
                        }                        
                    }
                }                    
            }
            var _Monthlyreport = FinalreportList;
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }


        public ActionResult AddProductDetails(QuotationMaster tb_Admin)
        {
            bool result = false;
            bool IsSTDAcc = false;
            if (tb_Admin.IS_WITH_STANDARD_ACC == "Yes")
            {
                IsSTDAcc = true;
            }
            long id1 = Convert.ToInt64(Session["Q_ID"]);
            //string[] splitString = Regex.Split(tb_Admin.SP_ID, @",");
            try
            {
                cmd = new SqlCommand("Insert_QuotationProductDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@P_ID", tb_Admin.P_ID);
                cmd.Parameters.AddWithValue("@Q_ID", id1);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_Admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@PRODUCT_QUANTITY", tb_Admin.PRODUCT_QUANTITY);
                cmd.Parameters.AddWithValue("@PROCUCT_PRICE", tb_Admin.PROCUCT_PRICE);
                //cmd.Parameters.AddWithValue("@SP_ID", SP_ID);
                cmd.Parameters.AddWithValue("@SP_ID", tb_Admin.SP_ID);//"1,2,3"
                cmd.Parameters.AddWithValue("@IS_WITH_STANDARD_ACC", IsSTDAcc);
                cmd.Parameters.AddWithValue("@SPQ_ID", tb_Admin.SPQ_ID);//"1,2,3"
                cmd.Parameters.AddWithValue("@STD_ID", tb_Admin.STD_ID);//"1,2,3"
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

        public JsonResult GetProductDetails_old()
        {
            List<QuotationMaster> FinalreportList = new List<QuotationMaster>();
            QuotationMaster rt;
            long id = Convert.ToInt64(Session["Q_ID"]);
            cmd = new SqlCommand("Get_Tb_QuotationProductDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Q_ID", id);
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            ds = new DataSet();            
            sda.Fill(ds);           
            
            if (ds != null)
            {
                dt = ds.Tables[0];
                if (dt != null)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        rt = new QuotationMaster();
                        try
                        {

                            rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                            rt.QUOTATION_ID = Convert.ToInt64(dt.Rows[i]["QUOTATION_ID"]);
                            rt.PRODUCT_ID = Convert.ToInt64(dt.Rows[i]["PRODUCT_ID"]);
                            rt.SPAREPART_ID_LIST = Convert.ToInt64(dt.Rows[i]["SPAREPART_ID_LIST"]);
                            rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"].ToString());
                            rt.SPARE_PART = (dt.Rows[i]["SPARE_PART"].ToString());
                            rt.PRICE = (dt.Rows[i]["PRICE"].ToString());
                            rt.PRODUCT_QUANTITY = (dt.Rows[i]["PRODUCT_QUANTITY"].ToString());
                            rt.PROCUCT_PRICE = (dt.Rows[i]["PROCUCT_PRICE"]).ToString();
                            rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                            rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();

                            FinalreportList.Add(rt);
                        }
                        catch (Exception ex)
                        {
                        }                        
                    }
                }
            }
            var _Monthlyreport = FinalreportList;
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult GetProducQotatDetails()
        public JsonResult GetProductDetails()
        {         
            var _Monthlyreport = GetProducQotatDetails.getdata(Convert.ToInt32(Session["Q_ID"]));
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProductQuotDetails(int? id)
        {
            var searchParam = Convert.ToInt32(Session["Q_ID"]);
            if (id != null)
            {
                searchParam = Convert.ToInt32(id);
            }
            var _Monthlyreport = CommonCode.GetProducQotatDetails.getdata(searchParam);
            List<String> Product = _Monthlyreport.Select(x => x.PRODUCTNAME).Distinct().ToList();
            var _Quantityreport = CommonCode.GetProducQotatDetails.getdataQuantity(searchParam);
            var _StdAccreport = CommonCode.GetProducQotatDetails.getdataStdAcc(searchParam);


            //Dictionary<String,List<String>> ProdList = new Dictionary<String,List<String>>();
            List<ProdList> prodLists = new List<ProdList>();
            foreach (String pid in Product)
            {
                List<SparePart> obj = new List<SparePart>();
                List<StdAccList> objStd = new List<StdAccList>();
                ProdList prlst = new ProdList();
                var objP = (from i in _Monthlyreport
                            select new { i.PRODUCTNAME, i.QUANTITY, i.PRODUCTPRICE, i.IS_WITH_STANDARD_ACC, i.M_ID, i.M_NAME }).Distinct().Where(x => x.PRODUCTNAME == pid);
                //List<string> objSparePart = _Monthlyreport.Where(x => x.PRODUCTNAME == id).Select(x =>  x.SPARE_PART).ToList();
                //List<string> objSparePartPrice = _Monthlyreport.Where(x => x.PRODUCTNAME == id).Select(x => x.ACCPRICE).ToList();
                //List<SparePart> objSpare = _Monthlyreport.Where(x => x.PRODUCTNAME == id).Select(x => new List<SparePart>() { x.SPARE_PART, x.ACCPRICE }).ToList();
                var objS = (from i in _Monthlyreport
                            select new { i.SPARE_PART, i.ACCPRICE, i.PRODUCTNAME }).Distinct().Where(x => x.PRODUCTNAME == pid);
                List<SparePart> spareList = new List<SparePart>();
                foreach (var item in objS)
                {
                    long price = 0;
                    if (item.ACCPRICE == "" || item.ACCPRICE == null)
                    {
                        price = 0;
                    }
                    else
                    {
                        price = Convert.ToInt64(item.ACCPRICE);
                    }
                    spareList.Add(new SparePart { SPARE_PART = item.SPARE_PART, ACCPRICE = price, PRODUCTNAME = item.PRODUCTNAME });
                }

                var objQ = (from i in _Quantityreport
                            select new { i.QuantID, i.PRODUCTNAME }).Where(x => x.PRODUCTNAME == pid);
                

                var objAcc = (from i in _StdAccreport
                              select new { i.StdAccID, i.STD_ACC_NAME, i.PRODUCTNAME }).Distinct().Where(x => x.PRODUCTNAME == pid);

                foreach (var item in objAcc)
                {
                    if (item.STD_ACC_NAME == "" || item.STD_ACC_NAME == null)
                    {
                        continue;
                    }
                    else
                    {
                        StdAccList strobj = new StdAccList();
                        strobj.STD_ACC_NAME = item.STD_ACC_NAME;
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
                        strobj.SPARE_PART = item.SPARE_PART;
                        if (item.ACCPRICE == 0)
                        {
                            strobj.ACCPRICE = 0;
                        }
                        else
                        {
                            strobj.ACCPRICE = Convert.ToInt64(item.ACCPRICE);
                        }
                        int pos = 0;
                        if (objQ.Count() >= 1)
                        {
                            pos = spareList.IndexOf(item);
                            strobj.SPARE_QUANTITY = objQ.Select(x => x.QuantID).ElementAt(pos);
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
                    prlst.IS_WITH_STANDARD_ACC = "";
                    if (item.IS_WITH_STANDARD_ACC == true)
                    {
                        prlst.IS_WITH_STANDARD_ACC = " with Standard Accessories";
                    }
                    prlst.M_NAME = item.M_NAME;
                }
                prlst.SPARE_PARTLIST = obj;
                prlst.STD_ACC_LIST = objStd;
                prodLists.Add(prlst);
            }
            return Json(prodLists, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetProducDetails()
        {
            var _Monthlyreport = CommonCode.GetProducQotatDetails.getdata(Convert.ToInt32(Session["Q_ID"]));
            List<String> Product = _Monthlyreport.Select(x => x.PRODUCTNAME).Distinct().ToList();



            //Dictionary<String,List<String>> ProdList = new Dictionary<String,List<String>>();
            List<ProducList> prodLists = new List<ProducList>();
            foreach (String id in Product)
            {
                ProducList prlst = new ProducList();
                var objP = (from i in _Monthlyreport
                            select new { i.QUOTATION_ID, i.PRODUCTNAME, i.QUANTITY, i.PRODUCTPRICE, i.IS_WITH_STANDARD_ACC }).Distinct().Where(x => x.PRODUCTNAME == id);

                prlst.PRODUCTNAME = id;
                foreach (var item in objP)
                {
                    prlst.QUOTATION_ID = item.QUOTATION_ID;
                    prlst.QUANTITY = item.QUANTITY;
                    prlst.PRODUCTPRICE = item.PRODUCTPRICE;
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
        //Remove Accessories( SPARE_PART )
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

    }
}