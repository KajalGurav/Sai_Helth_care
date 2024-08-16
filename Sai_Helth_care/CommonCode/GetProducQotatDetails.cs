using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Web;
using Sai_Helth_care.Models;
using System.Web.Mvc;
using System.Web.UI.HtmlControls;
using System.Text;
using System.Text.RegularExpressions;

namespace Sai_Helth_care.CommonCode
{
    public class GetProducQotatDetails
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        static DataSet ds;

        public static List<ProductQuotaion> getdata(long? Q_ID)
        {
            List<ProductQuotaion> FinalreportList = new List<ProductQuotaion>();
            ProductQuotaion rt;
            //long id = Convert.ToInt32(Session["Q_ID"]);
            long id = Convert.ToInt64(Q_ID);
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
                        rt = new ProductQuotaion();
                        try
                        {
                            rt.QUOTATION_ID = Convert.ToInt64(dt.Rows[i]["QUOTATION_ID"]);
                            rt.AccID = Convert.ToInt64(dt.Rows[i]["AccID"]);
                            rt.PRODUCTNAME = (dt.Rows[i]["PRODUCTNAME"].ToString());
                            rt.SPARE_PART = (dt.Rows[i]["SPARE_PART"].ToString());
                            rt.QUANTITY = (dt.Rows[i]["QUANTITY"].ToString());
                            rt.PRODUCTPRICE = (dt.Rows[i]["PRODUCTPRICE"].ToString());
                            rt.ACCPRICE = (dt.Rows[i]["ACCPRICE"].ToString());
                            rt.IS_WITH_STANDARD_ACC = (bool)(dt.Rows[i]["IS_WITH_STANDARD_ACC"]);
                            rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                            rt.M_ID = dt.Rows[i]["M_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["M_ID"]);
                            rt.M_NAME = (dt.Rows[i]["M_NAME"].ToString());
                            rt.CAT_ID = dt.Rows[i]["CAT_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                            rt.CAT_NAME = (dt.Rows[i]["CAT_NAME"].ToString());
                            rt.PRODUCT_HSN_CODE = (dt.Rows[i]["PRODUCT_HSN_CODE"].ToString());
                            rt.HSN_CODE = (dt.Rows[i]["HSN_CODE"].ToString());
                            rt.QUOTATION_TYPE = (dt.Rows[i]["QUOTATION_TYPE"].ToString());
                            rt.CUSTOMER_TYPE_ID = dt.Rows[i]["CUSTOMER_TYPE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["CUSTOMER_TYPE_ID"]);
                            rt.AMOUNT_WITHOUT_TAX = dt.Rows[i]["AMOUNT_WITHOUT_TAX"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["AMOUNT_WITHOUT_TAX"]);
                            rt.TAX_AMOUNT = dt.Rows[i]["TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["TAX_AMOUNT"]);
                            rt.AMOUNT_WITH_TAX = dt.Rows[i]["AMOUNT_WITH_TAX"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["AMOUNT_WITH_TAX"]);
                            rt.TAX_PERCENTAGE = dt.Rows[i]["TAX_PERCENTAGE"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["TAX_PERCENTAGE"]);
                            rt.AMOUNT_INC_TAX = dt.Rows[i]["AMOUNT_INC_TAX"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["AMOUNT_INC_TAX"]);
                            FinalreportList.Add(rt);

                        }
                        catch (Exception ex)
                        {
                        }

                    }
                }
            }
            return FinalreportList;
        }

        public static List<CompanyBankMaster> GetBankDetailsById(long companyid,long bankid)
        {
            cmd = new SqlCommand("SP_Get_CompanyBankDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@companyid", companyid);
            cmd.Parameters.AddWithValue("@bankid", bankid);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            CompanyBankMaster rt;
            List<CompanyBankMaster> FinalreportList = new List<CompanyBankMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new CompanyBankMaster();
                    try
                    {
                        rt.B_ID = Convert.ToInt64(dt.Rows[i]["B_ID"]);
                        rt.COMPANY_ID = Convert.ToInt64(dt.Rows[i]["COMPANY_ID"]);
                        rt.COMPANY_NAME = dt.Rows[i]["COMPANY_NAME"].ToString();
                        rt.COMPANY_REG_ADDRESS = dt.Rows[i]["COMPANY_REG_ADDRESS"].ToString();
                        rt.COMPANY_COR_ADDRESS = dt.Rows[i]["COMPANY_COR_ADDRESS"].ToString();
                        rt.ZIP_CODE = dt.Rows[i]["ZIP_CODE"].ToString();
                        rt.BANK_NAME = dt.Rows[i]["BANK_NAME"].ToString();
                        rt.IFSC_CODE = dt.Rows[i]["IFSC_CODE"].ToString();
                        rt.ACC_NO = dt.Rows[i]["ACC_NO"].ToString();
                        rt.GST_NO = dt.Rows[i]["GST_NO"].ToString();
                        rt.PAN_NO = dt.Rows[i]["PAN_NO"].ToString();
                        rt.ACC_HOLDER_NAME = dt.Rows[i]["ACC_HOLDER_NAME"].ToString();
                        rt.BRANCH_NAME = dt.Rows[i]["BRANCH_NAME"].ToString();
                        rt.STATUS = dt.Rows[i]["STATUS"].ToString();
                        rt.REG_DATE = dt.Rows[i]["REG_DATE"].ToString();
                        rt.BANK_AND_ACCNO = dt.Rows[i]["BANK_AND_ACCNO"].ToString();
                        rt.EMAIL_ID = dt.Rows[i]["EMAIL_ID"].ToString();
                        rt.MOBILE_NO = dt.Rows[i]["MOBILE_NO"].ToString();
                        rt.COMPANY_LETTERHEAD = dt.Rows[i]["COMPANY_LETTERHEAD"].ToString();
                        rt.COMPANY_SEAL = dt.Rows[i]["COMPANY_SEAL"].ToString();
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            var _Monthlyreport = FinalreportList;
            return _Monthlyreport;
        }

        public static List<MProductQuotaion> getdataMindray(long MQ_ID)
        {
            List<MProductQuotaion> FinalreportList = new List<MProductQuotaion>();
            MProductQuotaion rt;
            //long id = Convert.ToInt32(Session["Q_ID"]);
            long id = Convert.ToInt64(MQ_ID);
            cmd = new SqlCommand("Get_Tb_MQuotationProductDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@MQ_ID", id);
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
                        rt = new MProductQuotaion();
                        try
                        {
                            rt.QUOTATION_ID = Convert.ToInt64(dt.Rows[i]["QUOTATION_ID"]);
                            rt.AccID = Convert.ToInt64(dt.Rows[i]["AccID"]);
                            rt.PRODUCTNAME = (dt.Rows[i]["PRODUCTNAME"].ToString());
                            rt.PROBE_NAME = (dt.Rows[i]["PROBE_NAME"].ToString());
                            rt.QUANTITY = (dt.Rows[i]["QUANTITY"].ToString());
                            rt.PRODUCTPRICE = (dt.Rows[i]["PRODUCTPRICE"].ToString());
                            rt.ACCPRICE = (dt.Rows[i]["ACCPRICE"].ToString());
                            rt.IS_WITH_PROBE_ACC = (bool)(dt.Rows[i]["IS_WITH_PROBE_ACC"]);
                            rt.MP_ID = Convert.ToInt64(dt.Rows[i]["MP_ID"]);
                            rt.M_ID = dt.Rows[i]["M_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["M_ID"]);
                            rt.M_NAME = dt.Rows[i]["M_NAME"].ToString();
                            rt.PRODUCT_IMAGE = dt.Rows[i]["PRODUCT_IMAGE"].ToString();
                            //var data = HttpUtility.HtmlEncode(dt.Rows[i]["DESCRIPTION"]);
                            //rt.DESCRIPTION = data;
                            rt.DESCRIPTION = dt.Rows[i]["DESCRIPTION"].ToString();
                            rt.CONFIGURATION = dt.Rows[i]["CONFIGURATION"].ToString();
                            rt.CAT_ID = dt.Rows[i]["CAT_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                            rt.CAT_NAME = (dt.Rows[i]["CAT_NAME"].ToString());
                            //rt.HSN_CODE = (dt.Rows[i]["HSN_CODE"].ToString());
                            rt.PRODUCT_HSN_CODE = (dt.Rows[i]["PRODUCT_HSN_CODE"].ToString());
                            rt.QUOTATION_TYPE = (dt.Rows[i]["QUOTATION_TYPE"].ToString());
                            rt.CUSTOMER_TYPE_ID = dt.Rows[i]["CUSTOMER_TYPE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["CUSTOMER_TYPE_ID"]);
                            rt.AMOUNT_WITHOUT_TAX = dt.Rows[i]["AMOUNT_WITHOUT_TAX"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["AMOUNT_WITHOUT_TAX"]);
                            rt.TAX_AMOUNT = dt.Rows[i]["TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["TAX_AMOUNT"]);
                            rt.AMOUNT_WITH_TAX = dt.Rows[i]["AMOUNT_WITH_TAX"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["AMOUNT_WITH_TAX"]);
                            rt.TAX_PERCENTAGE = dt.Rows[i]["TAX_PERCENTAGE"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["TAX_PERCENTAGE"]);
                            rt.AMOUNT_INC_TAX = dt.Rows[i]["AMOUNT_INC_TAX"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["AMOUNT_INC_TAX"]);
                            FinalreportList.Add(rt);

                        }
                        catch (Exception ex)
                        {
                        }

                    }
                }
            }
            return FinalreportList;
        }

        public static List<ProductQuotaion> getdataQuantity(int Q_ID)
        {
            List<ProductQuotaion> FinalreportList = new List<ProductQuotaion>();
            ProductQuotaion rt;
            //long id = Convert.ToInt32(Session["Q_ID"]);
            long id = Convert.ToInt32(Q_ID);
            cmd = new SqlCommand("Get_Tb_QuotationProductQuantityDetails", con);
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
                        rt = new ProductQuotaion();
                        try
                        {
                            rt.QUOTATION_ID = Convert.ToInt64(dt.Rows[i]["QUOTATION_ID"]);
                            rt.QuantID = Convert.ToInt64(dt.Rows[i]["QuantID"]);
                            rt.PRODUCTNAME = (dt.Rows[i]["PRODUCTNAME"].ToString());
                            rt.QUANTITY = (dt.Rows[i]["QUANTITY"].ToString());
                            rt.PRODUCTPRICE = (dt.Rows[i]["PRODUCTPRICE"].ToString());
                            rt.IS_WITH_STANDARD_ACC = (bool)(dt.Rows[i]["IS_WITH_STANDARD_ACC"]);
                            rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                            rt.M_ID = Convert.ToInt64(dt.Rows[i]["M_ID"]);
                            rt.M_NAME = (dt.Rows[i]["M_NAME"].ToString());
                            //rt.M_NAME = (dt.Rows[i]["AccQuantity"].ToString());
                            //rt.M_NAME = (dt.Rows[i]["StdAccID"].ToString());
                            FinalreportList.Add(rt);

                        }
                        catch (Exception ex)
                        {
                        }

                    }
                }
            }
            return FinalreportList;
        }

        public static List<ProductQuotaion> getdataSparePrice(int Q_ID)
        {
            List<ProductQuotaion> FinalreportList = new List<ProductQuotaion>();
            ProductQuotaion rt;
            //long id = Convert.ToInt32(Session["Q_ID"]);
            long id = Convert.ToInt32(Q_ID);
            cmd = new SqlCommand("Get_Tb_QuotationProductPriceDetails", con);
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
                        rt = new ProductQuotaion();
                        try
                        {
                            rt.QUOTATION_ID = Convert.ToInt64(dt.Rows[i]["QUOTATION_ID"]);
                            rt.PriceID = Convert.ToInt64(dt.Rows[i]["PriceID"]);
                            rt.PRODUCTNAME = (dt.Rows[i]["PRODUCTNAME"].ToString());
                            rt.QUANTITY = (dt.Rows[i]["QUANTITY"].ToString());
                            rt.PRODUCTPRICE = (dt.Rows[i]["PRODUCTPRICE"].ToString());
                            rt.IS_WITH_STANDARD_ACC = (bool)(dt.Rows[i]["IS_WITH_STANDARD_ACC"]);
                            rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                            rt.M_ID = Convert.ToInt64(dt.Rows[i]["M_ID"]);
                            rt.M_NAME = (dt.Rows[i]["M_NAME"].ToString());
                            //rt.M_NAME = (dt.Rows[i]["AccQuantity"].ToString());
                            //rt.M_NAME = (dt.Rows[i]["StdAccID"].ToString());
                            FinalreportList.Add(rt);

                        }
                        catch (Exception ex)
                        {
                        }

                    }
                }
            }
            return FinalreportList;
        }

        public static List<MProductQuotaion> getdataMQuantity(int MQ_ID)
        {
            List<MProductQuotaion> FinalreportList = new List<MProductQuotaion>();
            MProductQuotaion rt;
            //long id = Convert.ToInt32(Session["Q_ID"]);
            long id = Convert.ToInt32(MQ_ID);
            cmd = new SqlCommand("Get_Tb_MQuotationProbeQuantityDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@MQ_ID", id);
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
                        rt = new MProductQuotaion();
                        try
                        {
                            rt.QUOTATION_ID = Convert.ToInt64(dt.Rows[i]["QUOTATION_ID"]);
                            rt.QuantID = Convert.ToInt64(dt.Rows[i]["QuantID"]);
                            rt.PRODUCTNAME = (dt.Rows[i]["PRODUCTNAME"].ToString());
                            rt.QUANTITY = (dt.Rows[i]["QUANTITY"].ToString());
                            rt.PRODUCTPRICE = (dt.Rows[i]["PRODUCTPRICE"].ToString());
                            rt.IS_WITH_PROBE_ACC = (bool)(dt.Rows[i]["IS_WITH_PROBE_ACC"]);
                            rt.MP_ID = Convert.ToInt64(dt.Rows[i]["MP_ID"]);
                            //rt.M_NAME = (dt.Rows[i]["AccQuantity"].ToString());
                            //rt.M_NAME = (dt.Rows[i]["StdAccID"].ToString());
                            FinalreportList.Add(rt);

                        }
                        catch (Exception ex)
                        {
                        }

                    }
                }
            }
            return FinalreportList;
        }

        public static List<MProductQuotaion> getdataProbePrice(int MQ_ID)
        {
            List<MProductQuotaion> FinalreportList = new List<MProductQuotaion>();
            MProductQuotaion rt;
            //long id = Convert.ToInt32(Session["Q_ID"]);
            long id = Convert.ToInt32(MQ_ID);
            cmd = new SqlCommand("Get_Tb_MindrayQuotProductPriceDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@MQ_ID", id);
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
                        rt = new MProductQuotaion();
                        try
                        {
                            rt.QUOTATION_ID = Convert.ToInt64(dt.Rows[i]["QUOTATION_ID"]);
                            rt.PriceID = Convert.ToInt64(dt.Rows[i]["PriceID"]);
                            rt.PRODUCTNAME = (dt.Rows[i]["PRODUCTNAME"].ToString());
                            rt.QUANTITY = (dt.Rows[i]["QUANTITY"].ToString());
                            rt.PRODUCTPRICE = (dt.Rows[i]["PRODUCTPRICE"].ToString());
                            rt.IS_WITH_PROBE_ACC = (bool)(dt.Rows[i]["IS_WITH_PROBE_ACC"]);
                            rt.MP_ID = Convert.ToInt64(dt.Rows[i]["MP_ID"]);
                            rt.M_NAME = (dt.Rows[i]["M_NAME"]).ToString();
                            FinalreportList.Add(rt);

                        }
                        catch (Exception ex)
                        {
                        }

                    }
                }
            }
            return FinalreportList;
        }

        public static List<ProductQuotaion> getdataStdAcc(int Q_ID)
        {
            List<ProductQuotaion> FinalreportList = new List<ProductQuotaion>();
            ProductQuotaion rt;
            //long id = Convert.ToInt32(Session["Q_ID"]);
            long id = Convert.ToInt32(Q_ID);
            cmd = new SqlCommand("Get_Tb_QuotationProductStdAccDetails", con);
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
                        rt = new ProductQuotaion();
                        try
                        {
                            rt.QUOTATION_ID = Convert.ToInt64(dt.Rows[i]["QUOTATION_ID"]);
                            rt.StdAccID = Convert.ToInt64(dt.Rows[i]["StdAccID"]);
                            rt.PRODUCTNAME = (dt.Rows[i]["PRODUCTNAME"].ToString());
                            rt.QUANTITY = (dt.Rows[i]["QUANTITY"].ToString());
                            rt.PRODUCTPRICE = (dt.Rows[i]["PRODUCTPRICE"].ToString());
                            rt.IS_WITH_STANDARD_ACC = (bool)(dt.Rows[i]["IS_WITH_STANDARD_ACC"]);
                            rt.STD_ACC_NAME = (dt.Rows[i]["STD_ACC_NAME"].ToString());
                            rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                            rt.M_ID = Convert.ToInt64(dt.Rows[i]["M_ID"]);
                            rt.M_NAME = (dt.Rows[i]["M_NAME"].ToString());
                            rt.PRODUCT_HSN_CODE = (dt.Rows[i]["PRODUCT_HSN_CODE"].ToString());
                            rt.HSN_CODE = (dt.Rows[i]["HSN_CODE"].ToString());
                            //rt.M_NAME = (dt.Rows[i]["StdAccID"].ToString());
                            FinalreportList.Add(rt);

                        }
                        catch (Exception ex)
                        {
                        }

                    }
                }
            }
            return FinalreportList;
        }

        public static List<ProductQuotaion> getdataStdQuantity(int Q_ID)
        {
            List<ProductQuotaion> FinalreportList = new List<ProductQuotaion>();
            ProductQuotaion rt;
            //long id = Convert.ToInt32(Session["Q_ID"]);
            long id = Convert.ToInt32(Q_ID);
            cmd = new SqlCommand("Get_Tb_QuotationSTDAccQuantityDetails", con);
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
                        rt = new ProductQuotaion();
                        try
                        {
                            rt.QUOTATION_ID = Convert.ToInt64(dt.Rows[i]["QUOTATION_ID"]);
                            rt.StdQuantID = Convert.ToInt64(dt.Rows[i]["StdQuantID"]);
                            rt.PRODUCTNAME = (dt.Rows[i]["PRODUCTNAME"].ToString());
                            rt.QUANTITY = (dt.Rows[i]["QUANTITY"].ToString());
                            rt.PRODUCTPRICE = (dt.Rows[i]["PRODUCTPRICE"].ToString());
                            rt.IS_WITH_STANDARD_ACC = (bool)(dt.Rows[i]["IS_WITH_STANDARD_ACC"]);
                            rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                            rt.M_ID = Convert.ToInt64(dt.Rows[i]["M_ID"]);
                            rt.M_NAME = (dt.Rows[i]["M_NAME"].ToString());
                            //rt.M_NAME = (dt.Rows[i]["AccQuantity"].ToString());
                            //rt.M_NAME = (dt.Rows[i]["StdAccID"].ToString());
                            FinalreportList.Add(rt);

                        }
                        catch (Exception ex)
                        {
                        }

                    }
                }
            }
            return FinalreportList;
        }

        public static List<PaymentTypeProdDetails> getPaymentTypeData(string PTYPE,string ID, long AMC_CMC_ID)
        {
            List<PaymentTypeProdDetails> FinalreportList = new List<PaymentTypeProdDetails>();
            PaymentTypeProdDetails rt;
            //long id = Convert.ToInt32(Session["Q_ID"]);
            //long id = Convert.ToInt64(ID);
            cmd = new SqlCommand("Get_Tb_PaymentTypeProductDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PTYPE", PTYPE);
            cmd.Parameters.AddWithValue("@ID", ID);
            cmd.Parameters.AddWithValue("@AMC_CMC_ID", AMC_CMC_ID);
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
                        rt = new PaymentTypeProdDetails();
                        try
                        {
                            rt.PTYPE = PTYPE;
                            rt.ID=ID;
                            rt.PRODUCTNAME = (dt.Rows[i]["PRODUCT_NAME"].ToString());
                            rt.TOTAL_AMOUNT = Convert.ToInt64(dt.Rows[i]["TOTAL_AMOUNT"]);
                            rt.AMOUNT_RECEIVED = Convert.ToInt64(dt.Rows[i]["AMOUNT_RECEIVED"]);
                            rt.AMOUNT_REMAINING = Convert.ToInt64(dt.Rows[i]["AMOUNT_REMAINING"]);
                            FinalreportList.Add(rt);

                        }
                        catch (Exception ex)
                        {
                        }

                    }
                }
            }
            return FinalreportList;
        }

        public static List<LatestRecordByType> GetLatestRecordByType(string idType)
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
            return _Monthlyreport;
        }
    }
}