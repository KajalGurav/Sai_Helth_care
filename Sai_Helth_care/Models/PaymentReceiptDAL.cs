using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using static Sai_Helth_care.Models.QuotationDAL;

namespace Sai_Helth_care.Models
{
    public class PaymentReceiptDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public static int AddUpdatePaymentReceipt(PaymentReceipt tB_admin)
         {
            HttpContext context = HttpContext.Current;
            long id = Convert.ToInt64(context.Session["COMPANY_ID"]);
            try
            {
                cmd = new SqlCommand("InsertUpdatePaymentReceiptDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@R_ID", tB_admin.R_ID);
                cmd.Parameters.AddWithValue("@PAYMENT_RECEIPT_NO", tB_admin.PAYMENT_RECEIPT_NO);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tB_admin.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@FIRM_ID", tB_admin.FIRM_ID);
                cmd.Parameters.AddWithValue("@FIRM_NAME", tB_admin.FIRM_NAME);
                cmd.Parameters.AddWithValue("@Q_ID", tB_admin.Q_ID);
                cmd.Parameters.AddWithValue("@PAYMENT_REF_NO", tB_admin.PAYMENT_REF_NO);
                cmd.Parameters.AddWithValue("@PAYMENT_RECEIPT_TYPE", tB_admin.PAYMENT_RECEIPT_TYPE);
                cmd.Parameters.AddWithValue("@PAYMENT_TYPE", tB_admin.PAYMENT_TYPE);
                cmd.Parameters.AddWithValue("@RECIEPT_FOR", tB_admin.RECIEPT_FOR);
                cmd.Parameters.AddWithValue("@PAYMENT_AMOUNT", tB_admin.PAYMENT_AMOUNT);
                cmd.Parameters.AddWithValue("@AMOUNT_RECEIVED", tB_admin.AMOUNT_RECEIVED);
                cmd.Parameters.AddWithValue("@AMOUNT_REMAINING", tB_admin.AMOUNT_REMAINING);
                cmd.Parameters.AddWithValue("@TXN_ID", tB_admin.TXN_ID);
                cmd.Parameters.AddWithValue("@Operation", tB_admin.Operation);
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);
                cmd.Parameters.AddWithValue("@CHEQUE_DATE", tB_admin.CHEQUE_DATE);
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

        public static int GetPaymentReceiptTotalRecordCount(SearchQuotationParams tb_params)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("GetPaymentReceiptTotalRecordCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tb_params.CUSTOMER_TYPE_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_params.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tb_params.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@FIRM_NAME", tb_params.FIRM_NAME);
                cmd.Parameters.AddWithValue("@STARTING_DATE", tb_params.STARTING_DATE);
                cmd.Parameters.AddWithValue("@ENDING_DATE", tb_params.ENDING_DATE);
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
        public static List<PaymentReceipt> GetPaymentReceiptList(SearchQuotationParams tb_params)
        {
           
            cmd = new SqlCommand("SP_GetPaymentReceiptList", con);
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
                        rt.CUSTOMER_TYPE_ID = dt.Rows[i]["CUSTOMER_TYPE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["CUSTOMER_TYPE_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        rt.FIRM_ID = dt.Rows[i]["FIRM_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
                        rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"]).ToString();
                        rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"]).ToString();
                        rt.FIRM_ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.STATE_ID = dt.Rows[i]["STATE_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["STATE_ID"]);
                        rt.STATE_NAME = (dt.Rows[i]["STATE_NAME"]).ToString();
                        rt.CITY_ID = dt.Rows[i]["CITY_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CITY_ID"]);
                        rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"]).ToString();
                        rt.PAYMENT_REF_NO = (dt.Rows[i]["PAYMENT_REF_NO"]).ToString();
                        rt.BANK_ID = dt.Rows[i]["BANK_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["BANK_ID"]);
                        rt.PAYMENT_RECEIPT_TYPE = (dt.Rows[i]["PAYMENT_RECEIPT_TYPE"]).ToString();
                        rt.PAYMENT_TYPE = (dt.Rows[i]["PAYMENT_TYPE"]).ToString();
                        rt.RECIEPT_FOR = (dt.Rows[i]["RECIEPT_FOR"]).ToString(); //Remarks and Note are Same for Quotation and PO
                        rt.PAYMENT_AMOUNT = Convert.ToDecimal(dt.Rows[i]["PAYMENT_AMOUNT"]);
                        rt.AMOUNT_RECEIVED = Convert.ToDecimal(dt.Rows[i]["AMOUNT_RECEIVED"]);
                        rt.AMOUNT_REMAINING = Convert.ToDecimal(dt.Rows[i]["AMOUNT_REMAINING"]);
                        rt.TXN_ID = (dt.Rows[i]["TXN_ID"]).ToString();
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        rt.RECEIPT_GEN_DATE = (dt.Rows[i]["RECEIPT_GEN_DATE"]).ToString();
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }

        public static PaymentReceipt GetPaymentReceiptDetailsForUpdate(long receiptID)
        {
            cmd = new SqlCommand("SP_GetPaymentReceiptDetailsForUpdate", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@R_ID", receiptID);
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
            rt = new PaymentReceipt();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    try
                    {
                        rt.R_ID = Convert.ToInt64(dt.Rows[i]["R_ID"]);
                        rt.PAYMENT_RECEIPT_NO = Convert.ToString(dt.Rows[i]["PAYMENT_RECEIPT_NO"]);
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.CUSTOMER_TYPE_ID = dt.Rows[i]["CUSTOMER_TYPE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["CUSTOMER_TYPE_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        rt.FIRM_ID = dt.Rows[i]["FIRM_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
                        rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"]).ToString();
                        rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"]).ToString();
                        rt.FIRM_ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.STATE_ID = dt.Rows[i]["STATE_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["STATE_ID"]);
                        rt.STATE_NAME = (dt.Rows[i]["STATE_NAME"]).ToString();
                        rt.CITY_ID = dt.Rows[i]["CITY_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CITY_ID"]);
                        rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"]).ToString();
                        rt.PAYMENT_REF_NO = (dt.Rows[i]["PAYMENT_REF_NO"]).ToString();
                        rt.PAYMENT_RECEIPT_TYPE = (dt.Rows[i]["PAYMENT_RECEIPT_TYPE"]).ToString();
                        rt.PAYMENT_TYPE = (dt.Rows[i]["PAYMENT_TYPE"]).ToString();
                        rt.RECIEPT_FOR = (dt.Rows[i]["RECIEPT_FOR"]).ToString(); //Remarks and Note are Same for Quotation and PO
                        rt.PAYMENT_AMOUNT = Convert.ToDecimal(dt.Rows[i]["PAYMENT_AMOUNT"]);
                        rt.AMOUNT_RECEIVED = Convert.ToDecimal(dt.Rows[i]["AMOUNT_RECEIVED"]);
                        rt.AMOUNT_REMAINING = Convert.ToDecimal(dt.Rows[i]["AMOUNT_REMAINING"]);
                        rt.TXN_ID = (dt.Rows[i]["TXN_ID"]).ToString();
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        rt.RECEIPT_GEN_DATE = (dt.Rows[i]["RECEIPT_GEN_DATE"]).ToString();
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
            return rt;
        }
    }
}