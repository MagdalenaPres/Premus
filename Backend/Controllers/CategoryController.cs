using Microsoft.AspNetCore.Mvc;
using Premus.DataBase;
using Premus.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Premus.Controllers
{
    /// <summary>
    /// controller for operating on categories
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly PremusDbContext dbContext;

        /// <summary>
        /// constructor
        /// </summary>
        public CategoryController(PremusDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        /// <summary>
        /// get categories from database
        /// </summary>
        /// <returns>jsonResult with list of categories</returns>
        [HttpGet]
        public JsonResult Get()
        {
            var categories = dbContext.Categories;

            return new JsonResult(categories);
        }

        /// <summary>
        /// add category to database
        /// </summary>
        /// <param name="category">category details</param>
        /// <returns>jsonResult with information about success</returns>
        [HttpPost]
        public JsonResult Post(Category category)
        {
            dbContext.Add(category);
            dbContext.SaveChanges();

            return new JsonResult("Added succesfully");
        }

        /// <summary>
        /// update category to database
        /// </summary>
        /// <param name="category">category details</param>
        /// <returns>jsonResult with information about success</returns>
        [HttpPut]
        public JsonResult Put(Category category)
        {
            dbContext.Update(category);
            dbContext.SaveChanges();

            return new JsonResult("Edited succesfully");
        }

        /// <summary>
        /// remove category from database by given id
        /// </summary>
        /// <param name="id">category id</param>
        /// <returns>jsonResult with information about success</returns>
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            var category = dbContext.Categories.FirstOrDefault(s => s.Id == id);

            if (category is not null)
            {
                dbContext.Remove(category);
                dbContext.SaveChanges();
            }

            return new JsonResult("Deleted succesfully");
        }
    }
}
