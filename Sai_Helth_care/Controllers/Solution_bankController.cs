using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using static Sai_Helth_care.Models.SolutionBankDAL;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Solution_bankController : Controller
    {
        // GET: Solution_bank
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult TotalRecordCount(SearchSolutionBankParams tB_Admin)
        {
            try
            {
                int count = SolutionBankDAL.GetSolutionBankTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult GetSolutionBankList(SearchSolutionBankParams tB_params)
        {

            try
            {
                var accessoriesList = SolutionBankDAL.GetSolutionBankList(tB_params);
                return Json(accessoriesList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public ActionResult UpdateSolutionBankAnswer(SolutionBank tB_admin)
        {
            try
            {
                long adminId = Convert.ToInt64(Session["EMP_ID"]);
                tB_admin.SOLUTION_PROVIDER_ID = adminId;
                int i = SolutionBankDAL.UpdateSolutionBankAnswer(tB_admin);
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