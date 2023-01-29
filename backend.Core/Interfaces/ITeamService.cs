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
        Task<HttpStatusCode> UpdateTeam(TeamUpdateRequest teamUpdate, int coachId);
        Task<HttpStatusCode> AddPlayerToTeam(int coachId, PlayerAddRequest playerAdd);
        Task<HttpStatusCode> RemovePlayerFromTeam(int coachId, int playerId);
        Task<HttpStatusCode> UpdatePlayer(int coachId, PlayerUpdateRequest playerUpdate);
        Task<List<PlayerShortResponse>> GetPlayers(int coachId);
        Task<PlayerResponse?> GetPlayer(int coachId, int playerId);
    }
}
