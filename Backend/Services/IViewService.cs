using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services
{
    public interface IViewService
    {
        Task<IEnumerable<ViewResultDto>> ViewByCourseCodeAndBatch(int courseCode, string batch);
        Task<IEnumerable<ViewResultDto>> ViewBySemesterAndBatch(string semester, string batch);
        List<User> ViewAllStudents();
        User DeleteStudent(int userId); 
        List<string> GetAllBatches();
        List<Course> GetAllCourses();

        // Task<Result> ViewIndividualStudentProfile(int userId,int courseCode);
        // Task<Result> ViewProfile(int userId,int courseCode);

    }
}