using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.DTOs.Trails;

namespace API.Models.DTOs.Difficulties
{
    public class DifficultyDto
    {
        public required string Id { get; set; }
        public required string Name { get; set; }

        //Navigation properties
        public List<TrailDto> Trails = [];
    }
}