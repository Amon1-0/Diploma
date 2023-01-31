using backend.Core.Interfaces;
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

        public async Task<HttpStatusCode> AddPlayerToTeam(int coachId, PlayerAddRequest playerAdd)
        {
            var coach = await _context.Coaches.Include(c => c.Team).FirstOrDefaultAsync(c => c.Id == coachId);

            if (coach == null)
                return HttpStatusCode.NotFound;

            var player = new Player
            {
                FirstName = playerAdd.FirstName,
                LastName = playerAdd.LastName,
                Position = playerAdd.Position,
                IsInjured = playerAdd.IsInjured,
                Avatar = playerAdd.Avatar,
                Team = coach.Team,
                TeamId = coach.Team.Id,
            };

            await _context.Players.AddAsync(player);
            await _context.SaveChangesAsync();
            return HttpStatusCode.OK;
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
                BirthDate = player.BirthDate,
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
            var team = await _context.Teams.Include(x => x.Players).ThenInclude(x => x.Trainings).FirstOrDefaultAsync(x => x.CoachId == coachId);
            if (team == null)
                return null;
           
            var players = team.Players.Select(x => new PlayerShortResponse
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Position = x.Position,
                IsInjured = x.IsInjured,
                Avatar = x.Avatar,
                PartOfField = ConvertPositionToPartOfField(x.Position),
                TwoWeeksForm = GetTwoWeeksForm(x.Trainings)
            }).ToList();

            return players;
        }

        private double? GetTwoWeeksForm(List<Training> trainings)
        {
            if (trainings.Count == 0)
                return null;
            
            var trainingsTwoWeeks = trainings.Where(x => x.TrainingDate > DateTime.Now.AddDays(-14)).ToList();

            if (trainingsTwoWeeks.Count == 0)
                return null;

            return trainingsTwoWeeks.Average(x => x.Grade);
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

        public async Task<HttpStatusCode> RemovePlayerFromTeam(int coachId, int playerId)
        {
            var player = await _context.Players.FirstOrDefaultAsync(x => x.Id == playerId && x.Team.CoachId == coachId);
            if (player == null)
                return HttpStatusCode.NotFound;

            _context.Players.Remove(player);
            await _context.SaveChangesAsync();
            return HttpStatusCode.OK;
        }

        public async Task<HttpStatusCode> UpdatePlayer(int coachId, PlayerUpdateRequest playerUpdate)
        {
            var player = await _context.Players.FirstOrDefaultAsync(x => x.Id == playerUpdate.Id && x.Team.CoachId == coachId);
            if (player == null)
                return HttpStatusCode.NotFound;

            player.FirstName = playerUpdate.FirstName;
            player.LastName = playerUpdate.LastName;
            player.Position = playerUpdate.Position;
            player.IsInjured = playerUpdate.IsInjured;
            player.Avatar = playerUpdate.Avatar;

            await _context.SaveChangesAsync();
            return HttpStatusCode.OK;
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
