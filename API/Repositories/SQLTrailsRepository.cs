using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class SQLTrailsRepository : ITrailsRepository
    {
        private readonly HikingContext context;

        public SQLTrailsRepository(HikingContext context)
        {
            this.context = context;
        }
        public async Task<Trail> CreateAsync(Trail trail)
        {
            await context.Trails.AddAsync(trail);
            await context.SaveChangesAsync();
            return trail;
        }

        public async Task<Trail?> DeleteAsync(string id)
        {
            var existingTrail = await context.Trails.FirstOrDefaultAsync(x => x.Id == id);

            if (existingTrail == null) return null;

            context.Trails.Remove(existingTrail);
            await context.SaveChangesAsync();
            return existingTrail;
        }

        public async Task<List<Trail>> GetAllAsync(string? filterOn = null, string? filterQuery = null, string? sortBy = null, bool isAscending = true, int page = 1, int pageSize = 50)
        {
            var trails = context.Trails.AsQueryable();

            if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
            {
                if (filterOn.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    trails = trails.Where(x => x.Name.Contains(filterQuery));
                }
            }

            if (string.IsNullOrWhiteSpace(sortBy) == false)
            {
                if (sortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    trails = isAscending ? trails.OrderBy(x => x.Name) : trails.OrderByDescending(x => x.Name);
                }
                else if (sortBy.Equals("Length", StringComparison.OrdinalIgnoreCase))
                {
                    trails = isAscending ? trails.OrderBy(x => x.LengthInKm) : trails.OrderByDescending(x => x.LengthInKm);
                }
            }

            var skipResults = (page - 1) * pageSize;

            return await trails.Skip(skipResults).Take(pageSize).ToListAsync();

        }

        public Task<Trail?> GetByIdAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<Trail?> UpdateAsync(string id, Trail trail)
        {
            throw new NotImplementedException();
        }
    }
}