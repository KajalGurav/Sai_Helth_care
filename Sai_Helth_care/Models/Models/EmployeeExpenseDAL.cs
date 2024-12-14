using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class EmployeeExpenseDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public class SearchExpenseParams
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public long? EMP_ID { get; set; }
            public string EMP_NAME { get; set; }
            public string STARTING_DATE { get; set; }
            public string ENDING_DATE { get; set; }
        }

        public static int GetTotalRecordCount(SearchExpenseParams tb_params)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("GetExpenseTotalRecordCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMP_ID", tb_params.EMP_ID);
                cmd.Parameters.AddWithValue("@EMP_NAME", tb_params.EMP_NAME);
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

        public static List<EmployeeExpense> GetExpenseList(SearchExpenseParams tb_params)
        {
            cmd = new SqlCommand("Panel_GetExpenseList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tb_params.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tb_params.PageNo - 1);
            cmd.Parameters.AddWithValue("@EMP_ID", tb_params.EMP_ID);
            cmd.Parameters.AddWithValue("@EMP_NAME", tb_params.EMP_NAME);
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
            EmployeeExpense rt;
            List<EmployeeExpense> FinalreportList = new List<EmployeeExpense>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new EmployeeExpense();
                    try
                    {
                        rt.EXPENSE_ID = Convert.ToInt64(dt.Rows[i]["EXPENSE_ID"]);
                        rt.EMP_ID = Convert.ToInt64(dt.Rows[i]["EMP_ID"]);
                        rt.AMOUNT = Convert.ToDecimal(dt.Rows[i]["AMOUNT"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"].ToString());
                        rt.REMARK = (dt.Rows[i]["REMARK"].ToString());
                        rt.EXPENSE_TYPE = (dt.Rows[i]["EXPENSE_TYPE"].ToString());
                        rt.PHOTO = (dt.Rows[i]["PHOTO"].ToString());
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

        public static DataTable GetExpenseListExport(SearchExpenseParams tb_params)
        {
            try
            {
                cmd = new SqlCommand("Panel_GetExpenseListExport", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PageSize", tb_params.PageSize);
                cmd.Parameters.AddWithValue("@PageNo", tb_params.PageNo - 1);
                cmd.Parameters.AddWithValue("@EMP_ID", tb_params.EMP_ID);
                cmd.Parameters.AddWithValue("@EMP_NAME", tb_params.EMP_NAME);
                cmd.Parameters.AddWithValue("@STARTING_DATE", tb_params.STARTING_DATE);
                cmd.Parameters.AddWithValue("@ENDING_DATE", tb_params.ENDING_DATE);
                cmd.CommandTimeout = 3000000;
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
            catch(Exception)
            {
                return null;
            }
        }
    }
}