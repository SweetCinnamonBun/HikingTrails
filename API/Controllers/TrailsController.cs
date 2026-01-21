using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.Domain;
using API.Models.DTOs.Trails;
using API.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrailsController : ControllerBase
    {
        private readonly ITrailsRepository trailsRepository;
        private readonly IMapper mapper;

        public TrailsController(ITrailsRepository trailsRepository, IMapper mapper)
        {
            this.trailsRepository = trailsRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetTrails([FromQuery] string? filterOn, [FromQuery] string? filterQuery, [FromQuery] string? sortBy,
            [FromQuery] bool isAscending, [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
        {
            var trails = await trailsRepository.GetAllAsync(filterOn, filterQuery, sortBy, isAscending, page, pageSize);
            return Ok(mapper.Map<List<TrailDto>>(trails));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTrailDto dto)
        {
            if (ModelState.IsValid)
            {
                var trailDomain = mapper.Map<Trail>(dto);

                await trailsRepository.CreateAsync(trailDomain);

                return Ok(mapper.Map<TrailDto>(trailDomain));
            }

            return BadRequest(ModelState);
        }

    }
}