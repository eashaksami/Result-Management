namespace Backend.Dtos
{
    public class UpdateResultDto
    {
        public int userId { get; set; }
        public  int courseCode { get; set; }
        public string examType { get; set; }
        public double newNumber { get; set; }
    }
}