using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;

namespace Sai_Helth_care.Models
{
    public class SolutionBankDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public class SearchSolutionBankParams
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public int P_ID { get; set; }
            public string SEARCH_NAME { get; set; }
        }


        public static int UpdateSolutionBankAnswer(SolutionBank tB_admin)
        {
            try
            {
                cmd = new SqlCommand("SP_UpdateSolutionBankAnswer", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@SB_ID", tB_admin.SB_ID);
                cmd.Parameters.AddWithValue("@SOLUTION_DESCRIPTION", tB_admin.SOLUTION_DESCRIPTION); 
                cmd.Parameters.AddWithValue("@SOLUTION_PROVIDER_ID", tB_admin.SOLUTION_PROVIDER_ID);
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

        public static int GetSolutionBankTotalRecordCount(SearchSolutionBankParams tb_params)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("GetSolutionBankTotalRecordCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@P_ID", tb_params.P_ID);
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

        public static List<SolutionBank> GetSolutionBankList(SearchSolutionBankParams tb_params)
        {
            cmd = new SqlCommand("SP_GetSolutionBankList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tb_params.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tb_params.PageNo - 1);
            cmd.Parameters.AddWithValue("@P_ID", tb_params.P_ID);
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
            SolutionBank rt;
            List<SolutionBank> FinalreportList = new List<SolutionBank>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new SolutionBank();
                    try
                    {
                        rt.SB_ID = Convert.ToInt32(dt.Rows[i]["SB_ID"]);
                        rt.P_ID = Convert.ToInt32(dt.Rows[i]["P_ID"]);
                        rt.CAT_NAME = (dt.Rows[i]["CAT_NAME"]).ToString();
                        rt.M_NAME = (dt.Rows[i]["M_NAME"]).ToString();
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"]).ToString();
                        rt.SERVICE_ENGG_ID = Convert.ToInt32(dt.Rows[i]["SERVICE_ENGG_ID"]);
                        rt.SEVICE_ENGG_NAME = (dt.Rows[i]["SEVICE_ENGG_NAME"]).ToString();
                        rt.PROBLEM_DESCRIPTION = (dt.Rows[i]["PROBLEM_DESCRIPTION"]).ToString();
                        rt.SOLUTION_DESCRIPTION = (dt.Rows[i]["SOLUTION_DESCRIPTION"]).ToString();
                        rt.SOLUTION_PROVIDER_ID = dt.Rows[i]["SOLUTION_PROVIDER_ID"] is DBNull ? (long?)null : Convert.ToInt32(dt.Rows[i]["SOLUTION_PROVIDER_ID"]);
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