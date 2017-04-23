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

        // POST api/
        [HttpPost()]
        public IActionResult AddLog([FromBody]LogViewModel lvm)
        {
            if (lvm != null)
            {
                var item = TinyMapper.Map<HistoryItem>(lvm);
                item.CreatedDate = DateTime.Now;
                item.LastModifiedDate = DateTime.Now;
                DbContext.History.Add(item);
                DbContext.SaveChanges();
                StoreWearDetails(Tops, item.TopId, lvm.HistoryDate);
                StoreWearDetails(Trousers, item.TrousersId, lvm.HistoryDate);
                StoreWearDetails(Shoes, item.ShoesId, lvm.HistoryDate);
                return new JsonResult(TinyMapper.Map<HistoryItem>(item), DefaultJsonSettings);
            }
            return new StatusCodeResult(500);
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
                DbContext.History.Remove(item);
                DbContext.SaveChanges();
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

        private void StoreWearDetails(int type, int itemId, DateTime historyDate)
        {
            ClothesItem clothesItem = DbContext.ClothesItems.Where(i => i.Type == type && i.Id == itemId).First();
            clothesItem.LastWornDate = historyDate;
            clothesItem.WornCount++;
            clothesItem.LastModifiedDate = DateTime.Now;
            DbContext.Update(clothesItem);
            DbContext.SaveChanges();
        }
    }
}

