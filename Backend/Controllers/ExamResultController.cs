using System;
using System.Threading.Tasks;
using Backend.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ExamResultController : ControllerBase
    {
        private readonly IExamResultService _examResultService;

        public ExamResultController(IExamResultService examResultService) 
        {
            this._examResultService = examResultService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> AddResult([FromBody]ResultDto resultDto)
        {
            var result = await _examResultService.AddResult(resultDto);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPut]
        public async Task<IActionResult> UpdateResult([FromBody]ResultDto resultDto)
        {
            var result = await _examResultService.UpdateResult(resultDto);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpDelete("{userId:int}/{courseCode:int}")]
        public async Task<IActionResult> DeleteResult([FromRoute]int userId, [FromRoute]int courseCode)
        {
            // int UserId = Convert.ToInt16(userId);
            // int CourseCode = Convert.ToInt16(courseCode);
            var result = await _examResultService.DeleteResult(userId, courseCode);
            return Ok(result);
        }
    }
}