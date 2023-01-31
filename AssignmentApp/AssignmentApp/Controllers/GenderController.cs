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
    public class GenderController : ControllerBase
    {
        private readonly TeamDBContext _context;
        private readonly IMapper _mapper;
        public GenderController(TeamDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("save-gender")] 
        public async Task<ActionResult> Post(GenderDto genderDto)
        {
            var gender = _mapper.Map<Gender>(genderDto);

           _context.Gender.Add(gender);
           _context.SaveChanges();

           return Ok();
        }

        [HttpGet]
        [Route("getall-gender")]
        public async Task<ActionResult> Get()
        {
            var genders = _context.Gender.ToList();
            var genderDto = _mapper.Map<List<GenderDto>>(genders);
            return Ok(genderDto);
        }
    }
}
