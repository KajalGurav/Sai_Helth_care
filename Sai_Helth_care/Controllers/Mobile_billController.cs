using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class Mobile_billController : Controller
    {
        // GET: Mobile_bill
        public ActionResult Index()
        {
            return View();
        }
    }
}