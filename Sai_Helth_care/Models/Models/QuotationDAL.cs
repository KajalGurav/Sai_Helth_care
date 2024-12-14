using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Web.Hosting;
using System.Drawing.Imaging;
using static Sai_Helth_care.Models.CustomerDAL;

namespace Sai_Helth_care.Models
{
    public class QuotationDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public class SearchQuotationParams
        {
            public int PageNo { get; set; }
            public int P_ID { get; set; }
            public int PageSize { get; set; }
            public int? CUSTOMER_TYPE_ID { get; set; }
            public long? CUSTOMER_ID { get; set; }
            public string CUSTOMER_NAME { get; set; }
            public string FIRM_NAME { get; set; }
            public string STARTING_DATE { get; set; }
            public string ENDING_DATE { get; set; }
            public string ADMIN_SEARCH { get; set; }
        }

        public static int AddQuotation(QuotationMaster tB_params)
        {

            try
            {
                cmd = new SqlCommand("Insert_QuotationMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tB_params.CUSTOMER_TYPE_ID);
                cmd.Parameters.AddWithValue("@QUOTATION_TYPE", tB_params.QUOTATION_TYPE);
                cmd.Parameters.AddWithValue("@QUOTATION_NO", tB_params.QUOTATION_NO);
                cmd.Parameters.AddWithValue("@FIRM_ID", tB_params.FIRM_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_params.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@QUOTATION_DATE", tB_params.QUOTATION_DATE);
                cmd.Parameters.AddWithValue("@PNDT_STATUS", tB_params.PNDT_STATUS);
                cmd.Parameters.AddWithValue("@PNDT_NO", tB_params.PNDT_NO);
                cmd.Parameters.AddWithValue("@STATUS", tB_params.STATUS);
                cmd.Parameters.AddWithValue("@PO_DATE", tB_params.PO_DATE);
                cmd.Parameters.AddWithValue("@PAYMENT_TERM", tB_params.PAYMENT_TERM);
                cmd.Parameters.AddWithValue("@NOTE", tB_params.NOTE);
                cmd.Parameters.AddWithValue("@AERB_OR_PNDT", tB_params.AERB_OR_PNDT);
                cmd.Parameters.AddWithValue("@BANK_ID", tB_params.BANK_ID);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                return i;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static int UpdateQuotation(QuotationMaster tB_params)
        {

            try
            {
                cmd = new SqlCommand("Update_Tb_QuotationMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@QUOTATION_TYPE", tB_params.QUOTATION_TYPE);
                cmd.Parameters.AddWithValue("@QUOTATION_NO", tB_params.QUOTATION_NO);
                cmd.Parameters.AddWithValue("@FIRM_ID", tB_params.FIRM_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_params.CUSTOMER_ID);
                //cmd.Parameters.AddWithValue("@QUOTATION_DATE", tB_params.QUOTATION_DATE);
                cmd.Parameters.AddWithValue("@PNDT_STATUS", tB_params.PNDT_STATUS);
                cmd.Parameters.AddWithValue("@PNDT_NO", tB_params.PNDT_NO);
                cmd.Parameters.AddWithValue("@STATUS", tB_params.STATUS);
                cmd.Parameters.AddWithValue("@PO_DATE", tB_params.PO_DATE);
                cmd.Parameters.AddWithValue("@PAYMENT_TERM", tB_params.PAYMENT_TERM);
                cmd.Parameters.AddWithValue("@NOTE", tB_params.NOTE);
                cmd.Parameters.AddWithValue("@AERB_OR_PNDT", tB_params.AERB_OR_PNDT);
                cmd.Parameters.AddWithValue("@BANK_ID", tB_params.BANK_ID);
                cmd.Parameters.AddWithValue("@Q_ID", tB_params.Q_ID);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                return i;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static int GetQuotationsTotalRecordCount(SearchQuotationParams tb_params)
        {
            HttpContext context = HttpContext.Current;
            long id = Convert.ToInt64(context.Session["COMPANY_ID"]);
            int i = 0;
            try
            {
                 cmd = new SqlCommand("GetQuotationsTotalRecordCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tb_params.CUSTOMER_TYPE_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_params.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tb_params.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@FIRM_NAME", tb_params.FIRM_NAME);
                cmd.Parameters.AddWithValue("@STARTING_DATE", tb_params.STARTING_DATE);
                cmd.Parameters.AddWithValue("@ENDING_DATE", tb_params.ENDING_DATE);
                cmd.Parameters.AddWithValue("@ADMIN_SEARCH", tb_params.ADMIN_SEARCH);
                cmd.Parameters.AddWithValue("@P_ID", tb_params.P_ID);
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);
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
            return i;

        }

        public static List<QuotationMaster> GetQuotationList(SearchQuotationParams tb_params)
        {
            HttpContext context = HttpContext.Current;
            long id = Convert.ToInt64(context.Session["COMPANY_ID"]);

            cmd = new SqlCommand("SP_GetQuotationList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tb_params.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tb_params.PageNo - 1);
            cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tb_params.CUSTOMER_TYPE_ID);
            cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_params.CUSTOMER_ID);
            cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tb_params.CUSTOMER_NAME);
            cmd.Parameters.AddWithValue("@FIRM_NAME", tb_params.FIRM_NAME);
            cmd.Parameters.AddWithValue("@STARTING_DATE", tb_params.STARTING_DATE);
            cmd.Parameters.AddWithValue("@ENDING_DATE", tb_params.ENDING_DATE);
            cmd.Parameters.AddWithValue("@ADMIN_SEARCH", tb_params.ADMIN_SEARCH);
            cmd.Parameters.AddWithValue("@P_ID", tb_params.P_ID);
            cmd.Parameters.AddWithValue("@COMPANY_ID", id);
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
                        rt.Q_ID = Convert.ToInt64(dt.Rows[i]["Q_ID"]);
                        //rt.CAT_ID =  Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        //rt.M_ID = Convert.ToInt64(dt.Rows[i]["M_ID"]);
                        //rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.FIRM_ID = Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"].ToString());
                        rt.QUOTATION_NO = (dt.Rows[i]["QUOTATION_NO"].ToString());
                        rt.QUOTATION_FOR = (dt.Rows[i]["QUOTATION_FOR"].ToString());
                        rt.QUOTATION_TYPE = (dt.Rows[i]["QUOTATION_TYPE"].ToString());
                        rt.QUOTATION_DATE = (dt.Rows[i]["QUOTATION_DATE"].ToString());
                        rt.PNDT_STATUS = (dt.Rows[i]["PNDT_STATUS"]).ToString();
                        rt.PNDT_NO = (dt.Rows[i]["PNDT_NO"]).ToString();
                        rt.PO_DATE = (dt.Rows[i]["PO_DATE"]).ToString();
                        rt.PAYMENT_TERM = (dt.Rows[i]["PAYMENT_TERM"]).ToString();
                        rt.NOTE = (dt.Rows[i]["NOTE"]).ToString();
                        rt.BANK_ID = dt.Rows[i]["BANK_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["BANK_ID"]);
                        rt.AERB_OR_PNDT = (dt.Rows[i]["AERB_OR_PNDT"]).ToString();
                        rt.SELECT_PRODUCT_IS_NEW = (dt.Rows[i]["SELECT_PRODUCT_IS_NEW"]).ToString();
                        rt.QUOTATION_FOR_SPARE_PART = (dt.Rows[i]["QUOTATION_FOR_SPARE_PART"]).ToString();
                        rt.QUNATITY = (dt.Rows[i]["QUNATITY"]).ToString();
                        rt.PRODUCT_PRICE = (dt.Rows[i]["PRODUCT_PRICE"]).ToString();
                        rt.MODIFY_PRODUCT_PRICE = (dt.Rows[i]["MODIFY_PRODUCT_PRICE"]).ToString();
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                        rt.RECEIPT_FOR = (dt.Rows[i]["RECEIPT_FOR"]).ToString();

                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }

        public static List<QuotationMaster> GetPurchaseOrderList(SearchQuotationParams tb_params)
        {
            cmd = new SqlCommand("Get_PurchaseOrderList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tb_params.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tb_params.PageNo - 1);
            cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tb_params.CUSTOMER_TYPE_ID);
            cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_params.CUSTOMER_ID);
            cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tb_params.CUSTOMER_NAME);
            cmd.Parameters.AddWithValue("@FIRM_NAME", tb_params.FIRM_NAME);
            cmd.Parameters.AddWithValue("@STARTING_DATE", tb_params.STARTING_DATE);
            cmd.Parameters.AddWithValue("@ENDING_DATE", tb_params.ENDING_DATE);
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
                        rt.BANK_ID = dt.Rows[i]["BANK_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["BANK_ID"]);
                        rt.AERB_OR_PNDT = (dt.Rows[i]["AERB_OR_PNDT"]).ToString();
                        rt.CUSTOMER_TYPE_ID = dt.Rows[i]["CUSTOMER_TYPE_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CUSTOMER_TYPE_ID"]);
                        rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"].ToString());
                        rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"]).ToString();
                        rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"]).ToString();
                        rt.EMAIL = (dt.Rows[i]["EMAIL"]).ToString();
                        rt.BILLING_ADDRESS = (dt.Rows[i]["BILLING_ADDRESS"]).ToString();
                        rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.SHIPPING_ADDRESS = (dt.Rows[i]["SHIPPING_ADDRESS"]).ToString();
                        rt.SHIPPING_ZIP_CODE = (dt.Rows[i]["SHIPPING_ZIP_CODE"]).ToString();

                        //rt.STATE_ID = (dt.Rows[i]["STATE_ID"]).ToString();
                        rt.STATE_NAME = (dt.Rows[i]["STATE_NAME"]).ToString();
                        //rt.CITY_ID = (dt.Rows[i]["CITY_ID"]).ToString();
                        rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"]).ToString();

                        //rt.SHIP_STATE_ID = (dt.Rows[i]["SHIP_STATE_ID"]).ToString();
                        rt.SHIP_STATE_NAME = (dt.Rows[i]["SHIP_STATE_NAME"]).ToString();
                        //rt.SHIP_CITY_ID = (dt.Rows[i]["SHIP_CITY_ID"]).ToString();
                        rt.SHIP_CITY_NAME = (dt.Rows[i]["SHIP_CITY_NAME"]).ToString();

                        rt.WARRANTY_IN_DMY = (dt.Rows[i]["WARRANTY_IN_DMY"]).ToString();
                        rt.WARRANTY_PERIOD = Convert.ToInt32(dt.Rows[i]["WARRANTY_PERIOD"]);
                        rt.AMOUNT_WITHOUT_TAX = Convert.ToInt64(dt.Rows[i]["AMOUNT_WITHOUT_TAX"]);
                        rt.TAX_AMOUNT = Convert.ToInt64(dt.Rows[i]["TAX_AMOUNT"]);
                        rt.AMOUNT_WITH_TAX = Convert.ToInt64(dt.Rows[i]["AMOUNT_WITH_TAX"]);
                        rt.AMOUNT_INC_TAX = (dt.Rows[i]["AMOUNT_INC_TAX"]).ToString();
                        rt.IS_SPL_WARRANTY = (dt.Rows[i]["IS_SPL_WARRANTY"]).ToString();

                        rt.TAX_PERCENTAGE = Convert.ToInt32(dt.Rows[i]["TAX_PERCENTAGE"]);
                        rt.PAYMENT_TERM_DETAILS = (dt.Rows[i]["PAYMENT_TERM_DETAILS"]).ToString();
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.FIRM_ID = Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
                        rt.QUOTATION_NO = (dt.Rows[i]["QUOTATION_NO"]).ToString();
                        rt.QUOTATION_FOR = (dt.Rows[i]["QUOTATION_FOR"].ToString());
                        rt.IS_INVOICE_GENERATED = Convert.ToInt32(dt.Rows[i]["IS_INVOICE_GENERATED"]);
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }


        public static QuotationMaster GetQuotationDetailsForUpdate(long quotationID)
        {
            cmd = new SqlCommand("SP_QuotationDetailsForUpdate", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Q_ID", quotationID);
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
            rt = new QuotationMaster();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    try
                    {
                        rt.Q_ID = Convert.ToInt64(dt.Rows[i]["Q_ID"]);
                        //rt.CAT_ID =  Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        //rt.M_ID = Convert.ToInt64(dt.Rows[i]["M_ID"]);
                        //rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
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
                        rt.BANK_ID = dt.Rows[i]["BANK_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["BANK_ID"]);
                        rt.AERB_OR_PNDT = (dt.Rows[i]["AERB_OR_PNDT"]).ToString();
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
                }
            }
            return rt;
        }

        public static List<QuotationMaster> GetCustomerQuotationList(long customerID)
        {
            cmd = new SqlCommand("GetCustomerQuotationList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@ADMIN_ID", 1);
            cmd.Parameters.AddWithValue("@CUSTOMER_ID", customerID);
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
                        rt.BANK_ID = Convert.ToInt64(dt.Rows[i]["BANK_ID"]);
                        rt.AERB_OR_PNDT = (dt.Rows[i]["AERB_OR_PNDT"]).ToString();
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

                        rt.SHIP_STATE_ID = (dt.Rows[i]["SHIP_STATE_ID"]).ToString();
                        rt.SHIP_STATE_NAME = (dt.Rows[i]["SHIP_STATE_NAME"]).ToString();
                        rt.SHIP_CITY_ID = (dt.Rows[i]["SHIP_CITY_ID"]).ToString();
                        rt.SHIP_CITY_NAME = (dt.Rows[i]["SHIP_CITY_NAME"]).ToString();

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
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.FIRM_ID = Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
                        rt.QUOTATION_NO = (dt.Rows[i]["QUOTATION_NO"]).ToString();
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }

        public static string GenerateUniqueCode(GenerateUniqueCodeParams tb_params, long COMPANY_ID)
        {
            cmd = new SqlCommand("SP_GenerateUniqueCode", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@GENERATE_NO_FOR", tb_params.GenerateNoFor); //Quotation / AMC-CMS / Receipt
            cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tb_params.CustomerTypeId); //Null / 1 / 2
            cmd.Parameters.AddWithValue("@COMPANY_ID", COMPANY_ID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            string uniquCode = cmd.ExecuteScalar().ToString();
            con.Close();

            return uniquCode;
        }



        public class GenerateUniqueCodeParams
        {
            public string GenerateNoFor { get; set; }
            public int? CustomerTypeId { get; set; }
        }

    }
}