using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using System.Configuration;

namespace Sai_Helth_care.Controllers
{
    public class ServiceCallRequestController : Controller
    {
        // GET: ServiceCallRequest
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        public ActionResult Index()
        {
            return View();
        }

        public class Search_Admin
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public string ADMIN_SEARCH { get; set; }
            public string START_DATE { get; set; }
            public string END_DATE { get; set; }
        }

        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("Panel_GetServiceRequestCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ADMIN_SEARCH", tB_Admin.ADMIN_SEARCH);
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
            return Json(new { success = i }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetallCustomerRequest(Search_Admin tB_Admin)
        {
            cmd = new SqlCommand("Panel_GetServiceRequest", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@ADMIN_SEARCH", tB_Admin.ADMIN_SEARCH);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            ServiceCallRequest rt;
            List<ServiceCallRequest> FinalreportList = new List<ServiceCallRequest>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new ServiceCallRequest();
                    try
                    {
                        rt.CustomerEnquiry_ID = Convert.ToInt64(dt.Rows[i]["CustomerEnquiry_ID"]);
                        rt.Customer_ID = Convert.ToInt64(dt.Rows[i]["Customer_ID"]);
                        rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.PRODUCT_TYPE = (dt.Rows[i]["PRODUCT_TYPE"].ToString());
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"].ToString());
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"].ToString());
                        rt.CUSTOMER_REMARK = (dt.Rows[i]["CUSTOMER_REMARK"].ToString());
                        rt.ENQUIRY_STATUS = (dt.Rows[i]["ENQUIRY_STATUS"].ToString());
                        rt.COMPANY_NAME = (dt.Rows[i]["COMPANY_NAME"].ToString());
                        rt.CAT_NAME = (dt.Rows[i]["CAT_NAME"].ToString());
                        rt.M_NAME = (dt.Rows[i]["M_NAME"].ToString());
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }

            }
            var _Monthlyreport = FinalreportList;
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }
    }
}