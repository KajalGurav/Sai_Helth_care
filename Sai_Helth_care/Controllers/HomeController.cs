using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Net;
using Sai_Helth_care.Models;
using System.Web.Security;

namespace Sai_Helth_care.Controllers
{
	public class HomeController : Controller
	{
		private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
		public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
		public static SqlConnection con = new SqlConnection(connectionString);
		static SqlCommand cmd;
		static SqlDataAdapter sda;
		static SqlDataReader sdr;
		static DataTable dt, dt1;

		[VerifyUserAttribute]
		public ActionResult Index()
		{
			ViewBag.EmpType = Session["EMP_ID"];
			long id = Convert.ToInt64(Session["EMP_ID"]);
			return View();
		}


		public JsonResult GetallHomeCount()
		{
			long id = Convert.ToInt64(Session["COMPANY_ID"]);
			//cmd = new SqlCommand("Panel_GetHomeCount", con);

			cmd = new SqlCommand("Panel_GetTotalHomeCount", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@COMPANY_ID", id);
			cmd.CommandTimeout = 220;
			if (con.State == System.Data.ConnectionState.Open)
			{
				con.Close();
			}
			con.Open();
			dt = new DataTable();
			sda = new SqlDataAdapter(cmd);
			sda.Fill(dt);
			con.Close();
			HomeCount rt1;
			List<HomeCount> FinalreportList1 = new List<HomeCount>();
			rt1 = new HomeCount();

			if (dt != null)
			{
				for (int i = 0; i < dt.Rows.Count; i++)
				{

					try
					{
						rt1.TOTAL_REGULAR_CUSTOMER_COUNT = (dt.Rows[i]["TOTAL_REGULAR_CUSTOMER_COUNT"].ToString());

						rt1.TOTAL_AERB_CUSTOMER_COUNT = (dt.Rows[i]["TOTAL_AERB_CUSTOMER_COUNT"].ToString());

						rt1.TOTAL_MEDTRONIC_CUSTOMER_COUNT = (dt.Rows[i]["TOTAL_MEDTRONIC_CUSTOMER_COUNT"].ToString());

						rt1.TOTAL_MINDRAY_CUSTOMER_COUNT = (dt.Rows[i]["TOTAL_MINDRAY_CUSTOMER_COUNT"].ToString());

						rt1.TOTAL_REGULAR_PRODUCT_COUNT = (dt.Rows[i]["TOTAL_REGULAR_PRODUCT_COUNT"].ToString());

						rt1.TOTAL_MINDRAY_PRODUCT_COUNT = (dt.Rows[i]["TOTAL_MINDRAY_PRODUCT_COUNT"].ToString());

						rt1.TOTAL_REGULAR_QUOTATION_COUNT = (dt.Rows[i]["TOTAL_REGULAR_QUOTATION_COUNT"].ToString());

						rt1.TOTAL_AERB_QUOTATION_COUNT = (dt.Rows[i]["TOTAL_AERB_QUOTATION_COUNT"].ToString());

						rt1.TOTAL_MEDTRONIC_QUOTATION_COUNT = (dt.Rows[i]["TOTAL_MEDTRONIC_QUOTATION_COUNT"].ToString());

						rt1.TOTAL_MINDRAY_QUOTATION_COUNT = (dt.Rows[i]["TOTAL_MINDRAY_QUOTATION_COUNT"].ToString());

						rt1.TOTAL_COMPANY_COUNT = (dt.Rows[i]["TOTAL_COMPANY_COUNT"].ToString());

						rt1.TOTAL_EMPLOYEE_COUNT = (dt.Rows[i]["TOTAL_EMPLOYEE_COUNT"].ToString());

						rt1.TOTAL_VENDOR_COUNT = (dt.Rows[i]["TOTAL_VENDOR_COUNT"].ToString());

						rt1.TOTAL_REGULAR_AMC_COUNT = (dt.Rows[i]["TOTAL_REGULAR_AMC_COUNT"].ToString());

						rt1.TOTAL_AERB_AMC_COUNT = (dt.Rows[i]["TOTAL_AERB_AMC_COUNT"].ToString());

						rt1.TOTAL_MEDTRONIC_AMC_COUNT = (dt.Rows[i]["TOTAL_MEDTRONIC_AMC_COUNT"].ToString());

						rt1.TOTAL_MINDRAY_AMC_COUNT = (dt.Rows[i]["TOTAL_MINDRAY_AMC_COUNT"].ToString());

						rt1.TOTAL_REGULAR_DELIVERY_CHALLAN_COUNT = (dt.Rows[i]["TOTAL_REGULAR_DELIVERY_CHALLAN_COUNT"].ToString());

						rt1.TOTAL_AERB_DELIVERY_CHALLAN_COUNT = (dt.Rows[i]["TOTAL_AERB_DELIVERY_CHALLAN_COUNT"].ToString());

						rt1.TOTAL_MEDTRONIC_DELIVERY_CHALLAN_COUNT = (dt.Rows[i]["TOTAL_MEDTRONIC_DELIVERY_CHALLAN_COUNT"].ToString());

						rt1.TOTAL_MINDRAY_DELIVERY_CHALLAN_COUNT = (dt.Rows[i]["TOTAL_MINDRAY_DELIVERY_CHALLAN_COUNT"].ToString());

						rt1.TOTAL_REGULAR_SERVICE_CALL_COUNT = (dt.Rows[i]["TOTAL_REGULAR_SERVICE_CALL_COUNT"].ToString());

						rt1.TOTAL_AERB_SERVICE_CALL_COUNT = (dt.Rows[i]["TOTAL_AERB_SERVICE_CALL_COUNT"].ToString());

						rt1.TOTAL_MEDTRONIC_SERVICE_CALL_COUNT = (dt.Rows[i]["TOTAL_MEDTRONIC_SERVICE_CALL_COUNT"].ToString());

						rt1.TOTAL_MINDRAY_SERVICE_CALL_COUNT = (dt.Rows[i]["TOTAL_MINDRAY_SERVICE_CALL_COUNT"].ToString());

						rt1.TOTAL_REGULAR_INVOICE_COUNT = (dt.Rows[i]["TOTAL_REGULAR_INVOICE_COUNT"].ToString());

						rt1.TOTAL_AERB_INVOICE_COUNT = (dt.Rows[i]["TOTAL_AERB_INVOICE_COUNT"].ToString());

						rt1.TOTAL_MEDTRONIC_INVOICE_COUNT = (dt.Rows[i]["TOTAL_MEDTRONIC_INVOICE_COUNT"].ToString());

						rt1.TOTAL_MINDRAY_INVOICE_COUNT = (dt.Rows[i]["TOTAL_MINDRAY_INVOICE_COUNT"].ToString());

					}
					catch (Exception ex)
					{
					}
					FinalreportList1.Add(rt1);
				}
			}
			var _Monthlyreport1 = FinalreportList1;
			return Json(_Monthlyreport1, JsonRequestBehavior.AllowGet);
		}



		public JsonResult GetallHomeCount1()
		{
			long id = Convert.ToInt64(Session["COMPANY_ID"]);
			//cmd = new SqlCommand("Panel_GetHomeCount", con);
			cmd = new SqlCommand("Panel_GetTodaysHomeCount", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@COMPANY_ID", id);
			cmd.CommandTimeout = 220;
			if (con.State == System.Data.ConnectionState.Open)
			{
				con.Close();
			}
			con.Open();
			dt = new DataTable();
			sda = new SqlDataAdapter(cmd);
			sda.Fill(dt);
			con.Close();
			HomeCount rt;
			List<HomeCount> FinalreportList = new List<HomeCount>();
			rt = new HomeCount();
			if (dt != null)
			{
				for (int i = 0; i < dt.Rows.Count; i++)
				{

					try
					{
						rt.TODAYS_REGULAR_CUSTOMER_COUNT = dt.Rows[i]["TODAYS_REGULAR_CUSTOMER_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_REGULAR_CUSTOMER_COUNT"].ToString() : "0";
						rt.TODAYS_AERB_CUSTOMER_COUNT = dt.Rows[i]["TODAYS_AERB_CUSTOMER_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_AERB_CUSTOMER_COUNT"].ToString() : "0";
						rt.TODAYS_MEDTRONIC_CUSTOMER_COUNT = dt.Rows[i]["TODAYS_MEDTRONIC_CUSTOMER_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_MEDTRONIC_CUSTOMER_COUNT"].ToString() : "0";
						rt.TODAYS_MINDRAY_CUSTOMER_COUNT = dt.Rows[i]["TODAYS_MINDRAY_CUSTOMER_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_MINDRAY_CUSTOMER_COUNT"].ToString() : "0";
						rt.TODAYS_REGULAR_PRODUCT_COUNT = dt.Rows[i]["TODAYS_REGULAR_PRODUCT_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_REGULAR_PRODUCT_COUNT"].ToString() : "0";
						rt.TODAYS_MINDRAY_PRODUCT_COUNT = dt.Rows[i]["TODAYS_MINDRAY_PRODUCT_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_MINDRAY_PRODUCT_COUNT"].ToString() : "0";
						rt.TODAYS_REGULAR_QUOTATION_COUNT = dt.Rows[i]["TODAYS_REGULAR_QUOTATION_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_REGULAR_QUOTATION_COUNT"].ToString() : "0";
						rt.TODAYS_AERB_QUOTATION_COUNT = dt.Rows[i]["TODAYS_AERB_QUOTATION_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_AERB_QUOTATION_COUNT"].ToString() : "0";
						rt.TODAYS_MEDTRONIC_QUOTATION_COUNT = dt.Rows[i]["TODAYS_MEDTRONIC_QUOTATION_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_MEDTRONIC_QUOTATION_COUNT"].ToString() : "0";
						rt.TODAYS_MINDRAY_QUOTATION_COUNT = dt.Rows[i]["TODAYS_MINDRAY_QUOTATION_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_MINDRAY_QUOTATION_COUNT"].ToString() : "0";
						rt.TODAYS_COMPANY_COUNT = dt.Rows[i]["TODAYS_COMPANY_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_COMPANY_COUNT"].ToString() : "0";
						rt.TODAYS_EMPLOYEE_COUNT = dt.Rows[i]["TODAYS_EMPLOYEE_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_EMPLOYEE_COUNT"].ToString() : "0";
						rt.TODAYS_VENDOR_COUNT = dt.Rows[i]["TODAYS_VENDOR_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_VENDOR_COUNT"].ToString() : "0";
						rt.TODAYS_REGULAR_AMC_COUNT = dt.Rows[i]["TODAYS_REGULAR_AMC_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_REGULAR_AMC_COUNT"].ToString() : "0";
						rt.TODAYS_AERB_AMC_COUNT = dt.Rows[i]["TODAYS_AERB_AMC_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_AERB_AMC_COUNT"].ToString() : "0";
						rt.TODAYS_MEDTRONIC_AMC_COUNT = dt.Rows[i]["TODAYS_MEDTRONIC_AMC_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_MEDTRONIC_AMC_COUNT"].ToString() : "0";
						rt.TODAYS_MINDRAY_AMC_COUNT = dt.Rows[i]["TODAYS_MINDRAY_AMC_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_MINDRAY_AMC_COUNT"].ToString() : "0";
						rt.TODAYS_REGULAR_DELIVERY_CHALLAN_COUNT = dt.Rows[i]["TODAYS_REGULAR_DELIVERY_CHALLAN_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_REGULAR_DELIVERY_CHALLAN_COUNT"].ToString() : "0";
						rt.TODAYS_AERB_DELIVERY_CHALLAN_COUNT = dt.Rows[i]["TODAYS_AERB_DELIVERY_CHALLAN_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_AERB_DELIVERY_CHALLAN_COUNT"].ToString() : "0";
						rt.TODAYS_MEDTRONIC_DELIVERY_CHALLAN_COUNT = dt.Rows[i]["TODAYS_MEDTRONIC_DELIVERY_CHALLAN_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_MEDTRONIC_DELIVERY_CHALLAN_COUNT"].ToString() : "0";
						rt.TODAYS_MINDRAY_DELIVERY_CHALLAN_COUNT = dt.Rows[i]["TODAYS_MINDRAY_DELIVERY_CHALLAN_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_MINDRAY_DELIVERY_CHALLAN_COUNT"].ToString() : "0";
						rt.TODAYS_REGULAR_SERVICE_CALL_COUNT = dt.Rows[i]["TODAYS_REGULAR_SERVICE_CALL_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_REGULAR_SERVICE_CALL_COUNT"].ToString() : "0";
						rt.TODAYS_AERB_SERVICE_CALL_COUNT = dt.Rows[i]["TODAYS_AERB_SERVICE_CALL_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_AERB_SERVICE_CALL_COUNT"].ToString() : "0";
						rt.TODAYS_MEDTRONIC_SERVICE_CALL_COUNT = dt.Rows[i]["TODAYS_MEDTRONIC_SERVICE_CALL_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_MEDTRONIC_SERVICE_CALL_COUNT"].ToString() : "0";
						rt.TODAYS_MINDRAY_SERVICE_CALL_COUNT = dt.Rows[i]["TODAYS_MINDRAY_SERVICE_CALL_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_MINDRAY_SERVICE_CALL_COUNT"].ToString() : "0";
						rt.TODAYS_REGULAR_INVOICE_COUNT = dt.Rows[i]["TODAYS_REGULAR_INVOICE_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_REGULAR_INVOICE_COUNT"].ToString() : "0";
						rt.TODAYS_AERB_INVOICE_COUNT = dt.Rows[i]["TODAYS_AERB_INVOICE_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_AERB_INVOICE_COUNT"].ToString() : "0";
						rt.TODAYS_MEDTRONIC_INVOICE_COUNT = dt.Rows[i]["TODAYS_MEDTRONIC_INVOICE_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_MEDTRONIC_INVOICE_COUNT"].ToString() : "0";
						rt.TODAYS_MINDRAY_INVOICE_COUNT = dt.Rows[i]["TODAYS_MINDRAY_INVOICE_COUNT"] != DBNull.Value ? dt.Rows[i]["TODAYS_MINDRAY_INVOICE_COUNT"].ToString() : "0";
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






		public ActionResult About()
		{
			ViewBag.Message = "Your application description page.";

			return View();
		}

		public ActionResult Contact()
		{
			ViewBag.Message = "Your contact page.";

			return View();
		}


		public JsonResult GetCompany()
		{
			var _getadmin = db.TB_CompanyMaster.Where(z => z.STATUS == "Active").Select(s => new { s.COMPANY_ID, s.COMPANY_NAME, s.STATUS, s.REG_DATE }).ToList();
			return Json(_getadmin, JsonRequestBehavior.AllowGet);
		}



		public ActionResult Login()
		{
			if (Session["EMP_ID"] == null)
			{
				HttpCookie loginCookie = Request.Cookies["Sai_Health_Care"];
				if (loginCookie != null)
				{
					string EMP_ID = loginCookie.Values["EMP_ID"];
					string EMP_NAME = loginCookie.Values["EMP_NAME"];
					string CONTACT_NO = loginCookie.Values["CONTACT_NO"];
					string COMPANY_ID = loginCookie.Values["COMPANY_ID"];
					string COMPANY_NAME = loginCookie.Values["COMPANY_NAME"];

					Session["EMP_ID"] = EMP_ID;
					Session["EMP_NAME"] = EMP_NAME;
					Session["CONTACT_NO"] = CONTACT_NO;
					Session["COMPANY_ID"] = COMPANY_ID;
					Session["COMPANY_NAME"] = COMPANY_NAME;

					return RedirectToAction("Index", "Home");
				}
				return View();
			}
			else
			{
				return RedirectToAction("Index", "Home");
			}
		}

		[HttpPost]
		public ActionResult Login(Login tB_Login)
		{
			try
			{
				string CONTACT_NO = tB_Login.CONTACT_NO;
				string PASSWORD = tB_Login.PASSWORD;
				long COMPANY_ID = Convert.ToInt64(tB_Login.COMPANY_ID);
				Session["COMPANY_ID"] = tB_Login.COMPANY_ID;

				var user1 = db.Tb_EmployeeMaster
			   .Where(u => u.CONTACT_NO == CONTACT_NO && u.PASSWORD == PASSWORD && u.STATUS == "Active")
			   .Select(u => new
			   {
				   User = u,
				   DEPARTMENT_ID = u.DEPARTMENT_ID,
				   DESIGNATION_ID = u.DESIGNATION_ID
			   })
			  .FirstOrDefault();

				if (user1 != null)
				{
					if (user1.DEPARTMENT_ID == 17 && user1.DESIGNATION_ID == 14)
					{
						var user = db.Tb_EmployeeMaster.Where(u => u.CONTACT_NO == CONTACT_NO && u.PASSWORD == PASSWORD && u.STATUS == "Active").FirstOrDefault();

						if (user != null)
						{
							Session["EMP_ID"] = user.EMP_ID;
							Session["EMP_NAME"] = user.EMP_NAME;
							Session["CONTACT_NO"] = user.CONTACT_NO;
							Session["COMPANY_ID"] = 0;
							Session["COMPANY_NAME"] = "";
							if (tB_Login.RememberMe)
							{
								if (HttpContext.Request.Cookies["Sai_Health_Care"] == null)
								{
									HttpCookie _rememberme = new HttpCookie("Sai_Health_Care");
									_rememberme.Expires = DateTime.Now.AddDays(1);
									_rememberme["EMP_ID"] = user.EMP_ID.ToString();
									_rememberme["EMP_NAME"] = user.EMP_NAME.ToString();
									_rememberme["CONTACT_NO"] = user.CONTACT_NO.ToString();
									_rememberme["COMPANY_ID"] = tB_Login.COMPANY_ID.ToString();
									_rememberme["COMPANY_NAME"] = "";
									_rememberme.Secure = false;

									Response.Cookies.Add(_rememberme);
								}
							}
							return RedirectToAction("Index", "Home");

						}
						else
						{
							ViewBag.WrongPassword = "Please enter correct mobile number or password or Company";
							ModelState.Remove("Password");
							return View();
						}
					}

					else
					{
						var _company = db.TB_CompanyMaster.Where(z => z.STATUS == "Active" && z.COMPANY_ID == COMPANY_ID).Select(s => new { s.COMPANY_ID, s.COMPANY_NAME, s.STATUS, s.REG_DATE }).FirstOrDefault();
						Session["COMPANY_NAME"] = _company.COMPANY_NAME;

						var user = db.Tb_EmployeeMaster.Where(u => u.CONTACT_NO == CONTACT_NO && u.PASSWORD == PASSWORD && u.STATUS == "Active").FirstOrDefault();

						if (user != null)
						{
							Session["EMP_ID"] = user.EMP_ID;
							Session["EMP_NAME"] = user.EMP_NAME;
							Session["CONTACT_NO"] = user.CONTACT_NO;
							Session["COMPANY_ID"] = tB_Login.COMPANY_ID;
							Session["COMPANY_NAME"] = _company.COMPANY_NAME;
							if (tB_Login.RememberMe)
							{
								if (HttpContext.Request.Cookies["Sai_Health_Care"] == null)
								{
									HttpCookie _rememberme = new HttpCookie("Sai_Health_Care");
									_rememberme.Expires = DateTime.Now.AddDays(1);
									_rememberme["EMP_ID"] = user.EMP_ID.ToString();
									_rememberme["EMP_NAME"] = user.EMP_NAME.ToString();
									_rememberme["CONTACT_NO"] = user.CONTACT_NO.ToString();
									_rememberme["COMPANY_ID"] = tB_Login.COMPANY_ID.ToString();
									_rememberme["COMPANY_NAME"] = _company.COMPANY_NAME.ToString();
									_rememberme.Secure = false;

									Response.Cookies.Add(_rememberme);
								}
							}
							return RedirectToAction("Index", "Home");

						}
						else
						{
							ViewBag.WrongPassword = "Please enter correct mobile number or password or Company";
							ModelState.Remove("Password");
							return View();
						}
					}
				}

				else
				{
					ViewBag.WrongPassword = "Please enter correct mobile number or password or Company";
					ModelState.Remove("Password");
					return View();
				}

			}
			catch (Exception ex)
			{

			}
			return RedirectToAction("Index", "Home");
		}

		public JsonResult AccessListTest()
		{
			try
			{
				Int64 id = Convert.ToInt64(Session["EMP_ID"]);
				var _getadmin = db.TB_AdminPermission.Where(z => z.EMP_ID == id).Select(s => new
				{

					s.EMP_ID,
					s.Customer_Master,
					s.Regular_Customer,
					s.AERB_Customer,
					s.Medtronic_Customer,
					s.Mindray_Customer,
					s.Customer_Service,
					s.Service_Call_Assign,
					s.Regular,
					s.AERB,
					s.Medtronic,
					s.Mindray,
					s.Sales_Lead,
					s.Regular_Product_Master,
					s.Category,
					s.Manufacturer,
					s.Regular_Product,
					s.Spare_Part,
					s.URD_Product_Purchase,
					s.Standard_Accessories,
					s.Mindray_Product_Master,
					s.Mindray_Product,
					s.Probe_Specifications,
					s.Medtronic_Products_List,
					s.Medtronic_Product,
					s.Main_System,
					s.Attachments,
					s.Tools,
					s.Incentive,
					s.Incentive_Master,
					s.Incentive_Scheme,
					s.Quotation_Master,
					s.Regular_Quotation,
					s.AERB_Quotation,
					s.Medtronic_Quotation,
					s.Mindray_Quotation,
					s.Report_Master,
					s.Attendance_Report,
					s.Leave_Report,
					s.Monthly_Salary_Report,
					s.Daily_Activity,
					s.Delivery_Challan,
					s.Regular_DC,
					s.AERB_DC,
					s.Medtronic_DC,
					s.Mindray_DC,
					s.AMC_CMC_Master,
					s.AMC_CMC_Regular,
					s.AMC_CMC_AERB,
					s.AMC_CMC_Medtronic,
					s.AMC_CMC_Mindray,
					s.Payment_Receipt,
					s.Payment_Receipt_Regular,
					s.Payment_Receipt_AERB,
					s.Payment_Receipt_Medtronic,
					s.Payment_Receipt_Mindray,
					s.Salary_Wages,
					s.Salary_Increment,
					s.Advance_Salary,
					s.Employee_Loan,
					s.Setting,
					s.Company_Master,
					s.Employee_Registration,
					s.Department_Master,
					s.Designation_Master,
					s.Vender_Registration,
					s.Solution_Bank,
					s.City_Master,
					s.Invoice_Master,
					s.Invoice_Regular,
					s.Invoice_AERB,
					s.Invoice_Medtronic,
					s.Invoice_Mindray,
					s.Vendor_PO_Master,
					s.Vendor_PO_Regular,
					s.Vendor_PO_AERB,
					s.Vendor_PO_Medtronic,
					s.Vendor_PO_Mindray,
					s.Employee_Expense_Master

				}).FirstOrDefault();
				return Json(_getadmin, JsonRequestBehavior.AllowGet);
			}

			catch (Exception ex)
			{
				throw ex;
			}

		}



		public ActionResult Logout()
		{
			Session["EMP_ID"] = null;
			Session["EMP_NAME"] = null;
			Session["CONTACT_NO"] = null;
			Session["COMPANY_ID"] = null;
			Session["COMPANY_NAME"] = null;
			Session.Clear();
			Session.Abandon();
			//Delete GrapeMasterLoginDetails Cookie
			if (Request.Cookies["Sai_Health_Care"] != null)
			{
				Response.Cookies["Sai_Health_Care"].Expires = DateTime.Now.AddDays(-1);
			}
			FormsAuthentication.SignOut();
			//return Json(new { success = true });
			return RedirectToAction("Login", "Home");
		}
	}
}