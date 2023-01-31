using AssignmentApp.DatabaseContext;
using AssignmentApp.Domain;
using AssignmentApp.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AssignmentApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamDetailsControllers : ControllerBase
    {
        private readonly TeamDBContext _context;
        private readonly IMapper _mapper;
        public TeamDetailsControllers(TeamDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("save-Team")]
        public async Task<ActionResult> Post(TeamDetailsDto teamDto)
        {
           var team = teamDto.TeamMemberDtos.Select(x => new TeamDetail
            {
                 ContactNo = x.ContactNo,
                 DateOfBirth = x.DateOfBirth,
                 GenderId =x.GenderId,
                 Name =x.Name,
                 TeamDescription = teamDto.TeamDescription,
                 TeamName = teamDto.TeamName
            });

            _context.AddRange(team);
            _context.SaveChanges();

            return Ok();
        }
         
        [HttpGet]
        [Route("getall-team-details")]
        public async Task<ActionResult> Get()
        { 
            var teamDetails = _context.TeamDetails.ToList();
            var teamDetailsDto = _mapper.Map<List<TeamMemberListDto>>(teamDetails);

            return Ok(teamDetailsDto);
        }


        //[HttpGet]
        //[Route("getall-Team")]
        //public async Task<ActionResult> Get()
        //{
        //    var Teams = _context.Team.ToList();
        //    var TeamDto = _mapper.Map<List<TeamDto>>(Teams);
        //    return Ok(TeamDto);
        //}
    }
}
