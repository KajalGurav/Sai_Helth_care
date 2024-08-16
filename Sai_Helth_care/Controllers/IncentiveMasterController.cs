using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static Sai_Helth_care.Models.SalaryWages;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class IncentiveMasterController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult TotalRecordCount()
        {
            try
            {
                int count = IncentiveMasterDAL.GetIncentiveMasterTotalRecordCount();
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult GetIncentiveMasterList(SearchSalaryWagesParams tB_params)
        {

            try
            {
                var incentiveList = IncentiveMasterDAL.GetIncentiveMasterList(tB_params);
                return Json(incentiveList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public ActionResult AddUpdateIncentiveMaster(IncentiveMaster tB_admin)
        {
            try
            {
                int i = IncentiveMasterDAL.AddUpdateIncentiveMaster(tB_admin);
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

        public JsonResult GetIncentiveServiceTypeList()
        {
            var _getadmin = db.TB_IncentiveServiceType.Where(z => z.STATUS == true).Select(s => new { s.INC_SERVICE_TYPE_ID, s.INC_SERVICE_TYPE_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetIncentiveTypeList()
        {
            var _getadmin = db.TB_IncentiveType.Where(z => z.STATUS == true).Select(s => new { s.INC_TYPE_ID, s.INC_TYPE_NAME, s.STATUS, s.REG_DATE }).ToList();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }


        public ActionResult IncentiveMaster()
        {
            return View();
        }
        public ActionResult IncentiveScheme()
        {
            return View();
        }

        public JsonResult TotalRecordCountIncentiveScheme(SearchSalaryWagesParams tb_params)
        {
            try
            {
                int count = IncentiveSchemeDAL.GetIncentiveSchemeTotalRecordCount(tb_params);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult GetIncentiveSchemeList(SearchSalaryWagesParams tB_params)
        {

            try
            {
                var incentiveList = IncentiveSchemeDAL.GetIncentiveSchemeList(tB_params);
                return Json(incentiveList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public ActionResult AddUpdateIncentiveScheme(IncentiveScheme tB_admin)
        {
            try
            {
                int i = IncentiveSchemeDAL.AddUpdateIncentiveScheme(tB_admin);
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
    }
}