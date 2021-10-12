using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
        Task<User> Register(User user, string password);
        Task<bool> UserExist(string username);
        IEnumerable<User> GetAll();
        User GetById(int id);
    }
}