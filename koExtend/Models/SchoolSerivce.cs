using System;
using System.Collections.Generic;
using System.Linq;

namespace koExtend.Models
{
    public class SchoolSerivce
    {
        public List<Template> GetLettersTemplate()
        {
            return Templates;
        }

        public Template GetLettersTemlateBy(string id)
        {
            return Templates.FirstOrDefault(t => t.Id == id);
        }

        public void UpdateTemplate(string id, string newContent, string userName)
        {
            var template = GetLettersTemlateBy(id);

            template.Content = newContent;
            template.UpdatedBy = userName;
            template.UpdatedDate = DateTime.Now.ToString("dd.MM.yyyy ss:mm");
        }

        private static readonly List<Template> Templates = new List<Template>
                                                      {
                                                          new Template{ Id = "1", Name = "Fba creaated", Content = "[Treacher_Name] fba created by [Student_Name]", Tokens = new List<string>{ "Student_Name", "Treacher_Name"}},
                                                          new Template{ Id = "2", Name = "Fba complited", Content = "[Student_Name] complit fba", Tokens = new List<string>{ "Student_Name", "Treacher_Name"}},
                                                      }; 

        public static bool WhenCreated { get; set; }
        public static bool WhenComplited { get; set; }
    }
}