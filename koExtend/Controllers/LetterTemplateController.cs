using System.Collections.Generic;
using System.Web.Mvc;
using koExtend.Models;

namespace koExtend.Controllers
{
    public class LetterTemplateController : Controller
    {
        public SchoolSerivce SchoolSerivce = new SchoolSerivce(); 
        public ActionResult GetTemplates()
        {
            return Json(new
                            {
                                SchoolSerivce.WhenComplited,
                                SchoolSerivce.WhenCreated,
                                templates = SchoolSerivce.GetLettersTemplate()
                            }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetTemplate(string id)
        {
            var template = SchoolSerivce.GetLettersTemlateBy(id);
            return Json(template, JsonRequestBehavior.AllowGet);
        }

        
        public ActionResult UpdateSchoolOptions(bool whenCreated, bool whenComplited)
        {
            SchoolSerivce.WhenCreated = whenCreated;
            SchoolSerivce.WhenComplited = whenComplited;

            return Success("Updated successfully");
        }


        public ActionResult UpdateTemplate(string templateId, string content, List<string> tokens)
        {
            if (content.Contains("error"))
                return Fail("can save fail template");

            SchoolSerivce.UpdateTemplate(templateId, content, "vasa");

            return Success("Successfully saved");
        }

        public JsonResult Fail(string message)
        {
            return Json(new
                            {
                                isSuccess = false, message
                            });
        }

        public JsonResult Success(string message)
        {
            return Json(new
            {
                isSuccess = true, message
            });
        }

    }
}
