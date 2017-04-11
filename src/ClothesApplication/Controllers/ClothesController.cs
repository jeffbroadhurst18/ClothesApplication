﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ClothesApplication.ViewModels;
using Newtonsoft.Json;
using ClothesApplication.Data;
using ClothesApplication.Data.ClothesItems;
using Nelibur.ObjectMapper;
using ClothesApplication.Data.History;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ClothesApplication.Controllers
{
    [Route("api/[controller]")]
    public class ClothesController : Controller
    {
        private ApplicationDbContext DbContext;
        private const int Tops = 1;
        private const int Trousers = 2;
        private const int Shoes = 3;


        public ClothesController(ApplicationDbContext context)
        {
            DbContext = context;
        }

        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            var items = DbContext.ClothesItems.OrderByDescending(i => i.Id).ToArray();
            return new JsonResult(ToClothesItemModelViewList(items), DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = DbContext.ClothesItems.Where(i => i.Id == id).FirstOrDefault();
            if (item != null)
            {
                return new JsonResult(TinyMapper.Map<ClothesViewModel>(item), DefaultJsonSettings);
            }
            return NotFound(new { Error = string.Format("Item ID {0} has not been found", id) });
        }

        // GET api/values/5
        [HttpGet("GetType/{num}")]
        public IActionResult GetType(int num)
        {
            var items = DbContext.ClothesItems.Where(i => i.Type == num).OrderBy(i => i.Description).ToArray();
            return new JsonResult(ToClothesItemModelViewList(items), DefaultJsonSettings);
        }

        // POST api/values
        [HttpPost()]
        public IActionResult Add([FromBody]ClothesViewModel cvm)
        {
            if (cvm != null)
            {
                var item = TinyMapper.Map<ClothesItem>(cvm);
                item.CreatedDate = DateTime.Now;
                item.LastModifiedDate = DateTime.Now;
                DbContext.ClothesItems.Add(item);
                DbContext.SaveChanges();
                return new JsonResult(TinyMapper.Map<ClothesItem>(item), DefaultJsonSettings);
            }
            return new StatusCodeResult(500);
        }

        // POST api/AddLog/
        [HttpPost("AddLog")]
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
        public IActionResult Update(int id, [FromBody]ClothesViewModel cvm)
        {
            var item = DbContext.ClothesItems.Where(i => i.Id == id).FirstOrDefault();
            if (item != null && cvm != null)
            {
                item.Description = cvm.Description;
                item.Shop = cvm.Shop;
                item.LastModifiedDate = cvm.LastModifiedDate;
                DbContext.SaveChanges();
                return new JsonResult(TinyMapper.Map<ClothesViewModel>(item), DefaultJsonSettings);
            }
            return NotFound(new { Error = string.Format("Item Id {0} has not been found", id) });
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = DbContext.ClothesItems.Where(i => i.Id == id).FirstOrDefault();
            if (item != null)
            {
                DbContext.ClothesItems.Remove(item);
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

        private List<ClothesViewModel> ToClothesItemModelViewList(IEnumerable<ClothesItem> clothesItems)
        {
            var lst = new List<ClothesViewModel>();
            foreach (var i in clothesItems)
            {
                lst.Add(TinyMapper.Map<ClothesViewModel>(i));
            };
            return lst;
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
