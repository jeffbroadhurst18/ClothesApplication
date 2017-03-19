using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ClothesApplication.ViewModels;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ClothesApplication.Controllers
{
    [Route("api/[controller]")]
    public class ClothesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            var arr = new List<ClothesViewModel>();
            ClothesViewModel cl1, cl2, cl3;
            CreateDummyClothes(out cl1, out cl2,out cl3);
            arr.Add(cl1);
            arr.Add(cl2);
            arr.Add(cl3);
            return new JsonResult(arr, DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var cl1 = new ClothesViewModel
            {
                Id = 1,
                CreatedDate = DateTime.Now.AddDays(-5),
                Description = "First Description",
                LastModifiedDate = DateTime.Now.AddDays(-4),
                LastWornDate = DateTime.Now.AddDays(-1),
                Type = 1,
                WornCount = 3
            };
            return  new JsonResult(cl1,DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("GetType/{num}")]
        public IActionResult GetType(int num)
        {
            var arr = new List<ClothesViewModel>();
            ClothesViewModel cl1, cl2, cl3;
            CreateDummyClothes(out cl1, out cl2,out cl3);
            arr.Add(cl1);
            arr.Add(cl2);
            return new JsonResult(arr, DefaultJsonSettings);

        }

        private static void CreateDummyClothes(out ClothesViewModel cl1, out ClothesViewModel cl2, out ClothesViewModel cl3)
        {
            cl1 = new ClothesViewModel
            {
                Id = 1,
                CreatedDate = DateTime.Now.AddDays(-5),
                Description = "First Description",
                Shop = "Marks and Spencer",
                LastModifiedDate = DateTime.Now.AddDays(-4),
                LastWornDate = DateTime.Now.AddDays(-1),
                LastWornDateString  = DateTime.Now.AddDays(-1).ToShortDateString(),
                Type = 1,
                WornCount = 3
            };
            cl2 = new ClothesViewModel
            {
                Id = 2,
                CreatedDate = DateTime.Now.AddDays(-5),
                Description = "Second Description",
                Shop = "Next",
                LastModifiedDate = DateTime.Now.AddDays(-4),
                LastWornDate = DateTime.Now.AddDays(-1),
                LastWornDateString = DateTime.Now.AddDays(-1).ToShortDateString(),
                Type = 1,
                WornCount = 12
            };
            cl3 = new ClothesViewModel
            {
                Id = 3,
                CreatedDate = DateTime.Now.AddDays(-5),
                Description = "Second Description",
                Shop = "Gap",
                LastModifiedDate = DateTime.Now.AddDays(-4),
                LastWornDate = DateTime.Now.AddDays(-1),
                LastWornDateString = DateTime.Now.AddDays(-1).ToShortDateString(),
                Type = 2,
                WornCount = 14
            };
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
    }
}
