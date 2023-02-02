using System;
using System.Collections.Generic;

namespace AssignmentApp.Models
{
    public partial class TeamDetail
    {
        public TeamDetail()
        {
            Members = new HashSet<Member>();
        }

        public int TeamDetailsId { get; set; }
        public string? TeamName { get; set; }
        public string? TeamDescription { get; set; }


        public virtual ICollection<Member> Members { get; set; }
    }
}
