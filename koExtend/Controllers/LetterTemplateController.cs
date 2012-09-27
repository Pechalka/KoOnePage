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
            SchoolSerivce.WhenComplited = whenComplited;
            SchoolSerivce.WhenComplited = whenComplited;

            return new EmptyResult();
        }


        public ActionResult UpdateTemplate(string templateId, string content, List<string> tokens)
        {
            SchoolSerivce.UpdateTemplate(templateId, content, "vasa");
            
            return new EmptyResult();
        }
    }
}


