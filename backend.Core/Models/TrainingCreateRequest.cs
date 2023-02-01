using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Models
{
    public class TrainingCreateRequest
    {
        public DateTime TrainingDate { get; set; }
        public string Description { get; set; }
        public List<PlayerForTraining> PlayersForTraining { get; set; }
    }
}
