using System.Web.Mvc;

namespace koExtend.Controllers
{
    public class TemplatesController : Controller
    {
        public ActionResult GetTemplate(string templateName)
        {
            return View((object)templateName);
        }
    }
}
