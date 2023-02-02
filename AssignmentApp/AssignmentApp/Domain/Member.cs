using System;
using System.Collections.Generic;
 
namespace AssignmentApp.Domain
{
    public class Member
    {
        public int MemberId { get; set; }
        public string? Name { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? ContactNo { get; set; }
        public int? GenderId { get; set; }
        public int? TeamDetailsId { get; set; }

        public virtual Gender? Gender { get; set; }
        public virtual TeamDetail? TeamDetails { get; set; }
    }
}
