using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.DTOs.Trails;

namespace API.Models.DTOs.Regions
{
    public class RegionDto
    {
        public required string Id { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public string? ImageUrl { get; set; }

        // Navigation properties
        public List<TrailDto> Trails = [];
    }
}