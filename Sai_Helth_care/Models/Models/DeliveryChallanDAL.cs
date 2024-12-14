using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using static Sai_Helth_care.Models.QuotationDAL;
using System.Web.Mvc;

namespace Sai_Helth_care.Models
{
    public class DeliveryChallanDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        static DataSet ds;

        public static int AddUpdateDeliveryChallan(DeliveryChallan tB_admin)
        {
            try
            {
                HttpContext context = HttpContext.Current;
                long id = Convert.ToInt64(context.Session["COMPANY_ID"]);

                cmd = new SqlCommand("InsertUpdateDeliveryChallan", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@DC_ID", tB_admin.DC_ID);
                cmd.Parameters.AddWithValue("@DC_NUMBER", tB_admin.DC_NUMBER);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.Customer_ID);
                cmd.Parameters.AddWithValue("@DC_DATE", tB_admin.DC_DATE);
                cmd.Parameters.AddWithValue("@P_ID", tB_admin.P_ID);
                cmd.Parameters.AddWithValue("@F_ID", tB_admin.F_ID);
                cmd.Parameters.AddWithValue("@QUANTITY", tB_admin.QUANTITY);
                cmd.Parameters.AddWithValue("@PRICE", tB_admin.PRICE);
                cmd.Parameters.AddWithValue("@IS_DC_FOR_SPAREPARTS", tB_admin.IS_DC_FOR_SPAREPARTS);
                cmd.Parameters.AddWithValue("@TOTAL_AMOUNT", tB_admin.TOTAL_AMOUNT);
                cmd.Parameters.AddWithValue("@INC_ALL_TAXES", tB_admin.INC_ALL_TAXES);
                cmd.Parameters.AddWithValue("@GST", tB_admin.GST);
                cmd.Parameters.AddWithValue("@TAX_AMOUNT", tB_admin.TAX_AMOUNT);
                cmd.Parameters.AddWithValue("@AMOUNT_INC_TAX", tB_admin.AMOUNT_INC_TAX);
                cmd.Parameters.AddWithValue("@MATERIAL_ID", tB_admin.MATERIAL_ID);
                cmd.Parameters.AddWithValue("@DC_CLOSE_DATE", tB_admin.DC_CLOSE_DATE);
                cmd.Parameters.AddWithValue("@DCS_ID", tB_admin.DCS_ID);
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID);
                cmd.Parameters.AddWithValue("@COMMENTS", tB_admin.COMMENTS);
                cmd.Parameters.AddWithValue("@ACTION", tB_admin.ACTION);
                cmd.Parameters.AddWithValue("@ADMIN_ID", tB_admin.ADMIN_ID);
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);
                cmd.Parameters.AddWithValue("@PRODUCT_SERIAL_NO", tB_admin.PRODUCT_SERIAL_NO);
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

        public static int GetDeliveryChallanTotalRecordCount(SearchQuotationParams tb_params)
        {
            int i = 0;
            HttpContext context = HttpContext.Current;
            long id = Convert.ToInt64(context.Session["COMPANY_ID"]);
            try
            {
                cmd = new SqlCommand("GetDeliveryChallanTotalRecordCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tb_params.CUSTOMER_TYPE_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_params.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tb_params.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@FIRM_NAME", tb_params.FIRM_NAME);
                cmd.Parameters.AddWithValue("@STARTING_DATE", tb_params.STARTING_DATE);
                cmd.Parameters.AddWithValue("@ENDING_DATE", tb_params.ENDING_DATE);
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
        public static List<DeliveryChallan> GetDeliveryChallanList(SearchQuotationParams tb_params)
        {
            HttpContext context = HttpContext.Current;
            long id = Convert.ToInt64(context.Session["COMPANY_ID"]);

            cmd = new SqlCommand("SP_GetDeliveryChallanList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tb_params.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tb_params.PageNo - 1);
            cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tb_params.CUSTOMER_TYPE_ID);
            cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_params.CUSTOMER_ID);
            cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tb_params.CUSTOMER_NAME);
            cmd.Parameters.AddWithValue("@FIRM_NAME", tb_params.FIRM_NAME);
            cmd.Parameters.AddWithValue("@STARTING_DATE", tb_params.STARTING_DATE);
            cmd.Parameters.AddWithValue("@ENDING_DATE", tb_params.ENDING_DATE);
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
            DeliveryChallan rt;
            List<DeliveryChallan> FinalreportList = new List<DeliveryChallan>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new DeliveryChallan();
                    try
                    {
                        rt.DC_ID = Convert.ToInt32(dt.Rows[i]["DC_ID"]);
                        rt.DC_NUMBER = Convert.ToString(dt.Rows[i]["DC_NUMBER"]);
                        rt.Customer_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"]).ToString();
                        rt.CAT_NAME = (dt.Rows[i]["CAT_NAME"]).ToString();
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"]).ToString();
                        rt.DC_DATE = (dt.Rows[i]["DC_DATE"]).ToString();
                        rt.MATERIAL_NAME = (dt.Rows[i]["MATERIAL_NAME"]).ToString();
                        rt.STATUS_NAME = (dt.Rows[i]["STATUS_NAME"]).ToString();
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }

        public static DeliveryChallan GetDeliveryChallanForUpdate(long dcID)
        {
            cmd = new SqlCommand("SP_GetDeliveryChallanDetailsForUpdate", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@DC_ID", dcID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            DeliveryChallan rt;
            rt = new DeliveryChallan();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    try
                    {
                        rt.DC_ID = Convert.ToInt32(dt.Rows[i]["DC_ID"]);
                        rt.DC_NUMBER = Convert.ToString(dt.Rows[i]["DC_NUMBER"]);
                        rt.Customer_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.DC_DATE = (dt.Rows[i]["DC_DATE"]).ToString(); ;
                        rt.P_ID = dt.Rows[i]["P_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.CAT_ID = dt.Rows[i]["CAT_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        rt.M_ID = dt.Rows[i]["M_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["M_ID"]);
                        rt.F_ID = dt.Rows[i]["F_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["F_ID"]);
                        rt.QUANTITY = dt.Rows[i]["QUANTITY"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["QUANTITY"]);
                        rt.PRICE = Convert.ToDecimal(dt.Rows[i]["PRICE"]);
                        rt.IS_DC_FOR_SPAREPARTS = dt.Rows[i]["IS_DC_FOR_SPAREPARTS"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["IS_DC_FOR_SPAREPARTS"]);
                        rt.TOTAL_AMOUNT = Convert.ToDecimal(dt.Rows[i]["TOTAL_AMOUNT"]);
                        rt.INC_ALL_TAXES = Convert.ToInt32(dt.Rows[i]["INC_ALL_TAXES"]);
                        rt.GST = dt.Rows[i]["GST"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["GST"]);
                        rt.TAX_AMOUNT = dt.Rows[i]["TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["TAX_AMOUNT"]);
                        rt.AMOUNT_INC_TAX = dt.Rows[i]["AMOUNT_INC_TAX"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["AMOUNT_INC_TAX"]);
                        rt.MATERIAL_ID = dt.Rows[i]["MATERIAL_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["MATERIAL_ID"]);
                        rt.DCS_ID = dt.Rows[i]["DCS_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["DCS_ID"]);
                        rt.EMP_ID = dt.Rows[i]["EMP_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["EMP_ID"]);
                        rt.COMMENTS = (dt.Rows[i]["COMMENTS"]).ToString();
                        rt.DC_CLOSE_DATE = dt.Rows[i]["DC_CLOSE_DATE"] is DBNull ? (string)null : (dt.Rows[i]["DC_CLOSE_DATE"]).ToString();
                        rt.PRODUCT_SERIAL_NO = (dt.Rows[i]["PRODUCT_SERIAL_NO"]).ToString(); ;
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
            return rt;
        }

        public static PrintDeliveryChallan GetDeliveryChallanForPrint(long dcID)
        {
            cmd = new SqlCommand("GetDeliveryChallanPrintDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@DC_ID", dcID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            ds = new DataSet();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(ds);
            DataTable dt_DC = new DataTable();
            dt_DC = ds.Tables[0];

            DataTable dt_Product = new DataTable();
            dt_Product = ds.Tables[1];

            DataTable dt_ProductAccessories = new DataTable();
            dt_ProductAccessories = ds.Tables[2];

            DataTable dt_ProductSpareParts = new DataTable();
            dt_ProductSpareParts = ds.Tables[3];


            con.Close();
            PrintDeliveryChallan rt;
            rt = new PrintDeliveryChallan();

            if (dt_DC != null)
            {
                for (int i = 0; i < dt_DC.Rows.Count; i++)
                {
                    try
                    {
                        rt.DC_ID = Convert.ToInt32(dt_DC.Rows[i]["DC_ID"]);
                        rt.DC_NUMBER = Convert.ToString(dt_DC.Rows[i]["DC_NUMBER"]);
                        rt.DC_DATE = (dt_DC.Rows[i]["DC_DATE"]).ToString();
                        rt.GSTIN_NUMBER = (dt_DC.Rows[i]["GSTIN_NUMBER"]).ToString();
                        rt.CUSTOMER_NAME = (dt_DC.Rows[i]["CUSTOMER_NAME"]).ToString();
                        rt.CUSTOMER_ADDRESS = (dt_DC.Rows[i]["CUSTOMER_ADDRESS"]).ToString();
                        rt.ZIP_CODE = (dt_DC.Rows[i]["ZIP_CODE"]).ToString();
                        rt.ProductList = GetDCProducts(dt_Product, dt_ProductAccessories, dt_ProductSpareParts);
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
            return rt;
        }

        public static List<DCProducts> GetDCProducts(DataTable dt_Product, DataTable dt_ProductAccessories, DataTable dt_ProductSpareParts)
        {
            DCProducts rt;
            List<DCProducts> FinalreportList = new List<DCProducts>();
            if (dt_Product != null)
            {
                for (int i = 0; i < dt_Product.Rows.Count; i++)
                {
                    rt = new DCProducts();
                    try
                    {
                        rt.P_ID = Convert.ToInt32(dt_Product.Rows[i]["P_ID"]);
                        rt.PRODUCT_NAME = Convert.ToString(dt_Product.Rows[i]["PRODUCT_NAME"]);
                        rt.PRODUCT_SERIAL_NO = Convert.ToString(dt_Product.Rows[i]["PRODUCT_SERIAL_NO"]);
                        rt.M_NAME = Convert.ToString(dt_Product.Rows[i]["M_NAME"]);
                        rt.QUANTITY = dt_Product.Rows[i]["QUANTITY"] is DBNull ? (int?)null : Convert.ToInt32(dt_Product.Rows[i]["QUANTITY"]);
                        rt.PRICE = dt_Product.Rows[i]["PRICE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_Product.Rows[i]["PRICE"]);
                        rt.TOTAL_ACCESSORIES_COUNT = Convert.ToInt32(dt_Product.Rows[i]["TOTAL_ACCESSORIES_COUNT"]);
                        rt.TOTAL_SPAREPART_COUNT = Convert.ToInt32(dt_Product.Rows[i]["TOTAL_SPAREPART_COUNT"]);
                        rt.AccessoriesList = GetDCProductAccessories(rt.P_ID, dt_ProductAccessories);
                        rt.SparePartsList = GetDCProductSpareParts(rt.P_ID, dt_ProductSpareParts);
                        rt.COMMENTS = Convert.ToString(dt_Product.Rows[i]["COMMENTS"]);
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }
        public static List<DCProductAccessories> GetDCProductAccessories(int P_ID, DataTable dt_ProductAccessories)
        {
            DCProductAccessories rt;
            List<DCProductAccessories> FinalreportList = new List<DCProductAccessories>();
            if (dt_ProductAccessories != null)
            {
                for (int i = 0; i < dt_ProductAccessories.Rows.Count; i++)
                {
                    rt = new DCProductAccessories();
                    try
                    {
                        if (Convert.ToInt32(dt_ProductAccessories.Rows[i]["P_ID"]) == P_ID)
                        {
                            rt.STD_ACC_NAME = Convert.ToString(dt_ProductAccessories.Rows[i]["STD_ACC_NAME"]);
                            rt.ACC_SERIAL_NO = Convert.ToString(dt_ProductAccessories.Rows[i]["ACC_SERIAL_NO"]);
                            rt.PART_QTY = dt_ProductAccessories.Rows[i]["PART_QTY"] is DBNull ? (int?)null : Convert.ToInt32(dt_ProductAccessories.Rows[i]["PART_QTY"]);
                            rt.PART_PRICE = dt_ProductAccessories.Rows[i]["PART_PRICE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_ProductAccessories.Rows[i]["PART_PRICE"]);
                            FinalreportList.Add(rt);
                        }

                    }
                    catch (Exception ex)
                    {
                    }

                }
            }
            return FinalreportList;
        }

        public static List<DCProductSpareParts> GetDCProductSpareParts(int P_ID, DataTable dt_ProductSpareParts)
        {
            DCProductSpareParts rt;
            List<DCProductSpareParts> FinalreportList = new List<DCProductSpareParts>();
            if (dt_ProductSpareParts != null)
            {
                for (int i = 0; i < dt_ProductSpareParts.Rows.Count; i++)
                {
                    rt = new DCProductSpareParts();
                    try
                    {
                        if (Convert.ToInt32(dt_ProductSpareParts.Rows[i]["P_ID"]) == P_ID)
                        {
                            rt.SPARE_PART = Convert.ToString(dt_ProductSpareParts.Rows[i]["SPARE_PART"]);
                            rt.SP_SERIAL_NO = Convert.ToString(dt_ProductSpareParts.Rows[i]["SP_SERIAL_NO"]);
                            rt.PART_QTY = dt_ProductSpareParts.Rows[i]["PART_QTY"] is DBNull ? (int?)null : Convert.ToInt32(dt_ProductSpareParts.Rows[i]["PART_QTY"]);
                            rt.PART_PRICE = dt_ProductSpareParts.Rows[i]["PART_PRICE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt_ProductSpareParts.Rows[i]["PART_PRICE"]);
                            FinalreportList.Add(rt);
                        }

                    }
                    catch (Exception ex)
                    {
                    }

                }
            }
            return FinalreportList;
        }


        //Deliver Challan : Medtronic Accessories
        public static List<DC_MedtronicAccessories> Get_DC_MedtronicAccessories(int? dcID, long empID)
        {
            cmd = new SqlCommand("Get_DC_MedtronicAccessories", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_ID", empID);
            cmd.Parameters.AddWithValue("@DC_ID", dcID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            DC_MedtronicAccessories rt;
            List<DC_MedtronicAccessories> FinalreportList = new List<DC_MedtronicAccessories>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new DC_MedtronicAccessories();
                    try
                    {
                        rt.DC_MED_ACC_ID = Convert.ToInt32(dt.Rows[i]["DC_MED_ACC_ID"]);
                        rt.DC_FOR = (dt.Rows[i]["DC_FOR"].ToString());
                        rt.DC_ID = dt.Rows[i]["DC_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["DC_ID"]);
                        rt.MED_ACC_ID = Convert.ToInt32(dt.Rows[i]["MED_ACC_ID"]);
                        rt.ACCESSORY_CODE = (dt.Rows[i]["ACCESSORY_CODE"].ToString());
                        rt.ACCESSORY_NAME = (dt.Rows[i]["ACCESSORY_NAME"].ToString());
                        rt.SERIAL_NO = (dt.Rows[i]["SERIAL_NO"].ToString());
                        rt.PART_QTY = Convert.ToInt32(dt.Rows[i]["PART_QTY"]);
                        rt.PART_PRICE = dt.Rows[i]["PART_PRICE"] is DBNull ? (decimal?)null : Convert.ToInt32(dt.Rows[i]["PART_PRICE"]);
                        rt.EMP_ID = Convert.ToInt32(dt.Rows[i]["EMP_ID"]);
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"].ToString());
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }

            return FinalreportList;
        }
        public static int AddDC_MedtronicAccessories(DC_MedtronicAccessories tb_params)
        {
            try
            {
                cmd = new SqlCommand("Insert_TB_DC_MedtronicAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMP_ID", tb_params.EMP_ID);
                cmd.Parameters.AddWithValue("@DC_MED_ACC_ID", tb_params.DC_MED_ACC_ID);
                cmd.Parameters.AddWithValue("@DC_ID", tb_params.DC_ID);
                cmd.Parameters.AddWithValue("@DC_FOR", tb_params.DC_FOR);
                cmd.Parameters.AddWithValue("@MED_ACC_ID", tb_params.MED_ACC_ID);
                cmd.Parameters.AddWithValue("@SERIAL_NO", tb_params.SERIAL_NO);
                cmd.Parameters.AddWithValue("@PART_QTY", tb_params.PART_QTY);
                cmd.Parameters.AddWithValue("@PART_PRICE", tb_params.PART_PRICE);
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

        public static int Delete_DC_MedtronicAccessories(string dcFor, int dcMedtronicAccID)
        {
            try
            {
                cmd = new SqlCommand("Delete_DC_MedtronicAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@DC_FOR", dcFor);
                cmd.Parameters.AddWithValue("@DC_MED_ACC_ID", dcMedtronicAccID);
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

        public static DC_MedtronicAccessories_ForPrint Get_DC_MedtronicAccessories_ForPrint(int dcID, long empID)
        {
            cmd = new SqlCommand("Get_DC_MedtronicAccessories_ForPrint", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_ID", empID);
            cmd.Parameters.AddWithValue("@DC_ID", dcID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            ds = new DataSet();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(ds);
            DataTable dt_DC = new DataTable();
            dt_DC = ds.Tables[0];
            DataTable dt_Product = new DataTable();
            dt_Product = ds.Tables[1];
            con.Close();
            DC_MedtronicAccessories_ForPrint rt;
            rt = new DC_MedtronicAccessories_ForPrint();
            if (dt_DC != null)
            {
                for (int i = 0; i < dt_DC.Rows.Count; i++)
                {
                    try
                    {
                        rt.DC_ID = Convert.ToInt32(dt_DC.Rows[i]["DC_ID"]);
                        rt.DC_NUMBER = Convert.ToString(dt_DC.Rows[i]["DC_NUMBER"]);
                        rt.DC_DATE = (dt_DC.Rows[i]["DC_DATE"]).ToString();
                        rt.GSTIN_NUMBER = (dt_DC.Rows[i]["GSTIN_NUMBER"]).ToString();
                        rt.CUSTOMER_NAME = (dt_DC.Rows[i]["CUSTOMER_NAME"]).ToString();
                        rt.CONTACT_NO = (dt_DC.Rows[i]["CONTACT_NO"]).ToString();
                        rt.CUSTOMER_ADDRESS = (dt_DC.Rows[i]["CUSTOMER_ADDRESS"]).ToString();
                        rt.ZIP_CODE = (dt_DC.Rows[i]["ZIP_CODE"]).ToString();
                        rt.ProductList = DC_MedtronicAccessories_Products(dt_Product);
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
            return rt;
        }
        public static List<DC_MedtronicAccessories_Products> DC_MedtronicAccessories_Products(DataTable dt)
        {
            DC_MedtronicAccessories_Products rt;
            List<DC_MedtronicAccessories_Products> FinalreportList = new List<DC_MedtronicAccessories_Products>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new DC_MedtronicAccessories_Products();
                    try
                    {
                        int recIndex = FinalreportList.FindIndex(x => x.MED_ACC_ID == Convert.ToInt32(dt.Rows[i]["MED_ACC_ID"]));
                        if (recIndex == -1)
                        {
                            rt.MED_ACC_ID = Convert.ToInt32(dt.Rows[i]["MED_ACC_ID"]);
                            rt.DC_FOR = (dt.Rows[i]["DC_FOR"].ToString());
                            rt.ACCESSORY_CODE = (dt.Rows[i]["ACCESSORY_CODE"].ToString());
                            rt.ACCESSORY_NAME = (dt.Rows[i]["ACCESSORY_NAME"].ToString());
                            //rt.SERIAL_NO = (dt.Rows[i]["SERIAL_NO"].ToString());
                            rt.PART_QTY = Convert.ToInt32(dt.Rows[i]["PART_QTY"]);
                            rt.SerialNoList = new List<DC_MedtronicAccessories_SerialNo> {
                            new DC_MedtronicAccessories_SerialNo{ SERIAL_NO = (dt.Rows[i]["SERIAL_NO"].ToString())} };
                            FinalreportList.Add(rt);
                        }
                        else
                        {
                            FinalreportList[recIndex].PART_QTY = FinalreportList[recIndex].PART_QTY + Convert.ToInt32(dt.Rows[i]["PART_QTY"]);
                            FinalreportList[recIndex].SerialNoList.Add(
                            new DC_MedtronicAccessories_SerialNo { SERIAL_NO = (dt.Rows[i]["SERIAL_NO"].ToString()) });
                        }
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
            return FinalreportList;
        }


    }
}