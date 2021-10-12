using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Course
    {
        [Key]
        public int CourseCode { get; set; }
        public string Name { get; set; }
        public ICollection<Result> Result { get; set; }
    }
}