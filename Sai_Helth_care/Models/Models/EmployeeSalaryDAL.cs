using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using static Sai_Helth_care.Models.SalaryWages;
using static Sai_Helth_care.Models.EmployeeLoan;

namespace Sai_Helth_care.Models
{
    public class EmployeeSalaryDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public static int AddUpdateEmployeeSalary(EmployeeSalary tB_admin)
        {
            try
            {
                cmd = new SqlCommand("InsertUpdate_TB_EmployeeSalary", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@SALARY_ID", tB_admin.SALARY_ID);
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID);
                cmd.Parameters.AddWithValue("@BASIC_SALARY", tB_admin.BASIC_SALARY);
                cmd.Parameters.AddWithValue("@SALARY_FOR_MONTH", tB_admin.SALARY_FOR_MONTH);
                cmd.Parameters.AddWithValue("@SALARY_FOR_YEAR", tB_admin.SALARY_FOR_YEAR);
                cmd.Parameters.AddWithValue("@SALARY_DATE", tB_admin.SALARY_DATE);
                cmd.Parameters.AddWithValue("@PRESENT_DAYS", tB_admin.PRESENT_DAYS);
                cmd.Parameters.AddWithValue("@ADVANCE_SALARY", tB_admin.ADVANCE_SALARY);
                cmd.Parameters.AddWithValue("@EMP_LOAN_ID", tB_admin.EMP_LOAN_ID);
                cmd.Parameters.AddWithValue("@LOAN_INSTALLMENT", tB_admin.LOAN_INSTALLMENT);
                cmd.Parameters.AddWithValue("@CURRENT_MOBILE_BILL", tB_admin.CURRENT_MOBILE_BILL);
                cmd.Parameters.AddWithValue("@EXTRA_MOBILE_BILL", tB_admin.EXTRA_MOBILE_BILL);
                cmd.Parameters.AddWithValue("@INCENTIVE_AMOUNT", tB_admin.INCENTIVE_AMOUNT);
                cmd.Parameters.AddWithValue("@BONUS_DETAILS_TOTAL_SALARY", tB_admin.BONUS_DETAILS_TOTAL_SALARY);
                cmd.Parameters.AddWithValue("@BONUS_PERCENTAGE", tB_admin.BONUS_PERCENTAGE);
                cmd.Parameters.AddWithValue("@SALARY_BONUS", tB_admin.SALARY_BONUS);
                cmd.Parameters.AddWithValue("@IS_SALARY_HOLD", tB_admin.IS_SALARY_HOLD);
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

        public static int GetEmployeeSalaryTotalRecordCount(SearchSalaryWagesParams tb_params)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("GetEmployeeSalaryTotalRecordCount", con);
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

        public static List<EmployeeSalary> GetEmployeeSalaryList(SearchSalaryWagesParams tb_params)
        {

            cmd = new SqlCommand("SP_GetEmployeeSalaryList", con);
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
            EmployeeSalary rt;
            List<EmployeeSalary> FinalreportList = new List<EmployeeSalary>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new EmployeeSalary();
                    try
                    {
                        rt.SALARY_ID = Convert.ToInt32(dt.Rows[i]["LEAVE_ID"]);
                        rt.EMP_ID = Convert.ToInt64(dt.Rows[i]["EMP_ID"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"]).ToString();
                        rt.BASIC_SALARY = Convert.ToDecimal(dt.Rows[i]["BASIC_SALARY"]);
                        rt.SALARY_FOR_MONTH = (dt.Rows[i]["SALARY_FOR_MONTH"]).ToString();
                        rt.SALARY_FOR_YEAR = Convert.ToInt32(dt.Rows[i]["SALARY_FOR_YEAR"]);
                        rt.SALARY_DATE = (dt.Rows[i]["SALARY_DATE"]).ToString();
                        rt.PRESENT_DAYS = Convert.ToInt32(dt.Rows[i]["PRESENT_DAYS"]);
                        rt.ADVANCE_SALARY = Convert.ToDecimal(dt.Rows[i]["ADVANCE_SALARY"]);
                        rt.EMP_LOAN_ID = dt.Rows[i]["EMP_LOAN_ID"] is DBNull ? (int?)null: Convert.ToInt32(dt.Rows[i]["EMP_LOAN_ID"]);
                        rt.LOAN_INSTALLMENT = dt.Rows[i]["LOAN_INSTALLMENT"] is DBNull ? (decimal?)null: Convert.ToDecimal(dt.Rows[i]["LOAN_INSTALLMENT"]);
                        rt.CURRENT_MOBILE_BILL = dt.Rows[i]["CURRENT_MOBILE_BILL"] is DBNull ? (decimal?)null: Convert.ToDecimal(dt.Rows[i]["CURRENT_MOBILE_BILL"]);
                        rt.EXTRA_MOBILE_BILL = dt.Rows[i]["EXTRA_MOBILE_BILL"] is DBNull ? (decimal?)null: Convert.ToDecimal(dt.Rows[i]["EXTRA_MOBILE_BILL"]);
                        rt.INCENTIVE_AMOUNT = dt.Rows[i]["INCENTIVE_AMOUNT"] is DBNull ? (decimal?)null: Convert.ToDecimal(dt.Rows[i]["INCENTIVE_AMOUNT"]);
                        rt.BONUS_DETAILS_TOTAL_SALARY = dt.Rows[i]["BONUS_DETAILS_TOTAL_SALARY"] is DBNull ? (decimal?)null: Convert.ToDecimal(dt.Rows[i]["BONUS_DETAILS_TOTAL_SALARY"]);
                        rt.BONUS_PERCENTAGE = dt.Rows[i]["BONUS_PERCENTAGE"] is DBNull ? (int?)null: Convert.ToInt32(dt.Rows[i]["BONUS_PERCENTAGE"]);
                        rt.SALARY_BONUS = dt.Rows[i]["SALARY_BONUS"] is DBNull ? (decimal?)null: Convert.ToDecimal(dt.Rows[i]["SALARY_BONUS"]);
                        rt.IS_SALARY_HOLD = Convert.ToInt32(dt.Rows[i]["IS_SALARY_HOLD"]);
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