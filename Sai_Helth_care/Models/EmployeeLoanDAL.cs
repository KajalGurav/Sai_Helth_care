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
    public class EmployeeLoanDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public static int AddUpdateEmployeeLoan(EmployeeLoan tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Panel_Insert_TB_EmployeeLoan", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID);
                cmd.Parameters.AddWithValue("@LOAN_AMOUNT", tB_admin.LOAN_AMOUNT);
                cmd.Parameters.AddWithValue("@INTREST_RATE", tB_admin.INTREST_RATE);
                cmd.Parameters.AddWithValue("@INSTALLMENT_AMOUNT", tB_admin.INSTALLMENT_AMOUNT);
                cmd.Parameters.AddWithValue("@LOAN_OUTSTANDING", tB_admin.LOAN_OUTSTANDING);
                cmd.Parameters.AddWithValue("@REASON", tB_admin.REASON);
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

        public static int GetEmployeeLoanTotalRecordCount(SearchSalaryWagesParams tb_params)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("Panel_Get_TB_EmployeeLoan_Count", con);
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

        public static List<EmployeeLoan> GetEmployeeLoanList(SearchSalaryWagesParams tb_params)
        {

            cmd = new SqlCommand("SP_Panel_Get_TB_EmployeeLoan", con);
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
            EmployeeLoan rt;
            List<EmployeeLoan> FinalreportList = new List<EmployeeLoan>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new EmployeeLoan();
                    try
                    {
                        rt.EMP_LOAN_ID = Convert.ToInt64(dt.Rows[i]["EMP_LOAN_ID"]);
                        rt.EMP_ID = Convert.ToInt64(dt.Rows[i]["EMP_ID"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"]).ToString();
                        rt.LOAN_AMOUNT = Convert.ToInt64(dt.Rows[i]["LOAN_AMOUNT"]);
                        rt.INTREST_RATE = Convert.ToInt64(dt.Rows[i]["INTREST_RATE"]);
                        rt.INSTALLMENT_AMOUNT = Convert.ToInt64(dt.Rows[i]["INSTALLMENT_AMOUNT"]);
                        rt.LOAN_OUTSTANDING = Convert.ToInt64(dt.Rows[i]["LOAN_OUTSTANDING"]);
                        rt.REASON = (dt.Rows[i]["REASON"]).ToString();
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

        public static List<EmployeeLoan> GetEmployeeLoanDetailList(SearchSalaryWagesParams tb_params)
        {

            cmd = new SqlCommand("PANEL_GET_EMP_LOAN_DETAILS", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_LOAN_ID", tb_params.EMP_LOAN_ID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            EmployeeLoan rt;
            List<EmployeeLoan> FinalreportList = new List<EmployeeLoan>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new EmployeeLoan();
                    try
                    {
                        rt.BASIC_SALARY = (dt.Rows[i]["BASIC_SALARY"]).ToString();
                        rt.SALARY_FOR_MONTH = (dt.Rows[i]["SALARY_FOR_MONTH"]).ToString();
                        rt.SALARY_FOR_YEAR = (dt.Rows[i]["SALARY_FOR_YEAR"]).ToString();
                        rt.PRESENT_DAYS = (dt.Rows[i]["PRESENT_DAYS"]).ToString();
                        rt.LOAN_INSTALLMENT = (dt.Rows[i]["LOAN_INSTALLMENT"]).ToString();
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