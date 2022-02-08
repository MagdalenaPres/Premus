using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Premus.DataBase;
using Premus.Models;
using Premus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Premus.Controllers
{
    /// <summary>
    /// controller for operating on cart
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : Controller
    {
        private readonly PremusDbContext dbContext;

        /// <summary>
        /// constructor
        /// </summary>
        public CartController(PremusDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        /// <summary>
        /// get products from cart
        /// </summary>
        /// <returns>jsonResult with list of products</returns>
        [HttpGet]
        public JsonResult Get()
        {
            var products = dbContext.Carts
                .Include(p => p.Product)
                .Include(p => p.Product.Category);

            return new JsonResult(products);
        }

        /// <summary>
        /// add product to cart 
        /// </summary>
        /// <param name="id">product id</param>
        /// <returns>jsonResult with message about success</returns>
        [HttpPost("{id}")]
        public JsonResult AddToCart(int id)
        {
            var product = dbContext.Carts.FirstOrDefault(p => p.ProductId == id);

            if(product is not null)
            {
                product.Quantity += 1;
                dbContext.Carts.Update(product);
            }
            else
            {
                var newProductInCart = dbContext.Products.Find(id);
                if(newProductInCart is null)
                {
                    return new JsonResult("Error");
                }
                else
                {
                    Cart cart = new Cart()
                    {
                        ProductId = newProductInCart.Id,
                        Quantity = 1
                    };
                    dbContext.Carts.Add(cart);
                }
            }

            dbContext.SaveChanges();
            return new JsonResult("Added succesfully");
        }

        /// <summary>
        /// remove product from cart 
        /// </summary>
        /// <param name="id">product in cart id</param>
        /// <returns>jsonResult with message about success</returns>
        [HttpDelete("{id}")]
        public JsonResult RemoveFromCart(int id)
        {
            var cartProduct = dbContext.Carts.Find(id);
            dbContext.Carts.Remove(cartProduct);
            dbContext.SaveChanges();

            return new JsonResult("Deleted succesfully");
        }

        /// <summary>
        /// remove all products from cart 
        /// </summary>
        /// <returns>jsonResult with message about success</returns>
        [HttpDelete("all")]
        public JsonResult RemoveAll()
        {
            dbContext.Database.ExecuteSqlRaw("TRUNCATE TABLE [CARTS]");
            dbContext.SaveChanges();

            return new JsonResult(dbContext.Carts);
        }

        /// <summary>
        /// calculate price of cart 
        /// </summary>
        /// <returns>jsonResult with cart price</returns>
        [HttpGet("price")]
        public JsonResult CalculatePrice()
        {
            float price = 0;
            foreach(var cart in dbContext.Carts.Include(c => c.Product))
            {
                price += cart.Quantity * cart.Product.Price;
            }

            return new JsonResult(price);
        }

    }
}
