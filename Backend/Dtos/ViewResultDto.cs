namespace Backend.Dtos
{
    public class ViewResultDto
    {
        public string Name { get; set; }
        public int StudentId { get; set; }
        public int CourseCode { get; set; }
        public string CourseName { get; set; }
        public string Batch { get; set; }
        public string Semester { get; set; }
        public double QuizMarks { get; set; }
        public double ClassWorkMarks { get; set; }
        public double MidMarks { get; set; }
        public double FinalMarks { get; set; }

    }
}