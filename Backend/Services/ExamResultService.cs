using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ExamResultService : IExamResultService
    {
        private readonly DataContext _context;

        public ExamResultService(DataContext context)
        {
            this._context = context;
        }
        
        public async Task<Result> AddResult(ResultDto resultDto)
        {
            Result result = new Result
            {
                Batch = resultDto.Batch,
                QuizMarks = resultDto.QuizMarks,
                ClassWorkMarks = resultDto.ClassWorkMarks,
                MidMarks = resultDto.FinalMarks,
                FinalMarks = resultDto.FinalMarks,
                UserId = resultDto.UserId,
                CourseCode = resultDto.CourseCode,
                Semester = resultDto.Semester
            };
            await _context.Result.AddAsync(result);
            _context.SaveChanges();
            return result;
        }

        public async Task<Result> DeleteResult(int userId, int courseCode)
        {
            var result = await _context.Result.FirstOrDefaultAsync(x => x.UserId == userId && x.CourseCode == courseCode);
            _context.Remove(result);
            _context.SaveChanges();
            return result;
        }

        public async Task<Result> UpdateResult(ResultDto resultDto)
        {
            var result = await _context.Result.FirstOrDefaultAsync(x => x.UserId == resultDto.UserId && x.CourseCode == resultDto.CourseCode);
            
            result.MidMarks = resultDto.MidMarks;
            result.ClassWorkMarks = resultDto.ClassWorkMarks;
            result.FinalMarks = resultDto.FinalMarks;
            result.QuizMarks = resultDto.QuizMarks;
            _context.SaveChanges();
            return result;
            
        }
    }
}