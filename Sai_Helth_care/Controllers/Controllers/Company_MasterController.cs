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
    public class Company_MasterController : Controller
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
            public string ROLE_ID { get; set; }
        }
        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("Get_TB_CompanyMaster_Count", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
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
            cmd = new SqlCommand("Panel_Get_TB_CompanyMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
            cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            CompanyMaster rt;
            List<CompanyMaster> FinalreportList = new List<CompanyMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new CompanyMaster();
                    try
                    {
                        rt.COMPANY_ID = Convert.ToInt64(dt.Rows[i]["COMPANY_ID"]);
                        rt.COMPANY_NAME = (dt.Rows[i]["COMPANY_NAME"].ToString());
                        rt.COMPANY_REG_ADDRESS = (dt.Rows[i]["COMPANY_REG_ADDRESS"].ToString());
                        rt.COMPANY_COR_ADDRESS = (dt.Rows[i]["COMPANY_COR_ADDRESS"].ToString());
                        rt.ZIP_CODE = (dt.Rows[i]["ZIP_CODE"]).ToString();
                        rt.AUTHORITY_NAME = (dt.Rows[i]["AUTHORITY_NAME"]).ToString();
                        rt.EMAIL_ID = (dt.Rows[i]["EMAIL_ID"]).ToString();
                        rt.MOBILE_NO = (dt.Rows[i]["MOBILE_NO"]).ToString();
                        rt.ALT_MOBILE_NO = (dt.Rows[i]["ALT_MOBILE_NO"]).ToString();
                        rt.COMPANY_TYPE = (dt.Rows[i]["COMPANY_TYPE"]).ToString();
                        rt.PNDT_NO = (dt.Rows[i]["PNDT_NO"]).ToString();
                        rt.TIN_NO = (dt.Rows[i]["TIN_NO"]).ToString();
                        rt.PAN_NO = (dt.Rows[i]["PAN_NO"]).ToString();
                        rt.GST_NO = (dt.Rows[i]["GST_NO"]).ToString();
                        rt.STATUS = (dt.Rows[i]["STATUS"]).ToString();
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                        rt.COMPANY_LETTERHEAD = (dt.Rows[i]["COMPANY_LETTERHEAD"]).ToString();
                        rt.COMPANY_SEAL = (dt.Rows[i]["COMPANY_SEAL"]).ToString();
                        rt.COMPANY_PNDT_CERTIFICATE = (dt.Rows[i]["COMPANY_PNDT_CERTIFICATE"]).ToString();
                        rt.COMPANY_PREFIX = (dt.Rows[i]["COMPANY_PREFIX"]).ToString();
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


        public ActionResult AddAdmin(CompanyMaster tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.COMPANY_LETTERHEAD == "Yes")
                {
                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;
                    fileName = "Header" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName1 = fileName;
                    tB_admin.COMPANY_LETTERHEAD = Master.serverurl + "/UploadedImages/" + fileName;
                    fileName = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName);

                    if (tB_admin.COMPANY_LETTERHEAD != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);

                        if (extension.Contains("png"))
                        {
                            img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName1), ImageFormat.Png);
                        }
                        else
                        {
                            img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName1), ImageFormat.Jpeg);
                        }
                        
                    }
                }
                else
                {
                    tB_admin.COMPANY_LETTERHEAD = null;
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.COMPANY_SEAL == "Yes")
                {
                    string fileName2 = tB_admin.ImageName1;
                    string extension = tB_admin.ImageExtension1;
                    fileName2 = "Stamp" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName3 = fileName2;
                    tB_admin.COMPANY_SEAL = Master.serverurl + "/UploadedImages/" + fileName2;
                    fileName2 = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName2);

                    if (tB_admin.COMPANY_SEAL != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data1);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        if (extension.Contains("png"))
                        {
                            img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName3), ImageFormat.Png);
                        }
                        else
                        {
                            img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName3), ImageFormat.Jpeg);
                        }
                        
                    }
                }
                else
                {
                    tB_admin.COMPANY_SEAL = null;
                }
            }
            catch (Exception ex)
            {
            }

            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.COMPANY_PNDT_CERTIFICATE == "Yes")
                {
                    string fileName3 = tB_admin.ImageName2;
                    string extension = tB_admin.ImageExtension2;
                    fileName3 = "Stamp" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName4 = fileName3;
                    tB_admin.COMPANY_PNDT_CERTIFICATE = Master.serverurl + "/UploadedImages/" + fileName3;
                    fileName3 = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName3);

                    if (tB_admin.COMPANY_PNDT_CERTIFICATE != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data2);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        if (extension.Contains("png"))
                        {
                            img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName4), ImageFormat.Png);
                        }
                        else
                        {
                            img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName4), ImageFormat.Jpeg);
                        }

                    }
                }
                else
                {
                    tB_admin.COMPANY_PNDT_CERTIFICATE = null;
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                cmd = new SqlCommand("Insert_TB_CompanyMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@COMPANY_NAME", tB_admin.COMPANY_NAME);
                cmd.Parameters.AddWithValue("@AUTHORITY_NAME", tB_admin.AUTHORITY_NAME);
                cmd.Parameters.AddWithValue("@MOBILE_NO", tB_admin.MOBILE_NO);
                cmd.Parameters.AddWithValue("@ALT_MOBILE_NO", tB_admin.ALT_MOBILE_NO);
                cmd.Parameters.AddWithValue("@EMAIL_ID", tB_admin.EMAIL_ID);
                cmd.Parameters.AddWithValue("@COMPANY_COR_ADDRESS", tB_admin.COMPANY_COR_ADDRESS);
                cmd.Parameters.AddWithValue("@COMPANY_REG_ADDRESS", tB_admin.COMPANY_REG_ADDRESS);
                cmd.Parameters.AddWithValue("@ZIP_CODE", tB_admin.ZIP_CODE);
                cmd.Parameters.AddWithValue("@COMPANY_TYPE", tB_admin.COMPANY_TYPE);
                cmd.Parameters.AddWithValue("@PAN_NO", tB_admin.PAN_NO);
                cmd.Parameters.AddWithValue("@PNDT_NO", tB_admin.PNDT_NO);
                cmd.Parameters.AddWithValue("@GST_NO", tB_admin.GST_NO);
                cmd.Parameters.AddWithValue("@TIN_NO", tB_admin.TIN_NO);
                cmd.Parameters.AddWithValue("@COMPANY_LETTERHEAD", tB_admin.COMPANY_LETTERHEAD);
                cmd.Parameters.AddWithValue("@COMPANY_SEAL", tB_admin.COMPANY_SEAL);
                cmd.Parameters.AddWithValue("@COMPANY_PNDT_CERTIFICATE", tB_admin.COMPANY_PNDT_CERTIFICATE);
                cmd.Parameters.AddWithValue("@COMPANY_PREFIX", tB_admin.COMPANY_PREFIX);
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




        public ActionResult EditAdmin(CompanyMaster tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.COMPANY_LETTERHEAD == "Yes")
                {
                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;
                    fileName = "Header" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName1 = fileName;
                    tB_admin.COMPANY_LETTERHEAD = Master.serverurl + "/UploadedImages/" + fileName;
                    fileName = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName);

                    if (tB_admin.COMPANY_LETTERHEAD != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);

                        if (extension.Contains("png"))
                        {
                            img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName1), ImageFormat.Png);
                        }
                        else
                        {
                            img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName1), ImageFormat.Jpeg);
                        }

                    }
                }
                else
                {
                    tB_admin.COMPANY_LETTERHEAD = null;
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.COMPANY_SEAL == "Yes")
                {
                    string fileName2 = tB_admin.ImageName1;
                    string extension = tB_admin.ImageExtension1;
                    fileName2 = "Stamp" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName3 = fileName2;
                    tB_admin.COMPANY_SEAL = Master.serverurl + "/UploadedImages/" + fileName2;
                    fileName2 = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName2);

                    if (tB_admin.COMPANY_SEAL != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data1);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        if (extension.Contains("png"))
                        {
                            img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName3), ImageFormat.Png);
                        }
                        else
                        {
                            img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName3), ImageFormat.Jpeg);
                        }

                    }
                }
                else
                {
                    tB_admin.COMPANY_SEAL = null;
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.COMPANY_PNDT_CERTIFICATE == "Yes")
                {
                    string fileName3 = tB_admin.ImageName2;
                    string extension = tB_admin.ImageExtension2;
                    fileName3 = "Stamp" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName4 = fileName3;
                    tB_admin.COMPANY_PNDT_CERTIFICATE = Master.serverurl + "/UploadedImages/" + fileName3;
                    fileName3 = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName3);

                    if (tB_admin.COMPANY_PNDT_CERTIFICATE != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data2);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        if (extension.Contains("png"))
                        {
                            img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName4), ImageFormat.Png);
                        }
                        else
                        {
                            img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName4), ImageFormat.Jpeg);
                        }

                    }
                }
                else
                {
                    tB_admin.COMPANY_PNDT_CERTIFICATE = null;
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                cmd = new SqlCommand("Update_TB_CompanyMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@COMPANY_NAME", tB_admin.COMPANY_NAME);
                cmd.Parameters.AddWithValue("@AUTHORITY_NAME", tB_admin.AUTHORITY_NAME);
                cmd.Parameters.AddWithValue("@MOBILE_NO", tB_admin.MOBILE_NO);
                cmd.Parameters.AddWithValue("@ALT_MOBILE_NO", tB_admin.ALT_MOBILE_NO);
                cmd.Parameters.AddWithValue("@EMAIL_ID", tB_admin.EMAIL_ID);
                cmd.Parameters.AddWithValue("@COMPANY_COR_ADDRESS", tB_admin.COMPANY_COR_ADDRESS);
                cmd.Parameters.AddWithValue("@COMPANY_REG_ADDRESS", tB_admin.COMPANY_REG_ADDRESS);
                cmd.Parameters.AddWithValue("@ZIP_CODE", tB_admin.ZIP_CODE);
                cmd.Parameters.AddWithValue("@COMPANY_TYPE", tB_admin.COMPANY_TYPE);
                cmd.Parameters.AddWithValue("@PAN_NO", tB_admin.PAN_NO);
                cmd.Parameters.AddWithValue("@PNDT_NO", tB_admin.PNDT_NO);
                cmd.Parameters.AddWithValue("@GST_NO", tB_admin.GST_NO);
                cmd.Parameters.AddWithValue("@TIN_NO", tB_admin.TIN_NO);
                cmd.Parameters.AddWithValue("@COMPANY_ID", tB_admin.COMPANY_ID);
                cmd.Parameters.AddWithValue("@COMPANY_LETTERHEAD", tB_admin.COMPANY_LETTERHEAD);
                cmd.Parameters.AddWithValue("@COMPANY_SEAL", tB_admin.COMPANY_SEAL);
                cmd.Parameters.AddWithValue("@COMPANY_PNDT_CERTIFICATE", tB_admin.COMPANY_PNDT_CERTIFICATE);
                cmd.Parameters.AddWithValue("@COMPANY_PREFIX", tB_admin.COMPANY_PREFIX);
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


        public ActionResult CompanyDetails(long id)
        {
            Session["Company_ID"] = id;
            return View();
        }

        public JsonResult GetCompanyDetails()
        {
            long id = Convert.ToInt64(Session["Company_ID"]);
            cmd = new SqlCommand("Get_CompanyDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Company_ID", id);
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
            CompanyMaster rt;
            List<CompanyMaster> FinalreportList = new List<CompanyMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new CompanyMaster();
                    try
                    {
                        rt.COMPANY_ID = Convert.ToInt64(dt.Rows[i]["COMPANY_ID"]);
                        rt.COMPANY_NAME = (dt.Rows[i]["COMPANY_NAME"].ToString());
                        rt.AUTHORITY_NAME = (dt.Rows[i]["AUTHORITY_NAME"].ToString());
                        rt.COMPANY_REG_ADDRESS = (dt.Rows[i]["COMPANY_REG_ADDRESS"].ToString());
                        rt.MOBILE_NO = (dt.Rows[i]["MOBILE_NO"].ToString());
                        rt.STATUS = (dt.Rows[i]["STATUS"].ToString());
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"]).ToString();
                        //BankSection
                        //rt.BANK_NAME = (dt.Rows[i]["BANK_NAME"]).ToString();
                        //rt.IFSC_CODE = (dt.Rows[i]["IFSC_CODE"]).ToString();
                        //rt.ACC_NO = (dt.Rows[i]["ACC_NO"]).ToString();
                        //rt.ACC_HOLDER_NAME = (dt.Rows[i]["ACC_HOLDER_NAME"]).ToString();
                        //rt.BRANCH_NAME = (dt.Rows[i]["BRANCH_NAME"]).ToString();
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

        public JsonResult GetCmpnyBankDetails(long bankid)
        {
            int cid = Convert.ToInt32(Session["COMPANY_ID"]);
            var _Monthlyreport = CommonCode.GetProducQotatDetails.GetBankDetailsById(cid, bankid);
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
            //var _getcompanyDetails = db.TB_CompanyMaster.Where(z => z.COMPANY_ID == cid).FirstOrDefault();
            //return Json(_getcompanyDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCompanyDocDetails()
        {
            long id = Convert.ToInt64(Session["Company_ID"]);
            cmd = new SqlCommand("Get_CompanyDocDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Company_ID", id);
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
            CompanyDocMaster rt;
            List<CompanyDocMaster> FinalreportList = new List<CompanyDocMaster>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new CompanyDocMaster();
                    try
                    {
                        rt.DOC_ID = Convert.ToInt64(dt.Rows[i]["DOC_ID"]);
                        rt.DOC_TITLE = (dt.Rows[i]["DOC_TITLE"].ToString());
                        rt.DOC_TYPE = (dt.Rows[i]["DOC_TYPE"].ToString());
                        rt.DOC_NO = (dt.Rows[i]["DOC_NO"].ToString());
                        rt.FILE_URL = (dt.Rows[i]["FILE_URL"].ToString());
                        rt.FILE_TYPE = (dt.Rows[i]["FILE_TYPE"].ToString());
                        rt.DOC_INSERT_DATE = (dt.Rows[i]["DOC_INSERT_DATE"].ToString());
                        
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

        public ActionResult AddEditDocDetailsAdmin(CompanyDocMaster tB_admin)
        {
            try
            {
                if (tB_admin.UPLOAD_DOC == "Yes")
                {
                    string OTP = Master.RandomString(6);
                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;
                    tB_admin.FILE_TYPE = tB_admin.ImageExtension.Substring(1);
                    fileName = "Image" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName1 = fileName;
                    tB_admin.FILE_URL = Master.serverurl + "/Images/" + fileName;
                    fileName = Path.Combine(Server.MapPath("~/Images/"), fileName);

                    if (tB_admin.UPLOAD_DOC != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        if (extension == ".png")
                        {
                            img.Save(HostingEnvironment.MapPath("~/Images/" + fileName1), ImageFormat.Png);
                        }
                        else if(extension==".jpeg" || extension == ".jpg")
                        {
                            img.Save(HostingEnvironment.MapPath("~/Images/" + fileName1), ImageFormat.Jpeg);
                        }
                        
                    }
                }
                else
                {
                    tB_admin.FILE_URL = "";
                }
                
                
            }
            catch (Exception ex)
            {
                return Json(new { success = false });
            }
            try
            {
                long id = Convert.ToInt64(Session["Company_ID"]);
                cmd = new SqlCommand("InsertUpdateCompanyDocDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);
                cmd.Parameters.AddWithValue("@DOC_ID", tB_admin.DOC_ID);
                cmd.Parameters.AddWithValue("@DOC_TITLE", tB_admin.DOC_TITLE);
                cmd.Parameters.AddWithValue("@DOC_TYPE", tB_admin.DOC_TYPE);
                cmd.Parameters.AddWithValue("@DOC_NO", tB_admin.DOC_NO);
                cmd.Parameters.AddWithValue("@FILE_URL", tB_admin.FILE_URL);
                cmd.Parameters.AddWithValue("@FILE_TYPE", tB_admin.FILE_TYPE);
                cmd.Parameters.AddWithValue("@Operation", tB_admin.Operation);
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





        public ActionResult AddEditBankDetailsAdmin(CompanyBankMaster tB_admin)
        {
            try
            {
                long id = Convert.ToInt64(Session["Company_ID"]);
                cmd = new SqlCommand("InsertUpdateCompanyBankDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@COMPANY_ID", id);
                cmd.Parameters.AddWithValue("@B_ID", tB_admin.B_ID);
                cmd.Parameters.AddWithValue("@BANK_NAME", tB_admin.BANK_NAME);
                cmd.Parameters.AddWithValue("@IFSC_CODE", tB_admin.IFSC_CODE);
                cmd.Parameters.AddWithValue("@ACC_NO", tB_admin.ACC_NO);
                cmd.Parameters.AddWithValue("@ACC_HOLDER_NAME", tB_admin.ACC_HOLDER_NAME);
                cmd.Parameters.AddWithValue("@BRANCH_NAME", tB_admin.BRANCH_NAME);
                cmd.Parameters.AddWithValue("@Operation", tB_admin.Operation);
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

        public string ChangeStatus(long id)
        {
            TB_CompanyMaster tB_Admin = db.TB_CompanyMaster.Where(b => b.COMPANY_ID == id).SingleOrDefault();
            if (tB_Admin.STATUS == "Active")
            {
                tB_Admin.STATUS = "Deactive";
                db.SaveChanges();
            }
            else
            {
                tB_Admin.STATUS = "Active";
                db.SaveChanges();
            }
            return "Status change Successfully.";
        }

        public string ChangeStatusBank(long id)
        {
            TB_CompanyBankMaster tB_Admin = db.TB_CompanyBankMaster.Where(b => b.B_ID == id).SingleOrDefault();
            if (tB_Admin.STATUS == "Active")
            {
                tB_Admin.STATUS = "Deactive";
                db.SaveChanges();
            }
            else
            {
                tB_Admin.STATUS = "Active";
                db.SaveChanges();
            }
            return "Status change Successfully.";
        }
    }
}