using backend.Core.Interfaces;
using backend.Core.Models;
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
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;
        private IConfiguration _config;

        public ProfileController(IProfileService profileService, IConfiguration config)
        {
            _profileService = profileService;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var response = await _profileService.Login(loginRequest);
            if (response is not null)
            {
                var token = UserExtentions.GenerateTokenFromUser(response, _config["Jwt:Key"], _config["Jwt:Issuer"], _config["Jwt:Audience"]);
                LoginResponse loginResponse = new LoginResponse() { Token = token };
                return Ok(loginResponse);
            }
            return NotFound();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(CoachRegisterRequest profile)
        {
            var codeResult = await _profileService.Register(profile);
            if (codeResult == HttpStatusCode.Conflict)
                return Conflict("Email is used");

            return Ok("Account is created");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<ProfileResponse>> GetProfile()
        {
            var userFromJwt = GetCurrentUser();
            var response = await _profileService.GetProfile(userFromJwt.Id);
            if (response is not null)
                return Ok(response);

            return NotFound();
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> ChangeProfile(CoachPutRequest coachNewData)
        {
            var userFromJwt = GetCurrentUser();
            var codeResult = await _profileService.ChangeProfile(coachNewData, userFromJwt.Id);
            if (codeResult == HttpStatusCode.NotFound)
                return NotFound();
            return Ok("Profile is changed");
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