﻿using System.Web;
using System.Web.Mvc;

namespace Sai_Helth_care
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
