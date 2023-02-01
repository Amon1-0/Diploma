using backend.Core.Interfaces;
using backend.Core.Models;
using backend.Infrastructure.Data;
using backend.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Services
{
    public class TrainingService : ITrainingService
    {
        private readonly ApplicationContext _context;
        public TrainingService(ApplicationContext context)
        {
            _context = context;
        }
        
        public async Task<HttpStatusCode> AddTraining(TrainingCreateRequest training, int coachId)
        {
            foreach (var playerTraining in training.PlayersForTraining)
            {
                if (!playerTraining.IsAbsent)
                {
                    var trainingModel = new Training
                    {
                        TrainingDate = training.TrainingDate,
                        IsPlayerAbsent = playerTraining.IsAbsent,
                        Description = training.Description,
                        Grade = playerTraining.Grade,
                        PlayerId = playerTraining.Id,
                    };
                    await _context.Trainings.AddAsync(trainingModel);
                }

            }
            _context.SaveChanges();
            return HttpStatusCode.OK;
        }
    }
}
