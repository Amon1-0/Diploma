using backend.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Interfaces
{
    public interface ITrainingService
    {
        Task<HttpStatusCode> AddTraining(TrainingCreateRequest training, int coachId);
    }
}
