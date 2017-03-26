using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ClothesApplication.Data.ClothesItems
{
    public class ClothesItem
    {
        public ClothesItem()
        { }

        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public int Type { get; set; }
        [Required]
        public string Description { get; set; }
        public string Shop { get; set; }
        public DateTime LastWornDate { get; set; }
        public string LastWornDateString { get; set; }
        [Required]
        public int WornCount { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }
    }
}



