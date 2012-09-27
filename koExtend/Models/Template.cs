using System.Collections.Generic;

namespace koExtend.Models
{
    public class Template
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public List<string> Tokens { get; set; }

        public string UpdatedBy { get; set; }
        public string UpdatedDate { get; set; }
    }
}