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
    }
}