using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models.Domain;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class SQLRegionsRepository : IRegionsRepository
    {
        private readonly HikingContext context;

        public SQLRegionsRepository(HikingContext context)
        {
            this.context = context;
        }

        public async Task<Region> CreateAsync(Region region)
        {
            await context.Regions.AddAsync(region);
            await context.SaveChangesAsync();
            return region;
        }

        public async Task<Region?> DeleteAsync(string id)
        {
            var existingRegion = await context.Regions.FirstOrDefaultAsync(x => x.Id == id);

            if (existingRegion == null) return null;

            context.Regions.Remove(existingRegion);
            await context.SaveChangesAsync();

            return existingRegion;
        }

        public async Task<List<Region>> GetAllAsync()
        {
            return await context.Regions.ToListAsync();
        }

        public async Task<Region?> GetByIdAsync(string id)
        {
            var existingRegion = await context.Regions.FirstOrDefaultAsync(x => x.Id == id);
            if (existingRegion == null) return null;
            return existingRegion;
        }

        public async Task<Region?> UpdateAsync(string id, Region region)
        {
            var existingRegion = await context.Regions.FirstOrDefaultAsync(x => x.Id == id);

            if (existingRegion == null) return null;

            existingRegion.Code = region.Code;
            existingRegion.Name = region.Name;
            existingRegion.ImageUrl = region.ImageUrl;

            await context.SaveChangesAsync();
            return existingRegion;
        }
    }
}