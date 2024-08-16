
using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static Sai_Helth_care.Models.QuotationDAL;
using static Sai_Helth_care.Models.SalaryWages;
using System.Drawing.Printing;
using System.Security.Cryptography;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Live_ApplicationController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        // GET: Live_Application
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult TotalRecordCount(SearchSalaryWagesParams tb_params)
        {
            try
            {
                int count = LeaveDAL.GetLeaveTotalRecordCount(tb_params);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public JsonResult GetAllLeaveList(SearchSalaryWagesParams tB_params)
        {
            try
            {
                var customerList = LeaveDAL.GetLeaveList(tB_params);
                return Json(customerList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public ActionResult AddUpdateLeave(Leave tB_admin)
        {

            try
            {
                int i = LeaveDAL.AddUpdateLeave(tB_admin);
                if (i == -1)
                {
                    return Json(new { success = false });

                }
                else
                {
                    //var res = EditFirm(tB_admin);
                    return Json(new { success = true });
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }



        public JsonResult GetLeaveDetails(long? id)
        {
            if (id == null)
            {
                var _getadmin = db.TB_Leave.OrderBy(x => x.LEAVE_ID).Select(s => new { s.EMP_ID, s.LEAVE_ID, s.REG_DATE,s.APPLICATION_NO,s.APPLICATION_DATE,s.LEAVE_CAT_ID,s.LEAVE_TYPE,s.LEAVE_FROM_DATE,s.LEAVE_TO_DATE,s.LEAVE_IN_DAYS,s.LEAVE_REASON,s.LEAVE_STATUS_TYPE_ID }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var _getadmin = db.TB_Leave.Where(z=> z.LEAVE_ID == id).OrderBy(x => x.LEAVE_ID).Select(s => new { s.EMP_ID, s.LEAVE_ID, s.REG_DATE, s.APPLICATION_NO, s.APPLICATION_DATE, s.LEAVE_CAT_ID, s.LEAVE_TYPE, s.LEAVE_FROM_DATE, s.LEAVE_TO_DATE, s.LEAVE_IN_DAYS, s.LEAVE_REASON, s.LEAVE_STATUS_TYPE_ID }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }

        }

      

        public JsonResult GetDepartmentList(long? id)
        {
            dt = Master.fillData("select DEP_NAME,DESI_NAME from Tb_EmployeeMaster as a left join Tb_Department as c on c.DEP_ID=a.DEPARTMENT_ID left join Tb_Designation as b on b.DESI_ID=a.DESIGNATION_ID where EMP_ID=" + id+"");


            List<Leave> FinalreportList = new List<Leave>();
            Leave rt2;

            if (dt != null)
            {
               
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt2 = new Leave();
                    try
                    {
                        rt2.DEP_NAME = (dt.Rows[i]["DEP_NAME"].ToString());
                        rt2.DESI_NAME = (dt.Rows[i]["DESI_NAME"].ToString());
                    }

                    catch (Exception ex)
                    {

                    }
                    FinalreportList.Add(rt2);
                }

            }
            var _Monthlyreport = FinalreportList;
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }


        public JsonResult LeaveCategoryList()
        {
            var _getadmin = db.TB_LeaveCategory.Select(s => new { s.LEAVE_CAT_ID, s.LEAVE_CAT_NAME, s.STATUS }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }


        public JsonResult LeaveStatusList()
        {
            var _getadmin = db.TB_LeaveStatusType.Select(s => new { s.LEAVE_STATUS_TYPE_ID, s.LEAVE_STATUS_NAME, s.STATUS }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }



     

    }
}