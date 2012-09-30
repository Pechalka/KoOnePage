using System.Web.Mvc;

namespace koExtend.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetTemplate(string templateName)
        {
            return PartialView(templateName);
        }
    }
}