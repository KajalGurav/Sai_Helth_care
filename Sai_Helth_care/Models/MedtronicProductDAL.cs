using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sai_Helth_care.Models
{
    public class MedtronicProductDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public class SearchMedtronicProductParams
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public int MED_ACCESSORY_TYPE_ID { get; set; }
            public string SEARCH_NAME { get; set; }
        }


        public static int AddUpdateMedtronicAccessories(MedtronicAccessories tB_admin)
        {
            try
            {
                cmd = new SqlCommand("InsertUpdateMedtronicAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@MED_ACC_ID", tB_admin.MED_ACC_ID);
                cmd.Parameters.AddWithValue("@MED_ACCESSORY_TYPE_ID", tB_admin.MED_ACCESSORY_TYPE_ID); // 1 : MAIN SYSTEM, 2:ATTACHMENTS, 3:TOOLS
                cmd.Parameters.AddWithValue("@P_ID", tB_admin.P_ID);
                cmd.Parameters.AddWithValue("@ACCESSORY_CODE", tB_admin.ACCESSORY_CODE);
                cmd.Parameters.AddWithValue("@ACCESSORY_NAME", tB_admin.ACCESSORY_NAME);
                cmd.Parameters.AddWithValue("@HSN_CODE", tB_admin.HSN_CODE);
                cmd.Parameters.AddWithValue("@MRP", tB_admin.MRP);
                cmd.Parameters.AddWithValue("@BASIC_PRICE", tB_admin.BASIC_PRICE);
                cmd.Parameters.AddWithValue("@GST_PERCENTAGE", tB_admin.GST_PERCENTAGE);
                cmd.Parameters.AddWithValue("@ACTION", tB_admin.ACTION);
                cmd.Parameters.AddWithValue("@ADMIN_ID", tB_admin.ADMIN_ID);
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
                
        public static int GetMedtronicAccessoriesTotalRecordCount(SearchMedtronicProductParams tb_params)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("GetMedtronicAccessoriesTotalRecordCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@MED_ACCESSORY_TYPE_ID", tb_params.MED_ACCESSORY_TYPE_ID);
                cmd.Parameters.AddWithValue("@SEARCH_NAME", tb_params.SEARCH_NAME);
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

        public static List<MedtronicAccessories> GetMedtronicAccessoriesList(SearchMedtronicProductParams tb_params)
        {

            cmd = new SqlCommand("SP_GetMedtronicAccessoriesList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tb_params.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tb_params.PageNo - 1);
            cmd.Parameters.AddWithValue("@MED_ACCESSORY_TYPE_ID", tb_params.MED_ACCESSORY_TYPE_ID);
            cmd.Parameters.AddWithValue("@SEARCH_NAME", tb_params.SEARCH_NAME);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            MedtronicAccessories rt;
            List<MedtronicAccessories> FinalreportList = new List<MedtronicAccessories>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new MedtronicAccessories();
                    try
                    {
                        rt.MED_ACC_ID = Convert.ToInt32(dt.Rows[i]["MED_ACC_ID"]);
                        rt.MED_ACCESSORY_TYPE_ID = Convert.ToInt32(dt.Rows[i]["MED_ACCESSORY_TYPE_ID"]);
                        rt.P_ID = Convert.ToInt32(dt.Rows[i]["P_ID"]);
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"]).ToString();
                        rt.ACCESSORY_CODE = (dt.Rows[i]["ACCESSORY_CODE"]).ToString();
                        rt.ACCESSORY_NAME = (dt.Rows[i]["ACCESSORY_NAME"]).ToString();
                        rt.HSN_CODE = (dt.Rows[i]["HSN_CODE"]).ToString();
                        rt.MRP = Convert.ToDecimal(dt.Rows[i]["MRP"]);
                        rt.BASIC_PRICE = Convert.ToDecimal(dt.Rows[i]["BASIC_PRICE"]);
                        rt.GST_PERCENTAGE = Convert.ToInt32(dt.Rows[i]["GST_PERCENTAGE"]);
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();

                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }

        public static List<MedtronicAccessories> GetMedtronicAccessoriesListByProductID(long productID)
        {

            cmd = new SqlCommand("SP_MedtronicAccessoriesListByProductID", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@P_ID", productID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            MedtronicAccessories rt;
            List<MedtronicAccessories> FinalreportList = new List<MedtronicAccessories>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new MedtronicAccessories();
                    try
                    {
                        rt.MED_ACC_ID = Convert.ToInt32(dt.Rows[i]["MED_ACC_ID"]);
                        rt.MED_ACCESSORY_TYPE_ID = Convert.ToInt32(dt.Rows[i]["MED_ACCESSORY_TYPE_ID"]);
                        rt.P_ID = Convert.ToInt32(dt.Rows[i]["P_ID"]);
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"]).ToString();
                        rt.ACCESSORY_CODE = (dt.Rows[i]["ACCESSORY_CODE"]).ToString();
                        rt.ACCESSORY_NAME = (dt.Rows[i]["ACCESSORY_NAME"]).ToString();
                        rt.HSN_CODE = (dt.Rows[i]["HSN_CODE"]).ToString();
                        rt.MRP = Convert.ToDecimal(dt.Rows[i]["MRP"]);
                        rt.BASIC_PRICE = Convert.ToDecimal(dt.Rows[i]["BASIC_PRICE"]);
                        rt.GST_PERCENTAGE = Convert.ToInt32(dt.Rows[i]["GST_PERCENTAGE"]);

                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }

        public static MedtronicAccessories GetMedtronicAccessoriesForUpdate(int MedAccID)
        {
            cmd = new SqlCommand("SP_MedtronicAccessoriesForUpdate", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@MED_ACC_ID", MedAccID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            MedtronicAccessories rt;
            rt = new MedtronicAccessories();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    try
                    {
                        rt.MED_ACC_ID = Convert.ToInt32(dt.Rows[i]["MED_ACC_ID"]);
                        rt.MED_ACCESSORY_TYPE_ID = Convert.ToInt32(dt.Rows[i]["MED_ACCESSORY_TYPE_ID"]);
                        rt.P_ID = Convert.ToInt32(dt.Rows[i]["P_ID"]);
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"]).ToString();
                        rt.ACCESSORY_CODE = (dt.Rows[i]["ACCESSORY_CODE"]).ToString();
                        rt.ACCESSORY_NAME = (dt.Rows[i]["ACCESSORY_NAME"]).ToString();
                        rt.HSN_CODE = (dt.Rows[i]["HSN_CODE"]).ToString();
                        rt.MRP = Convert.ToDecimal(dt.Rows[i]["MRP"]);
                        rt.BASIC_PRICE = Convert.ToDecimal(dt.Rows[i]["BASIC_PRICE"]);
                        rt.GST_PERCENTAGE = Convert.ToInt32(dt.Rows[i]["GST_PERCENTAGE"]);
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


        //MEDTRONIC QUOTATION :

        public static DataTable ConvertMedProdAccListToDataTable(List<MedtronicQuotationProductAccessories> MedtronicQuotationProductAccessoriesList)
        {
            DataTable dataTable = new DataTable();
            dataTable.Columns.Add("MQPA_ID", typeof(int));
            dataTable.Columns.Add("Q_ID", typeof(long));
            dataTable.Columns.Add("P_ID", typeof(long));
            dataTable.Columns.Add("MED_ACC_ID", typeof(int));
            dataTable.Columns.Add("QUANTITY", typeof(int));
            dataTable.Columns.Add("MRP", typeof(decimal));
            dataTable.Columns.Add("BASIC_PRICE", typeof(decimal));
            dataTable.Columns.Add("DISCOUNT", typeof(decimal));
            dataTable.Columns.Add("GST_PERCENTAGE", typeof(int));
            dataTable.Columns.Add("PART_TOTAL_AMOUNT", typeof(decimal));
            // Add items from the List to the DataTable
            foreach (var accessories in MedtronicQuotationProductAccessoriesList)
            {
                DataRow row = dataTable.NewRow();
                row["MQPA_ID"] = accessories.MQPA_ID;
                row["Q_ID"] = accessories.Q_ID;
                row["P_ID"] = accessories.P_ID;
                row["MED_ACC_ID"] = accessories.MED_ACC_ID;
                row["QUANTITY"] = accessories.QUANTITY;
                row["MRP"] = accessories.MRP;
                row["BASIC_PRICE"] = accessories.BASIC_PRICE;
                row["DISCOUNT"] = accessories.DISCOUNT;
                row["GST_PERCENTAGE"] = accessories.GST_PERCENTAGE;
                row["PART_TOTAL_AMOUNT"] = accessories.PART_TOTAL_AMOUNT;
                dataTable.Rows.Add(row);
            }
            return dataTable;
        }
        public static int AddMedtronicQuotationProductAccessories(MedtronicQuotationProduct tB_admin)
        {
            try
            {
                //DataTable medQuotProdAccessories = ToDataTable.ConvertToDataTable(tB_admin.MedtronicQuotationProductAccessoriesList);
                DataTable medQuotProdAccessories = ConvertMedProdAccListToDataTable(tB_admin.MedtronicQuotationProductAccessoriesList);

                cmd = new SqlCommand("InsertMedtronicQuotationProductAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Q_ID", tB_admin.Q_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@P_ID", tB_admin.P_ID);
                cmd.Parameters.AddWithValue("@QUANTITY", tB_admin.QUANTITY);
                cmd.Parameters.AddWithValue("@BASIC_PRICE", tB_admin.BASIC_PRICE);
                cmd.Parameters.AddWithValue("@GST_PERCENTAGE", tB_admin.GST_PERCENTAGE);
                cmd.Parameters.AddWithValue("@TB_MedtronicAccessories_TYPE", medQuotProdAccessories);
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

        public static List<MedtronicQuotationProduct> GetMedtronicQuotationProductList(long quotID)
        {
            cmd = new SqlCommand("SP_GetMedtronicQuotationProductAccessoriesList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Q_ID", quotID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            DataSet ds = new DataSet();
            dt = new DataTable();
            DataTable dt_accessories = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(ds);

            dt = ds.Tables[0];
            dt_accessories = ds.Tables[1];

            con.Close();
            MedtronicQuotationProduct rt;
            List<MedtronicQuotationProduct> FinalreportList = new List<MedtronicQuotationProduct>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new MedtronicQuotationProduct();
                    try
                    {
                        rt.Q_ID = Convert.ToInt32(dt.Rows[i]["Q_ID"]);
                        rt.CUSTOMER_ID = Convert.ToInt32(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.P_ID = Convert.ToInt32(dt.Rows[i]["P_ID"]);
                        rt.PRODUCT_CODE = Convert.ToString(dt.Rows[i]["PRODUCT_CODE"]);
                        rt.PRODUCT_NAME = Convert.ToString(dt.Rows[i]["PRODUCT_NAME"]);
                        rt.QUANTITY = Convert.ToInt32(dt.Rows[i]["QUANTITY"]);
                        rt.MRP = Convert.ToDecimal(dt.Rows[i]["MRP"]);
                        rt.BASIC_PRICE = Convert.ToDecimal(dt.Rows[i]["BASIC_PRICE"]);
                        rt.GST_PERCENTAGE = Convert.ToInt32(dt.Rows[i]["GST_PERCENTAGE"]);
                        rt.MedtronicQuotationProductAccessoriesList = GetMedtronicQuotationProductAccessoriesList(dt_accessories);
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }

        public static List<MedtronicQuotationProductAccessories> GetMedtronicQuotationProductAccessoriesList(DataTable dt)
        {
            decimal TotalPrice = 0;
            decimal BasicPrice = 0;
            decimal Total_Gst = 0;
            MedtronicQuotationProductAccessories rt;
            List<MedtronicQuotationProductAccessories> FinalreportList = new List<MedtronicQuotationProductAccessories>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new MedtronicQuotationProductAccessories();
                    try
                    {
                        rt.MQPA_ID = Convert.ToInt32(dt.Rows[i]["MQPA_ID"]);
                        rt.Q_ID = Convert.ToInt32(dt.Rows[i]["Q_ID"]);
                        rt.P_ID = Convert.ToInt32(dt.Rows[i]["P_ID"]);
                        rt.MED_ACC_ID = Convert.ToInt32(dt.Rows[i]["MED_ACC_ID"]);
                        rt.MED_ACCESSORY_TYPE_ID = Convert.ToInt32(dt.Rows[i]["MED_ACCESSORY_TYPE_ID"]);
                        rt.QUANTITY = Convert.ToInt32(dt.Rows[i]["QUANTITY"]);
                        rt.MRP = Convert.ToDecimal(dt.Rows[i]["MRP"]);
                        rt.BASIC_PRICE = Convert.ToDecimal(dt.Rows[i]["BASIC_PRICE"]);
                        rt.DISCOUNT = Convert.ToDecimal(dt.Rows[i]["DISCOUNT"]);
                        rt.GST_PERCENTAGE = Convert.ToInt32(dt.Rows[i]["GST_PERCENTAGE"]);
                        rt.PART_TOTAL_AMOUNT = Convert.ToDecimal(dt.Rows[i]["PART_TOTAL_AMOUNT"]);
                        rt.ACCESSORY_CODE = Convert.ToString(dt.Rows[i]["ACCESSORY_CODE"]);
                        rt.ACCESSORY_NAME = Convert.ToString(dt.Rows[i]["ACCESSORY_NAME"]);

                        TotalPrice = TotalPrice + rt.PART_TOTAL_AMOUNT + (rt.PART_TOTAL_AMOUNT * rt.GST_PERCENTAGE / 100);
                        rt.T_TOTAL_PRICE = Math.Round(TotalPrice, 0);

                        Total_Gst = Total_Gst + (rt.BASIC_PRICE * rt.GST_PERCENTAGE / 100);
                        rt.TOTAL_GST = Math.Round(Total_Gst, 0);

                        BasicPrice = BasicPrice + rt.BASIC_PRICE;
                        rt.TOTAL_BASIC_PRICE = BasicPrice;


                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }


        public static int DeleteMedtronicQuotationProductAccessories(long quotID, long productID, int? medAccessoriesID)
        {
            try
            {
                cmd = new SqlCommand("DeleteMedtronicQuotationProductAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Q_ID", quotID);
                cmd.Parameters.AddWithValue("@P_ID", productID);
                cmd.Parameters.AddWithValue("@MED_ACC_ID", medAccessoriesID);
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


        //MEDTRONIC AMC :
        public static int AddAMC_MedtronicAccessories(AMC_MedtronicAccessories tb_params)
        {
            try
            {
                cmd = new SqlCommand("Insert_AMC_MedtronicAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMP_ID", tb_params.EMP_ID);
                cmd.Parameters.AddWithValue("@AMC_CMC_ID", tb_params.AMC_CMC_ID);
                cmd.Parameters.AddWithValue("@MED_ACC_ID", tb_params.MED_ACC_ID);
                cmd.Parameters.AddWithValue("@SERIAL_NO", tb_params.SERIAL_NO);
                cmd.Parameters.AddWithValue("@QUANTITY", tb_params.QUANTITY);
                cmd.Parameters.AddWithValue("@AMC_AMOUNT", tb_params.AMC_AMOUNT);

                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                return i ;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public static List<AMC_MedtronicAccessories> Get_AMC_MedtronicAccessories(long empID, int? amcCmcID)
        {
            cmd = new SqlCommand("Get_AMC_MedtronicAccessories", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_ID", empID);
            cmd.Parameters.AddWithValue("@AMC_CMC_ID", amcCmcID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            AMC_MedtronicAccessories rt;
            List<AMC_MedtronicAccessories> FinalreportList = new List<AMC_MedtronicAccessories>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new AMC_MedtronicAccessories();
                    try
                    {
                        rt.AMC_MEDACC_ID = Convert.ToInt32(dt.Rows[i]["AMC_MEDACC_ID"]);
                        rt.AMC_CMC_ID = dt.Rows[i]["AMC_CMC_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["AMC_CMC_ID"]);
                        rt.MED_ACC_ID = dt.Rows[i]["MED_ACC_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["MED_ACC_ID"]);
                        rt.ACCESSORY_NAME = (dt.Rows[i]["ACCESSORY_NAME"]).ToString();
                        rt.MED_ACCESSORY_TYPE_ID = dt.Rows[i]["MED_ACCESSORY_TYPE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["MED_ACCESSORY_TYPE_ID"]);
                        rt.MED_ACCESSORY_TYPE_NAME = (dt.Rows[i]["MED_ACCESSORY_TYPE_NAME"]).ToString();
                        rt.SERIAL_NO = (dt.Rows[i]["SERIAL_NO"]).ToString();
                        rt.QUANTITY = dt.Rows[i]["QUANTITY"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["QUANTITY"]);
                        rt.AMC_AMOUNT = dt.Rows[i]["AMC_AMOUNT"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["AMC_AMOUNT"]);
                        rt.EMP_ID = Convert.ToInt32(dt.Rows[i]["EMP_ID"]);
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }
        public static int Delete_AMC_MedtronicAccessories(int amcMedAccID)
        {
            try
            {
                cmd = new SqlCommand("Delete_AMC_MedtronicAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@AMC_MEDACC_ID", amcMedAccID);
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


    }
}