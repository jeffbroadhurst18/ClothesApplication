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

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ClothesApplication.Controllers
{
    [Route("api/[controller]")]
    public class HistoryController : Controller
    {
        private ApplicationDbContext DbContext;

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

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
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
    }
}

