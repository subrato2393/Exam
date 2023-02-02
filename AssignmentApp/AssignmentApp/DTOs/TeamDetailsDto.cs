using System;
using System.Collections.Generic;

namespace AssignmentApp.DTOs
{
    public  class TeamDetailsDto
    { 
        public int TeamDetailsId { get; set; }
        public string? TeamName { get; set; }
        public string? TeamDescription { get; set; }
        public int? ApprovedByDirector { get; set; }
        public int? AprovedByManager { get; set; }
        public List<TeamMemberDto> Member { get; set; }
    }
}
  