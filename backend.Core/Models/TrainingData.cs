using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Models
{
    public class TrainingData
    {
        public int Id { get; set; }
        public DateTime TrainingDate { get; set; }
        public bool IsPlayerAbsent { get; set; }
        public string Description { get; set; }
        public double Grade { get; set; }
    }
}
