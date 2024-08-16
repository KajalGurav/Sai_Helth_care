using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sai_Helth_care.Models;
using System.Text;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class EmployeeTaskController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        public class Search_Admin
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public long? EMPLOYEE_ID { get; set; }
            public string START_DATE { get; set; }
            public string END_DATE { get; set; }
            public string EmployeeType { get; set; }
        }

        // GET: EmployeeTask
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("Panel_GetEmployeeTaskCount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMPLOYEE_ID", tB_Admin.EMPLOYEE_ID);
                cmd.Parameters.AddWithValue("@START_DATE", tB_Admin.START_DATE);
                cmd.Parameters.AddWithValue("@END_DATE", tB_Admin.END_DATE);
                cmd.Parameters.AddWithValue("@EmployeeType", tB_Admin.EmployeeType);
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

        public JsonResult GetallAdmin(Search_Admin tB_Admin)
        {
            cmd = new SqlCommand("Panel_GetEmployeeTaskList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
             cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@EMPLOYEE_ID", tB_Admin.EMPLOYEE_ID);
            cmd.Parameters.AddWithValue("@START_DATE", tB_Admin.START_DATE);
            cmd.Parameters.AddWithValue("@END_DATE", tB_Admin.END_DATE);
            cmd.Parameters.AddWithValue("@EmployeeType", tB_Admin.EmployeeType);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            EmployeeTaskMaster rt;
            List<EmployeeTaskMaster> FinalreportList = new List<EmployeeTaskMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new EmployeeTaskMaster();
                    try
                    {
                        rt.EmployeeTaskID = Convert.ToInt32(dt.Rows[i]["EmployeeTaskID"]);
                        rt.EmployeeId = Convert.ToInt64(dt.Rows[i]["EmployeeId"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"].ToString());
                        rt.EmployeeType = (dt.Rows[i]["EmployeeType"].ToString());
                        rt.Date = (dt.Rows[i]["Date"]).ToString();
                        rt.Location = (dt.Rows[i]["Location"].ToString());
                        rt.TodaysWork = (dt.Rows[i]["TodaysWork"]).ToString();
                        rt.Remark = (dt.Rows[i]["Remark"]).ToString();
                        rt.Status = (dt.Rows[i]["Status"]).ToString();
                        rt.RegDate = (dt.Rows[i]["RegDate"]).ToString();
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

        public ActionResult EmployeeTaskExport(Search_Admin tB_Admin)
        {
            StringBuilder sb = new StringBuilder();
            string sFileName = "Employee Task Report.xls";
            sb.Append("<table style='1px solid black; font-size:12px;' border='1'>");
            sb.Append("<tr>");
            sb.Append("<td><b>Sr No</b></td>");
            sb.Append("<td><b>Employee Name</b></td>");
            sb.Append("<td><b>Employee Type</b></td>");
            sb.Append("<td><b>Location</b></td>");
            sb.Append("<td><b>Todays Work</b></td>");
            sb.Append("<td><b>Remark</b></td>");
            sb.Append("<td><b>Status</b></td>");
            sb.Append("<td><b>Date</b></td>");
            sb.Append("<td><b>Reg Date</b></td>");
            sb.Append("</tr>");

            cmd = new SqlCommand("Panel_GetEmployeeTaskListExport", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMPLOYEE_ID", tB_Admin.EMPLOYEE_ID);
            cmd.Parameters.AddWithValue("@START_DATE", tB_Admin.START_DATE);
            cmd.Parameters.AddWithValue("@END_DATE", tB_Admin.END_DATE);
            cmd.Parameters.AddWithValue("@EmployeeType", tB_Admin.EmployeeType);

            cmd.CommandTimeout = 3000000;
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            sda.Fill(dt);
            con.Close();
            EmployeeTaskMaster rt;
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new EmployeeTaskMaster();

                    rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"].ToString());
                    rt.EmployeeType = (dt.Rows[i]["EmployeeType"].ToString());
                    rt.Date = (dt.Rows[i]["Date"].ToString());
                    rt.Location = (dt.Rows[i]["Location"].ToString());
                    rt.TodaysWork = (dt.Rows[i]["TodaysWork"]).ToString();
                    rt.Remark = (dt.Rows[i]["Remark"]).ToString();
                    rt.Status = (dt.Rows[i]["Status"]).ToString();
                    rt.RegDate = (dt.Rows[i]["RegDate"]).ToString();

                    sb.Append("<tr>");
                    sb.Append("<td>" + (i + 1)+ "</td>");
                    sb.Append("<td>" + rt.EMP_NAME + "</td>");
                    sb.Append("<td>" + rt.EmployeeType + "</td>");
                    sb.Append("<td>" + rt.Location + "</td>");
                    sb.Append("<td>" + rt.TodaysWork + "</td>");
                    sb.Append("<td>" + rt.Remark + "</td>");
                    sb.Append("<td>" + rt.Status + "</td>");
                    sb.Append("<td>" + rt.Date + "</td>");
                    sb.Append("<td>" + rt.RegDate + "</td>");
                    sb.Append("</tr>");
                }
            }
            sb.Append("</table>");


            HttpContext.Response.AddHeader("content-disposition", "attachment;  filename = " + sFileName);
            this.Response.ContentType = "application/vnd.ms-excel";
            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(sb.ToString());
            return File(buffer, "application/vnd.ms-excel");
        }

        public JsonResult GetEmployeeType()
        {
            var _getadmin = db.TB_EmpTaskMaster
            .Where(z => z.Status == "Active")
            .OrderBy(x => x.EmployeeType)
            .Select(s => s.EmployeeType)
            .Distinct()
            .ToList();

            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmployeeTaskDetails(Search_Admin tB_Admin)
        {
            long id = Convert.ToInt64(Session["EmployeeTaskID"]);
            cmd = new SqlCommand("Panel_GetEmpTaskDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EmployeeTaskID", id);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            EmployeeTaskMaster rt;
            List<EmployeeTaskMaster> FinalreportList = new List<EmployeeTaskMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new EmployeeTaskMaster();
                    try
                    {
                        rt.EmployeeTaskDataID = Convert.ToInt32(dt.Rows[i]["EmployeeTaskDataID"]);
                        rt.EmployeeTaskID = Convert.ToInt64(dt.Rows[i]["EmployeeTaskID"]);
                        rt.EmployeeType = (dt.Rows[i]["EmployeeType"].ToString());
                        rt.AllocatedWork = (dt.Rows[i]["AllocatedWork"].ToString());
                        rt.WorkResult = (dt.Rows[i]["WorkResult"]).ToString();
                        rt.Remark = (dt.Rows[i]["Remark"].ToString());
                        rt.NewLearning = (dt.Rows[i]["NewLearning"]).ToString();
                        rt.Location = (dt.Rows[i]["Location"]).ToString();
                        rt.HospitalName = (dt.Rows[i]["HospitalName"]).ToString();
                        rt.CustomerDetails = (dt.Rows[i]["CustomerDetails"]).ToString();
                        rt.ServiceEngReason = (dt.Rows[i]["ServiceEngReason"]).ToString();
                        rt.DoctorName = (dt.Rows[i]["DoctorName"]).ToString();
                        rt.ContactNumber = (dt.Rows[i]["ContactNumber"]).ToString();
                        rt.ExistingModel = (dt.Rows[i]["ExistingModel"]).ToString();
                        rt.ProposedModel = (dt.Rows[i]["ProposedModel"]).ToString();
                        rt.SalesTeamStatus = (dt.Rows[i]["SalesTeamStatus"]).ToString();
                        rt.Purpose = (dt.Rows[i]["Purpose"]).ToString();
                        rt.WarehouseType = (dt.Rows[i]["WarehouseType"]).ToString();
                        rt.CleaningOff = (dt.Rows[i]["CleaningOff"]).ToString();
                        rt.Type = (dt.Rows[i]["Type"]).ToString();
                        rt.EquipmentsPartDetails = (dt.Rows[i]["EquipmentsPartDetails"]).ToString();
                        rt.InTime = (dt.Rows[i]["InTime"]).ToString();
                        rt.OutTime = (dt.Rows[i]["OutTime"]).ToString();
                        rt.PersonFrom = (dt.Rows[i]["PersonFrom"]).ToString();
                        rt.PersonName = (dt.Rows[i]["PersonName"]).ToString();
                        rt.WhoAskForIt = (dt.Rows[i]["WhoAskForIt"]).ToString();
                        rt.DCNumber = (dt.Rows[i]["DCNumber"]).ToString();
                        rt.Status = (dt.Rows[i]["Status"]).ToString();
                        rt.RegDate = (dt.Rows[i]["RegDate"]).ToString();
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

        public ActionResult Details(long? TaskId)
        {
            Session["EmployeeTaskID"] = TaskId;
            return View();
        }
    }
}