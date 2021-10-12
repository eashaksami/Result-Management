using System.Threading.Tasks;
using Backend.Dtos;
using Backend.Models;

namespace Backend.Services
{
    public interface IExamResultService
    {
        Task<Result> AddResult(ResultDto resultDto);
        Task<Result> UpdateResult(ResultDto resultDto);
        Task<Result> DeleteResult(int userId,int courseCode);
    }
}