using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sai_Helth_care.Models;
using System.Globalization;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class AttendanceController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;
        static DataSet ds;
        static DataTable dtData;
        // GET: Attendance
        public ActionResult Index()
        {
            return View();
        }
     
        public JsonResult GetallAdmin(MonthlyAttendence tB_Admin)
        {
            List<litb> Lobj = new List<litb>();
            List<litb1> Lobjmain = new List<litb1>();
            string c = "";
            if (tB_Admin.STARTING_DATE == null)
            {
                c = "";
            }
            else
            {
                c = tB_Admin.STARTING_DATE;
            }

            string d = "";
            if (tB_Admin.ENDING_DATE == null)
            {
                d = "";
            }
            else
            {
                d = tB_Admin.ENDING_DATE;
            }


            long ab = 0;
            long pre = 0;
            try
            {
                cmd = new SqlCommand("Get_AttendenceRecord_Panel", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@START_DATE", tB_Admin.STARTING_DATE);
                cmd.Parameters.AddWithValue("@END_DATE", tB_Admin.ENDING_DATE);
                cmd.Parameters.AddWithValue("@EMPLOYEE_ID", tB_Admin.EMPLOYEE_ID);
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                dtData = new DataTable();
                sda = new SqlDataAdapter(cmd);

                sda.Fill(dtData);
                con.Close();

              
                litb1 a = new litb1();
                litb b = new litb();
                foreach (DataRow row_ in dtData.Rows)
                {
                    a = new litb1();
                    Lobj = new List<litb>();

                    foreach (DataColumn drow in dtData.Columns)
                    {
                        b = new litb();
                        if ("EMP_NAME" == drow.ColumnName.ToString())
                        {
                            b.DATE = "Employee Name";
                        }
                        //else if("EMPLOYEE_ID" == drow.ColumnName.ToString())
                        //{
                        //    b.DATE = "Employee ID";
                        //}
                        else
                        {
                            b.DATE = (drow.ColumnName).ToString();
                        }

                        string s = "";
                        s = row_[dtData.Columns.IndexOf(drow)].ToString();

                        b.DATE_VALUE = s;

                        if ("EMP_NAME" != drow.ColumnName.ToString())
                        {
                            if (b.DATE_VALUE == "A")
                            {
                                b.DATE_VALUE = "A";
                                ab += 1;

                            }
                            else
                            {
                                //b.DATE_VALUE = "P";
                                b.DATE_VALUE = b.DATE_VALUE;
                                pre += 1;
                            }
                        }
                        Lobj.Add(b);

                    }

                    a.DATE_VALUEList = Lobj;
                    a.TOTAL_ABSENT = ab;
                    a.TOTAL_PRESENT = pre;
                    ab = 0;
                    pre = 0;
                    a.EMP_NAME = row_["EMP_NAME"].ToString();
                    //a.SALESTEAM_ID =Convert.ToInt32(row_["SALESTEAM_ID"].ToString());
                    Lobjmain.Add(a);




                }

            }
            catch (Exception ex)
            {

            }


            var _Monthlyreport = Lobjmain;
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }

    }
}