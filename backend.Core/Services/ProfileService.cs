﻿using backend.Core.Interfaces;
using backend.Core.Models;
using backend.Infrastructure.Data;
using backend.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using PureConnectBackend.Core.Extentions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Services
{
    public class ProfileService : IProfileService
    {
        private readonly ApplicationContext _context;
        public ProfileService(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<Coach> Login(LoginRequest loginRequest)
        {
            var passwordHash = loginRequest.Password.ConvertPasswordToHash();
            Coach? coach = await _context.Coaches.FirstOrDefaultAsync(x => x.Login == loginRequest.Login && x.Password == passwordHash);
            return coach;
        }

        public async Task<HttpStatusCode> Register(CoachRegisterRequest profile)
        {
            var isEmailExists = await IsEmailExists(profile.Login);
            if (isEmailExists)
                return HttpStatusCode.Conflict;
            Coach user = ConvertRegisterToCoach(profile);
            AddCoachToDb(user);
            return HttpStatusCode.Created;
        }

        private void AddCoachToDb(Coach user)
        {
             _context.Coaches.Add(user);
             _context.SaveChanges();
        }


        private async Task<bool> IsEmailExists(string login)
        {
            Coach? user = await _context.Coaches.FirstOrDefaultAsync(x => x.Login == login);
            return user != null;
        }

        private Coach ConvertRegisterToCoach(CoachRegisterRequest registerUser)
        {
            Coach user = new Coach
            {
                FirstName = registerUser.FirstName,
                LastName = registerUser.LastName,
                Avatar = registerUser.Avatar,
                BirthDate = registerUser.BirthDate,
                Login = registerUser.Login,
            };

            user.Password = registerUser.Password.ConvertPasswordToHash();
            return user;
        }
    }
}
