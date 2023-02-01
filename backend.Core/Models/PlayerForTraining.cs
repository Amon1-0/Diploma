using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Models
{
    public class PlayerForTraining
    {
        public int Id { get; set; }
        public bool IsAbsent { get; set; }
        public double Grade { get; set; }
    }
}
