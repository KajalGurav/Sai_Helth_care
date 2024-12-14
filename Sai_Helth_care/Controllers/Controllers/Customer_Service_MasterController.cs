using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using Sai_Helth_care.Models;
using System.Web.Mvc;
using static Sai_Helth_care.Models.ServiceCallRequestAssignDAL;
using System.Text;

namespace Sai_Helth_care.Controllers
{
    public class Customer_Service_MasterController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        // GET: Customer_Service_Master
        [VerifyUserAttribute]
        public ActionResult Index()
        {
            return View();
        }
        [VerifyUserAttribute]
        public ActionResult ServiceCallAddUpdate()
        {
            return View();
        }

        [VerifyUserAttribute]
        public class Search_Admin
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public string FARMER_NAME { get; set; }
            public string STATE_ID { get; set; }
            public string STARTING_DATE { get; set; }
            public string ENDING_DATE { get; set; }
        }

        [VerifyUserAttribute]
        public JsonResult TotalRecordCount(SearchServiceCallParams tB_Admin)
        {
            try
            {
                int count = ServiceCallRequestAssignDAL.GetServiceCallRequestAssignTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [VerifyUserAttribute]
        public JsonResult GetAllServiceCallRequestAssign(SearchServiceCallParams tB_Admin)
        {

            try
            {
                var customerList = ServiceCallRequestAssignDAL.GetServiceCallRequestAssignList(tB_Admin);
                return Json(customerList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [VerifyUserAttribute]
        public ActionResult AddUpdateServiceCallRequestAssign(CustomerService tB_admin)
        {
            try
            {
                long adminId = Convert.ToInt64(Session["EMP_ID"]);
                tB_admin.ASSIGN_CALL_BY_ID = adminId;
                tB_admin.ADMIN_ID = adminId;
                int i = ServiceCallRequestAssignDAL.AddUpdateServiceCallRequestAssign(tB_admin);
                if (i == -1)
                {
                    return Json(new { success = false });
                }
                else
                {
                    return Json(new { success = true });
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [VerifyUserAttribute]
        public JsonResult GetServiceCallRequestAssignForUpdate(long serviceCallID)
        {
            try
            {
                var deliveryChallanList = ServiceCallRequestAssignDAL.GetServiceCallRequestAssignForUpdate(serviceCallID);
                return Json(deliveryChallanList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [VerifyUserAttribute]
        public JsonResult GetPriorityList()
        {
            try
            {
                var priorityList = db.TB_CallPriorityType.Where(x => x.STATUS == true).Select(a => new { a.CALL_PRIORITY_TYPE_ID, a.CALL_PRIORITY_TYPE_NAME }).ToList();
                return Json(priorityList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [VerifyUserAttribute]
        public JsonResult GetCallStatusList()
        {
            try
            {
                var callStatusList = db.TB_StatusMaster.Where(x => x.ACTIVE_STATUS == true).Select(a => new { a.ID, a.STATUS_NAME }).ToList();
                return Json(callStatusList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [VerifyUserAttribute]
        public JsonResult GetContractTypeList()
        {
            try
            {
                var contractTypeList = db.TB_ContractType.Where(x => x.STATUS == true).Select(a => new { a.CONTRACT_TYPE_ID, a.CONTRACT_TYPE_NAME }).ToList();
                return Json(contractTypeList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [VerifyUserAttribute]
        public JsonResult GetServiceTypeList()
        {
            try
            {
                var serviceTypeList = db.TB_ServiceType.Where(x => x.STATUS == true).Select(a => new { a.SERVICE_TYPE_ID, a.SERVICE_TYPE_NAME }).ToList();
                return Json(serviceTypeList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [VerifyUserAttribute]
        public ActionResult ServiceCallExport(SearchServiceCallParams tB_Admin)
        {
            StringBuilder sb = new StringBuilder();
            string sFileName = "Service Call Report.xls";
            sb.Append("<table style='1px solid black; font-size:12px;' border='1'>");
            sb.Append("<tr>");
            sb.Append("<td><b>Sr No</b></td>");
            sb.Append("<td><b>Service Call No.</b></td>");
            sb.Append("<td><b>Customer Name</b></td>");
            sb.Append("<td><b>Firm Name</b></td>");
            sb.Append("<td><b>Call Assign Date</b></td>");
            sb.Append("<td><b>Schedule Call Date</b></td>");

           
            if (tB_Admin.CUSTOMER_TYPE_ID != 3)
            {
                sb.Append("<td><b>Product</b></td>");
                sb.Append("<td><b>Manufacturer</b></td>");
            }

            sb.Append("<td><b>Model</b></td>");

            if (tB_Admin.CUSTOMER_TYPE_ID == 3)
            {
                sb.Append("<td><b>Accessory Name</b></td>");
            }

            sb.Append("<td><b>Service Engg. Name</b></td>");
            sb.Append("<td><b>Call Priority</b></td>");
            sb.Append("<td><b>Call Status</b></td>");
            sb.Append("<td><b>Work Status</b></td>");
            sb.Append("<td><b>Service Remark</b></td>");
            sb.Append("</tr>");

            cmd = new SqlCommand("SP_GetServiceCallRequestAssignListExport", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CUSTOMER_TYPE_ID", tB_Admin.CUSTOMER_TYPE_ID);
            cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_Admin.CUSTOMER_ID);
            cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tB_Admin.CUSTOMER_NAME);
            cmd.Parameters.AddWithValue("@FIRM_NAME", tB_Admin.FIRM_NAME);
            cmd.Parameters.AddWithValue("@CALL_PRIORITY_TYPE_ID", tB_Admin.CALL_PRIORITY_TYPE_ID);
            cmd.Parameters.AddWithValue("@CALL_STATUS", tB_Admin.CALL_STATUS);
            cmd.Parameters.AddWithValue("@EMP_ID", tB_Admin.EMP_ID);
            cmd.Parameters.AddWithValue("@STARTING_DATE", tB_Admin.STARTING_DATE);
            cmd.Parameters.AddWithValue("@ENDING_DATE", tB_Admin.ENDING_DATE);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();


            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {


                    sb.Append("<tr>");
                    sb.Append("<td>" + (i + 1) + "</td>");
                    sb.Append("<td>" + dt.Rows[i]["SERVICE_CALL_NUMBER"] + "</td>");
                    sb.Append("<td>" + dt.Rows[i]["CUSTOMER_NAME"] + "</td>");
                    sb.Append("<td>" + dt.Rows[i]["FIRM_NAME"] + "</td>");
                    sb.Append("<td>" + dt.Rows[i]["CALL_ASSIGN_DATE"] + "</td>");
                    sb.Append("<td>" + dt.Rows[i]["SCHEDULE_CALL_DATE"] + "</td>");

                    if (tB_Admin.CUSTOMER_TYPE_ID != 3)
                    {
                        sb.Append("<td>" + dt.Rows[i]["CAT_NAME"] + "</td>");
                        sb.Append("<td>" + dt.Rows[i]["M_NAME"] + "</td>");
                    }

                    sb.Append("<td>" + dt.Rows[i]["PRODUCT_NAME"] + "</td>");

                    if (tB_Admin.CUSTOMER_TYPE_ID == 3)
                    {
                        sb.Append("<td>" + dt.Rows[i]["MED_ACC_NAME"] + "</td>");
                    }

                    sb.Append("<td>" + dt.Rows[i]["SERVICE_ENGG_NAME"] + "</td>");
                    sb.Append("<td>" + dt.Rows[i]["CALL_PRIORITY_TYPE_NAME"] + "</td>");
                    sb.Append("<td>" + dt.Rows[i]["CALL_STATUS"] + "</td>");
                    sb.Append("<td>" + dt.Rows[i]["WORK_STATUS"] + "</td>");
                    sb.Append("<td>" + dt.Rows[i]["SERVICE_REMARK"] + "</td>");
                    sb.Append("</tr>");
                }
            }
            sb.Append("</table>");

            HttpContext.Response.AddHeader("content-disposition", "attachment;  filename = " + sFileName);
            this.Response.ContentType = "application/vnd.ms-excel";
            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(sb.ToString());
            return File(buffer, "application/vnd.ms-excel");
        }


        public ActionResult ServiceCallReport()
        {
            return View();
        }

        public JsonResult GetServiceCallReportForPrint(long serviceCallID)
        {
            try
            {
                var serviceCallReportList = ServiceCallRequestAssignDAL.GetServiceCallDetailsForPrint(serviceCallID);
                return Json(serviceCallReportList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public JsonResult GetEmployee()
        {
            long id = Convert.ToInt64(Session["COMPANY_ID"]);

            if (id == 0)
            {
                var _getadmin = db.Tb_EmployeeMaster.Where(z => z.STATUS == "Active" && z.DEPARTMENT_ID==7)
                .OrderBy(x => x.EMP_NAME)
                .Select(s => new { s.EMP_ID, s.EMP_NAME }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var _getadmin = db.Tb_EmployeeMaster.Where(z => z.STATUS == "Active" && z.COMPANY_ID == id && z.DEPARTMENT_ID == 7)
                .OrderBy(x => x.EMP_NAME)
                .Select(s => new { s.EMP_ID, s.EMP_NAME }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult GetCmpnyBankDetails(long bankid)
        {
            var _Monthlyreport = CommonCode.GetProducQotatDetails.GetBankDetailsById(0, bankid);
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }
        
    }
}