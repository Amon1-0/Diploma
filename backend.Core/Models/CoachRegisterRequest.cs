using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Models
{
    public class CoachRegisterRequest
    {
        public string Login { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Password { get; set; }
        public string Avatar { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
