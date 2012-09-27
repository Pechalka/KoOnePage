using System.Web.Mvc;

namespace koExtend.Controllers
{
    public class EthnicityController : Controller
    {
        
        public ActionResult Getethnicities()
        {
            return Json(new
                            {
                                ethnicities = new[]{ "African American", "Asian", "Caucasian", "Hispanic"}
                            }, JsonRequestBehavior.AllowGet);
        }
    }
}
