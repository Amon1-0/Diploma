using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Models
{
    public class CoachPutRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Image { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
