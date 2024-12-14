using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using static Sai_Helth_care.Models.SalaryWages;

namespace Sai_Helth_care.Models
{
    public class IncentiveSchemeDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public static int AddUpdateIncentiveScheme(IncentiveScheme tB_admin)
        {
            try
            {
                cmd = new SqlCommand("InsertUpdateIncentiveScheme", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@IS_ID", tB_admin.IS_ID);
                cmd.Parameters.AddWithValue("@SERIAL_NO", tB_admin.SERIAL_NO);
                cmd.Parameters.AddWithValue("@REF_NO", tB_admin.REF_NO);
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID);
                cmd.Parameters.AddWithValue("@INCENTIVE_DATE", tB_admin.INCENTIVE_DATE);
                cmd.Parameters.AddWithValue("@INC_TYPE_ID", tB_admin.INC_TYPE_ID);
                cmd.Parameters.AddWithValue("@INC_SERVICE_TYPE_ID", tB_admin.INC_SERVICE_TYPE_ID);
                cmd.Parameters.AddWithValue("@INCENTIVE_AMOUNT", tB_admin.INCENTIVE_AMOUNT);
                cmd.Parameters.AddWithValue("@COMMENT", tB_admin.COMMENT);
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

        public static int GetIncentiveSchemeTotalRecordCount(SearchSalaryWagesParams tb_params)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("GetIncentiveSchemeTotalRecordCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
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

        public static List<IncentiveScheme> GetIncentiveSchemeList(SearchSalaryWagesParams tb_params)
        {

            cmd = new SqlCommand("SP_GetIncentiveSchemeList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tb_params.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tb_params.PageNo - 1);
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
            IncentiveScheme rt;
            List<IncentiveScheme> FinalreportList = new List<IncentiveScheme>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new IncentiveScheme();
                    try
                    {
                        rt.IS_ID = Convert.ToInt32(dt.Rows[i]["IS_ID"]);
                        rt.SERIAL_NO = (dt.Rows[i]["SERIAL_NO"]).ToString();
                        rt.REF_NO = (dt.Rows[i]["REF_NO"]).ToString();
                        rt.EMP_ID = Convert.ToInt32(dt.Rows[i]["EMP_ID"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"]).ToString();
                        rt.INCENTIVE_DATE = (dt.Rows[i]["INCENTIVE_DATE"]).ToString();
                        rt.INC_TYPE_ID = Convert.ToInt32(dt.Rows[i]["INC_TYPE_ID"]);
                        rt.INC_TYPE_NAME = (dt.Rows[i]["INC_TYPE_NAME"]).ToString();
                        rt.INC_SERVICE_TYPE_ID = Convert.ToInt32(dt.Rows[i]["INC_SERVICE_TYPE_ID"]);
                        rt.INC_SERVICE_TYPE_NAME = (dt.Rows[i]["INC_SERVICE_TYPE_NAME"]).ToString();
                        rt.INCENTIVE_AMOUNT = Convert.ToDecimal(dt.Rows[i]["INCENTIVE_AMOUNT"]);
                        rt.COMMENT = (dt.Rows[i]["COMMENT"]).ToString();
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

    }
}