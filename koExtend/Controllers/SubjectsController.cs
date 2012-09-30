using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace koExtend.Controllers
{
    public class SubjectsController : Controller
    {
        private static readonly List<Subject> Subjects = new List<Subject>
                              {
                                  new Subject{ Id = "1", Name = "Lunch"},
                                  new Subject{ Id = "2", Name = "After School"},
                                  new Subject{ Id = "3", Name = "Art"},
                                  new Subject{ Id = "4", Name = "Band"},
                              };
        public ActionResult GetSubjects()
        {
            return Json(new
                            {
                                subjects = Subjects
                            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Add(string name)
        {
            var newItem = new Subject
                              {
                                  Id = Guid.NewGuid().ToString(),
                                  Name = name
                              };

            Subjects.Add(newItem);
            
            return Json(newItem);
        }

        public void Delete(string id)
        {
            var item = Subjects.Find(_ => _.Id == id);
            Subjects.Remove(item);
        }
    }
}


public class Subject
{
    public string Id { get; set; }
    public string Name { get; set; }
}