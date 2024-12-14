using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class AERB_QuotationController : Controller
    {
        // GET: AERB_Quotation
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Queadd()
        {
            return View();
        }


        public ActionResult QueEdit()
        {
            return View();
        }
    }
}