using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClothesApplication.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class HistoryViewModel
    {
        public int id { get; set; }
        public DateTime HistoryDate { get; set; }
        public int TopId { get; set; }
        public int TrousersId { get; set; }
        public int ShoesId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
    }
}
