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

          CreateMap<TeamDetailsDto, TeamDetail>().ReverseMap();
            CreateMap<TeamMemberListDto, TeamDetail>().ReverseMap();
            //    .ForMember(x=>x.Member,Member);
        }
    }
}
