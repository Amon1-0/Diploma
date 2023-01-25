﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Infrastructure.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Position { get; set; }
        public bool IsInjured { get; set; }
        public string Avatar { get; set; }
        public DateTime BirthDate { get; set; }
        public int TeamId { get; set; }
        public Team Team { get; set; }
        public List<Training> Trainings { get; set; }
    }
}
