using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.Domain;
using API.Models.DTOs.Difficulties;
using API.Models.DTOs.Regions;
using API.Models.DTOs.Trails;
using AutoMapper;

namespace API.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Trail, TrailDto>().ReverseMap();
            CreateMap<Trail, CreateTrailDto>().ReverseMap();
            CreateMap<Trail, UpdateTrailDto>().ReverseMap();

            CreateMap<Difficulty, DifficultyDto>().ReverseMap();
            CreateMap<Region, RegionDto>().ReverseMap();
        }
    }
}