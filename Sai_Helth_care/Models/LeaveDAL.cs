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
    public class LeaveDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public static int AddUpdateLeave(Leave tB_admin)
        {
            try
            {
                cmd = new SqlCommand("InsertUpdate_TB_Leave", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@LEAVE_ID", tB_admin.LEAVE_ID);
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID);
                cmd.Parameters.AddWithValue("@APPLICATION_NO", tB_admin.APPLICATION_NO);
                cmd.Parameters.AddWithValue("@APPLICATION_DATE", tB_admin.APPLICATION_DATE);
                cmd.Parameters.AddWithValue("@LEAVE_CAT_ID", tB_admin.LEAVE_CAT_ID);
                cmd.Parameters.AddWithValue("@LEAVE_TYPE", tB_admin.LEAVE_TYPE);
                cmd.Parameters.AddWithValue("@LEAVE_FROM_DATE", tB_admin.LEAVE_FROM_DATE);
                cmd.Parameters.AddWithValue("@LEAVE_TO_DATE", tB_admin.LEAVE_TO_DATE);
                cmd.Parameters.AddWithValue("@LEAVE_IN_DAYS", tB_admin.LEAVE_IN_DAYS);
                cmd.Parameters.AddWithValue("@LEAVE_REASON", tB_admin.LEAVE_REASON);
                cmd.Parameters.AddWithValue("@LEAVE_STATUS_TYPE_ID", tB_admin.LEAVE_STATUS_TYPE_ID);
                cmd.Parameters.AddWithValue("@ACTION", tB_admin.ACTION);
                cmd.Parameters.AddWithValue("@ADMIN_ID", tB_admin.ADMIN_ID);
                cmd.Parameters.AddWithValue("@LEAVE_CANCEL_REMARK", tB_admin.LEAVE_CANCEL_REMARK);
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

        public static int GetLeaveTotalRecordCount(SearchSalaryWagesParams tb_params)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("GetLeaveTotalRecordCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@SEARCH_NAME", tb_params.SEARCH_NAME);
                cmd.Parameters.AddWithValue("@EMP_ID", tb_params.EMP_ID);
                cmd.Parameters.AddWithValue("@START_DATE", tb_params.START_DATE);
                cmd.Parameters.AddWithValue("@END_DATE", tb_params.END_DATE);
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

        public static List<Leave> GetLeaveList(SearchSalaryWagesParams tb_params)
        {

            cmd = new SqlCommand("SP_GetLeaveList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tb_params.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tb_params.PageNo - 1);
            cmd.Parameters.AddWithValue("@SEARCH_NAME", tb_params.SEARCH_NAME);
            cmd.Parameters.AddWithValue("@EMP_ID", tb_params.EMP_ID);
            cmd.Parameters.AddWithValue("@START_DATE", tb_params.START_DATE);
            cmd.Parameters.AddWithValue("@END_DATE", tb_params.END_DATE);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            Leave rt;
            List<Leave> FinalreportList = new List<Leave>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new Leave();
                    try
                    {
                        rt.LEAVE_ID = Convert.ToInt32(dt.Rows[i]["LEAVE_ID"]);
                        rt.EMP_ID = Convert.ToInt64(dt.Rows[i]["EMP_ID"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"]).ToString();
                        rt.APPLICATION_NO = (dt.Rows[i]["APPLICATION_NO"]).ToString();
                        rt.APPLICATION_DATE = (dt.Rows[i]["APPLICATION_DATE"]).ToString();
                        rt.LEAVE_FROM_DATE = (dt.Rows[i]["LEAVE_FROM_DATE"]).ToString();
                        rt.LEAVE_TO_DATE = (dt.Rows[i]["LEAVE_TO_DATE"]).ToString();
                        rt.LEAVE_CAT_ID = Convert.ToInt32(dt.Rows[i]["LEAVE_CAT_ID"]);
                        rt.LEAVE_CAT_NAME = (dt.Rows[i]["LEAVE_CAT_NAME"]).ToString();
                        rt.LEAVE_TYPE = (dt.Rows[i]["LEAVE_TYPE"]).ToString();
                        rt.LEAVE_IN_DAYS = Convert.ToInt32(dt.Rows[i]["LEAVE_IN_DAYS"]);
                        rt.LEAVE_REASON = (dt.Rows[i]["LEAVE_REASON"]).ToString();
                        rt.LEAVE_STATUS_TYPE_ID = dt.Rows[i]["LEAVE_STATUS_TYPE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["LEAVE_STATUS_TYPE_ID"]); 
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                        rt.LEAVE_STATUS_NAME = (dt.Rows[i]["LEAVE_STATUS_NAME"]).ToString();
                        rt.DEP_NAME = (dt.Rows[i]["DEP_NAME"]).ToString();
                        rt.DESI_NAME = (dt.Rows[i]["DESI_NAME"]).ToString();
                        rt.LEAVE_CANCEL_REMARK = (dt.Rows[i]["LEAVE_CANCEL_REMARK"]).ToString();
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