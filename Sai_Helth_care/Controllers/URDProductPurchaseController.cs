using System;
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
    public class URDProductPurchaseController : Controller
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
                cmd = new SqlCommand("SP_Get_Tb_URDProduct_Count", con);
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
                throw ex;
            }
            return Json(new { success = i }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetallAdmin(Search_Admin tB_Admin)
        {
            cmd = new SqlCommand("SP_GetTb_URDProduct", con);
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
            UrdProduct rt;
            List<UrdProduct> FinalreportList = new List<UrdProduct>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new UrdProduct();
                    try
                    {

                        rt.UP_ID = Convert.ToInt64(dt.Rows[i]["UP_ID"]);
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.CAT_ID = Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        rt.M_ID = Convert.ToInt64(dt.Rows[i]["M_ID"]);
                        rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.EMP_ENG_ID = Convert.ToInt64(dt.Rows[i]["EMP_ENG_ID"]);
                        rt.FIRM_ID = Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
                        rt.LETER_REF_NO = (dt.Rows[i]["LETER_REF_NO"].ToString());
                        rt.LETTER_DATE = (dt.Rows[i]["LETTER_DATE"].ToString());
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"].ToString());
                        rt.COMPANY_NAME = (dt.Rows[i]["COMPANY_NAME"].ToString());
                        rt.CAT_NAME = (dt.Rows[i]["CAT_NAME"].ToString());
                        rt.M_NAME = (dt.Rows[i]["M_NAME"].ToString());
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"].ToString());
                        rt.MRC_NO = (dt.Rows[i]["MRC_NO"]).ToString();
                        rt.PNDT_CELL = (dt.Rows[i]["PNDT_CELL"]).ToString();
                        rt.PNDT_CIRTIFICATE_NO = (dt.Rows[i]["PNDT_CIRTIFICATE_NO"]).ToString();
                        rt.VALIDITY_DATE = (dt.Rows[i]["VALIDITY_DATE"]).ToString();
                        rt.URD_STATUS = (dt.Rows[i]["URD_STATUS"]).ToString();
                        rt.GOV_PERMITED_URD_REF_NO = (dt.Rows[i]["GOV_PERMITED_URD_REF_NO"]).ToString();
                        rt.LETTER_RECIVED_DATE = (dt.Rows[i]["LETTER_RECIVED_DATE"]).ToString();
                        rt.ACCESSORIES_DETAILS = (dt.Rows[i]["ACCESSORIES_DETAILS"]).ToString();
                        rt.UPLOD_GOV_PERMISSION_LATER = (dt.Rows[i]["UPLOD_GOV_PERMISSION_LATER"]).ToString();
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                        rt.SERIAL_NO = (dt.Rows[i]["SERIAL_NO"]).ToString();
                        rt.COMPANY_PNDT_NO = (dt.Rows[i]["COMPANY_PNDT_NO"]).ToString();
                        rt.COMPANY_PNDT_CERTIFICATE = (dt.Rows[i]["COMPANY_PNDT_CERTIFICATE"]).ToString();

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

        public JsonResult GetCustomerList(long id)
        {
            long c_id = Convert.ToInt64(Session["COMPANY_ID"]);

            if (c_id!=0)
            {
                var _getadmin = db.Tb_CustomerMaster.Where(z => z.STATUS == "Active" && z.CUSTOMER_TYPE_ID == id && z.CUSTOMER_NAME != "" && z.COMPANY_ID == c_id).OrderBy(s => s.CUSTOMER_NAME).Select(s => new { s.Customer_ID, s.CUSTOMER_NAME, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }

            else
            {
                var _getadmin = db.Tb_CustomerMaster.Where(z => z.STATUS == "Active" && z.CUSTOMER_TYPE_ID == id && z.CUSTOMER_NAME != "").OrderBy(s => s.CUSTOMER_NAME).Select(s => new { s.Customer_ID, s.CUSTOMER_NAME, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            

        }

        public JsonResult GetCustomerTypeList()
        {
            var _getadmin = db.Tb_CustomerType.Where(z => z.STATUS == "Active").Select(s => new { s.ID, s.CUSTOMER_TYPE, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetFirmList(long? id)
        {
            if (id == 0 || id == null)
            {
                var _getadmin = db.Tb_FirmMaster.Where(z => z.STATUS == "Active").Select(s => new { s.CUSTOMER_ID, s.F_ID, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var _getadmin = db.Tb_FirmMaster.Where(z => z.STATUS == "Active" && z.CUSTOMER_ID == id).Select(s => new { s.CUSTOMER_ID, s.F_ID, s.FIRM_NAME, s.STATUS, s.REG_DATE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetCategory()
        {
            var _getadmin = db.TB_Category.Where(z => z.STATUS == "Active").OrderBy(s => s.CAT_NAME).Select(s => new { s.CAT_ID, s.CAT_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetManufacturer(long id)
        {
            var _getadmin = db.Tb_Manufacturer.Where(z => z.STATUS == "Active" && z.CAT_ID == id).Select(s => new { s.M_ID, s.M_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProduct(long id)
        {
            var _getadmin = db.Tb_Product.Where(z => z.STATUS == "Active" && z.M_ID == id).Select(s => new { s.P_ID, s.PRODUCT_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Create()
        {
            Session["UP_ID"] = 0;
            return View();
        }

        public JsonResult GetCompany(long? cid)
        {
            if (cid == null)
            {
                cid=Convert.ToInt64(Session["COMPANY_ID"]);
            }
            var _getadmin = db.TB_CompanyMaster.Where(z => z.STATUS == "Active" && z.COMPANY_ID == cid).Select(s => new { s.COMPANY_ID, s.COMPANY_NAME,s.PNDT_NO, s.COMPANY_PNDT_CERTIFICATE, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }
      
        public JsonResult GetEmployeeEnginer()
        {
            var _getadmin = db.Tb_EmployeeMaster.Where(z => z.STATUS == "Active" && (z.DESIGNATION_ID == 7 || z.DESIGNATION_ID == 18)).Select(s => new { s.EMP_ID, s.EMP_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetFirmListgetpndt(long id)
        {
            //long id = Convert.ToInt64(Session["CUSTOMER_ID"]);
            cmd = new SqlCommand("Tb_CustomerPndtNOandValidity", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CUSTOMER_ID", id);
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            ds = new DataSet();
            sda.Fill(ds);
            dt = ds.Tables[0];
            UrdProduct rt;
            List<UrdProduct> FinalreportList = new List<UrdProduct>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new UrdProduct();
                    try
                    {
                        rt.PNDT_NO = (dt.Rows[i]["PNDT_NO"].ToString());
                        rt.PNDT_VALIDITY = (dt.Rows[i]["PNDT_VALIDITY"].ToString());
                        rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"].ToString());
                        rt.UPLOAD_PNDT_CERTIFICATE = (dt.Rows[i]["UPLOAD_PNDT_CERTIFICATE"].ToString());
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

        public ActionResult AddAdmin(UrdProduct tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOD_GOV_PERMISSION_LATER == "Yes")
                {
                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;

                    string fileName1;
                    if (extension.ToLower() == ".pdf")
                    {
                        fileName = "GOV_PER_LETTER_PDF" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                        tB_admin.UPLOD_GOV_PERMISSION_LATER = Master.serverurl + "/UploadedImages/PDF/" + fileName;
                        fileName1 = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/UploadedImages/PDF/"), fileName);
                    }
                    else
                    {
                        fileName = "GOV_PER_LETTER_Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                        tB_admin.UPLOD_GOV_PERMISSION_LATER = Master.serverurl + "/UploadedImages/" + fileName;
                        fileName1 = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/UploadedImages/"), fileName);
                    }

                    //fileName = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    //string fileName1 = fileName;
                    //tB_admin.UPLOD_GOV_PERMISSION_LATER = Master.serverurl + "/Images/" + fileName;
                    //fileName = Path.Combine(Server.MapPath("~/Images/"), fileName);

                    if (tB_admin.UPLOD_GOV_PERMISSION_LATER != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);

                        if (extension.ToLower() == ".pdf")
                        {
                            System.IO.File.WriteAllBytes(HostingEnvironment.MapPath("~/UploadedImages/PDF/" + fileName), imageByteData);

                        }
                        else
                        {
                            MemoryStream mem = new MemoryStream(imageByteData);
                            System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                            if (extension.ToLower() == ".png")
                            {
                                img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName), ImageFormat.Png);
                            }
                            else
                            {
                                img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName), ImageFormat.Jpeg);
                            }

                        }

                        //MemoryStream mem = new MemoryStream(imageByteData);
                        //System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        //img.Save(HostingEnvironment.MapPath("~/Images/" + fileName1), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.UPLOD_GOV_PERMISSION_LATER = "";
                }
            }
            catch (Exception ex)
            {
            }
            //try
            //{
            //    string OTP = Master.RandomString(6);
            //    if (tB_admin.COMPANY_PNDT_CERTIFICATE == "Yes")
            //    {
            //        string fileName = tB_admin.ImageName2;
            //        string extension = tB_admin.ImageExtension2;

            //        string fileName1;
            //        if (extension.ToLower() == ".pdf")
            //        {
            //            fileName = "COMPANY_PNDT_PDF" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
            //            tB_admin.COMPANY_PNDT_CERTIFICATE = Master.serverurl + "/UploadedImages/PDF/" + fileName;
            //            fileName1 = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/UploadedImages/PDF/"), fileName);
            //        }
            //        else
            //        {
            //            fileName = "COMPANY_PNDT_Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
            //            tB_admin.COMPANY_PNDT_CERTIFICATE = Master.serverurl + "/UploadedImages/" + fileName;
            //            fileName1 = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/UploadedImages/"), fileName);
            //        }

            //        if (tB_admin.COMPANY_PNDT_CERTIFICATE != string.Empty)
            //        {
            //            byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data2);

            //            if (extension.ToLower() == ".pdf")
            //            {
            //                System.IO.File.WriteAllBytes(HostingEnvironment.MapPath("~/UploadedImages/PDF/" + fileName), imageByteData);

            //            }
            //            else
            //            {
            //                MemoryStream mem = new MemoryStream(imageByteData);
            //                System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
            //                if (extension.ToLower() == ".png")
            //                {
            //                    img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName), ImageFormat.Png);
            //                }
            //                else
            //                {
            //                    img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName), ImageFormat.Jpeg);
            //                }

            //            }

            //        }
            //    }
            //    else
            //    {
            //        tB_admin.COMPANY_PNDT_CERTIFICATE = "";
            //    }
            //}
            //catch (Exception ex)
            //{
            //}
            try
            {
                long id = Convert.ToInt64(Session["COMPANY_ID"]);
                cmd = new SqlCommand("SP_Insert_Tb_URDProduct", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@LETER_REF_NO", tB_admin.LETER_REF_NO);
                cmd.Parameters.AddWithValue("@LETTER_DATE", tB_admin.LETTER_DATE);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);
                cmd.Parameters.AddWithValue("@FIRM_ID", tB_admin.FIRM_ID);
                cmd.Parameters.AddWithValue("@URD_STATUS", tB_admin.URD_STATUS);
                cmd.Parameters.AddWithValue("@CAT_ID", tB_admin.CAT_ID);
                cmd.Parameters.AddWithValue("@M_ID", tB_admin.M_ID);
                cmd.Parameters.AddWithValue("@P_ID", tB_admin.P_ID);
                cmd.Parameters.AddWithValue("@MRC_NO", tB_admin.MRC_NO);
                cmd.Parameters.AddWithValue("@PNDT_CELL", tB_admin.PNDT_CELL);
                cmd.Parameters.AddWithValue("@PNDT_NO", tB_admin.PNDT_NO);
                cmd.Parameters.AddWithValue("@PNDT_VALIDITY", tB_admin.PNDT_VALIDITY);
                cmd.Parameters.AddWithValue("@GOV_PERMITED_URD_REF_NO", tB_admin.GOV_PERMITED_URD_REF_NO);
                cmd.Parameters.AddWithValue("@EMP_ENG_ID", tB_admin.EMP_ENG_ID);
                cmd.Parameters.AddWithValue("@LETTER_RECIVED_DATE", tB_admin.LETTER_RECIVED_DATE);
                cmd.Parameters.AddWithValue("@ACCESSORIES_DETAILS", tB_admin.ACCESSORIES_DETAILS);
                cmd.Parameters.AddWithValue("@UPLOD_GOV_PERMISSION_LATER", tB_admin.UPLOD_GOV_PERMISSION_LATER);
                cmd.Parameters.AddWithValue("@SERIAL_NO", tB_admin.SERIAL_NO);
                //cmd.Parameters.AddWithValue("@COMPANY_PNDT_NO", tB_admin.COMPANY_PNDT_NO);
                //cmd.Parameters.AddWithValue("@COMPANY_PNDT_CERTIFICATE", tB_admin.COMPANY_PNDT_CERTIFICATE);
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

        public ActionResult Edit(long id)
        {
            Session["UP_ID"] = id;
            return View();
        }

        public JsonResult GetUrdProductDetails()
        {
            long id = Convert.ToInt64(Session["UP_ID"]);
            cmd = new SqlCommand("Get_Tb_URDProduct", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UP_ID", id);
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            ds = new DataSet();
            sda.Fill(ds);
            dt = ds.Tables[0];
            UrdProduct rt;
            List<UrdProduct> FinalreportList = new List<UrdProduct>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new UrdProduct();
                    try
                    {
                        rt.UP_ID = Convert.ToInt64(dt.Rows[i]["UP_ID"]);
                        rt.CUSTOMER_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_ID"]);
                        rt.FIRM_ID = Convert.ToInt64(dt.Rows[i]["FIRM_ID"]);
                        rt.CAT_ID = Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        rt.M_ID = Convert.ToInt64(dt.Rows[i]["M_ID"]);
                        rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.EMP_ENG_ID = Convert.ToInt64(dt.Rows[i]["EMP_ENG_ID"]);
                        rt.COMPANY_ID = Convert.ToInt64(dt.Rows[i]["COMPANY_ID"]);
                        rt.CUSTOMER_TYPE_ID = Convert.ToInt64(dt.Rows[i]["CUSTOMER_TYPE_ID"]);
                        rt.COMPANY_NAME = (dt.Rows[i]["COMPANY_NAME"].ToString());
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        rt.FIRM_NAME = (dt.Rows[i]["FIRM_NAME"].ToString());
                        rt.CONTACT_NO = (dt.Rows[i]["CONTACT_NO"].ToString());
                        rt.ALTERNATE_CONTACT_NO = (dt.Rows[i]["ALTERNATE_CONTACT_NO"].ToString());
                        rt.ADDRESS = (dt.Rows[i]["ADDRESS"]).ToString();
                        rt.LETER_REF_NO = (dt.Rows[i]["LETER_REF_NO"]).ToString();
                        rt.LETTER_DATE = (dt.Rows[i]["LETTER_DATE"]).ToString();
                        rt.MRC_NO = (dt.Rows[i]["MRC_NO"]).ToString();
                        rt.PNDT_CELL = (dt.Rows[i]["PNDT_CELL"]).ToString();
                        rt.PNDT_CIRTIFICATE_NO = (dt.Rows[i]["PNDT_CIRTIFICATE_NO"]).ToString();
                        rt.GOV_PERMITED_URD_REF_NO = (dt.Rows[i]["GOV_PERMITED_URD_REF_NO"]).ToString();
                        rt.VALIDITY_DATE = (dt.Rows[i]["VALIDITY_DATE"]).ToString();
                        rt.UPLOD_GOV_PERMISSION_LATER = (dt.Rows[i]["UPLOD_GOV_PERMISSION_LATER"]).ToString();
                        rt.LETTER_RECIVED_DATE = (dt.Rows[i]["LETTER_RECIVED_DATE"]).ToString();
                        rt.FIRM_ADDRESS = (dt.Rows[i]["FIRM_ADDRESS"]).ToString();
                        rt.CAT_NAME = (dt.Rows[i]["CAT_NAME"]).ToString();
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"]).ToString();
                        rt.URD_STATUS = (dt.Rows[i]["URD_STATUS"]).ToString();
                        rt.PNDT_CIRTIFICATE_NO = (dt.Rows[i]["PNDT_CIRTIFICATE_NO"]).ToString();
                        rt.URD_STATUS = (dt.Rows[i]["URD_STATUS"]).ToString();
                        rt.ACCESSORIES_DETAILS = (dt.Rows[i]["ACCESSORIES_DETAILS"]).ToString();
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                        rt.SERIAL_NO = (dt.Rows[i]["SERIAL_NO"]).ToString();
                        rt.COMPANY_PNDT_NO = (dt.Rows[i]["COMPANY_PNDT_NO"]).ToString();
                        rt.COMPANY_PNDT_CERTIFICATE = (dt.Rows[i]["COMPANY_PNDT_CERTIFICATE"]).ToString();


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

        public ActionResult EditAdmin(UrdProduct tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.UPLOD_GOV_PERMISSION_LATER == "Yes")
                {
                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;

                    string fileName1;
                    if (extension.ToLower() == ".pdf")
                    {
                        fileName = "GOV_PER_LETTER_PDF" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                        tB_admin.UPLOD_GOV_PERMISSION_LATER = Master.serverurl + "/UploadedImages/PDF/" + fileName;
                        fileName1 = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/UploadedImages/PDF/"), fileName);
                    }
                    else
                    {
                        fileName = "GOV_PER_LETTER_Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                        tB_admin.UPLOD_GOV_PERMISSION_LATER = Master.serverurl + "/UploadedImages/" + fileName;
                        fileName1 = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/UploadedImages/"), fileName);
                    }

                    if (tB_admin.UPLOD_GOV_PERMISSION_LATER != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);

                        if (extension.ToLower() == ".pdf")
                        {
                            System.IO.File.WriteAllBytes(HostingEnvironment.MapPath("~/UploadedImages/PDF/" + fileName), imageByteData);

                        }
                        else
                        {
                            MemoryStream mem = new MemoryStream(imageByteData);
                            System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                            if (extension.ToLower() == ".png")
                            {
                                img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName), ImageFormat.Png);
                            }
                            else
                            {
                                img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName), ImageFormat.Jpeg);
                            }

                        }
                    }
                }
                else
                {
                    tB_admin.UPLOD_GOV_PERMISSION_LATER = "";
                }
            }
            catch (Exception ex)
            {
            }
           
            try
            {
                cmd = new SqlCommand("SP_Update_Tb_URDProduct", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@LETER_REF_NO", tB_admin.LETER_REF_NO);
                cmd.Parameters.AddWithValue("@LETTER_DATE", tB_admin.LETTER_DATE);
                cmd.Parameters.AddWithValue("@COMPANY_ID", tB_admin.COMPANY_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@FIRM_ID", tB_admin.FIRM_ID);
                cmd.Parameters.AddWithValue("@URD_STATUS", tB_admin.URD_STATUS);
                cmd.Parameters.AddWithValue("@CAT_ID", tB_admin.CAT_ID);
                cmd.Parameters.AddWithValue("@M_ID", tB_admin.M_ID);
                cmd.Parameters.AddWithValue("@P_ID", tB_admin.P_ID);
                cmd.Parameters.AddWithValue("@MRC_NO", tB_admin.MRC_NO);
                cmd.Parameters.AddWithValue("@PNDT_CELL", tB_admin.PNDT_CELL);
                cmd.Parameters.AddWithValue("@PNDT_CIRTIFICATE_NO", tB_admin.PNDT_CIRTIFICATE_NO);
                cmd.Parameters.AddWithValue("@PNDT_VALIDITY", tB_admin.PNDT_VALIDITY);
                cmd.Parameters.AddWithValue("@GOV_PERMITED_URD_REF_NO", tB_admin.GOV_PERMITED_URD_REF_NO);
                cmd.Parameters.AddWithValue("@EMP_ENG_ID", tB_admin.EMP_ENG_ID);
                cmd.Parameters.AddWithValue("@LETTER_RECIVED_DATE", tB_admin.LETTER_RECIVED_DATE);
                cmd.Parameters.AddWithValue("@ACCESSORIES_DETAILS", tB_admin.ACCESSORIES_DETAILS);
                cmd.Parameters.AddWithValue("@UPLOD_GOV_PERMISSION_LATER", tB_admin.UPLOD_GOV_PERMISSION_LATER);
                cmd.Parameters.AddWithValue("@SERIAL_NO", tB_admin.SERIAL_NO);
                cmd.Parameters.AddWithValue("@UP_ID", tB_admin.UP_ID);
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

        public JsonResult GetCmpnyBankDetails(long companyid)
        {
            var _Monthlyreport = CommonCode.GetProducQotatDetails.GetBankDetailsById(companyid, 0);
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
            //var _getcompanyDetails = db.TB_CompanyMaster.Where(z => z.COMPANY_ID == cid).FirstOrDefault();
            //return Json(_getcompanyDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddAccessories(UrdProduct tB_admin)
        {
            try
            {
                long id = Convert.ToInt64(Session["COMPANY_ID"]);
                cmd = new SqlCommand("PANEL_ADD_URD_ACCESSORIES", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@STD_ID", tB_admin.STD_ID);
                cmd.Parameters.AddWithValue("@P_ID", tB_admin.P_ID);
                cmd.Parameters.AddWithValue("@CUSTOMER_ID", tB_admin.CUSTOMER_ID);
                cmd.Parameters.AddWithValue("@QUANTITY", tB_admin.QUANTITY);
                cmd.Parameters.AddWithValue("@PRODUCT_FOR", tB_admin.PRODUCT_FOR);
             
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

        public JsonResult Get_IM_SparePartsAndAccessories()
        {
            long id = Convert.ToInt64(Session["UP_ID"]);
          
            cmd = new SqlCommand("PANEL_GET_URD_ACCESSORIES", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UP_ID", id);
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            ds = new DataSet();
            sda.Fill(ds);
            dt = ds.Tables[0];
            UrdProduct rt;
            List<UrdProduct> FinalreportList = new List<UrdProduct>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new UrdProduct();
                    try
                    {
                        rt.URD_ACC_ID = Convert.ToInt64(dt.Rows[i]["URD_ACC_ID"]);
                        rt.QUANTITY = Convert.ToInt64(dt.Rows[i]["QUANTITY"]);
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"].ToString());
                        rt.PRODUCT_FOR = (dt.Rows[i]["PRODUCT_FOR"].ToString());
                        if (rt.PRODUCT_FOR== "SpareParts")
                        {
                            rt.STD_ACC_NAME = (dt.Rows[i]["SPARE_PART"].ToString());
                        }
                        else
                        {
                            rt.STD_ACC_NAME = (dt.Rows[i]["STD_ACC_NAME"].ToString());
                        }
                      
                        rt.CUSTOMER_NAME = (dt.Rows[i]["CUSTOMER_NAME"].ToString());
                        
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

        public JsonResult Delete_IM_SparePartsAndAccessories(long id)
        {
            try
            {
                cmd = new SqlCommand("PANEL_DELETE_URD_ACCESSORIES", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@URD_ACC_ID", id);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                return Json(new { success = i });
            }
            catch (Exception ex)
            {
                throw ex;

            }

        }
    }
}