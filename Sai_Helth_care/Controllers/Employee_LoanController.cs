using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using Sai_Helth_care.Models;
using System.Web.Mvc;
using static Sai_Helth_care.Models.SalaryWages;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Employee_LoanController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        // GET: Employee_Loan
        public ActionResult Index()
        {
            return View();
        }
      
        public class Search_Admin
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public string FARMER_NAME { get; set; }
            public string STATE_ID { get; set; }
            public string STARTING_DATE { get; set; }
            public string ENDING_DATE { get; set; }
        }

        public JsonResult TotalRecordCount(SearchSalaryWagesParams tB_Admin)
        {
            try
            {
                int count = EmployeeLoanDAL.GetEmployeeLoanTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult GetallAdmin(SearchSalaryWagesParams tB_Admin)
        {
            try
            {
                var accessoriesList = EmployeeLoanDAL.GetEmployeeLoanList(tB_Admin);
                return Json(accessoriesList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult GetEmployee()
        {
            var _getadmin = db.Tb_EmployeeMaster.Where(z => z.STATUS == "Active").Select(s => new { s.EMP_ID, s.EMP_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddAdmin(EmployeeLoan tB_admin)
        {
            try
            {
                long adminId = Convert.ToInt64(Session["EMP_ID"]);
                tB_admin.ADMIN_ID = adminId;
                int i = EmployeeLoanDAL.AddUpdateEmployeeLoan(tB_admin);
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

        public ActionResult EditAdmin(Category tB_admin)
        {
            try
            {
                cmd = new SqlCommand("Update_TB_Category", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CAT_NAME", tB_admin.CAT_NAME);
                cmd.Parameters.AddWithValue("@CAT_ID", tB_admin.CAT_ID);
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

        public ActionResult Detail(long EMP_ID , long EMP_LOAN_ID)
        {
            Session["EMP_ID"] = EMP_ID;
            Session["EMP_LOAN_ID"] = EMP_LOAN_ID;
            return View();
        }

        public JsonResult GetEmpPayLoanList(SearchSalaryWagesParams tB_Admin)
        {
            long EMP_ID = Convert.ToInt64(Session["EMP_ID"]);
            long EMP_LOAN_ID = Convert.ToInt64(Session["EMP_LOAN_ID"]);
            cmd = new SqlCommand("Panel_Get_EmpLoanPayList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_ID", EMP_ID);
            cmd.Parameters.AddWithValue("@EMP_LOAN_ID", EMP_LOAN_ID);
           
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }

            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            EmployeeLoan rt;
            List<EmployeeLoan> FinalreportList = new List<EmployeeLoan>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new EmployeeLoan();
                    try
                    {
                        rt.SALARY_DATE = (dt.Rows[i]["SALARY_DATE"]).ToString();
                        rt.LOAN_INSTALLMENT = (dt.Rows[i]["LOAN_INSTALLMENT"]).ToString();
                        rt.LOAN_OUTSTANDING = Convert.ToDecimal(dt.Rows[i]["LOAN_OUTSTANDING"]);
                        rt.LOAN_AMOUNT = Convert.ToDecimal(dt.Rows[i]["LOAN_AMOUNT"]);
                        
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

          public ActionResult AddSettlementAmount(EmployeeLoan tB_admin)
          {
            long EMP_LOAN_ID = Convert.ToInt64(Session["EMP_LOAN_ID"]);
            try
            {
                cmd = new SqlCommand("Panel_AddSettlementAmount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMP_LOAN_ID", EMP_LOAN_ID);
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
    }
}