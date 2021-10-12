using System;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ViewController : ControllerBase
    {
        private readonly IViewService _viewServiec;
        private readonly DataContext _context;

        public ViewController(IViewService viewServiec, DataContext context)
        {
            this._viewServiec = viewServiec;
            this._context = context;
        }

        [AllowAnonymous]
        [HttpGet("{course}/{batch}")]
        public async Task<IActionResult> ViewByCourseCodeAndBatch([FromQuery]string courseCode, [FromQuery]string batch)
        {
            int CourseCode = Convert.ToInt16(courseCode);
            var result = await _viewServiec.ViewByCourseCodeAndBatch(CourseCode, batch);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("{semester}/{batch}/{view}")]
        public async Task<IActionResult> ViewBySemesterAndBatch([FromQuery]string semester, [FromQuery]string batch)
        {
            var result = await _viewServiec.ViewBySemesterAndBatch(semester, batch);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult ViewById()
        {
            var result = _viewServiec.ViewAllStudents();
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpDelete("{userId:int}")]
        public IActionResult DeleteStudent([FromRoute]int userId)
        {
            var result = _viewServiec.DeleteStudent(userId);
            if(result!=null)return StatusCode(201);
            else return StatusCode(404);
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAllBatch(int id)
        {
            var batches = _viewServiec.GetAllBatches();
            return Ok(batches);
        }

        [AllowAnonymous]
        [HttpGet("{get}/{all}/{courses}/{name}")]
        public IActionResult GetCourseCode(int id)
        {
            var courses = _viewServiec.GetAllCourses();
            return Ok(courses);
        }

        [AllowAnonymous]
        [HttpPut("{courseName}")]
        public IActionResult AddNewCourse(string courseName)
        {
            // int CourseCode = Convert.ToInt16(courseCode);
            // var result = await _viewServiec.ViewByCourseCodeAndBatch(CourseCode, batch);
            var course = new Course
            {
                Name = courseName,
            };

            _context.Courses.Add(course);
            _context.SaveChanges();
            return StatusCode(201);
        }
    }
}