using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace koExtend.Controllers
{
    public class HomeController : Controller
    {
        readonly PeopleService _peopleService = new PeopleService();
        public ActionResult Index()
        {
            return View();
        }



        public ActionResult GetList()
        {

            return Json(new
                            {
                                peoples = _peopleService.GetAll()
                            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetPeaple(string id)
        {
            return Json(_peopleService.GetBy(id), JsonRequestBehavior.AllowGet);
        }


        public ActionResult Update(People people)
        {
            _peopleService.Save(people);
            return new EmptyResult();
        }
    }
}

public class PeopleService
{
    private static readonly List<People> _peoples = new List<People>
                               {
                                   new People{ Id = "1", Name = "Vasa"},
                                   new People{ Id = "2", Name = "Peta"},
                               }; 
    public List<People> GetAll()
    {
        return _peoples;
    }

    public People GetBy(string id)
    {
        return _peoples.FirstOrDefault(_ => _.Id == id);
    }


    public void Save(People people)
    {
        var old = GetBy(people.Id);
        if (old == null)
            _peoples.Add(people);
        else
            old.Name = people.Name;
    }
}

public class People
{
    public string Name { get; set; }
    public string Id { get; set; } 
}