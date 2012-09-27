using System;
using System.Collections.Generic;
using System.Web.Mvc;
using koExtend.Models;

namespace koExtend.Controllers
{
    public class EthnicityController : Controller
    {
        
        public ActionResult Getethnicities()
        {
            return Json(new
                            {
                                ethnicities = EthnicityService.Ethnicitys
                            }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult UpdateEthnicitys(List<Ethnicity> ethnicities)
        {
            EthnicityService.Ethnicitys = ethnicities;
            return new EmptyResult();
        }
    }
}


public class EthnicityService
{
    public static List<Ethnicity> Ethnicitys = new List<Ethnicity>
                                                   {
                                                       new Ethnicity{ Id = Guid.NewGuid().ToString(), Name = "African American"},
                                                       new Ethnicity{ Id = Guid.NewGuid().ToString(), Name = "Asian"},
                                                       new Ethnicity{ Id = Guid.NewGuid().ToString(), Name = "Caucasian"},
                                                       new Ethnicity{ Id = Guid.NewGuid().ToString(), Name = "Hispanic"}

                                                   };
}