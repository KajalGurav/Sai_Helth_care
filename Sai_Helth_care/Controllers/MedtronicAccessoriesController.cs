using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static Sai_Helth_care.Models.MedtronicProductDAL;
namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class MedtronicAccessoriesController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();

        // GET: MedtronicAccessories
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult TotalRecordCountAccessories(SearchMedtronicProductParams tB_Admin)
        {
            try
            {
                int count = MedtronicProductDAL.GetMedtronicAccessoriesTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult GetAccessoriesList(SearchMedtronicProductParams tB_params)
        {

            try
            {
                var accessoriesList = MedtronicProductDAL.GetMedtronicAccessoriesList(tB_params);
                return Json(accessoriesList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public ActionResult AddUpdateMedtronicAccessories(MedtronicAccessories tB_admin)
        {
            try
            {
                long adminId = Convert.ToInt64(Session["EMP_ID"]);
                tB_admin.ADMIN_ID = adminId;
                int i = MedtronicProductDAL.AddUpdateMedtronicAccessories(tB_admin);
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


        public JsonResult GetMedtronicAccessoriesById(long id)
        {
            try
            {
                List<MedtronicAccessories> obj = MedtronicProductDAL.GetMedtronicAccessoriesListByProductID(id);

                return Json(obj); ;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult GetMedtronicAccessoriesList(long id)
        {
            try
            {
                var _getadmin = db.TB_MedtronicAccessories.Where(z => z.STATUS == true && z.P_ID==id).OrderBy(x => x.ACCESSORY_NAME).Select(s => new { s.MED_ACC_ID, s.ACCESSORY_CODE, s.ACCESSORY_NAME,s.MED_ACCESSORY_TYPE_ID,s.MRP, s.BASIC_PRICE,s.GST_PERCENTAGE, s.STATUS, s.REG_DATE, s.HSN_CODE }).ToList();
                return Json(_getadmin, JsonRequestBehavior.AllowGet);


            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        //AMC 
        public JsonResult Get_AMCAccessories(int? AMC_CMC_ID)
        {
            try
            {
                long adminId = Convert.ToInt64(Session["EMP_ID"]);
                List<AMC_MedtronicAccessories> obj = MedtronicProductDAL.Get_AMC_MedtronicAccessories(adminId, AMC_CMC_ID);

                return Json(obj); ;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public JsonResult AddAMCAccessories(AMC_MedtronicAccessories tb_AddPartsAccessories)
        {
            try
            {
                long adminId = Convert.ToInt64(Session["EMP_ID"]);
                tb_AddPartsAccessories.EMP_ID = adminId;
                int i = MedtronicProductDAL.AddAMC_MedtronicAccessories(tb_AddPartsAccessories);
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

        public JsonResult DeleteAMCAccessories(int id)
        {
            try
            {
                int i = MedtronicProductDAL.Delete_AMC_MedtronicAccessories(id);
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

        public string ChangeStatus(long id)
        {
            TB_MedtronicAccessories tB_Admin = db.TB_MedtronicAccessories.Where(b => b.MED_ACC_ID == id).SingleOrDefault();
            if (tB_Admin.STATUS == true)
            {
                tB_Admin.STATUS = false;
                db.SaveChanges();
            }
            else
            {
                tB_Admin.STATUS = true;
                db.SaveChanges();
            }
            return "Status change Successfully.";
        }
    }
}