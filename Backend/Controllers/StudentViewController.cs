using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class StudentViewController : ControllerBase
    {
        private readonly DataContext _context;

        public StudentViewController(DataContext context)
        {
            this._context = context;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IEnumerable<StudentResultDto> ViewResult(int id)
        {
            // var result = await _viewServiec.ViewBySemesterAndBatch(semester, batch);
            // return Ok(result);

            var result = _context.Result.Where(x => x.UserId == id).OrderBy(x => x.Semester).AsEnumerable();
            var abc = from p in _context.Result 
                       join q in _context.Courses
                       on p.CourseCode equals q.CourseCode where p.UserId == id 
                    select new StudentResultDto
                    {
                        UserId = p.UserId,
                        CourseCode = p.CourseCode,
                        Name = q.Name,
                        Batch = p.Batch,
                        Semester = p.Semester,
                        QuizMarks = p.QuizMarks,
                        ClassWorkMarks = p.ClassWorkMarks,
                        MidMarks = p.MidMarks,
                        FinalMarks = p.FinalMarks
                    };
            return abc;
        }
    }
}