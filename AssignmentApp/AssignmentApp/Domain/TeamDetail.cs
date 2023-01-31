using System;
using System.Collections.Generic; 

namespace AssignmentApp.Domain
{
    public class TeamDetail
    {
        public int TeamDetailsId { get; set; }
        public string? TeamName { get; set; }
        public string? TeamDescription { get; set; }
        public string? Name { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? ContactNo { get; set; }
        public int? GenderId { get; set; }

        public virtual Gender? Gender { get; set; }
    }
}
