using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using static Sai_Helth_care.Models.QuotationDAL;

namespace Sai_Helth_care.Models
{
    public class ServiceCallRequestAssignDAL
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public class SearchServiceCallParams
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public int? CUSTOMER_TYPE_ID { get; set; }
            public long? CUSTOMER_ID { get; set; }
            public string CUSTOMER_NAME { get; set; }
            public string FIRM_NAME { get; set; }
            public int? CALL_PRIORITY_TYPE_ID { get; set; }
            public string CALL_STATUS { get; set; }
            public long? EMP_ID { get; set; }
            public string STARTING_DATE { get; set; }
            public string ENDING_DATE { get; set; }
        }


        public static int AddUpdateServiceCallRequestAssign(CustomerService tB_admin)
        {
            HttpContext context = HttpContext.Current;
            long id = Convert.ToInt64(context.Session["COMPANY_ID"]);
            try
            {
                cmd = new SqlCommand("InsertUpdateServiceCallRequestAssign", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@SERVICE_CALL_ID", tB_admin.SERVICE_CALL_ID);
                cmd.Parameters.AddWithValue("@SERVICE_CALL_NUMBER", tB_admin.SERVICE_CALL_NUMBER);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@F_ID", tB_admin.F_ID);
                cmd.Parameters.AddWithValue("@ADDRESS", tB_admin.ADDRESS);
                cmd.Parameters.AddWithValue("@CALL_ASSIGN_DATE", tB_admin.CALL_ASSIGN_DATE);
                cmd.Parameters.AddWithValue("@SCHEDULE_CALL_DATE", tB_admin.SCHEDULE_CALL_DATE);
                cmd.Parameters.AddWithValue("@P_ID", tB_admin.P_ID);
                cmd.Parameters.AddWithValue("@MED_ACC_ID", tB_admin.MED_ACC_ID);
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID);
                cmd.Parameters.AddWithValue("@CONTRACT_TYPE_ID", tB_admin.CONTRACT_TYPE_ID);
                cmd.Parameters.AddWithValue("@SERVICE_TYPE_ID", tB_admin.SERVICE_TYPE_ID);
                cmd.Parameters.AddWithValue("@CALL_PRIORITY_TYPE_ID", tB_admin.CALL_PRIORITY_TYPE_ID);
                cmd.Parameters.AddWithValue("@DESCRIPTION", tB_admin.DESCRIPTION);
                cmd.Parameters.AddWithValue("@ASSIGN_CALL_BY_ID", tB_admin.ASSIGN_CALL_BY_ID);
                cmd.Parameters.AddWithValue("@CALL_STATUS", tB_admin.CALL_STATUS);
                cmd.Parameters.AddWithValue("@SERVICE_FOR", tB_admin.SERVICE_FOR);
                cmd.Parameters.AddWithValue("@ACTION", tB_admin.ACTION);
                cmd.Parameters.AddWithValue("@ADMIN_ID", tB_admin.ADMIN_ID);
                cmd.Parameters.AddWithValue("@BANK_ID", tB_admin.BANK_ID);
                cmd.Parameters.AddWithValue("@EnqId", tB_admin.EnqId);
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);
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

        public static int GetServiceCallRequestAssignTotalRecordCount(SearchServiceCallParams tb_params)
        {
            int i = 0;
            HttpContext context = HttpContext.Current;
            long id = Convert.ToInt64(context.Session["COMPANY_ID"]);
            try
            {
                cmd = new SqlCommand("GetServiceCallRequestAssignTotalRecordCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tb_params.CUSTOMER_TYPE_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_params.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tb_params.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@FIRM_NAME", tb_params.FIRM_NAME);
                cmd.Parameters.AddWithValue("@CALL_PRIORITY_TYPE_ID", tb_params.CALL_PRIORITY_TYPE_ID);
                cmd.Parameters.AddWithValue("@CALL_STATUS", tb_params.CALL_STATUS);
                cmd.Parameters.AddWithValue("@EMP_ID", tb_params.EMP_ID);
                cmd.Parameters.AddWithValue("@STARTING_DATE", tb_params.STARTING_DATE);
                cmd.Parameters.AddWithValue("@ENDING_DATE", tb_params.ENDING_DATE);
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);

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
        
        public static List<CustomerService> GetServiceCallRequestAssignList(SearchServiceCallParams tb_params)
        {
            HttpContext context = HttpContext.Current;
            long id = Convert.ToInt64(context.Session["COMPANY_ID"]);

            cmd = new SqlCommand("SP_GetServiceCallRequestAssignList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tb_params.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tb_params.PageNo - 1);
            cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tb_params.CUSTOMER_TYPE_ID);
            cmd.Parameters.AddWithValue("@CUSTOMER_ID", tb_params.CUSTOMER_ID);
            cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tb_params.CUSTOMER_NAME);
            cmd.Parameters.AddWithValue("@FIRM_NAME", tb_params.FIRM_NAME);
            cmd.Parameters.AddWithValue("@CALL_PRIORITY_TYPE_ID", tb_params.CALL_PRIORITY_TYPE_ID);
            cmd.Parameters.AddWithValue("@CALL_STATUS", tb_params.CALL_STATUS);
            cmd.Parameters.AddWithValue("@EMP_ID", tb_params.EMP_ID);
            cmd.Parameters.AddWithValue("@STARTING_DATE", tb_params.STARTING_DATE);
            cmd.Parameters.AddWithValue("@ENDING_DATE", tb_params.ENDING_DATE);
            cmd.Parameters.AddWithValue("@COMPANY_ID", id);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            CustomerService rt;
            List<CustomerService> FinalreportList = new List<CustomerService>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new CustomerService();
                    try
                    {
                        rt.SERVICE_CALL_ID = Convert.ToInt32(dt.Rows[i]["SERVICE_CALL_ID"]);
                        rt.SERVICE_CALL_NUMBER = Convert.ToString(dt.Rows[i]["SERVICE_CALL_NUMBER"]);
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"]).ToString();
                        rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"]).ToString();
                        rt.CALL_ASSIGN_DATE = (dt.Rows[i]["CALL_ASSIGN_DATE"]).ToString();
                        rt.SCHEDULE_CALL_DATE = (dt.Rows[i]["SCHEDULE_CALL_DATE"]).ToString();
                        rt.CAT_NAME = (dt.Rows[i]["CAT_NAME"]).ToString();
                        rt.M_NAME = (dt.Rows[i]["M_NAME"]).ToString();
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"]).ToString();
                        rt.MED_ACC_NAME = (dt.Rows[i]["MED_ACC_NAME"]).ToString();
                        rt.SERVICE_ENGG_NAME = (dt.Rows[i]["SERVICE_ENGG_NAME"]).ToString();
                        rt.CALL_PRIORITY_TYPE_NAME = (dt.Rows[i]["CALL_PRIORITY_TYPE_NAME"]).ToString();
                        rt.CALL_STATUS = (dt.Rows[i]["CALL_STATUS"]).ToString();
                        rt.WORK_STATUS = (dt.Rows[i]["WORK_STATUS"]).ToString();
                        rt.SERVICE_REMARK = (dt.Rows[i]["SERVICE_REMARK"]).ToString();
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                        rt.BANK_ID = (dt.Rows[i]["BANK_ID"]) is DBNull ? (long?) null : Convert.ToInt64(dt.Rows[i]["BANK_ID"]);
                        
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }
            }
            return FinalreportList;
        }

        public static CustomerService GetServiceCallRequestAssignForUpdate(long serviceCallID)
        {
            cmd = new SqlCommand("SP_ServiceCallRequestAssignForUpdate", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SERVICE_CALL_ID", serviceCallID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();

            CustomerService rt;
            rt = new CustomerService();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    try
                    {
                        rt.SERVICE_CALL_ID = Convert.ToInt64(dt.Rows[i]["SERVICE_CALL_ID"]);
                        rt.SERVICE_CALL_NUMBER = Convert.ToString(dt.Rows[i]["SERVICE_CALL_NUMBER"]);
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.F_ID = dt.Rows[i]["F_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["F_ID"]);
                        rt.ADDRESS = (dt.Rows[i]["ADDRESS"]).ToString();                        
                        rt.CALL_ASSIGN_DATE = (dt.Rows[i]["CALL_ASSIGN_DATE"]).ToString();
                        rt.SCHEDULE_CALL_DATE = (dt.Rows[i]["SCHEDULE_CALL_DATE"]).ToString();
                        rt.CAT_ID = dt.Rows[i]["CAT_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        rt.M_ID = dt.Rows[i]["M_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["M_ID"]);
                        rt.P_ID = dt.Rows[i]["P_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.MED_ACC_ID = dt.Rows[i]["MED_ACC_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["MED_ACC_ID"]);
                        rt.EMP_ID = dt.Rows[i]["EMP_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["EMP_ID"]);
                        rt.CONTRACT_TYPE_ID = dt.Rows[i]["CONTRACT_TYPE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["CONTRACT_TYPE_ID"]);
                        rt.SERVICE_TYPE_ID = dt.Rows[i]["SERVICE_TYPE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["SERVICE_TYPE_ID"]);
                        rt.CALL_PRIORITY_TYPE_ID = dt.Rows[i]["CALL_PRIORITY_TYPE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["CALL_PRIORITY_TYPE_ID"]);
                        rt.DESCRIPTION = (dt.Rows[i]["DESCRIPTION"]).ToString();                        
                        rt.SERVICE_FOR = (dt.Rows[i]["SERVICE_FOR"]).ToString();                        
                        rt.ASSIGN_CALL_BY_ID = dt.Rows[i]["ASSIGN_CALL_BY_ID"] is DBNull ? (long?)null : Convert.ToInt32(dt.Rows[i]["ASSIGN_CALL_BY_ID"]);
                        rt.CALL_STATUS = (dt.Rows[i]["CALL_STATUS"]).ToString();
                        rt.BANK_ID = (dt.Rows[i]["BANK_ID"]) is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["BANK_ID"]);
                        
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
            return rt;
        }


        public static ServiceCallReportPrint GetServiceCallDetailsForPrint(long serviceCallID)
        {
            cmd = new SqlCommand("Proc_GetServiceCallReportPrintDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SERVICE_CALL_ID", serviceCallID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();

            DataSet ds = new DataSet();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(ds);

            DataTable dt = new DataTable();
            dt = ds.Tables[0];

            DataTable dt_part = new DataTable();
            dt_part = ds.Tables[1];
            con.Close();

            ServiceCallReportPrint rt;
            rt = new ServiceCallReportPrint();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    try
                    {
                        rt.SERVICE_CALL_ID = Convert.ToInt64(dt.Rows[i]["SERVICE_CALL_ID"]);
                        rt.SERVICE_CALL_NUMBER = Convert.ToString(dt.Rows[i]["SERVICE_CALL_NUMBER"]);
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"]).ToString();
                        rt.F_ID = dt.Rows[i]["F_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["F_ID"]);
                        rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"]).ToString();
                        rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.BILLING_ADDRESS = (dt.Rows[i]["BILLING_ADDRESS"]).ToString();
                        rt.EMAIL = (dt.Rows[i]["EMAIL"]).ToString();
                        rt.CITY_NAME = (dt.Rows[i]["CITY_NAME"]).ToString();
                        rt.STATE_NAME = (dt.Rows[i]["STATE_NAME"]).ToString();
                        rt.MOBILE_NO = (dt.Rows[i]["MOBILE_NO"]).ToString();
                        rt.ADDRESS = (dt.Rows[i]["ADDRESS"]).ToString();
                        rt.CALL_ASSIGN_DATE = (dt.Rows[i]["CALL_ASSIGN_DATE"]).ToString();
                        rt.SCHEDULE_CALL_DATE = (dt.Rows[i]["SCHEDULE_CALL_DATE"]).ToString();
                        rt.CAT_ID = dt.Rows[i]["CAT_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        rt.M_ID = dt.Rows[i]["M_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["M_ID"]);
                        rt.P_ID = dt.Rows[i]["P_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.CAT_NAME = (dt.Rows[i]["CAT_NAME"]).ToString();
                        rt.M_NAME = (dt.Rows[i]["M_NAME"]).ToString();
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"]).ToString();
                        rt.DESCRIPTION = (dt.Rows[i]["DESCRIPTION"]).ToString();
                        rt.EMP_ID = dt.Rows[i]["EMP_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["EMP_ID"]);
                        rt.SERVICE_ENGG_NAME = (dt.Rows[i]["SERVICE_ENGG_NAME"]).ToString();
                        rt.ASSIGN_CALL_BY_ID = dt.Rows[i]["ASSIGN_CALL_BY_ID"] is DBNull ? (long?)null : Convert.ToInt32(dt.Rows[i]["ASSIGN_CALL_BY_ID"]);
                        rt.ASSIGN_CALL_BY_NAME = (dt.Rows[i]["ASSIGN_CALL_BY_NAME"]).ToString();
                        rt.CONTRACT_TYPE_ID = dt.Rows[i]["CONTRACT_TYPE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["CONTRACT_TYPE_ID"]);
                        rt.CONTRACT_TYPE_NAME = (dt.Rows[i]["CONTRACT_TYPE_NAME"]).ToString();
                        rt.SERVICE_TYPE_ID = dt.Rows[i]["SERVICE_TYPE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["SERVICE_TYPE_ID"]);
                        rt.SERVICE_TYPE = (dt.Rows[i]["SERVICE_TYPE"]).ToString();
                        rt.CALL_PRIORITY_TYPE_ID = dt.Rows[i]["CALL_PRIORITY_TYPE_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["CALL_PRIORITY_TYPE_ID"]);
                        rt.CALL_PRIORITY_TYPE_NAME = (dt.Rows[i]["CALL_PRIORITY_TYPE_NAME"]).ToString();
                        rt.SERVICE_FOR = (dt.Rows[i]["SERVICE_FOR"]).ToString();
                        rt.CALL_STATUS = (dt.Rows[i]["CALL_STATUS"]).ToString();
                        rt.WORK_STATUS = (dt.Rows[i]["WORK_STATUS"]).ToString();
                        rt.BANK_ID = (dt.Rows[i]["BANK_ID"]) is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["BANK_ID"]);
                        rt.MED_ACC_ID = dt.Rows[i]["MED_ACC_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["MED_ACC_ID"]);
                        rt.PROBLEM_DESCRIPTION = (dt.Rows[i]["PROBLEM_DESCRIPTION"]).ToString();
                        rt.SOLUTION_DESCRIPTION = (dt.Rows[i]["SOLUTION_DESCRIPTION"]).ToString();
                        rt.SERVICE_REMARK = (dt.Rows[i]["SERVICE_REMARK"]).ToString();
                        rt.sparePartsList = ServiceCall_Parts(dt_part);
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
            return rt;
        }

        public static List<SparePartDetails> ServiceCall_Parts(DataTable dt)
        {
            SparePartDetails rt;
            List<SparePartDetails> FinalreportList = new List<SparePartDetails>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new SparePartDetails();
                    try
                    {
                        rt.SERVICE_CALL_ID = Convert.ToInt64(dt.Rows[i]["SERVICE_CALL_ID"]);
                        rt.SP_ID = (dt.Rows[i]["SP_ID"]) is DBNull ? (long?) null: Convert.ToInt64(dt.Rows[i]["SP_ID"]);
                        rt.SPARE_PART = (dt.Rows[i]["SPARE_PART"].ToString());
                        rt.QUANTITY = Convert.ToInt32(dt.Rows[i]["QUANTITY"]);
                        rt.AMOUNT = dt.Rows[i]["AMOUNT"] is DBNull ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["AMOUNT"]);
                        rt.HSN_CODE = (dt.Rows[i]["HSN_CODE"].ToString());

                        FinalreportList.Add(rt);
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
            return FinalreportList;
        }
    }
}