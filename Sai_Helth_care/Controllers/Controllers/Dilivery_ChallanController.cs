using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sai_Helth_care.Models;
using static Sai_Helth_care.Models.CustomerDAL;
using static Sai_Helth_care.Models.QuotationDAL;
using System.Drawing.Imaging;
using System.IO;
using System.Web.Hosting;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Dilivery_ChallanController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        DataSet ds = new DataSet();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult TotalRecordCount(SearchQuotationParams tB_Admin)
        {
            try
            {
                int count = DeliveryChallanDAL.GetDeliveryChallanTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult GetDeliveryChallanList(SearchQuotationParams tB_params)
        {

            try
            {
                var deliveryChallanList = DeliveryChallanDAL.GetDeliveryChallanList(tB_params);
                return Json(deliveryChallanList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public JsonResult GetDeliveryChallanForUpdate(long DC_ID)
        {
            try
            {
                var deliveryChallanList = DeliveryChallanDAL.GetDeliveryChallanForUpdate(DC_ID);
                return Json(deliveryChallanList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult GetDeliveryChallanForPrint(long DC_ID)
        {
            try
            {
            var deliveryChallanList = DeliveryChallanDAL.GetDeliveryChallanForPrint(DC_ID);
                return Json(deliveryChallanList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public ActionResult AddUpdateDeliveryChallan(DeliveryChallan tB_admin)
        {
            try
            {
                long adminId= Convert.ToInt64(Session["EMP_ID"]);
                tB_admin.ADMIN_ID = adminId;
                int i = DeliveryChallanDAL.AddUpdateDeliveryChallan(tB_admin);
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

        public JsonResult GetChallanById(int id)
        {
            var _getadmin = db.TB_DeliveryChallan.Where(c => c.DC_ID == id).Select(s => new { s.DC_ID, s.CHALLAN_IMAGE, s.ADMIN_REMARK }).FirstOrDefault();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }


       

        public ActionResult UpdateChallanImage(DeliveryChallan tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.CHALLAN_IMAGE == "Yes")
                {
                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;
                    fileName = "DeliveryChallan" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName1 = fileName;
                    tB_admin.CHALLAN_IMAGE = Master.serverurl + "/UploadedImages/" + fileName;
                    fileName = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName);

                    if (tB_admin.CHALLAN_IMAGE != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName1), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    tB_admin.CHALLAN_IMAGE = "";
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                long adminId = Convert.ToInt64(Session["EMP_ID"]);
                tB_admin.ADMIN_ID = adminId;
                cmd = new SqlCommand("Update_TB_DeliveryChallanImage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ADMIN_REMARK", tB_admin.ADMIN_REMARK);
                cmd.Parameters.AddWithValue("@ADMIN_ID", tB_admin.ADMIN_ID);
                cmd.Parameters.AddWithValue("@CHALLAN_IMAGE", tB_admin.CHALLAN_IMAGE);
                cmd.Parameters.AddWithValue("@DC_ID", tB_admin.DC_ID);
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
                throw ex;
            }
        }


        public int GenerateDCNumber()
        {
            return 1;
        }
        public JsonResult GetMaterial()
        {
            var _getadmin = db.TB_Material.Where(z => z.STATUS == "Active")
                .Select(s => new { s.MATERIAL_ID, s.MATERIAL_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDCStatus()
        {
            var _getadmin = db.TB_DCStatus.Where(z => z.STATUS == "Active")
                .Select(s => new { s.DCS_ID, s.STATUS_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult GetIncludingAllTaxes()
        {
            return Json(new List<IncludingAllTaxes>() { 
            new IncludingAllTaxes(){ IAT_ID=1, IAT_NAME="Yes"},
            new IncludingAllTaxes(){ IAT_ID=0, IAT_NAME="No"}            
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGSTPercentage()
        {
            return Json(new List<GSTPercentage>() { 
            new GSTPercentage(){ GSTP_ID=0, GST_PERC=0},          
            new GSTPercentage(){ GSTP_ID=5, GST_PERC=5},          
            new GSTPercentage(){ GSTP_ID=12, GST_PERC=12},          
            new GSTPercentage(){ GSTP_ID=18, GST_PERC=18},          
            new GSTPercentage(){ GSTP_ID=28, GST_PERC=28}         
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmployee()
        {
            long id = Convert.ToInt64(Session["COMPANY_ID"]);

            if (id==0)
            {
                var _getadmin = db.Tb_EmployeeMaster.Where(z => z.STATUS == "Active")
                .OrderBy(x => x.EMP_NAME)
                .Select(s => new { s.EMP_ID, s.EMP_NAME }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var _getadmin = db.Tb_EmployeeMaster.Where(z => z.STATUS == "Active" && z.COMPANY_ID == id)
                .OrderBy(x => x.EMP_NAME)
                .Select(s => new { s.EMP_ID, s.EMP_NAME }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
            
        }

        public JsonResult Get_DC_SparePartsAndAccessories(int? DC_ID)
        {
            cmd = new SqlCommand("Get_DC_SparePartsAndAccessories", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EMP_ID", Convert.ToInt32(Session["EMP_ID"]));
            cmd.Parameters.AddWithValue("@DC_ID", DC_ID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            DC_SparePartsAndAccessories rt;
            List<DC_SparePartsAndAccessories> FinalreportList = new List<DC_SparePartsAndAccessories>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new DC_SparePartsAndAccessories();
                    try
                    {
                        rt.DC_FOR = (dt.Rows[i]["DC_FOR"].ToString());
                        rt.SP_ACC_SERIAL_NO = (dt.Rows[i]["SP_ACC_SERIAL_NO"].ToString());
                        rt.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                        rt.DC_ID = dt.Rows[i]["DC_ID"] is DBNull ? (int?)null : Convert.ToInt32(dt.Rows[i]["DC_ID"]);
                        rt.SP_ACCESSORIES_ID = Convert.ToInt32(dt.Rows[i]["SP_ACCESSORIES_ID"]);
                        rt.SP_ACCESSORIES_NAME = (dt.Rows[i]["SP_ACCESSORIES_NAME"].ToString());
                        rt.PART_QTY = Convert.ToInt32(dt.Rows[i]["PART_QTY"]);
                        rt.PART_PRICE = Convert.ToDecimal(dt.Rows[i]["PART_PRICE"]);
                        rt.EMP_ID = Convert.ToInt32(dt.Rows[i]["EMP_ID"]);
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
        public JsonResult AddPartsAccessories(PartsAccessories tb_AddPartsAccessories)
        {
            try
            {
                cmd = new SqlCommand("Insert_TB_PartsAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMP_ID", Convert.ToInt32(Session["EMP_ID"]));
                cmd.Parameters.AddWithValue("@DC_ID", tb_AddPartsAccessories.DC_ID);
                cmd.Parameters.AddWithValue("@DC_For", tb_AddPartsAccessories.DC_For);
                cmd.Parameters.AddWithValue("@STD_ID", tb_AddPartsAccessories.STD_ID);
                cmd.Parameters.AddWithValue("@SP_ID", tb_AddPartsAccessories.SP_ID);
                cmd.Parameters.AddWithValue("@PART_QTY", tb_AddPartsAccessories.PART_QTY);
                cmd.Parameters.AddWithValue("@PART_PRICE", tb_AddPartsAccessories.PART_PRICE);
                cmd.Parameters.AddWithValue("@ACC_SERIAL_NO", tb_AddPartsAccessories.ACC_SERIAL_NO);
                cmd.Parameters.AddWithValue("@SP_SERIAL_NO", tb_AddPartsAccessories.SP_SERIAL_NO);
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

        public JsonResult Delete_DC_SparePartsAndAccessories(DC_SparePartsAndAccessories tb_DC_SparePartsAndAccessories)
        {
            try
            {
                cmd = new SqlCommand("Delete_DC_SparePartsAndAccessories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@DC_FOR", tb_DC_SparePartsAndAccessories.DC_FOR);
                cmd.Parameters.AddWithValue("@ID", tb_DC_SparePartsAndAccessories.ID);
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
        public ActionResult DeliveryChallanAddUpdate()
        {
            return View();
        }

        public ActionResult MedtronicDeliveryChallanAddUpdate()
        {
            return View();
        }

        public JsonResult Get_DC_MedtronicAccessories(int? DC_ID)
        {
            try
            {
                long empId = Convert.ToInt64(Session["EMP_ID"]);
                var deliveryChallanList = DeliveryChallanDAL.Get_DC_MedtronicAccessories(DC_ID, empId);
                return Json(deliveryChallanList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult Add_DC_MedtronicAccessories(DC_MedtronicAccessories tb_AddAccessories)
        {
            try
            {
                int empId = Convert.ToInt32(Session["EMP_ID"]);
                tb_AddAccessories.EMP_ID = empId;
                int i = DeliveryChallanDAL.AddDC_MedtronicAccessories(tb_AddAccessories);
                return Json(new { success = i });

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult Delete_DC_MedtronicAccessories(DC_MedtronicAccessories tb_DC_Accessories)
        {
            try
            {
                int i = DeliveryChallanDAL.Delete_DC_MedtronicAccessories(tb_DC_Accessories.DC_FOR, tb_DC_Accessories.DC_MED_ACC_ID);
                return Json(new { success = i });

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult Get_DC_MedtronicAccessories_ForPrint(int DC_ID)
        {
            try
            {
                int empId = Convert.ToInt32(Session["EMP_ID"]);
                var deliveryChallanList = DeliveryChallanDAL.Get_DC_MedtronicAccessories_ForPrint(DC_ID, empId);
                return Json(deliveryChallanList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    }
}