using backend.Core.Models;
using backend.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Interfaces
{
    public interface ITeamService
    {
        Task<TeamResponse?> GetTeam(int coachId);
        Task<HttpStatusCode> CreateTeam(TeamRequest team, int coachId);
        Task<HttpStatusCode> DeleteTeam(int coachId);
    }
}
