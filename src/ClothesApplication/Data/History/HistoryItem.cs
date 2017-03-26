using ClothesApplication.Data.ClothesItems;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClothesApplication.Data.History
{
    public class HistoryItem
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public DateTime HistoryDate { get; set; }
        [Required]
        [ForeignKey("ClothesItemId")]
        public int TopId { get; set; }
        [Required]
        [ForeignKey("ClothesItemId")]
        public int TrousersId { get; set; }
        [Required]
        [ForeignKey("ClothesItemId")]
        public int ShoesId { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }

        [ForeignKey("TopId")]
        public virtual ClothesItem Top { get; set; }
        [ForeignKey("TrousersId")]
        public virtual ClothesItem Trousers { get; set; }
        [ForeignKey("ShoesId")]
        public virtual ClothesItem Shoes { get; set; }
        
    }

    
}

