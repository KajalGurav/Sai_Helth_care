
using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using static Sai_Helth_care.Models.QuotationDAL;
using static Sai_Helth_care.Models.SalaryWages;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Salary_WaygesController : Controller
    {
        // GET: Salary_Wayges
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult TotalRecordCount(SearchSalaryWagesParams tB_Admin)
        {
            try
            {
                int count = SalaryIncrementDAL.GetSalaryIncrementTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult GetSalaryIncrementList(SearchSalaryWagesParams tB_params)
        {

            try
            {
                var incrementList = SalaryIncrementDAL.GetSalaryIncrementList(tB_params);
                return Json(incrementList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public ActionResult AddUpdateSalaryIncrement(SalaryIncrement tB_admin)
        {
            try
            {
                long adminId = Convert.ToInt64(Session["EMP_ID"]);
                tB_admin.ADMIN_ID = adminId;
                int i = SalaryIncrementDAL.AddUpdateSalaryIncrement(tB_admin);
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


        public ActionResult GetSalaryIncrementExport(SearchSalaryWagesParams tB_params)
        {
            StringBuilder sb = new StringBuilder();
            string sFileName = "Advance Salary Report.xls";
            sb.Append("<table style='1px solid black; font-size:12px;' border='1'>");
            sb.Append("<tr>");
            sb.Append("<td><b>Sr No</b></td>");
            //sb.Append("<td><b>Increment Id</b></td>");
            //sb.Append("<td><b>Employee Id</b></td>");
            sb.Append("<td><b>Employee Name</b></td>");
            sb.Append("<td><b>Basic Salary</b></td>");
            sb.Append("<td><b>Increment Amount</b></td>");
            sb.Append("<td><b>Increment Date</b></td>");
            sb.Append("<td><b>Reg Date</b></td>");
            sb.Append("</tr>");

            DataTable dt = SalaryIncrementDAL.SalaryIncrementExport(tB_params);

            SalaryIncrement rt;
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new SalaryIncrement();

                    //rt.ESI_ID = Convert.ToInt32(dt.Rows[i]["ESI_ID"]);
                    //rt.EMP_ID = Convert.ToInt32(dt.Rows[i]["EMP_ID"]);
                    rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"]).ToString();
                    rt.BASIC_SALARY = Convert.ToDecimal(dt.Rows[i]["BASIC_SALARY"]);
                    rt.INCREMENT_VALUE = Convert.ToDecimal(dt.Rows[i]["INCREMENT_VALUE"]);
                    rt.INCREMENT_DATE = (dt.Rows[i]["INCREMENT_DATE"]).ToString();
                    rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();


                    sb.Append("<tr>");
                    sb.Append("<td>" + (i + 1) + "</td>");
                    //sb.Append("<td>" + rt.ESI_ID + "</td>");
                    //sb.Append("<td>" + rt.EMP_ID + "</td>");
                    sb.Append("<td>" + rt.EMP_NAME + "</td>");
                    sb.Append("<td>" + rt.BASIC_SALARY + "</td>");
                    sb.Append("<td>" + rt.INCREMENT_VALUE + "</td>");
                    sb.Append("<td>" + rt.INCREMENT_DATE + "</td>");
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