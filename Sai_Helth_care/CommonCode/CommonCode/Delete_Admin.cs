using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Configuration;

namespace Sai_Helth_care.CommonCode
{
    public class Delete_Admin
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        static DataSet ds;
        public static int deleteData(long QUOTATION_ID, string SPARE_PART,string PRODUCT_NAME)
        {
            //cmd = new SqlCommand("Delete_Tb_QuotationProductDetails", con);
            cmd = new SqlCommand("RemoveItem_Tb_QuotationProductDetails", con);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@QUOTATION_ID", QUOTATION_ID);
            cmd.Parameters.AddWithValue("@SPAREPART", SPARE_PART);
            cmd.Parameters.AddWithValue("@PRODUCT_NAME", PRODUCT_NAME);
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


        public static int deleteDataMindray(long QUOTATION_ID, string PROBE_NAME, string PRODUCT_NAME)
        {
            //cmd = new SqlCommand("Delete_Tb_QuotationProductDetails", con);
            cmd = new SqlCommand("RemoveItem_Tb_MQuotationProductDetails", con);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@QUOTATION_ID", QUOTATION_ID);
            cmd.Parameters.AddWithValue("@PROBE_NAME", PROBE_NAME);
            cmd.Parameters.AddWithValue("@PRODUCT_NAME", PRODUCT_NAME);
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
    }
}