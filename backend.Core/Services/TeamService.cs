﻿using backend.Core.Interfaces;
using backend.Core.Models;
using backend.Infrastructure.Data;
using backend.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Services
{
    public class TeamService : ITeamService
    {
        private readonly ApplicationContext _context;
        public TeamService(ApplicationContext context)
        {
            _context = context;
        }

        public Task<HttpStatusCode> AddPlayerToTeam(int coachId, PlayerAddRequest playerAdd)
        {
            throw new NotImplementedException();
        }

        public async Task<HttpStatusCode> CreateTeam(TeamRequest team, int coachId)
        {
            var coach = await _context.Coaches.FirstOrDefaultAsync(x => x.Id == coachId);
            _context.Entry(coach).Reference(x => x.Team).Load();
            
            if (coach.Team is not null)
                return HttpStatusCode.Conflict;
            
            Team teamResult = new Team
            {
                Description = team.Description,
                Image = team.Image,
                Name = team.Name,
                CoachId = coachId
            };

            await _context.Teams.AddAsync(teamResult);
            await _context.SaveChangesAsync();
            return HttpStatusCode.OK;
        }

        public async Task<HttpStatusCode> DeleteTeam(int coachId)
        {
            var team = await _context.Teams.FirstOrDefaultAsync(x => x.CoachId == coachId);
            if (team == null)
                return HttpStatusCode.NotFound;

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();
            return HttpStatusCode.OK;
        }

        public async Task<PlayerResponse?> GetPlayer(int coachId, int playerId)
        {
            var team = await _context.Teams.FirstOrDefaultAsync(x => x.CoachId == coachId);
            var isPlayerInTeam = await _context.Players.AnyAsync(x => x.Id == playerId && x.TeamId == team.Id);

            if (team == null || !isPlayerInTeam)
                return null;
            
            var player = await _context.Players
                .FirstOrDefaultAsync(x => x.Id == playerId && x.Team.CoachId == coachId);
            
            if (player == null)
                return null;
            
            _context.Entry(player).Collection(x => x.Trainings).Load();

            return new PlayerResponse
            {
                Id = player.Id,
                LastName = player.LastName,
                FirstName = player.FirstName,
                Position = player.Position,
                IsInjured = player.IsInjured,
                Avatar = player.Avatar,
                PartOfField = ConvertPositionToPartOfField(player.Position),
                Trainings = player.Trainings.Select(x => new TrainingData
                {
                    Id = x.Id,
                    TrainingDate = x.TrainingDate,
                    Description = x.Description,
                    Grade = x.Grade,
                    IsPlayerAbsent = x.IsPlayerAbsent
                }).ToList()
            };

        }

        public async Task<List<PlayerShortResponse>?> GetPlayers(int coachId)
        {
            var team = await _context.Teams.FirstOrDefaultAsync(x => x.CoachId == coachId);
            if (team == null)
                return null;
           
            _context.Entry(team).Collection(x => x.Players).Load();
            
            var players = team.Players.Select(x => new PlayerShortResponse
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Position = x.Position,
                IsInjured = x.IsInjured,
                Avatar = x.Avatar,
                PartOfField = ConvertPositionToPartOfField(x.Position),
                TwoWeeksForm = x.Trainings.Where(x => x.TrainingDate > DateTime.Now.AddDays(-14)).Average(x => x.Grade)
            }).ToList();

            return players;
        }

        private FieldPart ConvertPositionToPartOfField(string position)
        {
            if (position == "GK")
                return FieldPart.Goalkeeper;
            else if (position == "CB" || position == "LB" || position == "RB" || position == "LWB" || position == "RWB")
                return FieldPart.Defender;
            else if (position == "CM" || position == "CDM" || position == "LM" || position == "RM" || position == "CAM")
                return FieldPart.Midfielder;
            else
                return FieldPart.Forward;        
        }

        public async Task<TeamResponse?> GetTeam(int coachId)
        {
            var team = await _context.Teams.FirstOrDefaultAsync(x => x.CoachId == coachId);
            if (team == null)
                return null;

            return new TeamResponse { 
                Description = team.Description,
                Id = team.Id,
                Image = team.Image,
                Name = team.Name 
            };
        }

        public Task<HttpStatusCode> RemovePlayerFromTeam(int coachId, int playerId)
        {
            throw new NotImplementedException();
        }

        public Task<HttpStatusCode> UpdatePlayer(int coachId, PlayerUpdateRequest playerUpdate)
        {
            throw new NotImplementedException();
        }

        public async Task<HttpStatusCode> UpdateTeam(TeamUpdateRequest teamUpdate, int coachId)
        {
            var team = await _context.Teams.FirstOrDefaultAsync(x => x.CoachId == coachId);
            if (team == null)
                return HttpStatusCode.NotFound;

            team.Description = teamUpdate.Description;
            team.Image = teamUpdate.Image;
            team.Name = teamUpdate.Name;

            _context.Teams.Update(team);
            await _context.SaveChangesAsync();
            return HttpStatusCode.OK;
        }
    }
}
