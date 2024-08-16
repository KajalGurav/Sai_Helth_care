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
    public class AdvancedSalaryDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public static int AddUpdateAdvancedSalary(AdvancedSalary tB_admin)
        {
            try
            {
                cmd = new SqlCommand("InsertUpdateAdvancedSalary", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EAS_ID", tB_admin.EAS_ID);
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID);
                cmd.Parameters.AddWithValue("@ADVANCE_AMOUNT", tB_admin.ADVANCE_AMOUNT);
                cmd.Parameters.AddWithValue("@ADVANCE_DATE", tB_admin.ADVANCE_DATE);
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

        public static int GetAdvancedSalaryTotalRecordCount(SearchSalaryWagesParams tb_params)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("GetAdvancedSalaryTotalRecordCount", con);
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

        public static List<AdvancedSalary> GetAdvancedSalaryList(SearchSalaryWagesParams tb_params)
        {

            cmd = new SqlCommand("SP_GetAdvancedSalaryList", con);
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
            AdvancedSalary rt;
            List<AdvancedSalary> FinalreportList = new List<AdvancedSalary>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new AdvancedSalary();
                    try
                    {
                        rt.EAS_ID = Convert.ToInt32(dt.Rows[i]["EAS_ID"]);
                        rt.EMP_ID = Convert.ToInt32(dt.Rows[i]["EMP_ID"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"]).ToString();
                        rt.ADVANCE_AMOUNT = Convert.ToDecimal(dt.Rows[i]["ADVANCE_AMOUNT"]);
                        rt.ADVANCE_DATE = (dt.Rows[i]["ADVANCE_DATE"]).ToString();
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


        public static DataTable AdvanceSalaryListExport(SearchSalaryWagesParams tb_params)
        {
            try
            {
                cmd = new SqlCommand("SP_GetAdvancedSalaryListExport", con);
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
            catch(Exception ex)
            {
                return  null;
            }
           
        }
    }
}