using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.Domain;
using API.Models.DTOs.Difficulties;
using API.Models.DTOs.Regions;

namespace API.Models.DTOs.Trails
{
    public class TrailDto
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public string? ImageUrl { get; set; }
        public double LengthInKm { get; set; }
        public int DurationInMinutes { get; set; }
        public DateTime CreatedAt { get; set; }
        public required string DifficultyId { get; set; }
        public required string RegionId { get; set; }
        public DifficultyDto Difficulty { get; set; } = null!;
        public RegionDto Region { get; set; } = null!;
    }
}