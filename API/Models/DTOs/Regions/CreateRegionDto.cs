using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.DTOs.Regions
{
    public class CreateRegionDto
    {

        public required string Code { get; set; }
        public required string Name { get; set; }
        public string? ImageUrl { get; set; }
    }
}