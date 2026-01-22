using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.Domain;

namespace API.Repositories
{
    public interface IRegionsRepository
    {
        Task<List<Region>> GetAllAsync();
        Task<Region> CreateAsync(Region region);
        Task<Region?> GetByIdAsync(string id);
        Task<Region?> UpdateAsync(string id, Region region);
        Task<Region?> DeleteAsync(string id);
    }
}