﻿using backend.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Models
{
    public class TeamRequest
    {
        public string Name { get; set; }
        public string? Image { get; set; }
        public string Description { get; set; }
    }
}
