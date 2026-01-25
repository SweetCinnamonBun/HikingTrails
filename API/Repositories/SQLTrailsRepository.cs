using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
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

        public async Task<List<Trail>> GetAllAsync(string? filterOn = null,
         string? filterQuery = null, List<string>? difficulties = null,
          double? minKm = null,
          double? maxKm = null,
          int? minDuration = null,
          int? maxDuration = null,
         string? sortBy = null, bool isAscending = true, int page = 1, int pageSize = 50)
        {
            var trails = context.Trails.Include("Difficulty").Include("Region").AsQueryable();

            if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
            {
                if (filterOn.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    trails = trails.Where(x => x.Name.Contains(filterQuery));
                }
            }

            // Difficulty filtering
            if (difficulties != null && difficulties.Count != 0)
            {
                trails = trails.Where(t => difficulties.Contains(t.Difficulty.Name));
            }

            if (minDuration.HasValue)
            {
                trails = trails.Where(x => x.DurationInMinutes >= minDuration.Value);
            }

            if (maxDuration.HasValue)
            {
                trails = trails.Where(x => x.DurationInMinutes <= maxDuration.Value);
            }

            // Kilometer filtering
            if (minKm.HasValue)
            {
                trails = trails.Where(t => t.LengthInKm >= minKm.Value);
            }

            if (maxKm.HasValue)
            {
                trails = trails.Where(t => t.LengthInKm <= maxKm.Value);
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


        public async Task<Trail?> GetByIdAsync(string id)
        {
            var existingTrail = await context.Trails.Include("Difficulty").FirstOrDefaultAsync(x => x.Id == id);
            if (existingTrail == null) return null;

            return existingTrail;
        }

        public async Task<Trail?> UpdateAsync(string id, Trail trail)
        {
            var existingTrail = await context.Trails.FirstOrDefaultAsync(x => x.Id == id);

            if (existingTrail == null)
            {
                return null;
            }

            existingTrail.Name = trail.Name;
            existingTrail.Description = trail.Description;
            existingTrail.LengthInKm = trail.LengthInKm;
            existingTrail.ImageUrl = trail.ImageUrl;
            existingTrail.DurationInMinutes = trail.DurationInMinutes;
            existingTrail.DifficultyId = trail.DifficultyId;
            existingTrail.RegionId = trail.RegionId;

            await context.SaveChangesAsync();
            return existingTrail;
        }
    }
}