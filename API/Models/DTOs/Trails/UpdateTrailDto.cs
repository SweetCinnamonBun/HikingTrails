using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.DTOs.Trails
{
    public class UpdateTrailDto
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public string? ImageUrl { get; set; }
        public double LengthInKm { get; set; }
        public int DurationInMinutes { get; set; }
        public required string DifficultyId { get; set; }
        public required string RegionId { get; set; }
    }
}