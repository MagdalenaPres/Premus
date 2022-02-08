using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Premus.DataBase;
using Premus.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Premus.Controllers
{
    /// <summary>
    /// controller for operating on favorites products
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : Controller
    {
        private readonly PremusDbContext dbContext;

        /// <summary>
        /// constructor 
        /// </summary>
        public FavoriteController(PremusDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        /// <summary>
        /// get favorites products from database
        /// </summary>
        /// <returns>jsonResult with list of opinions</returns>

        [HttpGet]
        public JsonResult Get()
        {
            var products = dbContext.Favorites
                .Include(p => p.Product)
                .Include(p => p.Product.Category);

            return new JsonResult(products);
        }

        /// <summary>
        /// add to favorite product from database by given id
        /// </summary>
        /// <param name="id">Id product</param>
        /// <returns>jsonResult with information about success</returns>

        [HttpPost("{id}")]
        public JsonResult AddToFavorites(int id)
        {
            var product = dbContext.Favorites.FirstOrDefault(p => p.ProductId == id);

            if(product is not null)
            {
                return new JsonResult("Already in favorites");
            }

            dbContext.Favorites.Add(new Favorite()
            {
                ProductId = id
            });

            dbContext.SaveChanges();

            return new JsonResult("Added succesfully");
        }

        /// <summary>
        /// delete product from favorites
        /// </summary>
        /// <param name="id">Id of favorites product</param>
        /// <returns>jsonResult with information about success</returns>

        [HttpDelete("{id}")]
        public JsonResult RemoveFromFavorites(int id)
        {
            var product = dbContext.Favorites.FirstOrDefault(p => p.ProductId == id);
            if(product is not null)
            {
                dbContext.Favorites.Remove(product);
                dbContext.SaveChanges();
            }
                     
            return new JsonResult("Removed succesfully");
        }
    }
}
