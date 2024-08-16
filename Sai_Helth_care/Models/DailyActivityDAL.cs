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
    public class DailyActivityDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public static int AddUpdateDailyActivity(DailyActivity tB_admin)
        {
            try
            {
                cmd = new SqlCommand("InsertUpdateDailyActivity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@DAILY_ACTIVITY_ID", tB_admin.DAILY_ACTIVITY_ID);
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID);
                cmd.Parameters.AddWithValue("@CITY_ID", tB_admin.CITY_ID);
                cmd.Parameters.AddWithValue("@ACTIVITY_DATE", tB_admin.ACTIVITY_DATE);
                cmd.Parameters.AddWithValue("@ACTIVITY_NOTE", tB_admin.ACTIVITY_NOTE);
                cmd.Parameters.AddWithValue("@ADMIN_NOTE", tB_admin.ADMIN_NOTE);
                cmd.Parameters.AddWithValue("@ACTION", tB_admin.ACTION);
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

        public static int GetDailyActivityTotalRecordCount(SearchSalaryWagesParams tb_params)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("GetDailyActivityTotalRecordCount", con);
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

        public static List<DailyActivity> GetDailyActivityList(SearchSalaryWagesParams tb_params)
        {

            cmd = new SqlCommand("SP_GetDailyActivityList", con);
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
            DailyActivity rt;
            List<DailyActivity> FinalreportList = new List<DailyActivity>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new DailyActivity();
                    try
                    {
                        rt.DAILY_ACTIVITY_ID = Convert.ToInt32(dt.Rows[i]["DAILY_ACTIVITY_ID"]);
                        rt.EMP_ID = Convert.ToInt32(dt.Rows[i]["EMP_ID"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"]).ToString();
                        rt.CITY_ID = Convert.ToInt32(dt.Rows[i]["CITY_ID"]);
                        rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"]).ToString();
                        rt.ACTIVITY_DATE = (dt.Rows[i]["ACTIVITY_DATE"]).ToString();
                        rt.ACTIVITY_NOTE = (dt.Rows[i]["ACTIVITY_NOTE"]).ToString();
                        rt.ADMIN_NOTE = (dt.Rows[i]["ADMIN_NOTE"]).ToString();
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