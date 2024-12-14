﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sai_Helth_care.Models;
using System.Drawing.Imaging;
using System.IO;
using System.Web.Hosting;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class MindrayCustomerController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        // GET: MindrayCustomer

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

        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("Get_TB_Mindray_Customer_Count", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
                //cmd.Parameters.AddWithValue("@STARTING_DATE", tB_Admin.STARTING_DATE);
                //cmd.Parameters.AddWithValue("@ENDING_DATE", tB_Admin.ENDING_DATE);
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
                //throw ex;
            }
            return Json(new { success = i }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetallAdmin(Search_Admin tB_Admin)
        {
            cmd = new SqlCommand("SP_GetTB_Mindray_Customer", con);
            cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@ADMIN_ID", 1);
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
            cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
            // cmd.Parameters.AddWithValue("@STARTING_DATE", tB_Admin.STARTING_DATE);
            // cmd.Parameters.AddWithValue("@ENDING_DATE", tB_Admin.ENDING_DATE);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            CustomerMaster rt;
            List<CustomerMaster> FinalreportList = new List<CustomerMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new CustomerMaster();
                    try
                    {
                        rt.Customer_ID = Convert.ToInt64(dt.Rows[i]["Customer_ID"]);
                        rt.STATE_ID = Convert.ToInt64(dt.Rows[i]["STATE_ID"]);
                        rt.CITY_ID = Convert.ToInt64(dt.Rows[i]["CITY_ID"]);
                        rt.SHIP_STATE_ID = Convert.ToInt64(dt.Rows[i]["SHIP_STATE_ID"]);
                        rt.SHIP_CITY_ID = Convert.ToInt64(dt.Rows[i]["SHIP_CITY_ID"]);
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"].ToString());
                        rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"]).ToString();
                        rt.ALTERNATE_CONTACT_NO = (dt.Rows[i]["ALTERNATE_CONTACT_NO"]).ToString();
                        rt.EMAIL = (dt.Rows[i]["EMAIL"]).ToString();
                        rt.ALTERNATE_EMAIL = (dt.Rows[i]["ALTERNATE_EMAIL"]).ToString();
                        rt.BILLING_ADDRESS = (dt.Rows[i]["BILLING_ADDRESS"]).ToString();
                        rt.SHIPPING_ADDRESS = (dt.Rows[i]["SHIPPING_ADDRESS"]).ToString();
                        rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.SHIPPING_ZIP_CODE = (dt.Rows[i]["SHIPPING_ZIP_CODE"]).ToString();
                        //rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"]).ToString();
                        rt.DEGREE_OF_CUSTOMER = (dt.Rows[i]["DEGREE_OF_CUSTOMER"]).ToString();
                        rt.PAN_NO = (dt.Rows[i]["PAN_NO"]).ToString();
                        rt.GST_NO = (dt.Rows[i]["GST_NO"]).ToString();
                        rt.TIN_NO = (dt.Rows[i]["TIN_NO"]).ToString();
                        rt.PNDT_NO = (dt.Rows[i]["PNDT_NO"]).ToString();
                        rt.PNDT_VALIDITY = (dt.Rows[i]["PNDT_VALIDITY"]).ToString();
                        rt.UPLOAD_PNDT_CERTIFICATE = (dt.Rows[i]["UPLOAD_PNDT_CERTIFICATE"]).ToString();
                        rt.UPLOAD_PAN_CERTIFICATE = (dt.Rows[i]["UPLOAD_PAN_CERTIFICATE"]).ToString();
                        rt.CUSTOMER_TYPE_ID = dt.Rows[i]["CUSTOMER_TYPE_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CUSTOMER_TYPE_ID"]);
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();

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



        public JsonResult GetState()
        {
            var _getadmin = db.TB_StateMaster.Where(z => z.STATUS == "Active").OrderBy(s => s.STATE_NAME).Select(s => new { s.STATE_ID, s.STATE_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCity(long id)
        {
            var _getadmin = db.TB_CityMaster.Where(z => z.STATUS == "Active" && z.STATE_ID == id).OrderBy(s => s.CITY_NAME).Select(s => new { s.STATE_ID, s.CITY_ID, s.CITY_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }




        public ActionResult AddAdmin(CustomerMaster tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOAD_PNDT_CERTIFICATE == "Yes")
                {
                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;
                    fileName = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName1 = fileName;
                    tB_admin.UPLOAD_PNDT_CERTIFICATE = Master.serverurl + "/Images/" + fileName;
                    fileName = Path.Combine(Server.MapPath("~/Images/"), fileName);

                    if (tB_admin.UPLOAD_PNDT_CERTIFICATE != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/Images/" + fileName1), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.UPLOAD_PNDT_CERTIFICATE = "";
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOAD_PAN_CERTIFICATE == "Yes")
                {
                    string fileName2 = tB_admin.ImageName1;
                    string extension = tB_admin.ImageExtension1;
                    fileName2 = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName3 = fileName2;
                    tB_admin.UPLOAD_PAN_CERTIFICATE = Master.serverurl + "/Images/" + fileName2;
                    fileName2 = Path.Combine(Server.MapPath("~/Images/"), fileName2);

                    if (tB_admin.UPLOAD_PAN_CERTIFICATE != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data1);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/Images/" + fileName3), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.UPLOAD_PAN_CERTIFICATE = "";
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                cmd = new SqlCommand("Insert_Mindray_customer", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tB_admin.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@FIRM_NAME", tB_admin.FIRM_NAME);
                cmd.Parameters.AddWithValue("@CONTACT_NO", tB_admin.CONTACT_NO);
                cmd.Parameters.AddWithValue("@ALTERNATE_CONTACT_NO", tB_admin.ALTERNATE_CONTACT_NO);
                cmd.Parameters.AddWithValue("@EMAIL", tB_admin.EMAIL);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_admin.STATE_ID);
                cmd.Parameters.AddWithValue("@CITY_ID", tB_admin.CITY_ID);
                cmd.Parameters.AddWithValue("@SHIP_STATE_ID", tB_admin.SHIP_STATE_ID);
                cmd.Parameters.AddWithValue("@SHIP_CITY_ID", tB_admin.SHIP_CITY_ID);
                cmd.Parameters.AddWithValue("@ALTERNATE_EMAIL", tB_admin.ALTERNATE_EMAIL);
                cmd.Parameters.AddWithValue("@BILLING_ADDRESS", tB_admin.BILLING_ADDRESS);
                cmd.Parameters.AddWithValue("@SHIPPING_ADDRESS", tB_admin.SHIPPING_ADDRESS);
                cmd.Parameters.AddWithValue("@ZIP_CODE", tB_admin.ZIP_CODE);
                //cmd.Parameters.AddWithValue("@FIRM_ADDRESS", tB_admin.FIRM_ADDRESS);
                cmd.Parameters.AddWithValue("@DEGREE_OF_CUSTOMER", tB_admin.DEGREE_OF_CUSTOMER);
                cmd.Parameters.AddWithValue("@PAN_NO", tB_admin.PAN_NO);
                cmd.Parameters.AddWithValue("@GST_NO", tB_admin.GST_NO);
                cmd.Parameters.AddWithValue("@TIN_NO", tB_admin.TIN_NO);
                cmd.Parameters.AddWithValue("@PNDT_NO", tB_admin.PNDT_NO);
                cmd.Parameters.AddWithValue("@PNDT_VALIDITY", tB_admin.PNDT_VALIDITY);
                cmd.Parameters.AddWithValue("@UPLOAD_PNDT_CERTIFICATE", tB_admin.UPLOAD_PNDT_CERTIFICATE);
                cmd.Parameters.AddWithValue("@UPLOAD_PAN_CERTIFICATE", tB_admin.UPLOAD_PAN_CERTIFICATE);
                cmd.Parameters.AddWithValue("@SHIPPING_ZIP_CODE", tB_admin.SHIPPING_ZIP_CODE);
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



        public ActionResult EditAdmin(CustomerMaster tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOAD_PNDT_CERTIFICATE == "Yes")
                {
                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;
                    fileName = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName1 = fileName;
                    tB_admin.UPLOAD_PNDT_CERTIFICATE = Master.serverurl + "/Images/" + fileName;
                    fileName = Path.Combine(Server.MapPath("~/Images/"), fileName);

                    if (tB_admin.UPLOAD_PNDT_CERTIFICATE != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/Images/" + fileName1), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.UPLOAD_PNDT_CERTIFICATE = "";
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOAD_PAN_CERTIFICATE == "Yes")
                {
                    string fileName2 = tB_admin.ImageName1;
                    string extension = tB_admin.ImageExtension1;
                    fileName2 = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName3 = fileName2;
                    tB_admin.UPLOAD_PAN_CERTIFICATE = Master.serverurl + "/Images/" + fileName2;
                    fileName2 = Path.Combine(Server.MapPath("~/Images/"), fileName2);

                    if (tB_admin.UPLOAD_PAN_CERTIFICATE != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data1);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/Images/" + fileName3), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.UPLOAD_PAN_CERTIFICATE = "";
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                cmd = new SqlCommand("Update_Mindray_customer", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER_NAME", tB_admin.CUSTOMER_NAME);
                cmd.Parameters.AddWithValue("@FIRM_NAME", tB_admin.FIRM_NAME);
                cmd.Parameters.AddWithValue("@CONTACT_NO", tB_admin.CONTACT_NO);
                cmd.Parameters.AddWithValue("@ALTERNATE_CONTACT_NO", tB_admin.ALTERNATE_CONTACT_NO);
                cmd.Parameters.AddWithValue("@EMAIL", tB_admin.EMAIL);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_admin.STATE_ID);
                cmd.Parameters.AddWithValue("@CITY_ID", tB_admin.CITY_ID);
                cmd.Parameters.AddWithValue("@SHIP_STATE_ID", tB_admin.SHIP_STATE_ID);
                cmd.Parameters.AddWithValue("@SHIP_CITY_ID", tB_admin.SHIP_CITY_ID);
                cmd.Parameters.AddWithValue("@ALTERNATE_EMAIL", tB_admin.ALTERNATE_EMAIL);
                cmd.Parameters.AddWithValue("@BILLING_ADDRESS", tB_admin.BILLING_ADDRESS);
                cmd.Parameters.AddWithValue("@SHIPPING_ADDRESS", tB_admin.SHIPPING_ADDRESS);
                cmd.Parameters.AddWithValue("@ZIP_CODE", tB_admin.ZIP_CODE);
                //cmd.Parameters.AddWithValue("@FIRM_ADDRESS", tB_admin.FIRM_ADDRESS);
                cmd.Parameters.AddWithValue("@DEGREE_OF_CUSTOMER", tB_admin.DEGREE_OF_CUSTOMER);
                cmd.Parameters.AddWithValue("@PAN_NO", tB_admin.PAN_NO);
                cmd.Parameters.AddWithValue("@GST_NO", tB_admin.GST_NO);
                cmd.Parameters.AddWithValue("@TIN_NO", tB_admin.TIN_NO);
                cmd.Parameters.AddWithValue("@PNDT_NO", tB_admin.PNDT_NO);
                cmd.Parameters.AddWithValue("@PNDT_VALIDITY", tB_admin.PNDT_VALIDITY);
                cmd.Parameters.AddWithValue("@UPLOAD_PNDT_CERTIFICATE", tB_admin.UPLOAD_PNDT_CERTIFICATE);
                cmd.Parameters.AddWithValue("@UPLOAD_PAN_CERTIFICATE", tB_admin.UPLOAD_PAN_CERTIFICATE);
                cmd.Parameters.AddWithValue("@Customer_ID", tB_admin.Customer_ID);
                cmd.Parameters.AddWithValue("@SHIPPING_ZIP_CODE", tB_admin.SHIPPING_ZIP_CODE);
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


        public ActionResult CustomerDetails(long id)
        {
            Session["Customer_ID"] = id;
            return View();
        }
    }
}