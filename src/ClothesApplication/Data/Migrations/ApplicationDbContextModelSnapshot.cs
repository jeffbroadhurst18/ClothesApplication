using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ClothesApplication.Data;

namespace ClothesApplication.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ClothesApplication.Data.ClothesItems.ClothesItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<DateTime>("LastModifiedDate");

                    b.Property<DateTime>("LastWornDate");

                    b.Property<string>("LastWornDateString");

                    b.Property<string>("Shop");

                    b.Property<int>("Type");

                    b.Property<int>("WornCount");

                    b.HasKey("Id");

                    b.ToTable("ClothesItems");
                });

            modelBuilder.Entity("ClothesApplication.Data.History.HistoryItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<DateTime>("HistoryDate");

                    b.Property<DateTime>("LastModifiedDate");

                    b.Property<int>("ShoesId");

                    b.Property<int>("TopId");

                    b.Property<int>("TrousersId");

                    b.HasKey("Id");

                    b.HasIndex("ShoesId");

                    b.HasIndex("TopId");

                    b.HasIndex("TrousersId");

                    b.ToTable("HistoryItems");
                });

            modelBuilder.Entity("ClothesApplication.Data.History.HistoryItem", b =>
                {
                    b.HasOne("ClothesApplication.Data.ClothesItems.ClothesItem", "Shoes")
                        .WithMany()
                        .HasForeignKey("ShoesId");

                    b.HasOne("ClothesApplication.Data.ClothesItems.ClothesItem", "Top")
                        .WithMany()
                        .HasForeignKey("TopId");

                    b.HasOne("ClothesApplication.Data.ClothesItems.ClothesItem", "Trousers")
                        .WithMany()
                        .HasForeignKey("TrousersId");
                });
        }
    }
}
