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



    }
}