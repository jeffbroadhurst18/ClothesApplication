using Newtonsoft.Json;
using System;

namespace ClothesApplication.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class LogViewModel
    {
        public int Id { get; set; }
        public DateTime HistoryDate { get; set; }
        public int TopId { get; set; }
        public int TrousersId { get; set; }
        public int ShoesId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
    }
}
