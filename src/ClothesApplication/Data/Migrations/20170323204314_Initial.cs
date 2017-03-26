using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ClothesApplication.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClothesItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    LastModifiedDate = table.Column<DateTime>(nullable: false),
                    LastWornDate = table.Column<DateTime>(nullable: false),
                    LastWornDateString = table.Column<string>(nullable: true),
                    Shop = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: false),
                    WornCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClothesItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HistoryItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    HistoryDate = table.Column<DateTime>(nullable: false),
                    LastModifiedDate = table.Column<DateTime>(nullable: false),
                    ShoesId = table.Column<int>(nullable: false),
                    TopId = table.Column<int>(nullable: false),
                    TrousersId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoryItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HistoryItems_ClothesItems_ShoesId",
                        column: x => x.ShoesId,
                        principalTable: "ClothesItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HistoryItems_ClothesItems_TopId",
                        column: x => x.TopId,
                        principalTable: "ClothesItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HistoryItems_ClothesItems_TrousersId",
                        column: x => x.TrousersId,
                        principalTable: "ClothesItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HistoryItems_ShoesId",
                table: "HistoryItems",
                column: "ShoesId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoryItems_TopId",
                table: "HistoryItems",
                column: "TopId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoryItems_TrousersId",
                table: "HistoryItems",
                column: "TrousersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HistoryItems");

            migrationBuilder.DropTable(
                name: "ClothesItems");
        }
    }
}
