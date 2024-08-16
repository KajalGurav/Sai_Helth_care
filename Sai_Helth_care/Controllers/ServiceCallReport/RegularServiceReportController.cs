using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sai_Helth_care.Models;

namespace Sai_Helth_care.Controllers.ServiceCallReport
{
    public class RegularServiceReportController : Controller
    {
        // GET: RegularServiceReport
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        static DataSet ds;

        public ActionResult Index(long id)
        {
            Session["ServiceCallId"] = id;
            cmd = new SqlCommand("Panel_GetServiceCallDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ServiceReportID", id);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            RegularServiceReport rt;
            List<RegularServiceReport> FinalreportList = new List<RegularServiceReport>();
            rt = new RegularServiceReport();
            rt.SERVICE_CALL_ID = Convert.ToInt64(dt.Rows[0]["SERVICE_CALL_ID"]);
            rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[0]["CUSTOMER_ID"]);
            rt.CUSTOMER_TYPE = (dt.Rows[0]["CUSTOMER_TYPE"].ToString());
            rt.COMPANY_NAME = (dt.Rows[0]["COMPANY_NAME"].ToString());
            rt.CONTRACT_TYPE_NAME = (dt.Rows[0]["CONTRACT_TYPE_NAME"].ToString());
            rt.PRODUCT_NAME = (dt.Rows[0]["PRODUCT_NAME"].ToString());
            rt.CAT_NAME = (dt.Rows[0]["CAT_NAME"].ToString());
            rt.M_NAME = (dt.Rows[0]["M_NAME"].ToString());

            if (rt.CUSTOMER_TYPE == "Mindray  Customer" && rt.COMPANY_NAME == "Sai Medical Services" && rt.M_NAME == "Mindray" && rt.CAT_NAME == "Ultrasound  Machine")
            {
                return RedirectToAction("MindrayService", "RegularServiceReport");
            }

            else if ((rt.COMPANY_NAME == "Sai Healthcare Services" || rt.COMPANY_NAME == "Sai Imaging Services" || rt.COMPANY_NAME == "Sai Healthcare Equipment" || rt.COMPANY_NAME == "Sai Imaging Equipment" || rt.COMPANY_NAME == "Saikrupa Enterprises") && rt.CUSTOMER_TYPE == "Regular Customer" && rt.CAT_NAME == "CT Scan Machine")
            {
                return RedirectToAction("SaiHealthService", "RegularServiceReport");
            }

            else if (((rt.COMPANY_NAME == "Sai Enterprises" || rt.COMPANY_NAME == "Sai Medical Equipment") && rt.CAT_NAME == "Ultrasound  Machine") || (rt.COMPANY_NAME == "Sai Enterprises" && rt.CAT_NAME == "Cathlab") || ((rt.COMPANY_NAME == "Sai Enterprises" || rt.COMPANY_NAME == "Sai Medical Equipment") && (rt.CAT_NAME == "BMD Machine" || rt.CAT_NAME == "MAMMOGRAPHY Scan Machine")) && rt.CUSTOMER_TYPE == "Regular Customer")
            {
                return RedirectToAction("RegularService", "RegularServiceReport");
            }

            else if ((rt.CAT_NAME == "Ultrasound  Machine" || rt.CAT_NAME == "Cathlab" || rt.CAT_NAME == "BMD Machine" || rt.CAT_NAME == "MAMMOGRAPHY Scan Machine" || rt.CAT_NAME == "CT Scan Machine") && rt.CUSTOMER_TYPE == "Regular Customer" && rt.COMPANY_NAME == "Sai Medical Services")
            {
                return RedirectToAction("MedicalService", "RegularServiceReport");
            }

            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        public ActionResult RegularService()
        {
            return View();
        }

        public ActionResult MedicalService()
        {
            return View();
        }

        public ActionResult MindrayService()
        {
            return View();
        }

        public ActionResult SaiHealthService()
        {
            return View();
        }

        public JsonResult GetRegularServiceReport()
        {
            long id = Convert.ToInt64(Session["ServiceCallId"]);
            cmd = new SqlCommand("Panel_GetRegularServiceReport", con);
            cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@ServiceReportID", id);
            cmd.Parameters.AddWithValue("@ServiceReportID", id);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            RegularServiceReport rt;
            List<RegularServiceReport> FinalreportList = new List<RegularServiceReport>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new RegularServiceReport();
                    try
                    {
                        rt.ServiceReportID = Convert.ToInt64(dt.Rows[i]["ServiceReportID"]);
                        rt.CustomerDetails = (dt.Rows[i]["CustomerDetails"].ToString());
                        rt.NatureOfProblem = (dt.Rows[i]["NatureOfProblem"].ToString());
                        rt.WorkDoneSolution = (dt.Rows[i]["WorkDoneSolution"].ToString());
                        rt.ServiceCharges = (dt.Rows[i]["ServiceCharges"].ToString());
                        rt.Total = (dt.Rows[i]["Total"].ToString());
                        rt.EngineerRemark = (dt.Rows[i]["EngineerRemark"].ToString());
                        rt.BANK_NAME = (dt.Rows[i]["BANK_NAME"].ToString());
                        rt.ACC_NO = (dt.Rows[i]["ACC_NO"].ToString());
                        rt.IFSC_CODE = (dt.Rows[i]["IFSC_CODE"].ToString());
                        rt.Date = (dt.Rows[i]["Date"].ToString());
                        rt.ModelNumber = (dt.Rows[i]["ModelNumber"].ToString());
                        rt.Make = (dt.Rows[i]["Make"].ToString());
                        rt.SWVersion = (dt.Rows[i]["SWVersion"].ToString());
                        rt.SerialNumber = (dt.Rows[i]["SerialNumber"].ToString());
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"].ToString());
                        rt.CompanyType = (dt.Rows[i]["CompanyType"].ToString());
                        rt.ServiceType = (dt.Rows[i]["ServiceType"].ToString());
                        rt.AmountInWord = (dt.Rows[i]["AmountInWord"].ToString());
                        rt.PaymentsDetails = (dt.Rows[i]["PaymentsDetails"].ToString());
                        rt.PaidAmount = (dt.Rows[i]["PaidAmount"].ToString());
                        rt.BalanceAmount = (dt.Rows[i]["BalanceAmount"].ToString());
                        rt.SelectWork = (dt.Rows[i]["SelectWork"].ToString());
                        rt.SelectCategory = (dt.Rows[i]["SelectCategory"].ToString());
                        rt.HospitalDiagnosticCenter = (dt.Rows[i]["HospitalDiagnosticCenter"].ToString());
                        rt.Address = (dt.Rows[i]["Address"].ToString());
                        rt.Department = (dt.Rows[i]["Department"].ToString());
                        rt.ContactPerson = (dt.Rows[i]["ContactPerson"].ToString());
                        rt.Telephone = (dt.Rows[i]["Telephone"].ToString());
                        rt.MobileNumber = (dt.Rows[i]["MobileNumber"].ToString());
                        rt.ZipPostalCode = (dt.Rows[i]["ZipPostalCode"].ToString());
                        rt.Title = (dt.Rows[i]["Title"].ToString());
                        rt.Email = (dt.Rows[i]["Email"].ToString());
                        rt.Accessories = (dt.Rows[i]["Accessories"].ToString());
                        rt.Warranty = (dt.Rows[i]["Warranty"].ToString());
                        rt.WarrantyStartDate = (dt.Rows[i]["WarrantyStartDate"].ToString());
                        rt.WarrantyEndDate = (dt.Rows[i]["WarrantyEndDate"].ToString());
                        rt.ServiceInformation = (dt.Rows[i]["ServiceInformation"].ToString());
                        rt.MalfunctionDescription = (dt.Rows[i]["MalfunctionDescription"].ToString());
                        rt.ServiceProcess = (dt.Rows[i]["ServiceProcess"].ToString());
                        rt.SatisfactionFeedback = (dt.Rows[i]["SatisfactionFeedback"].ToString());
                        rt.Comment = (dt.Rows[i]["Comment"].ToString());
                        rt.CustomerName = (dt.Rows[i]["CustomerName"].ToString());
                        rt.EngineerName = (dt.Rows[i]["EngineerName"].ToString());
                        rt.BankID = (dt.Rows[i]["BankID"].ToString());
                        rt.ModelName = (dt.Rows[i]["ModelName"].ToString());
                        rt.GST_NO = (dt.Rows[i]["GST_NO"].ToString());
                        rt.CS_SpecificSuggestion = (dt.Rows[i]["CS_SpecificSuggestion"].ToString());
                        rt.CompanyLogo = (dt.Rows[i]["CompanyLogo"].ToString());
                        rt.SafetyInspection = (dt.Rows[i]["SafetyInspection"].ToString());
                        rt.FunctionTest = (dt.Rows[i]["FunctionTest"].ToString());
                        rt.SoftwareUpgrade = (dt.Rows[i]["SoftwareUpgrade"].ToString());
                        rt.NewSoftwareVersion = (dt.Rows[i]["NewSoftwareVersion"].ToString());
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

        public JsonResult GetSparepartCollection()
        {
            long id = Convert.ToInt64(Session["ServiceCallId"]);
            cmd = new SqlCommand("Panel_GetSparepartCollection", con);
            cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@ServiceReportID", id);
            cmd.Parameters.AddWithValue("@ServiceCallID", id);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            RegularServiceReport rt;
            List<RegularServiceReport> FinalreportList = new List<RegularServiceReport>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new RegularServiceReport();
                    try
                    {
                        rt.SparePartCollectionID = Convert.ToInt64(dt.Rows[i]["SparePartCollectionID"]);
                        rt.SparePartName = (dt.Rows[i]["SparePartName"].ToString());
                        rt.Charges = (dt.Rows[i]["Charges"].ToString());
                        rt.PN = (dt.Rows[i]["PN"].ToString());
                        rt.OldSN = (dt.Rows[i]["OldSN"].ToString());
                        rt.NewSN = (dt.Rows[i]["NewSN"].ToString());
                        rt.Quantity = (dt.Rows[i]["Quantity"].ToString());
                        rt.Charges = (dt.Rows[i]["Charges"].ToString());
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