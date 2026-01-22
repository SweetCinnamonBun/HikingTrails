using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.Domain;
using Azure.Storage.Blobs.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class HikingContext : DbContext
    {
        public HikingContext(DbContextOptions<HikingContext> options) : base(options)
        {

        }

        public DbSet<Difficulty> Difficulties { get; set; }

        public DbSet<Trail> Trails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            var difficulties = new List<Difficulty>()
            {
                new Difficulty()
                {
                    Id = "2a755f9c-9ee0-4865-b6fa-348bfa1959ba",
                    Name = "Easy"
                },
                new Difficulty()
                {
                    Id = "72b0281e-31ec-4c8f-a4ea-337a4b9a4a64",
                    Name = "Medium"
                },
                new Difficulty()
                {
                    Id = "7d633f68-0acf-482e-a1a3-7eb03689ec2f",
                    Name = "Hard"
                }
            };

            modelBuilder.Entity<Difficulty>().HasData(difficulties);

            var regions = new List<Region>()

            {
                  new Region
                {
                    Id = "f7248fc3-2585-4efb-8d1d-1c555f4087f6",
                    Name = "Auckland",
                    Code = "AKL",
                    ImageUrl = "https://images.pexels.com/photos/5169056/pexels-photo-5169056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                },
                new Region
                {
                    Id = "6884f7d7-ad1f-4101-8df3-7a6fa7387d81",
                    Name = "Northland",
                    Code = "NTL",
                    ImageUrl = null
                },
                new Region
                {
                    Id = "14ceba71-4b51-4777-9b17-46602cf66153",
                    Name = "Bay Of Plenty",
                    Code = "BOP",
                    ImageUrl = null
                },
                new Region
                {
                    Id = "cfa06ed2-bf65-4b65-93ed-c9d286ddb0de",
                    Name = "Wellington",
                    Code = "WGN",
                    ImageUrl = "https://images.pexels.com/photos/4350631/pexels-photo-4350631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                },
                new Region
                {
                    Id = "906cb139-415a-4bbb-a174-1a1faf9fb1f6",
                    Name = "Nelson",
                    Code = "NSN",
                    ImageUrl = "https://images.pexels.com/photos/13918194/pexels-photo-13918194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                },
                new Region
                {
                    Id = "f077a22e-4248-4bf6-b564-c7cf4e250263",
                    Name = "Southland",
                    Code = "STL",
                    ImageUrl = null
                },


            };

            modelBuilder.Entity<Region>().HasData(regions);
        }

    }
}