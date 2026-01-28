using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models.DTOs.Images;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : ControllerBase
    {
        private readonly HikingContext context;
        private readonly AzureBlobStorageService blobStorageService;

        public ImagesController(HikingContext context, AzureBlobStorageService blobStorageService)
        {
            this.context = context;
            this.blobStorageService = blobStorageService;
        }


        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(ImageDto file)
        {
            if (file == null || file.ImageFile?.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.ImageFile?.FileName)}";


            using (var stream = file.ImageFile?.OpenReadStream())
            {
                var imageUrl = await blobStorageService.UploadFileAsync(stream, fileName);
                return Ok(new { ImageUrl = imageUrl });
            }
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteImage([FromQuery] string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
            {
                return BadRequest("File name is required.");
            }

            await blobStorageService.DeleteFileAsync(fileName);
            return NoContent();
        }

        [HttpDelete("delete-multiple")]
        public async Task<IActionResult> DeleteImages([FromBody] List<string> images)
        {
            if (images == null || !images.Any())
            {
                return BadRequest("At least one image filename is required.");
            }

            var failedDeletes = new List<string>();

            foreach (var image in images)
            {
                try
                {
                    await blobStorageService.DeleteFileAsync(image);
                }
                catch (Exception ex)
                {

                    Console.WriteLine($"Failed to delete image {image}: {ex.Message}");
                    failedDeletes.Add(image);
                }
            }

            if (failedDeletes.Count > 0)
            {
                return StatusCode(207, new
                {
                    Message = "Some images could not be deleted.",
                    FailedImages = failedDeletes
                });
            }

            return NoContent();
        }
    }
}