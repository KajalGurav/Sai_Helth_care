using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sai_Helth_care.Models;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class AdminMasterController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        static DataSet ds;
        // GET: AdminMaster
        public ActionResult AdminProfile()
        {
            return View();
        }

        public JsonResult GetAdminProfile() {
            long id = Convert.ToInt64(Session["EMP_ID"]);
            cmd = new SqlCommand("Get_EmployeeDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_ID", id);
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            ds = new DataSet();
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            sda.Fill(ds);
            dt = ds.Tables[0];
            EmployeeMaster rt;
            List<EmployeeMaster> FinalreportList = new List<EmployeeMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new EmployeeMaster();
                    try
                    {
                        rt.EMP_ID = Convert.ToInt64(dt.Rows[i]["EMP_ID"]);
                        rt.EMP_NAME = (dt.Rows[i]["EMP_NAME"].ToString());
                        rt.DESI_NAME = (dt.Rows[i]["DESI_NAME"].ToString());
                        rt.EMP_DOB = (dt.Rows[i]["EMP_DOB"].ToString());
                        rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"].ToString());
                        rt.PERMENENT_ADDRESS = (dt.Rows[i]["PERMENENT_ADDRESS"].ToString());
                        rt.EMAIL = (dt.Rows[i]["EMAIL"]).ToString();
                        //rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        //rt.BILLING_ADDRESS = (dt.Rows[i]["BILLING_ADDRESS"]).ToString();
                        //rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        //rt.FIRM_ID = Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
                        //rt.PO_DATE = (dt.Rows[i]["PO_DATE"]).ToString();
                        //rt.PAYMENT_TERM = (dt.Rows[i]["PAYMENT_TERM"]).ToString();
                        //rt.NOTE = (dt.Rows[i]["NOTE"]).ToString();
                        //  rt.SELECT_PRODUCT_IS_NEW = (dt.Rows[i]["SELECT_PRODUCT_IS_NEW"]).ToString();
                        //   rt.QUOTATION_FOR_SPARE_PART = (dt.Rows[i]["QUOTATION_FOR_SPARE_PART"]).ToString();
                        //  rt.QUNATITY = (dt.Rows[i]["QUNATITY"]).ToString();
                        //   rt.PRODUCT_PRICE = (dt.Rows[i]["PRODUCT_PRICE"]).ToString();
                        //  rt.MODIFY_PRODUCT_PRICE = (dt.Rows[i]["MODIFY_PRODUCT_PRICE"]).ToString();
                        //rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
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
        public ActionResult EditProfile()
        {
            return View();
        }
    }
}