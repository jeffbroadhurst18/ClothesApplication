using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClothesApplication.Data.History;
using ClothesApplication.Data.ClothesItems;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ClothesApplication.Data
{
    public class ApplicationDbContext :DbContext
    {

        #region Constructor
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        #endregion Constructor

        #region Methods
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ClothesItem>().ToTable("ClothesItems");
            modelBuilder.Entity<ClothesItem>().Property(i => i.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<HistoryItem>().ToTable("HistoryItems");
            modelBuilder.Entity<HistoryItem>().Property(i => i.Id).ValueGeneratedOnAdd();
           
        }
        #endregion Methods

        #region Properties
        public DbSet<ClothesItem> ClothesItems { get; set; }
        public DbSet<HistoryItem> History { get; set; }
        //public DbSet<ApplicationUser> Users { get; set; }
        #endregion Properties
    }
}
