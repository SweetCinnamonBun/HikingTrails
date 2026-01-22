using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Domain
{
    public class Trail
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string Name { get; set; }
        public required string Description { get; set; }
        public string? ImageUrl { get; set; }
        public double LengthInKm { get; set; }
        public int DurationInMinutes { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public required string DifficultyId { get; set; }
        public required string RegionId { get; set; }

        // Navigation properties
        public Difficulty Difficulty { get; set; } = null!;
        public Region Region { get; set; } = null!;



    }
}