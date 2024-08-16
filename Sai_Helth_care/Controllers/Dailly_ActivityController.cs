using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sai_Helth_care.Models;
using static Sai_Helth_care.Models.SalaryWages;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Dailly_ActivityController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult TotalRecordCount(SearchSalaryWagesParams tB_Admin)
        {
            try
            {
                int count = DailyActivityDAL.GetDailyActivityTotalRecordCount(tB_Admin);
                return Json(new { success = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult GetDailyActivityList(SearchSalaryWagesParams tB_params)
        {

            try
            {
                var dailyActivityList = DailyActivityDAL.GetDailyActivityList(tB_params);
                return Json(dailyActivityList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public ActionResult AddUpdateDailyActivity(DailyActivity tB_admin)
        {
            try
            {
                int i = DailyActivityDAL.AddUpdateDailyActivity(tB_admin);
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

        public JsonResult GetCityList()
        {

            try
            {
                var cityList = db.TB_CityMaster.Where(z=>z.STATUS=="Active").Select(a=> new {a.CITY_ID,a.CITY_NAME}).ToList();
                return Json(cityList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}