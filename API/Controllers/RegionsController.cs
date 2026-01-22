using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models.Domain;
using API.Models.DTOs.Regions;
using API.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegionsController : ControllerBase
    {

        private readonly IMapper mapper;
        private readonly IRegionsRepository regionsRepository;

        public RegionsController(IMapper mapper, IRegionsRepository regionsRepository)
        {
            this.mapper = mapper;
            this.regionsRepository = regionsRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetRegions()
        {
            var regions = await regionsRepository.GetAllAsync();
            return Ok(mapper.Map<List<RegionDto>>(regions));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRegionById([FromRoute] string id)
        {
            var existingRegion = await regionsRepository.GetByIdAsync(id);

            if (existingRegion == null) return NotFound();

            return Ok(mapper.Map<RegionDto>(existingRegion));
        }

        [HttpPost]
        public async Task<IActionResult> CreateRegion([FromBody] CreateRegionDto dto)
        {
            if (ModelState.IsValid)
            {
                var regionDomain = mapper.Map<Region>(dto);

                await regionsRepository.CreateAsync(regionDomain);

                return Ok(mapper.Map<RegionDto>(regionDomain));
            }

            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRegion([FromBody] UpdateRegionDto dto, [FromRoute] string id)
        {
            if (ModelState.IsValid)
            {
                var regionDomain = mapper.Map<Region>(dto);
                regionDomain = await regionsRepository.UpdateAsync(id, regionDomain);

                if (regionDomain == null) return NotFound();

                return Ok(mapper.Map<RegionDto>(regionDomain));
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegion([FromRoute] string id)
        {
            var deletedRegion = await regionsRepository.DeleteAsync(id);

            if (deletedRegion == null) return NotFound("Invalid Id");

            return NoContent();
        }
    }
}