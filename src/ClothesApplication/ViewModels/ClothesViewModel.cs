using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClothesApplication.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ClothesViewModel
    {
        public int Id { get; set; }
        public int Type { get; set; }
        public string Description { get; set; }
        public string Shop { get; set; }
        public DateTime LastWornDate { get; set; }
        public string LastWornDateString { get; set; }
        public int WornCount { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
    }
}
