using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AssignmentApp.Domain
{
    public class TeamDetail
    {
        public TeamDetail()
        {
            Members = new HashSet<Member>();
        }

        public int TeamDetailsId { get; set; }

        [Required]
        public string? TeamName { get; set; }

        [Required]
        public string? TeamDescription { get; set; }

        public int? ApprovedByDirector { get; set; }
        public int? AprovedByManager { get; set; }
        public virtual ICollection<Member> Members { get; set; }
    }
}
