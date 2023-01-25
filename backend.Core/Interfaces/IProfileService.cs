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
    public interface IProfileService
    {
        Task<Coach> Login(LoginRequest loginRequest);
        Task<HttpStatusCode> Register(CoachRegisterRequest profile);
    }
}
