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
    public class SalaryIncrementDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public static int AddUpdateSalaryIncrement(SalaryIncrement tB_admin)
        {
            try
            {
                cmd = new SqlCommand("InsertUpdateSalaryIncrement", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ESI_ID", tB_admin.ESI_ID);
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID); 
                cmd.Parameters.AddWithValue("@BASIC_SALARY", tB_admin.BASIC_SALARY);
                cmd.Parameters.AddWithValue("@INCREMENT_VALUE", tB_admin.INCREMENT_VALUE);
                cmd.Parameters.AddWithValue("@INCREMENT_DATE", tB_admin.INCREMENT_DATE);
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

        public static int GetSalaryIncrementTotalRecordCount(SearchSalaryWagesParams tb_params)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("GetSalaryIncrementTotalRecordCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                
                cmd.Parameters.AddWithValue("@EMP_ID", tb_params.EMP_ID);
                cmd.Parameters.AddWithValue("@SEARCH_NAME", tb_params.SEARCH_NAME);
                cmd.Parameters.AddWithValue("@STARTING_DATE", tb_params.START_DATE);
                cmd.Parameters.AddWithValue("@ENDING_DATE", tb_params.END_DATE);
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

        public static List<SalaryIncrement> GetSalaryIncrementList(SearchSalaryWagesParams tb_params)
        {

            cmd = new SqlCommand("SP_GetSalaryIncrementList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tb_params.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tb_params.PageNo - 1);
            cmd.Parameters.AddWithValue("@EMP_ID", tb_params.EMP_ID);
            cmd.Parameters.AddWithValue("@SEARCH_NAME", tb_params.SEARCH_NAME);
            cmd.Parameters.AddWithValue("@STARTING_DATE", tb_params.START_DATE);
            cmd.Parameters.AddWithValue("@ENDING_DATE", tb_params.END_DATE);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            SalaryIncrement rt;
            List<SalaryIncrement> FinalreportList = new List<SalaryIncrement>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new SalaryIncrement();
                    try
                    {
                        rt.ESI_ID = Convert.ToInt32(dt.Rows[i]["ESI_ID"]);
                        rt.EMP_ID = Convert.ToInt32(dt.Rows[i]["EMP_ID"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"]).ToString();
                        rt.BASIC_SALARY = Convert.ToDecimal(dt.Rows[i]["BASIC_SALARY"]);
                        rt.INCREMENT_VALUE = Convert.ToDecimal(dt.Rows[i]["INCREMENT_VALUE"]);
                        rt.INCREMENT_DATE = (dt.Rows[i]["INCREMENT_DATE"]).ToString();
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

        public static DataTable SalaryIncrementExport(SearchSalaryWagesParams tb_params)
        {
            try
            {
                cmd = new SqlCommand("SP_GetSalaryIncrementListExport", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PageSize", tb_params.PageSize);
                cmd.Parameters.AddWithValue("@PageNo", tb_params.PageNo - 1);
                cmd.Parameters.AddWithValue("@EMP_ID", tb_params.EMP_ID);
                cmd.Parameters.AddWithValue("@SEARCH_NAME", tb_params.SEARCH_NAME);
                cmd.Parameters.AddWithValue("@STARTING_DATE", tb_params.START_DATE);
                cmd.Parameters.AddWithValue("@ENDING_DATE", tb_params.END_DATE);
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                dt = new DataTable();
                sda = new SqlDataAdapter(cmd);
                sda.Fill(dt);
                con.Close();
                return dt;

            }
            catch (Exception ex)
            {
                return null;
            }
            
        }
    }
}