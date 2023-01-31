using AssignmentApp.Domain;
using AssignmentApp.DTOs;
using AutoMapper;

namespace AssignmentApp.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<GenderDto, Gender>().ReverseMap();

            CreateMap<TeamDetail, TeamMemberListDto>().ReverseMap();
        }
    }
}
