using backend.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Infrastructure.Models
{
    public class Training
    {
        public int Id { get; set; }
        public DateTime TrainingDate { get; set; }
        public bool IsPlayerAbsent { get; set; }
        public string Description { get; set; }
        public int PlayerId { get; set; }
        public Player Player { get; set; }
    }
}
