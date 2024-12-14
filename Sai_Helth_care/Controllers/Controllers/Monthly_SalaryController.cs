using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Text;
using System.Text.RegularExpressions;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Monthly_SalaryController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        static DataSet ds;

        public ActionResult Index()
        {
            return View();
        }
       
        public class Search_Admin
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public int B_ID { get; set; }
            public string FARMER_NAME { get; set; }
            public int EMP_ID { get; set; }
            public string MONTH_NO { get; set; }
            public string SALARY_ID { get; set; }
        }

        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            long id = Convert.ToInt64(Session["COMPANY_ID"]);
            int i = 0;
            try
            {
                cmd = new SqlCommand("Get_TB_EmployeeSalary_Count", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);
                cmd.Parameters.AddWithValue("@MONTH_NO", tB_Admin.MONTH_NO);
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
            long id = Convert.ToInt64(Session["COMPANY_ID"]);
            cmd = new SqlCommand("PANLE_GET_EMP_MONTHLY_SALARY", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
            cmd.Parameters.AddWithValue("@COMPANY_ID", id);
            cmd.Parameters.AddWithValue("@MONTH_NO", tB_Admin.MONTH_NO);

            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            MonthlySalary rt;
            List<MonthlySalary> FinalreportList = new List<MonthlySalary>();

            DateTime currentDate = DateTime.Now;
            int daysInMonth = DateTime.DaysInMonth(currentDate.Year, currentDate.Month);

            double SalaryPerDay = 0;
            long TotalDeduction = 0;

            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new MonthlySalary();
                    try
                    {
                        rt.SALARY_ID = Convert.ToInt64(dt.Rows[i]["SALARY_ID"]);
                        rt.EMP_ID = Convert.ToInt64(dt.Rows[i]["EMP_ID"]);
                        rt.COMPANY_BANK_ID = Convert.ToInt64(dt.Rows[i]["COMPANY_BANK_ID"]);
                        rt.EMP_LOAN_ID = Convert.ToInt64(dt.Rows[i]["EMP_LOAN_ID"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"].ToString());
                        rt.SALARY_FOR_MONTH = (dt.Rows[i]["SALARY_FOR_MONTH"].ToString());
                        rt.SALARY_DATE = (dt.Rows[i]["SALARY_DATE"].ToString());
                        rt.PRESENT_DAYS = Convert.ToInt64(dt.Rows[i]["PRESENT_DAYS"]);
                        rt.ADVANCE_SALARY = Convert.ToInt64(dt.Rows[i]["ADVANCE_SALARY"]);
                        rt.LOAN_INSTALLMENT = Convert.ToInt64(dt.Rows[i]["LOAN_INSTALLMENT"]);
                        rt.CURRENT_MOBILE_BILL = Convert.ToInt64(dt.Rows[i]["CURRENT_MOBILE_BILL"]);
                        rt.EXTRA_MOBILE_BILL = Convert.ToInt64(dt.Rows[i]["EXTRA_MOBILE_BILL"]);
                        rt.INCENTIVE_AMOUNT = Convert.ToInt64(dt.Rows[i]["INCENTIVE_AMOUNT"]);
                        rt.SALERY_PER_MONTH = (dt.Rows[i]["SALERY_PER_MONTH"]).ToString();
                        rt.SALERY_PER_MONTH1 = Convert.ToDouble(dt.Rows[i]["SALERY_PER_MONTH"]);
                        rt.SALARY_BONUS = Convert.ToInt64(dt.Rows[i]["SALARY_BONUS"]);
                        rt.IS_SALARY_HOLD = Convert.ToBoolean(dt.Rows[i]["IS_SALARY_HOLD"]);
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                        rt.NET_SALARY = Convert.ToDouble(dt.Rows[i]["NET_SALARY"]);
                        rt.GROSS_SALARY = Convert.ToDouble(dt.Rows[i]["GROSS_SALARY"]);
                        rt.TOTAL_SALARY = Convert.ToDouble(dt.Rows[i]["TOTAL_SALARY"]);
                         //SalaryPerDay = rt.SALERY_PER_MONTH1/ daysInMonth;
                         //rt.GROSS_SALARY = SalaryPerDay * rt.PRESENT_DAYS;
                        // TotalDeduction = rt.ADVANCE_SALARY + rt.LOAN_INSTALLMENT + rt.CURRENT_MOBILE_BILL + rt.EXTRA_MOBILE_BILL;
                       // rt.NET_SALARY = rt.GROSS_SALARY - TotalDeduction;
                        //rt.TOTAL_SALARY = rt.NET_SALARY - rt.SALARY_BONUS - rt.INCENTIVE_AMOUNT;
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

        public ActionResult AddAdmin(MonthlySalary tB_admin)
        {
            long id = Convert.ToInt64(Session["COMPANY_ID"]);
            try
            {
                cmd = new SqlCommand("PANLE_ADD_MONTHLY_SALARY", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID);
                cmd.Parameters.AddWithValue("@SALARY_FOR_MONTH", tB_admin.SALARY_FOR_MONTH);
                cmd.Parameters.AddWithValue("@SALARY_DATE", tB_admin.SALARY_DATE);
                cmd.Parameters.AddWithValue("@PRESENT_DAYS", tB_admin.PRESENT_DAYS);
                cmd.Parameters.AddWithValue("@ADVANCE_SALARY", tB_admin.ADVANCE_SALARY);
                cmd.Parameters.AddWithValue("@LOAN_INSTALLMENT", tB_admin.LOAN_INSTALLMENT);
                cmd.Parameters.AddWithValue("@CURRENT_MOBILE_BILL", tB_admin.CURRENT_MOBILE_BILL);
                cmd.Parameters.AddWithValue("@EXTRA_MOBILE_BILL", tB_admin.EXTRA_MOBILE_BILL);
                cmd.Parameters.AddWithValue("@INCENTIVE_AMOUNT", tB_admin.INCENTIVE_AMOUNT);
                cmd.Parameters.AddWithValue("@SALARY_BONUS", tB_admin.SALARY_BONUS);
                cmd.Parameters.AddWithValue("@IS_SALARY_HOLD", tB_admin.IS_SALARY_HOLD);
                cmd.Parameters.AddWithValue("@ACTION", "Add");
                cmd.Parameters.AddWithValue("@SALARY_ID", tB_admin.SALARY_ID);
                cmd.Parameters.AddWithValue("@EMP_LOAN_ID", tB_admin.EMP_LOAN_ID);
                cmd.Parameters.AddWithValue("@B_ID", tB_admin.B_ID);
                cmd.Parameters.AddWithValue("@TOTAL_SALARY", tB_admin.TOTAL_SALARY);
                cmd.Parameters.AddWithValue("@NET_SALARY", tB_admin.NET_SALARY);
                cmd.Parameters.AddWithValue("@GROSS_SALARY", tB_admin.GROSS_SALARY);
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                string i = cmd.ExecuteScalar().ToString();
                con.Close();
                if (i != null)
                {
                    return Json(new { success = i });

                }
                else
                {
                    return Json(new { success = true });
                }
            }
            catch (Exception ex)
            {
            }
            return View("Index");
        }

        public ActionResult EditAdmin(MonthlySalary tB_admin)
        {
            long id = Convert.ToInt64(Session["COMPANY_ID"]);
            try
            {
                cmd = new SqlCommand("PANLE_ADD_MONTHLY_SALARY", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMP_ID", tB_admin.EMP_ID);
                cmd.Parameters.AddWithValue("@SALARY_FOR_MONTH", tB_admin.SALARY_FOR_MONTH);
                cmd.Parameters.AddWithValue("@SALARY_DATE", tB_admin.SALARY_DATE);
                cmd.Parameters.AddWithValue("@PRESENT_DAYS", tB_admin.PRESENT_DAYS);
                cmd.Parameters.AddWithValue("@ADVANCE_SALARY", tB_admin.ADVANCE_SALARY);
                cmd.Parameters.AddWithValue("@LOAN_INSTALLMENT", tB_admin.LOAN_INSTALLMENT);
                cmd.Parameters.AddWithValue("@CURRENT_MOBILE_BILL", tB_admin.CURRENT_MOBILE_BILL);
                cmd.Parameters.AddWithValue("@EXTRA_MOBILE_BILL", tB_admin.EXTRA_MOBILE_BILL);
                cmd.Parameters.AddWithValue("@INCENTIVE_AMOUNT", tB_admin.INCENTIVE_AMOUNT);
                cmd.Parameters.AddWithValue("@SALARY_BONUS", tB_admin.SALARY_BONUS);
                cmd.Parameters.AddWithValue("@IS_SALARY_HOLD", tB_admin.IS_SALARY_HOLD);
                cmd.Parameters.AddWithValue("@ACTION", "Update");
                cmd.Parameters.AddWithValue("@SALARY_ID", tB_admin.SALARY_ID);
                cmd.Parameters.AddWithValue("@EMP_LOAN_ID", tB_admin.EMP_LOAN_ID);
                cmd.Parameters.AddWithValue("@B_ID", tB_admin.B_ID);
                cmd.Parameters.AddWithValue("@TOTAL_SALARY", tB_admin.TOTAL_SALARY);
                cmd.Parameters.AddWithValue("@NET_SALARY", tB_admin.NET_SALARY);
                cmd.Parameters.AddWithValue("@GROSS_SALARY", tB_admin.GROSS_SALARY);
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
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
            }

            return View("Index");
        }

        public JsonResult GetEmployee()
        {
            var _getadmin = db.Tb_EmployeeMaster.Where(z => z.STATUS == "Active").Select(s => new { s.EMP_ID, s.EMP_NAME, s.CONTACT_NO, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

       
        public JsonResult GetCompanyBank(Search_Admin tb_Admin)
        {
            cmd = new SqlCommand("PANEL_GET_COMPANY_BANK", con);
            cmd.CommandType = CommandType.StoredProcedure;
            

            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            MonthlySalary rt;
            List<MonthlySalary> FinalreportList = new List<MonthlySalary>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new MonthlySalary();
                    try
                    {
                        rt.BANK_NAME = (dt.Rows[i]["BANK_NAME"]).ToString();
                        rt.B_ID = Convert.ToInt64(dt.Rows[i]["B_ID"]);
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

        public JsonResult GetBasicSalary(long id)
        {
            var _getadmin = db.Tb_EmployeeMaster.Where(z => z.STATUS == "Active" && z.EMP_ID==id).Select(s => new { s.EMP_ID, s.EMP_NAME, s.CONTACT_NO, s.SALERY_PER_MONTH, s.REG_DATE }).FirstOrDefault();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }


                       
        public JsonResult GetEmpIncentive1(Search_Admin tb_Admin)
        {
            cmd = new SqlCommand("PANEL_GET_MONTHLY_INCENTIVE", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_ID", tb_Admin.EMP_ID);
            cmd.Parameters.AddWithValue("@MONTH_NO", tb_Admin.MONTH_NO);

            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            MonthlySalary rt;
            List<MonthlySalary> FinalreportList = new List<MonthlySalary>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new MonthlySalary();
                    try
                    {
                        rt.INCENTIVE_AMOUNT = Convert.ToInt64(dt.Rows[i]["INCENTIVE_AMOUNT"]);
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

        public JsonResult GetEmpIncentive(long id,string SALARY_FOR_MONTH)
        {
            int MONTH_NO = 0;

            if (SALARY_FOR_MONTH == "January")
            {
                MONTH_NO = 1;
            }
            else if (SALARY_FOR_MONTH == "February")
            {
                MONTH_NO = 2;

            }
            else if (SALARY_FOR_MONTH == "March")
            {
                MONTH_NO = 3;

            }
            else if (SALARY_FOR_MONTH == "April")
            {
                MONTH_NO = 4;

            }
            else if (SALARY_FOR_MONTH == "May")
            {
                MONTH_NO = 5;

            }
            else if (SALARY_FOR_MONTH == "June")
            {
                MONTH_NO = 6;

            }
            else if (SALARY_FOR_MONTH == "July")
            {
                MONTH_NO = 7;

            }
            else if (SALARY_FOR_MONTH == "August")
            {
                MONTH_NO = 8;
            }
            else if (SALARY_FOR_MONTH == "September")
            {
                MONTH_NO = 9;

            }
            else if (SALARY_FOR_MONTH == "Octomber")
            {
                MONTH_NO = 10;

            }
            else if (SALARY_FOR_MONTH == "November")
            {
                MONTH_NO = 11;

            }
            else if (SALARY_FOR_MONTH == "December")
            {
                MONTH_NO = 12;

            }
            cmd = new SqlCommand("PANEL_GET_EMP_INCENTIVE", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_ID", id);
            cmd.Parameters.AddWithValue("@MONTH_NO", MONTH_NO);
            
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            MonthlySalary rt;
            List<MonthlySalary> FinalreportList = new List<MonthlySalary>();

            DateTime currentDate = DateTime.Now;
            int daysInMonth = DateTime.DaysInMonth(currentDate.Year, currentDate.Month);

            double SalaryPerDay = 0;
            long TotalDeduction = 0;

            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new MonthlySalary();
                    try
                    {
                        rt.SALARY_ID = Convert.ToInt64(dt.Rows[i]["SALARY_ID"]);
                        rt.EMP_ID = Convert.ToInt64(dt.Rows[i]["EMP_ID"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"].ToString());
                        rt.SALARY_FOR_MONTH = (dt.Rows[i]["SALARY_FOR_MONTH"].ToString());
                        rt.SALARY_DATE = (dt.Rows[i]["SALARY_DATE"].ToString());
                        rt.PRESENT_DAYS = Convert.ToInt64(dt.Rows[i]["PRESENT_DAYS"]);
                        rt.ADVANCE_SALARY = Convert.ToInt64(dt.Rows[i]["ADVANCE_SALARY"]);
                        rt.LOAN_INSTALLMENT = Convert.ToInt64(dt.Rows[i]["LOAN_INSTALLMENT"]);
                        rt.CURRENT_MOBILE_BILL = Convert.ToInt64(dt.Rows[i]["CURRENT_MOBILE_BILL"]);
                        rt.EXTRA_MOBILE_BILL = Convert.ToInt64(dt.Rows[i]["EXTRA_MOBILE_BILL"]);
                        rt.INCENTIVE_AMOUNT = Convert.ToInt64(dt.Rows[i]["INCENTIVE_AMOUNT"]);
                        rt.SALERY_PER_MONTH = (dt.Rows[i]["SALERY_PER_MONTH"]).ToString();
                        rt.SALERY_PER_MONTH1 = Convert.ToInt64(dt.Rows[i]["SALERY_PER_MONTH"]);
                        rt.SALARY_BONUS = Convert.ToInt64(dt.Rows[i]["SALARY_BONUS"]);
                        rt.IS_SALARY_HOLD = Convert.ToBoolean(dt.Rows[i]["IS_SALARY_HOLD"]);
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                        SalaryPerDay = rt.SALERY_PER_MONTH1 / daysInMonth;
                        rt.GROSS_SALARY = SalaryPerDay * rt.PRESENT_DAYS;
                        TotalDeduction = rt.ADVANCE_SALARY + rt.LOAN_INSTALLMENT + rt.CURRENT_MOBILE_BILL + rt.EXTRA_MOBILE_BILL;
                        rt.NET_SALARY = rt.GROSS_SALARY - TotalDeduction;
                        rt.TOTAL_SALARY = rt.NET_SALARY - rt.SALARY_BONUS - rt.INCENTIVE_AMOUNT;
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

        public JsonResult GetEmpLoan(long id)
        {
            var _getadmin = db.TB_EmployeeLoan.Where(z => z.STATUS == "Active" && z.EMP_ID==id && z.LOAN_OUTSTANDING!=0).Select(s => new {s.LOAN_AMOUNT, s.EMP_LOAN_ID, s.EMP_ID,  s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetLoanDetails(long id)
        {
            var _getadmin = db.TB_EmployeeLoan.Where(z => z.STATUS == "Active" && z.EMP_LOAN_ID == id).Select(s => new { s.LOAN_AMOUNT, s.EMP_LOAN_ID, s.INTREST_RATE, s.INSTALLMENT_AMOUNT, s.LOAN_OUTSTANDING }).FirstOrDefault();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public ActionResult EmployeeSalaryExport(Search_Admin tB_Admin)
        {
            StringBuilder sb = new StringBuilder();
            string sFileName = "Employee Task Report.xls";
            sb.Append("<table style='1px solid black; font-size:12px;' border='1'>");
            sb.Append("<tr>");
            sb.Append("<td><b>Sr No</b></td>");
            sb.Append("<td><b>Full Name</b></td>");
            sb.Append("<td><b>Month</b></td>");
            sb.Append("<td><b>Date of Salary</b></td>");
            sb.Append("<td><b>Present Days</b></td>");
            sb.Append("<td><b>Gross Salary</b></td>");
            sb.Append("<td><b>Net Salary</b></td>");
            sb.Append("<td><b>Salary On Hold</b></td>");
            sb.Append("</tr>");

            cmd = new SqlCommand("PANEL_GET_MONTHLY_SALARY_EXPORT", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.CommandTimeout = 3000000;
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            sda.Fill(dt);
            con.Close();
            MonthlySalary rt;
            double SalaryPerDay = 0;
            long TotalDeduction = 0;
            string IsSalaryHold;
            DateTime currentDate = DateTime.Now;
            int daysInMonth = DateTime.DaysInMonth(currentDate.Year, currentDate.Month);


            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new MonthlySalary();

                    rt.SALARY_ID = Convert.ToInt64(dt.Rows[i]["SALARY_ID"]);
                    rt.EMP_ID = Convert.ToInt64(dt.Rows[i]["EMP_ID"]);
                    rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"].ToString());
                    rt.SALARY_FOR_MONTH = (dt.Rows[i]["SALARY_FOR_MONTH"].ToString());
                    rt.SALARY_DATE = (dt.Rows[i]["SALARY_DATE"].ToString());
                    rt.PRESENT_DAYS = Convert.ToInt64(dt.Rows[i]["PRESENT_DAYS"]);
                    rt.ADVANCE_SALARY = Convert.ToInt64(dt.Rows[i]["ADVANCE_SALARY"]);
                    rt.LOAN_INSTALLMENT = Convert.ToInt64(dt.Rows[i]["LOAN_INSTALLMENT"]);
                    rt.CURRENT_MOBILE_BILL = Convert.ToInt64(dt.Rows[i]["CURRENT_MOBILE_BILL"]);
                    rt.EXTRA_MOBILE_BILL = Convert.ToInt64(dt.Rows[i]["EXTRA_MOBILE_BILL"]);
                    rt.INCENTIVE_AMOUNT = Convert.ToDouble(dt.Rows[i]["INCENTIVE_AMOUNT"]);
                    rt.SALERY_PER_MONTH = (dt.Rows[i]["SALERY_PER_MONTH"]).ToString();
                    rt.SALERY_PER_MONTH1 = Convert.ToDouble(dt.Rows[i]["SALERY_PER_MONTH"]);

                    rt.SALARY_BONUS = Convert.ToDouble(dt.Rows[i]["SALARY_BONUS"]);
                    rt.IS_SALARY_HOLD = Convert.ToBoolean(dt.Rows[i]["IS_SALARY_HOLD"]);
                    if (rt.IS_SALARY_HOLD == true)
                    {
                        IsSalaryHold = "Yes";
                    }
                    else
                    {
                        IsSalaryHold = "No";
                    }
                    rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                    SalaryPerDay = rt.SALERY_PER_MONTH1 / daysInMonth;
                    rt.GROSS_SALARY = SalaryPerDay * rt.PRESENT_DAYS;
                    TotalDeduction = rt.ADVANCE_SALARY + rt.LOAN_INSTALLMENT + rt.CURRENT_MOBILE_BILL + rt.EXTRA_MOBILE_BILL;
                    rt.NET_SALARY = rt.GROSS_SALARY - TotalDeduction;
                    rt.TOTAL_SALARY = rt.NET_SALARY - rt.SALARY_BONUS - rt.INCENTIVE_AMOUNT;

                    sb.Append("<tr>");
                    sb.Append("<td>" + (i + 1) + "</td>");
                    sb.Append("<td>" + rt.EMP_NAME + "</td>");
                    sb.Append("<td>" + rt.SALARY_FOR_MONTH + "</td>");
                    sb.Append("<td>" + rt.SALARY_DATE + "</td>");
                    sb.Append("<td>" + rt.PRESENT_DAYS + "</td>");
                    sb.Append("<td>" + rt.GROSS_SALARY + "</td>");
                    sb.Append("<td>" + rt.NET_SALARY + "</td>");
                    sb.Append("<td>" + IsSalaryHold + "</td>");
                    sb.Append("</tr>");
                }
            }
            sb.Append("</table>");


            HttpContext.Response.AddHeader("content-disposition", "attachment;  filename = " + sFileName);
            this.Response.ContentType = "application/vnd.ms-excel";
            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(sb.ToString());
            return File(buffer, "application/vnd.ms-excel");
        }

        public ActionResult PrintMonthySalary()
        {
            return View();
        }

        public JsonResult PrintMonthlySalary(Search_Admin tB_Admin)
        {
            long id = Convert.ToInt64(Session["COMPANY_ID"]);
            cmd = new SqlCommand("PANEL_PRINT_EMP_SALARY", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SALARY_ID", tB_Admin.SALARY_ID);
            cmd.Parameters.AddWithValue("@COMPANY_ID", id);
            cmd.Parameters.AddWithValue("@B_ID", tB_Admin.B_ID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            MonthlySalary rt;
            List<MonthlySalary> FinalreportList = new List<MonthlySalary>();

            double TOTAL_SALARY = 0;

            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new MonthlySalary();
                    try
                    {
                        rt.SALARY_ID = Convert.ToInt64(dt.Rows[i]["SALARY_ID"]);
                        rt.NET_SALARY = Convert.ToInt64(dt.Rows[i]["NET_SALARY"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"].ToString());
                        rt.ACCOUNT_NO = (dt.Rows[i]["ACCOUNT_NO"].ToString());
                        rt.IFSC_CODE = (dt.Rows[i]["IFSC_CODE"].ToString());
                        rt.LOGO = (dt.Rows[i]["LOGO"].ToString());
                        rt.BANK_NAME = (dt.Rows[i]["BANK_NAME"].ToString());
                        rt.BRANCH_NAME = (dt.Rows[i]["BRANCH_NAME"].ToString());
                        rt.ACC_NO = (dt.Rows[i]["ACC_NO"].ToString());
                        TOTAL_SALARY = TOTAL_SALARY + rt.NET_SALARY;
                        rt.TOTAL_SALARY = TOTAL_SALARY;
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