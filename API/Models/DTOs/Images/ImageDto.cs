using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.DTOs.Images
{
    public class ImageDto
    {
        public IFormFile? ImageFile { get; set; }
    }
}