using System;
using System.Collections.Generic;

namespace AssignmentApp.Domain 
{
    public  class Gender
    {
        public Gender()
        {
            TeamDetails = new HashSet<TeamDetail>();
        }

        public int GenderId { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<TeamDetail> TeamDetails { get; set; }
    }
}
