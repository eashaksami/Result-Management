using System.Threading.Tasks;
using Backend.Data;
using Backend.Dtos;
using System.Linq;
using System.Collections.Generic;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services
{
    public class ViewService : IViewService
    {
        private readonly DataContext _context;

        public ViewService(DataContext context)
        {
            this._context = context;
        }

        public async Task<IEnumerable<ViewResultDto>> ViewByCourseCodeAndBatch(int courseCode, string batch)
        {
            var result = (from p in _context.Result join
                        q in _context.Users on p.UserId equals q.UserId join
                        r in _context.Courses on p.CourseCode equals r.CourseCode
                        where (p.CourseCode == courseCode && p.Batch == batch)
                        select new ViewResultDto
                        {
                            Name = q.Name,
                            StudentId = q.UserId,
                            CourseCode = r.CourseCode,
                            CourseName = r.Name,
                            Batch = p.Batch,
                            Semester = p.Semester,
                            QuizMarks = p.QuizMarks,
                            MidMarks = p.MidMarks,
                            FinalMarks = p.FinalMarks, 
                            ClassWorkMarks = p.ClassWorkMarks
                        }).ToList();
            return await Task.FromResult(result);
        }

        public async Task<IEnumerable<ViewResultDto>> ViewBySemesterAndBatch(string semester, string batch)
        {
            var result = (from p in _context.Result join
                        q in _context.Users on p.UserId equals q.UserId join
                        r in _context.Courses on p.CourseCode equals r.CourseCode
                        where (p.Semester == semester && p.Batch == batch)
                        select new ViewResultDto
                        {
                            Name = q.Name,
                            StudentId = q.UserId,
                            CourseCode = r.CourseCode,
                            CourseName = r.Name,
                            Batch = p.Batch,
                            Semester = p.Semester,
                            QuizMarks = p.QuizMarks,
                            MidMarks = p.MidMarks,
                            FinalMarks = p.FinalMarks, 
                            ClassWorkMarks = p.ClassWorkMarks
                        }).ToList();
            return await Task.FromResult(result);
        }

        public List<User> ViewAllStudents()
        {
            var user = _context.Users.ToList();
            return user;
        }

        public List<string> GetAllBatches()
        {
            // var result = _context.Result.GroupBy(x => x.Batch).Select(g => g.First()).Distinct().ToList();
            var batches = _context.Result.Select(m => m.Batch).Distinct().ToList();
    
            return batches;
        }

        public List<Course> GetAllCourses()
        {
            var courses = _context.Courses.ToList();
            return courses;
        }

        public User DeleteStudent(int userId)
        {
            var student = _context.Users.FirstOrDefault(x => x.UserId == userId);
            _context.Remove(student);
            _context.SaveChanges();
            return student;
        }
    }
}