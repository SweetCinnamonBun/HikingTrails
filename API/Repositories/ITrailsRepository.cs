using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.Domain;

namespace API.Repositories
{
    public interface ITrailsRepository
    {
        Task<Trail> CreateAsync(Trail trail);
        Task<List<Trail>> GetAllAsync(string? filterOn = null, string? filterQuery = null,
         List<string>? difficulties = null, double? minKm = null, double? maxKm = null, int? minDuration = null,
         int? maxDuration = null,
        string? sortBy = null, bool isAscending = true, int page = 1, int pageSize = 50);
        Task<Trail?> GetByIdAsync(string id);
        Task<Trail?> UpdateAsync(string id, Trail trail);
        Task<Trail?> DeleteAsync(string id);
    }
}