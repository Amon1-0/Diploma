using backend.Core.Interfaces;
using backend.Core.Models;
using backend.Core.Services;
using backend.Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PureConnectBackend.Core.Extentions;
using System.Net;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;
        private IConfiguration _config;

        public TeamController(ITeamService teamService, IConfiguration config)
        {
            _teamService = teamService;
            _config = config;
        }

        [Authorize]
        [HttpGet("team")]
        public async Task<ActionResult<TeamResponse>> GetTeam()
        {
            var userFromJwt = GetCurrentUser();
            var response = await _teamService.GetTeam(userFromJwt.Id);
            if (response is not null)
                return Ok(response);
            
            return NotFound();
        }

        [Authorize]
        [HttpPost("team")]
        public async Task<IActionResult> CreateTeam(TeamRequest team)
        {
            var userFromJwt = GetCurrentUser();
            var codeResult = await _teamService.CreateTeam(team, userFromJwt.Id);
            if (codeResult == HttpStatusCode.Conflict)
                return Conflict("Team is used");

            return Ok("Team is created");
        }

        [Authorize]
        [HttpDelete("team")]
        public async Task<IActionResult> DeleteTeam(int coachId)
        {
            var userFromJwt = GetCurrentUser();
            var codeResult = await _teamService.DeleteTeam(userFromJwt.Id);
            if (codeResult == HttpStatusCode.Conflict)
                return Conflict("Team is used");

            return Ok("Team is deleted");
        }

        [Authorize]
        [HttpPut("team")]
        public async Task<IActionResult> UpdateTeam(TeamUpdateRequest teamUpdate)
        {
            var userFromJwt = GetCurrentUser();
            var codeResult = await _teamService.UpdateTeam(teamUpdate, userFromJwt.Id);
            if (codeResult == HttpStatusCode.NotFound)
                return NotFound();

            return Ok("Team is updated");
        }

        [Authorize]
        [HttpPost("player")]
        public async Task<IActionResult> AddPlayerToTeam(PlayerAddRequest playerAdd)
        {
            var userFromJwt = GetCurrentUser();
            var codeResult = await _teamService.AddPlayerToTeam(userFromJwt.Id, playerAdd);
            if (codeResult == HttpStatusCode.NotFound)
                return NotFound();

            return Ok("Player is added");
        }

        [Authorize]
        [HttpDelete("player")]
        public async Task<IActionResult> DeletePlayerFromTeam(int playerId)
        {
            var userFromJwt = GetCurrentUser();
            var codeResult = await _teamService.RemovePlayerFromTeam(userFromJwt.Id, playerId);
            if (codeResult == HttpStatusCode.NotFound)
                return NotFound();

            return Ok("Player is deleted");
        }

        [Authorize]
        [HttpPut("player")]
        public async Task<IActionResult> UpdatePlayer(PlayerUpdateRequest playerUpdate)
        {
            var userFromJwt = GetCurrentUser();
            var codeResult = await _teamService.UpdatePlayer(userFromJwt.Id, playerUpdate);
            if (codeResult == HttpStatusCode.NotFound)
                return NotFound();

            return Ok("Player is updated");
        }

        [Authorize]
        [HttpGet("players")]
        public async Task<ActionResult<List<PlayerShortResponse>>> GetPlayers()
        {
            var userFromJwt = GetCurrentUser();
            var response = await _teamService.GetPlayers(userFromJwt.Id);
            if (response is not null)
                return Ok(response);

            return NotFound();
        }

        [Authorize]
        [HttpGet("player/{id}")]
        public async Task<ActionResult<PlayerResponse>> GetPlayer([FromQuery]int playerId)
        {
            var userFromJwt = GetCurrentUser();
            var response = await _teamService.GetPlayer(userFromJwt.Id, playerId);
            if (response is not null)
                return Ok(response);

            return NotFound();
        }
        /// <summary>
        /// Gets current user by authorizing jwt token.
        /// </summary>
        /// <returns></returns>
        private Coach? GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity is not null)
            {
                var userClaims = identity.Claims;

                return new Coach
                {
                    Login = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                    FirstName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.GivenName)?.Value,
                    LastName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Surname)?.Value,
                    Id = Convert.ToInt32(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Sid)?.Value),
                };
            }
            return null;
        }
    }
}