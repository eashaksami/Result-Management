using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Result
    {
        public int Id { get; set; }
        public string Batch { get; set; }
        public string Semester { get; set; }
        public double QuizMarks { get; set; }
        public double ClassWorkMarks { get; set; }
        public double MidMarks { get; set; }
        public double FinalMarks { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public int CourseCode { get; set; }
        [ForeignKey("CourseCode")]
        public Course Course { get; set; }

    }
}