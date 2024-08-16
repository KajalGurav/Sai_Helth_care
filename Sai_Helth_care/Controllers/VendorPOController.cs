using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static Sai_Helth_care.Models.VendorPODAL;

namespace Sai_Helth_care.Controllers
{
    public class VendorPOController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        // GET: VendorPO
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult TotalRecordCount(SearchPOParams tB_Admin)
        {
            try
            {
                int count = VendorPODAL.GetQuotationsTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public JsonResult GetAllVendorPOList(SearchPOParams tB_params)
        {
            try
            {
                var customerList = VendorPODAL.GetQuotationList(tB_params);
                return Json(customerList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult AddUpdateVendorPO(VendorPO tB_Admin)
        {
            try
            {
                long adminId = Convert.ToInt64(Session["EMP_ID"]);
                tB_Admin.ADMIN_ID = adminId;
                int i = VendorPODAL.AddUpdateVendorPO(tB_Admin);
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

        public JsonResult GetVendorPODetailsForUpdate(long VPO_ID, int CUSTOMER_TYPE_ID)
        {
            try
            {
                var vendorPOList = VendorPODAL.GetVendorPODetailsForUpdate(VPO_ID, CUSTOMER_TYPE_ID);
                return Json(vendorPOList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult GetVendorList()
        {
            long adminId = Convert.ToInt64(Session["EMP_ID"]);
            //var _getadmin = db.Tb_EmployeeMaster.Where(z => z.STATUS == "Active" && z.EMP_ID == adminId).Select(s => new { s.EMP_ID, s.COMPANY_ID}).FirstOrDefault();
            long companyId = Convert.ToInt64(Session["COMPANY_ID"]);

            if (companyId!=0)
            {
                var _getvendor = db.Tb_VendorRegistration.Where(z => z.STATUS == "Active" && z.COMPANY_ID == companyId).Select(s => new { s.V_ID, s.COMPANY_ID, s.VENDOR_COMPANY, s.VENDOR_NAME }).ToList();

                return Json(_getvendor, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var _getvendor = db.Tb_VendorRegistration.Where(z => z.STATUS == "Active").Select(s => new { s.V_ID, s.COMPANY_ID, s.VENDOR_COMPANY, s.VENDOR_NAME }).ToList();

                return Json(_getvendor, JsonRequestBehavior.AllowGet);
            }
            
        }

        public JsonResult GetAccessoriesByProductId(long id,int CUSTOMER_TYPE_ID)
        {
            if(CUSTOMER_TYPE_ID == 1)
            {
                
                var _getacc = db.Tb_StdAccessoriesMaster.Where(z => z.STATUS == "Active" && z.P_ID == id).Select(s => new {s.P_ID, ACC_ID = s.STD_ID, ACCESSORY_NAME = s.STD_ACC_NAME, ACCESSORY_CODE = "", ACC_TYPE_ID = 1 }).ToList();
                var _getspare = db.Tb_SparePart.Where(z => z.STATUS == "Working" && z.P_ID == id).Select(s => new { s.P_ID, ACC_ID = s.SP_ID, ACCESSORY_NAME = s.SPARE_PART, ACCESSORY_CODE = "", ACC_TYPE_ID = 2 }).ToList();
                var unionResult = _getacc.Concat(_getspare);
                return Json(unionResult, JsonRequestBehavior.AllowGet);
            }
            else if (CUSTOMER_TYPE_ID == 5)
            {
                var _getacc = db.Tb_StdAccessoriesMaster.Where(z => z.STATUS == "Active" && z.P_ID == id).Select(s => new { s.P_ID, ACC_ID = s.STD_ID, ACCESSORY_NAME = s.STD_ACC_NAME, ACCESSORY_CODE = "", ACC_TYPE_ID = 3 }).ToList();

                return Json(_getacc, JsonRequestBehavior.AllowGet);
            }
            else if (CUSTOMER_TYPE_ID == 3)
            {
                var _getacc1 = db.TB_MedtronicAccessories.Where(z => z.STATUS == true && z.P_ID == id && z.MED_ACCESSORY_TYPE_ID == 1).Select(s => new { s.P_ID, ACC_ID = (long)s.MED_ACC_ID, s.ACCESSORY_NAME, s.ACCESSORY_CODE, ACC_TYPE_ID = 4 }).ToList();
                var _getacc2 = db.TB_MedtronicAccessories.Where(z => z.STATUS == true && z.P_ID == id && z.MED_ACCESSORY_TYPE_ID == 2).Select(s => new { s.P_ID, ACC_ID = (long)s.MED_ACC_ID, s.ACCESSORY_NAME, s.ACCESSORY_CODE, ACC_TYPE_ID = 5 }).ToList();
                var _getacc3 = db.TB_MedtronicAccessories.Where(z => z.STATUS == true && z.P_ID == id && z.MED_ACCESSORY_TYPE_ID == 3).Select(s => new { s.P_ID, ACC_ID = (long)s.MED_ACC_ID, s.ACCESSORY_NAME, s.ACCESSORY_CODE, ACC_TYPE_ID = 6 }).ToList();
                var unionResult = _getacc1.Concat(_getacc2.Concat(_getacc3));
                return Json(unionResult, JsonRequestBehavior.AllowGet);
            }
            

            return Json("", JsonRequestBehavior.AllowGet);
        }

        public ActionResult VendorPOAddEdit()
        {
            return View();
        }
        public ActionResult ViewPO()
        {
            return View();
        }

        public ActionResult AddVendorPOProductAccessories(VendorPOProduct tB_admin)
        {
            try
            {
                int i = VendorPODAL.AddVendorPOProductAccessories(tB_admin);
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

        public JsonResult GetVendorPOProductList(long id)
        {
            try
            {
                List<VendorPOProduct> obj = VendorPODAL.GetVendorPOProductList(id);

                return Json(obj); 

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public ActionResult DeleteVendorPOProductAccessories(long vendorPOID, long vendorprodID, long? vendorAccessoriesID)
        {
            try
            {
                int i = VendorPODAL.DeleteVendorPOProductAccessories(vendorPOID, vendorprodID, vendorAccessoriesID);
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


        public ActionResult UpdateVendorPODetails(VendorPO tB_admin)
        {
            try
            {
                
                int i = VendorPODAL.UpdateVendorPODetails(tB_admin);

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

        public JsonResult GetProduct(byte productTypeID, string Type)
        {

            if (Type == "Mindray")
            {
                var _getadmin = db.Tb_Product
              .Where(z => z.STATUS == "Active" && z.PT_ID == productTypeID)
              .OrderBy(x => x.PRODUCT_NAME)
              .Select(s => new { s.P_ID, s.PRODUCT_NAME, s.STATUS }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }

            else if (Type == "Medtronic")
            {
                var _getadmin = db.Tb_Product
              .Where(z => z.STATUS == "Active" && z.PT_ID == productTypeID)
              .OrderBy(x => x.PRODUCT_NAME)
              .Select(s => new { s.P_ID, s.PRODUCT_NAME, s.STATUS }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }

            else
            {
                var _getadmin = db.Tb_Product
              .Where(z => z.STATUS == "Active" && z.PT_ID == productTypeID)
              .OrderBy(x => x.PRODUCT_NAME)
              .Select(s => new { s.P_ID, s.PRODUCT_NAME, s.STATUS }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);
            }
        }
    }
}