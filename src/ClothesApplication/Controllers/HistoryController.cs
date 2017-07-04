   using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ClothesApplication.Data;
using Newtonsoft.Json;
using ClothesApplication.ViewModels;
using ClothesApplication.Data.History;
using Nelibur.ObjectMapper;
using ClothesApplication.Data.ClothesItems;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ClothesApplication.Controllers
{
    [Route("api/[controller]")]
    public class HistoryController : Controller
    {
        private ApplicationDbContext DbContext;
        private const int Tops = 1;
        private const int Trousers = 2;
        private const int Shoes = 3;

        public HistoryController(ApplicationDbContext context)
        {
            DbContext = context;
        }

        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            var items = DbContext.History.OrderByDescending(i => i.HistoryDate);
            return new JsonResult(ToHistoryModelViewList(items), DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpGet("GetFiltered/{itemId}/{categoryId}")]
        public IActionResult GetFiltered(int itemId, int categoryId)
        {
            IQueryable<HistoryItem> items;
            switch (categoryId)
            {
                case Tops:
                    items = DbContext.History.Where(i => i.TopId == itemId).OrderByDescending(i => i.HistoryDate);
                    break;
                case Trousers:
                    items = DbContext.History.Where(i => i.TrousersId == itemId).OrderByDescending(i => i.HistoryDate);
                    break;
                case Shoes:
                    items = DbContext.History.Where(i => i.ShoesId == itemId).OrderByDescending(i => i.HistoryDate);
                    break;
                default:
                    items = null;
                    break;
            }
            return new JsonResult(ToHistoryModelViewList(items), DefaultJsonSettings);
        }


        // POST api/
        [HttpPost()]
        public IActionResult AddLog([FromBody]LogViewModel lvm)
        {
            try { 
            if (lvm != null)
            {
                var item = TinyMapper.Map<HistoryItem>(lvm);
                item.CreatedDate = DateTime.Now;
                item.LastModifiedDate = DateTime.Now;
                DbContext.History.Add(item);
                DbContext.SaveChanges();
                StoreWearDetails(Tops, item.TopId);
                StoreWearDetails(Trousers, item.TrousersId);
                StoreWearDetails(Shoes, item.ShoesId);
                return new JsonResult(TinyMapper.Map<LogViewModel>(item), DefaultJsonSettings);
                    //return new JsonResult(item, DefaultJsonSettings);
                }
            return new StatusCodeResult(500);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return new StatusCodeResult(500);
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = DbContext.History.Where(i => i.Id == id).FirstOrDefault();
            if (item != null)
            {
                DecrementCounts(item);
                return new OkResult();
            }
            return NotFound(new { Error = string.Format("Item Id {0} has not been found", id) });
        }

        private JsonSerializerSettings DefaultJsonSettings
        {
            get
            {
                return new JsonSerializerSettings
                {
                    Formatting = Formatting.Indented
                };
            }
        }

        private List<LogViewModel> ToHistoryModelViewList(IEnumerable<HistoryItem> historyItems)
        {
            var lst = new List<LogViewModel>();
            foreach (var i in historyItems)
            {
                lst.Add(TinyMapper.Map<LogViewModel>(i));
            };

            foreach (var j in lst)
            {
                j.Top = GetText(j.TopId);
                j.Trousers = GetText(j.TrousersId);
                j.Shoes = GetText(j.ShoesId);
            }

            return lst;
        }

        private string GetText(int i)
        {
            var result = DbContext.ClothesItems.Where(x => x.Id == i).FirstOrDefault();
            return result.Description;
        }

        private void StoreWearDetails(int type, int itemId)
        {
            ClothesItem clothesItem = DbContext.ClothesItems.Where(i => i.Type == type && i.Id == itemId).First();
            HistoryItem lastWorn = new HistoryItem();

            switch (type)
            {
                case 1:
                    lastWorn = DbContext.History.Where(j => j.TopId == itemId).OrderByDescending(x => x.HistoryDate).FirstOrDefault();
                    break;
                case 2:
                    lastWorn = DbContext.History.Where(j => j.TrousersId == itemId).OrderByDescending(x => x.HistoryDate).FirstOrDefault();
                    break;
                case 3:
                    lastWorn = DbContext.History.Where(j => j.ShoesId == itemId).OrderByDescending(x => x.HistoryDate).FirstOrDefault();
                    break;
            }

            clothesItem.LastWornDate = lastWorn.HistoryDate != null ? lastWorn.HistoryDate : new DateTime(2000, 1, 1);
            clothesItem.WornCount++;
            clothesItem.LastModifiedDate = DateTime.Now;
            DbContext.Update(clothesItem);
            DbContext.SaveChanges();
        }

        private void DecrementCounts(HistoryItem historyItem)
        {
            DbContext.History.Remove(historyItem);
            DbContext.SaveChanges();

            var top = DbContext.ClothesItems.Where(i => i.Id == historyItem.TopId).FirstOrDefault();
            var lastWornTop = DbContext.History.Where(j => j.TopId == historyItem.TopId).OrderByDescending(x => x.HistoryDate).FirstOrDefault();
            top.WornCount--;
            top.LastWornDate = lastWornTop != null ? lastWornTop.HistoryDate : new DateTime(2000, 1, 1);
            DbContext.Update(top);

            var trousers = DbContext.ClothesItems.Where(i => i.Id == historyItem.TrousersId).FirstOrDefault();
            var lastWornTrousers = DbContext.History.Where(j => j.TrousersId == historyItem.TrousersId).OrderByDescending(x => x.HistoryDate).FirstOrDefault();
            trousers.WornCount--;
            trousers.LastWornDate = lastWornTrousers != null ? lastWornTrousers.HistoryDate : new DateTime(2000, 1, 1);
            DbContext.Update(trousers);

            var shoes = DbContext.ClothesItems.Where(i => i.Id == historyItem.ShoesId).FirstOrDefault();
            var lastWornShoes = DbContext.History.Where(j => j.ShoesId == historyItem.ShoesId).OrderByDescending(x => x.HistoryDate).FirstOrDefault();
            shoes.WornCount--;
            shoes.LastWornDate = lastWornShoes != null ? lastWornShoes.HistoryDate : new DateTime(2000, 1, 1);
            DbContext.Update(shoes);

            DbContext.SaveChanges();

        }
    }
}

