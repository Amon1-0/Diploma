using backend.Core.Interfaces;
using backend.Core.Models;
using backend.Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingController : ControllerBase
    {
        private readonly ITrainingService _trainingService;

        public TrainingController(ITrainingService trainingService)
        {
            _trainingService = trainingService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateTraining(TrainingCreateRequest training)
        {
            var userFromJwt = GetCurrentUser();
            var codeResult = await _trainingService.AddTraining(training, userFromJwt.Id);
            if (codeResult == HttpStatusCode.BadRequest)
                return Conflict("Players was not valid");

            return Ok("Training is created");
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
