using AutoMapper;
using Backend.Dtos;
using Backend.Models;

namespace Backend.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public void AutoMapperprofiles()
        {
            CreateMap<User, UserForLoginDto>();
            CreateMap<ViewResultDto, ViewResultDto>();
        }
    }
}