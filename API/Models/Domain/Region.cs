using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Domain
{
    public class Region
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string Code { get; set; }
        public required string Name { get; set; }
        public string? ImageUrl { get; set; }
    }
}