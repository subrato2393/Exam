using AssignmentApp.Constant;
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
            if (statusValue == TeamConstant.PendingStatusValueManager) 
            {
                teamDetails.AprovedByManager = TeamConstant.ApprovedStatusValueManager;
            }

            else if (statusValue == TeamConstant.ApprovedStatusValueManager)
            {
                teamDetails.AprovedByManager = TeamConstant.UapprovedStatusValueManager;
            }

            else if (statusValue == TeamConstant.UapprovedStatusValueManager)
            {
                teamDetails.AprovedByManager = TeamConstant.PendingStatusValueManager;
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
            if(statusValue == TeamConstant.PendingStatusValueDirector)
            {
                teamDetails.ApprovedByDirector = TeamConstant.ApprovedStatusValueDirector;
            }

            else if (statusValue == TeamConstant.ApprovedStatusValueDirector)
            {
                teamDetails.ApprovedByDirector = TeamConstant.UapprovedStatusValueDirector;
            }

            else if (statusValue == TeamConstant.UapprovedStatusValueDirector)
            {
                teamDetails.ApprovedByDirector = TeamConstant.PendingStatusValueDirector;
            }

            _context.TeamDetails.Update(teamDetails);
            _context.SaveChanges();

            return NoContent();
        }


        [HttpGet]
        [Route("getteam-details/{id}")]
        public async Task<ActionResult> Get(int id)
        {
            TeamDetailsDto teamDetailsDto = new TeamDetailsDto();

            var teamDetails = (from td in _context.TeamDetails
                         where td.TeamDetailsId == id

                         select new
                         {
                             td.TeamDetailsId,
                             td.TeamName,
                             td.TeamDescription,
                             td.AprovedByManager,
                             td.ApprovedByDirector

                         }).FirstOrDefault();
              
            var memberDetails = (from m in _context.Members
                                where m.TeamDetailsId == id

                                select new
                                {
                                    m.TeamDetailsId,
                                    m.MemberId,
                                    m.Name,
                                    m.ContactNo,
                                    m.DateOfBirth,
                                    m.GenderId
                                }).ToList();

            return Ok(new { teamDetails, memberDetails });
        }
          
        [HttpGet]
        [Route("getall-team-details")]
        public async Task<ActionResult> Get() 
        {
            var teamDetails = _context.TeamDetails.ToList();
            var teamDetailsDto = _mapper.Map<List<TeamMemberListDto>>(teamDetails);

            return Ok(teamDetailsDto);
        }

        [HttpDelete]
        [Route("delete-teamdetails/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var teamDetails = _context.TeamDetails.Find(id);

            //delete member 
             var member = _context.Members.Where(x=>x.TeamDetailsId == teamDetails.TeamDetailsId).ToList();
            _context.Members.RemoveRange(member);
            _context.SaveChanges();


            //delete team details
            _context.TeamDetails.Remove(teamDetails);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPut]
        [Route("update-team-and-memberdetails/{id}")] 
        public async Task<ActionResult> UpdateTeamANdMemberDetails([FromBody] TeamDetailsDto teamDto,int id)
        {
            var team = _mapper.Map<TeamDetail>(teamDto);

            team.TeamDetailsId = id;

            _context.TeamDetails.Update(team);
            _context.SaveChanges();

            var member = teamDto.Member.Select(x => new Member
            {
                MemberId =x.MemberId.Value,
                Name = x.Name,
                ContactNo = x.ContactNo,
                DateOfBirth = x.DateOfBirth,
                GenderId = x.GenderId,
                TeamDetailsId = team.TeamDetailsId
            });

            _context.UpdateRange(member);
            _context.SaveChanges();


            return NoContent();
        }
    }
}
