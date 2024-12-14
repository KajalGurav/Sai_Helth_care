using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class ImportantCallsController : Controller
    {      
        public ActionResult Index()
        {
            return View();
        }
    }
}