using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AssignmentApp.Domain
{
    public class Member
    {
        public int MemberId { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public DateTime? DateOfBirth { get; set; }

        [Required]
        public string? ContactNo { get; set; }

        [Required]
        public int? GenderId { get; set; }
        public int? TeamDetailsId { get; set; }

        public virtual Gender? Gender { get; set; }
        public virtual TeamDetail? TeamDetails { get; set; }
    }
}
