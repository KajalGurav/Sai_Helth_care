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
    public class VendorPODAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public class SearchPOParams
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public int? CUSTOMER_TYPE_ID { get; set; }
            public string VENDOR_NAME { get; set; }
            public string OWNER_NAME { get; set; }
            public string STARTING_DATE { get; set; }
            public string ENDING_DATE { get; set; }
        }

        public static int AddUpdateVendorPO(VendorPO tB_params)
        {

            try
            {
               
                cmd = new SqlCommand("InsertUpdateVendorPO", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@VPO_ID", tB_params.VPO_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tB_params.CUSTOMER_TYPE_ID);
                cmd.Parameters.AddWithValue("@VPO_NUMBER", tB_params.VPO_NUMBER);
                cmd.Parameters.AddWithValue("@VENDOR_ID", tB_params.VENDOR_ID);
                cmd.Parameters.AddWithValue("@ADMIN_ID", tB_params.ADMIN_ID);
                cmd.Parameters.AddWithValue("@VPO_DATE", tB_params.VPO_DATE);
                cmd.Parameters.AddWithValue("@TERMS_AND_CONDITIONS", tB_params.TERMS_AND_CONDITIONS);
                cmd.Parameters.AddWithValue("@ACTION", tB_params.ACTION);
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

        public static int GetQuotationsTotalRecordCount(SearchPOParams tb_params)
        {
            int i = 0;
            HttpContext context = HttpContext.Current;
            long id = Convert.ToInt64(context.Session["COMPANY_ID"]);
            try
            {
                cmd = new SqlCommand("GetVendorPOTotalRecordCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tb_params.CUSTOMER_TYPE_ID);
                cmd.Parameters.AddWithValue("@VENDOR_NAME", tb_params.VENDOR_NAME);
               
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

        public static List<VendorPO> GetQuotationList(SearchPOParams tb_params)
        {
            HttpContext context = HttpContext.Current;
            long id = Convert.ToInt64(context.Session["COMPANY_ID"]);

            cmd = new SqlCommand("SP_GetVendorPOList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tb_params.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tb_params.PageNo - 1);
            cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tb_params.CUSTOMER_TYPE_ID);
            cmd.Parameters.AddWithValue("@VENDOR_NAME", tb_params.VENDOR_NAME);
          
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
            VendorPO rt;
            List<VendorPO> FinalreportList = new List<VendorPO>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new VendorPO();
                    try
                    {
                        rt.VPO_ID = Convert.ToInt64(dt.Rows[i]["VPO_ID"]);
                        rt.VENDOR_ID = Convert.ToInt64(dt.Rows[i]["VENDOR_ID"]);
                        rt.OWNER_NAME = (dt.Rows[i]["OWNER_NAME"].ToString());
                        rt.VENDOR_NAME = (dt.Rows[i]["VENDOR_NAME"].ToString());
                        rt.VPO_NUMBER = (dt.Rows[i]["VPO_NUMBER"].ToString());
                        rt.VPO_FOR = (dt.Rows[i]["VPO_FOR"].ToString());
                        rt.TERMS_AND_CONDITIONS = (dt.Rows[i]["TERMS_AND_CONDITION"].ToString());
                        rt.VPO_DATE = (dt.Rows[i]["VPO_DATE"].ToString());
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        rt.CUSTOMER_TYPE_ID = Convert.ToInt32(dt.Rows[i]["CUSTOMER_TYPE_ID"]);
                        

                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }


        public static VendorPO GetVendorPODetailsForUpdate(long vendorPOId, int CUSTOMER_TYPE_ID)
        {
            cmd = new SqlCommand("Get_VendorPODetailsForUpdate", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VPO_ID", vendorPOId);
            cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", CUSTOMER_TYPE_ID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            VendorPO rt;
            rt = new VendorPO();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    try
                    {
                        rt.VPO_ID = Convert.ToInt64(dt.Rows[i]["VPO_ID"]);
                        rt.VENDOR_ID = Convert.ToInt64(dt.Rows[i]["VENDOR_ID"]);
                        rt.CUSTOMER_TYPE_ID = Convert.ToInt32(dt.Rows[i]["CUSTOMER_TYPE_ID"]);
                        rt.VPO_NUMBER = (dt.Rows[i]["VPO_NUMBER"].ToString());
                        rt.VENDOR_NAME = (dt.Rows[i]["VENDOR_NAME"].ToString());
                        rt.OWNER_NAME = (dt.Rows[i]["OWNER_NAME"].ToString());
                        rt.VPO_DATE = (dt.Rows[i]["VPO_DATE"].ToString());
                        rt.TERMS_AND_CONDITIONS = (dt.Rows[i]["TERMS_AND_CONDITION"]).ToString();
                        rt.TOTAL_AMOUNT = dt.Rows[i]["TOTAL_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["TOTAL_AMOUNT"]);
                        rt.TAX_AMOUNT = dt.Rows[i]["TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["TAX_AMOUNT"]); 
                        rt.AMOUNT_INC_TAX = dt.Rows[i]["AMOUNT_INC_TAX"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["AMOUNT_INC_TAX"]); 
                        rt.INC_ALL_TAXES = dt.Rows[i]["INC_ALL_TAXES"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["INC_ALL_TAXES"]); 
                        if(dt.Rows[i]["INC_ALL_TAXES"] is DBNull)
                        {
                            rt.INC_EXC_TAX = null;
                        }
                        else
                        {
                            if (Convert.ToInt32(dt.Rows[i]["INC_ALL_TAXES"]) == 1)
                            {
                                rt.INC_EXC_TAX = "Including";
                            }
                            else if (Convert.ToInt32(dt.Rows[i]["INC_ALL_TAXES"]) == 0)
                            {
                                rt.INC_EXC_TAX = "Excluding";
                            }
                        }
                        rt.GST = dt.Rows[i]["GST"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["GST"]);
                        rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"]).ToString();
                        rt.EMAIL = (dt.Rows[i]["EMAIL"]).ToString();
                        rt.ADDRESS = (dt.Rows[i]["ADDRESS"]).ToString();
                        rt.STATE_NAME = (dt.Rows[i]["STATE_NAME"]).ToString();
                        rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"]).ToString();
                        rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.PAN_CARD_NO = (dt.Rows[i]["PAN_CARD_NO"]).ToString();
                        rt.GST_NO = (dt.Rows[i]["GST_NO"]).ToString();
                        rt.TIN_NO = (dt.Rows[i]["TIN_NO"]).ToString();
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

        //Vendor PO Products and Accessories
       
        public static DataTable ConvertVendorPOProdAccListToDataTable(List<VendorPOProductAccessories> VendorPOProductAccessoriesList)
        {
            DataTable dataTable = new DataTable();
            dataTable.Columns.Add("VPO_ACC_ID", typeof(long));
            dataTable.Columns.Add("VPO_ID", typeof(long));
            dataTable.Columns.Add("VPO_P_ID", typeof(long));
            dataTable.Columns.Add("ACC_ID", typeof(int));
            dataTable.Columns.Add("ACC_TYPE_ID", typeof(int));
            dataTable.Columns.Add("PART_QTY", typeof(int));
            dataTable.Columns.Add("PART_PRICE", typeof(decimal));
            // Add items from the List to the DataTable
            foreach (var accessories in VendorPOProductAccessoriesList)
            {
                DataRow row = dataTable.NewRow();
                row["VPO_ACC_ID"] = accessories.VPO_ACC_ID;
                row["VPO_ID"] = accessories.VPO_ID;
                row["VPO_P_ID"] = accessories.VPO_P_ID;
                row["ACC_ID"] = accessories.ACC_ID;
                row["ACC_TYPE_ID"] = accessories.ACC_TYPE_ID;
                row["PART_QTY"] = accessories.PART_QTY;
                row["PART_PRICE"] = accessories.PART_PRICE;
                dataTable.Rows.Add(row);
            }
            return dataTable;
        }
        public static int AddVendorPOProductAccessories(VendorPOProduct tB_admin)
        {
            try
            {
                DataTable vendorPOProdAccessories = ConvertVendorPOProdAccListToDataTable(tB_admin.VendorPOProductAccessoriesList);

                cmd = new SqlCommand("InsertVendorPOProductAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@VPO_ID", tB_admin.VPO_ID);
                cmd.Parameters.AddWithValue("@VENDOR_ID", tB_admin.VENDOR_ID);
                cmd.Parameters.AddWithValue("@P_ID", tB_admin.P_ID);
                cmd.Parameters.AddWithValue("@QUANTITY", tB_admin.QUANTITY);
                cmd.Parameters.AddWithValue("@PRICE", tB_admin.PRICE);
                cmd.Parameters.AddWithValue("@IS_WITH_WARRANTY", tB_admin.IS_WITH_WARRANTY);
                cmd.Parameters.AddWithValue("@WARRANTY_QTY", tB_admin.WARRANTY_QTY);
                cmd.Parameters.AddWithValue("@WARRANTY_PRICE", tB_admin.WARRANTY_PRICE);
                cmd.Parameters.AddWithValue("@TB_VendorPOAccessories_TYPE", vendorPOProdAccessories);
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

        public static List<VendorPOProduct> GetVendorPOProductList(long vendorPOID)
        {

            cmd = new SqlCommand("SP_GetVendorPOProductAccessoriesList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VPO_ID", vendorPOID);
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
            VendorPOProduct rt;
            List<VendorPOProduct> FinalreportList = new List<VendorPOProduct>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new VendorPOProduct();
                    try
                    {
                        rt.VPO_ID = Convert.ToInt32(dt.Rows[i]["VPO_ID"]);
                        rt.VENDOR_ID = Convert.ToInt32(dt.Rows[i]["VENDOR_ID"]);
                        rt.P_ID = Convert.ToInt32(dt.Rows[i]["P_ID"]);
                        rt.VPO_P_ID = Convert.ToInt32(dt.Rows[i]["VPO_P_ID"]);
                        rt.PRODUCT_CODE = Convert.ToString(dt.Rows[i]["PRODUCT_CODE"]);
                        rt.PRODUCT_NAME = Convert.ToString(dt.Rows[i]["PRODUCT_NAME"]);
                        rt.CAT_NAME = Convert.ToString(dt.Rows[i]["CAT_NAME"]);
                        rt.M_NAME = Convert.ToString(dt.Rows[i]["M_NAME"]);
                        rt.QUANTITY = Convert.ToInt32(dt.Rows[i]["QUANTITY"]);
                        rt.PRICE = Convert.ToDecimal(dt.Rows[i]["PRICE"]);
                        rt.IS_WITH_WARRANTY = Convert.ToInt32(dt.Rows[i]["IS_WITH_WARRANTY"]);
                        rt.WARRANTY_QTY = Convert.ToInt32(dt.Rows[i]["WARRANTY_QTY"]);
                        rt.WARRANTY_PRICE = Convert.ToDecimal(dt.Rows[i]["WARRANTY_PRICE"]);
                        rt.WITH_WARRANTY = Convert.ToString(dt.Rows[i]["WITH_WARRANTY"]);
                        rt.PART_TAXABLE_VALUE = dt.Rows[i]["PART_TAXABLE_VALUE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["PART_TAXABLE_VALUE"]);
                        rt.PART_TAX_AMOUNT = dt.Rows[i]["PART_TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["PART_TAX_AMOUNT"]);
                        rt.WARRANTY_TAXABLE_VALUE = dt.Rows[i]["WARRANTY_TAXABLE_VALUE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["WARRANTY_TAXABLE_VALUE"]);
                        rt.WARRANTY_TAX_AMOUNT = dt.Rows[i]["WARRANTY_TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["WARRANTY_TAX_AMOUNT"]);

                        rt.VendorPOProductAccessoriesList = GetVendorPOProductAccessoriesList(dt_accessories);
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }

        public static List<VendorPOProductAccessories> GetVendorPOProductAccessoriesList(DataTable dt)
        {
            VendorPOProductAccessories rt;
            List<VendorPOProductAccessories> FinalreportList = new List<VendorPOProductAccessories>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new VendorPOProductAccessories();
                    try
                    {
                        rt.VPO_ACC_ID = Convert.ToInt64(dt.Rows[i]["VPO_ACC_ID"]);
                        rt.VPO_ID = Convert.ToInt64(dt.Rows[i]["VPO_ID"]);
                        rt.VPO_P_ID = Convert.ToInt32(dt.Rows[i]["VPO_P_ID"]);
                        rt.ACC_ID = Convert.ToInt32(dt.Rows[i]["ACC_ID"]);
                        rt.ACC_TYPE_ID = Convert.ToInt32(dt.Rows[i]["ACC_TYPE_ID"]);
                        rt.PART_QTY = Convert.ToInt32(dt.Rows[i]["PART_QTY"]);
                        rt.PART_PRICE = Convert.ToDecimal(dt.Rows[i]["PART_PRICE"]);
                        rt.ACCESSORY_CODE = Convert.ToString(dt.Rows[i]["ACCESSORY_CODE"]);
                        rt.ACCESSORY_NAME = Convert.ToString(dt.Rows[i]["ACCESSORY_NAME"]);
                        rt.PART_TAXABLE_VALUE = dt.Rows[i]["PART_TAXABLE_VALUE"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["PART_TAXABLE_VALUE"]);
                        rt.PART_TAX_AMOUNT = dt.Rows[i]["PART_TAX_AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["PART_TAX_AMOUNT"]);

                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }


        public static int DeleteVendorPOProductAccessories(long vendorPOID, long vendorprodID, long? vendorAccessoriesID)
        {
            try
            {
                cmd = new SqlCommand("DeleteVendorPOProductAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@VPO_ID", vendorPOID);
                cmd.Parameters.AddWithValue("@VPO_P_ID", vendorprodID);
                cmd.Parameters.AddWithValue("@VPO_ACC_ID", vendorAccessoriesID);
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

        public static int UpdateVendorPODetails(VendorPO tB_admin)
        {
            
            try
            {
                cmd = new SqlCommand("Update_Tb_AllVendorPOMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@TAX_AMOUNT", tB_admin.TAX_AMOUNT);
                cmd.Parameters.AddWithValue("@TOTAL_AMOUNT", tB_admin.TOTAL_AMOUNT);
                cmd.Parameters.AddWithValue("@GST", tB_admin.GST);
                cmd.Parameters.AddWithValue("@INC_ALL_TAXES", tB_admin.INC_ALL_TAXES);
                cmd.Parameters.AddWithValue("@AMOUNT_INC_TAX", tB_admin.AMOUNT_INC_TAX);
                cmd.Parameters.AddWithValue("@TERMS_AND_CONDITIONS", tB_admin.TERMS_AND_CONDITIONS);
                cmd.Parameters.AddWithValue("@VPO_ID", tB_admin.VPO_ID);
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