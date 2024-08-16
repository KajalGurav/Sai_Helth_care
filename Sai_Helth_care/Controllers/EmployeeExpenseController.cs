using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using static Sai_Helth_care.Models.EmployeeExpenseDAL;



namespace Sai_Helth_care.Controllers
{
    public class EmployeeExpenseController : Controller
    {


        // GET: EmployeeExpense
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult TotalRecordCount(SearchExpenseParams tB_Admin)
        {
            try
            {
                int count = EmployeeExpenseDAL.GetTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public JsonResult GetAllExpenseList(SearchExpenseParams tB_params)
        {
            try
            {
                var expenseList = EmployeeExpenseDAL.GetExpenseList(tB_params);
                return Json(expenseList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public ActionResult EmployeeExpenseExport(SearchExpenseParams tB_params)
        {
            StringBuilder sb = new StringBuilder();
            string sFileName = "Employee Expense Report.xls";
            sb.Append("<table style='1px solid black; font-size:12px;' border='1'>");
            sb.Append("<tr>");
            sb.Append("<td><b>Sr No</b></td>");
            sb.Append("<td><b>Expense Id</b></td>");
            sb.Append("<td><b>Employee Id</b></td>");
            sb.Append("<td><b>Employee Name</b></td>");
            sb.Append("<td><b>Amount</b></td>");
            sb.Append("<td><b>Remark</b></td>");
            sb.Append("<td><b>Expense Type</b></td>");
            sb.Append("<td><b>Photo</b></td>");
            sb.Append("<td><b>Reg Date</b></td>");
            sb.Append("</tr>");

            DataTable dt = EmployeeExpenseDAL.GetExpenseListExport(tB_params);

            EmployeeExpense rt;
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new EmployeeExpense();

                    rt.EXPENSE_ID = Convert.ToInt64(dt.Rows[i]["EXPENSE_ID"]);
                    rt.EMP_ID = Convert.ToInt64(dt.Rows[i]["EMP_ID"]);
                    rt.AMOUNT = Convert.ToDecimal(dt.Rows[i]["AMOUNT"]);
                    rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"].ToString());
                    rt.REMARK = (dt.Rows[i]["REMARK"].ToString());
                    rt.EXPENSE_TYPE = (dt.Rows[i]["EXPENSE_TYPE"].ToString());
                    rt.PHOTO = (dt.Rows[i]["PHOTO"].ToString());
                    rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                    rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();



                    sb.Append("<tr>");
                    sb.Append("<td>" + (i + 1) + "</td>");
                    sb.Append("<td>" + rt.EXPENSE_ID + "</td>");
                    sb.Append("<td>" + rt.EMP_ID + "</td>");
                    sb.Append("<td>" + rt.EMP_NAME + "</td>");
                    sb.Append("<td>" + rt.AMOUNT + "</td>");
                    sb.Append("<td>" + rt.REMARK + "</td>");
                    sb.Append("<td>" + rt.EXPENSE_TYPE + "</td>");
                    sb.Append("<td> <a href=\"" + rt.PHOTO + "\" >"+ rt.PHOTO + "</a> </td>");
                    sb.Append("<td>" + rt.REG_DATE + "</td>");
                    sb.Append("</tr>");
                }
            }
            sb.Append("</table>");


            HttpContext.Response.AddHeader("content-disposition", "attachment;  filename = " + sFileName);
            this.Response.ContentType = "application/vnd.ms-excel";
            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(sb.ToString());
            return File(buffer, "application/vnd.ms-excel");
        }
    }
}