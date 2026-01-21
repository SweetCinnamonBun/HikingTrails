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

        public double LengthInKm { get; set; }

        public required string DifficultyId { get; set; }



    }
}