using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using static Sai_Helth_care.Models.EmployeeExpenseDAL;
using static Sai_Helth_care.Models.SalaryWages;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Advance_SalaryController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult TotalRecordCount(SearchSalaryWagesParams tB_Admin)
        {
            try
            {
                int count = AdvancedSalaryDAL.GetAdvancedSalaryTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult GetAdvanceSalaryList(SearchSalaryWagesParams tB_params)
        {

            try
            {
                var advancedSalaryList = AdvancedSalaryDAL.GetAdvancedSalaryList(tB_params);
                return Json(advancedSalaryList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public ActionResult AddUpdateAdvanceSalary(AdvancedSalary tB_admin)
        {
            try
            {
                long adminId = Convert.ToInt64(Session["EMP_ID"]);
                tB_admin.ADMIN_ID = adminId;
                int i = AdvancedSalaryDAL.AddUpdateAdvancedSalary(tB_admin);
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

        public ActionResult GetAdvanceSalaryListExport(SearchSalaryWagesParams tB_params)
        {
            StringBuilder sb = new StringBuilder();
            string sFileName = "Advance Salary Report.xls";
            sb.Append("<table style='1px solid black; font-size:12px;' border='1'>");
            sb.Append("<tr>");
            sb.Append("<td><b>Sr No</b></td>");
            sb.Append("<td><b>Expense Id</b></td>");
            sb.Append("<td><b>Employee Id</b></td>");
            sb.Append("<td><b>Employee Name</b></td>");
            sb.Append("<td><b>Advance Amount</b></td>");
            sb.Append("<td><b>Advance Date</b></td>");
            sb.Append("<td><b>Reg Date</b></td>");
            sb.Append("</tr>");

            DataTable dt = AdvancedSalaryDAL.AdvanceSalaryListExport(tB_params);

            AdvancedSalary rt;
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new AdvancedSalary();

                    rt.EAS_ID = Convert.ToInt32(dt.Rows[i]["EAS_ID"]);
                    rt.EMP_ID = Convert.ToInt32(dt.Rows[i]["EMP_ID"]);
                    rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"]).ToString();
                    rt.ADVANCE_AMOUNT = Convert.ToDecimal(dt.Rows[i]["ADVANCE_AMOUNT"]);
                    rt.ADVANCE_DATE = (dt.Rows[i]["ADVANCE_DATE"]).ToString();
                    rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();



                    sb.Append("<tr>");
                    sb.Append("<td>" + (i + 1) + "</td>");
                    sb.Append("<td>" + rt.EAS_ID + "</td>");
                    sb.Append("<td>" + rt.EMP_ID + "</td>");
                    sb.Append("<td>" + rt.EMP_NAME + "</td>");
                    sb.Append("<td>" + rt.ADVANCE_AMOUNT + "</td>");
                    sb.Append("<td>" + rt.ADVANCE_DATE + "</td>");
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