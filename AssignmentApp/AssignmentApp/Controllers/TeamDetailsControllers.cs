using AssignmentApp.DatabaseContext;
using AssignmentApp.Domain;
using AssignmentApp.DTOs;
using AutoMapper;
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
            var team = _mapper.Map<TeamDetail>(teamDto);

            _context.Add(team);
            _context.SaveChanges();

            var member = teamDto.Member.Select(x => new Member
            {
                Name = x.Name,
                ContactNo = x.ContactNo,
                DateOfBirth = x.DateOfBirth,
                GenderId = x.GenderId,
                TeamDetailsId = team.TeamDetailsId
            });

            _context.AddRange(member);
            _context.SaveChanges();

            return Ok();
        }


        [HttpPut]
        [Route("update-teamstatusby-manager/{id}")]
        public async Task<ActionResult> UpdateStatusManager([FromBody] int statusValue, int id)
        {
            var teamDetails = _context.TeamDetails.Find(id);
            if (statusValue == 0) 
            {
                teamDetails.AprovedByManager = 1;
            }

            else if (statusValue == 1)
            {
                teamDetails.AprovedByManager = 2;
            }

            else if (statusValue == 2)
            {
                teamDetails.AprovedByManager = 0;
            }

            _context.TeamDetails.Update(teamDetails);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPut]
        [Route("update-teamstatusby-director/{id}")]
        public async Task<ActionResult> Put([FromBody] int statusValue,int id)
        {
            var teamDetails =_context.TeamDetails.Find(id);
            if(statusValue == 0)
            {
                teamDetails.ApprovedByDirector = 1;
            }

            else if (statusValue == 1)
            {
                teamDetails.ApprovedByDirector = 2;
            }

            else if (statusValue == 2)
            {
                teamDetails.ApprovedByDirector = 0;
            }

            _context.TeamDetails.Update(teamDetails);
            _context.SaveChanges();

            return NoContent();
        }


        [HttpGet]
        [Route("getteam-details/{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var teamDetails = (from td in _context.TeamDetails
                              join me in _context.Members on td.TeamDetailsId equals me.TeamDetailsId
                              select new
                              {
                                  TeamDetailsId = td.TeamDetailsId,
                                  TeamName = td.TeamName,
                                  TeamDescription = td.TeamDescription

                              }).ToList().Where(x=>x.TeamDetailsId == id).FirstOrDefault();

            return Ok(teamDetails);
        }

        [HttpGet]
        [Route("getall-team-details")]
        public async Task<ActionResult> Get() 
        {
            var teamDetails = _context.TeamDetails.ToList();
            var teamDetailsDto = _mapper.Map<List<TeamMemberListDto>>(teamDetails);

            return Ok(teamDetailsDto);
        }
    }
}
