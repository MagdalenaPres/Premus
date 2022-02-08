using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Premus.DataBase;
using Premus.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;

namespace Premus.Controllers
{
    /// <summary>
    /// controller for operating on products
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly PremusDbContext dbContext;
        private readonly IWebHostEnvironment environment;

        /// <summary>
        /// constructor
        /// </summary>
        public ProductController(PremusDbContext dbContext, IWebHostEnvironment environment)
        {
            this.dbContext = dbContext;
            this.environment = environment;
        }

        /// <summary>
        /// get products including categories from database
        /// </summary>
        /// <returns>jsonResult</returns>
        [HttpGet]
        public JsonResult Get()
        {
            var products = dbContext.Products.Include(a => a.Category);
            return new JsonResult(products);
        }
        /// <summary>
        /// return jsonresult with one product depends on his id including categories from database
        /// </summary>
        /// <param name="id">Id of product</param>
        /// <returns>jsonResult</returns>
        [HttpGet("one/{id}")]
        public JsonResult GetOneProduct(int id)
        {
            List<Product> result = new List<Product>();
            var product = dbContext.Products
                .Include(a => a.Category)
                .FirstOrDefault(p => p.Id == id);

            if(product is not null)
            {
                result.Add(product);
                return new JsonResult(result);
            }

            return new JsonResult(null);
        }

        /// <summary>
        /// return jsonresult with products from given category
        /// </summary>
        /// <param name="name">name of category</param>
        /// <returns>jsonResult</returns>
        [HttpGet("{name}")]
        public JsonResult GetProductsInCatalog(string name)
        {
            if(name == "all")
            {
                var products = dbContext.Products
                .Include(a => a.Category);
                return new JsonResult(products);
            }
            else
            {
                var products = dbContext.Products
                .Include(a => a.Category)
                .Where(a => a.Category.Name == name);
                return new JsonResult(products);
            }                     
        }

        /// <summary>
        /// save given product in database
        /// </summary>
        /// <param name="product">product details</param>
        /// <returns>jsonResult with information about success</returns>
        [HttpPost]
        public ActionResult Post(Product product)
        {
            if(product != null)
            {
                dbContext.Add(product);
                dbContext.SaveChanges();
                return Ok(product);
            }

            return BadRequest();           
        }

        /// <summary>
        /// update given product in database
        /// </summary>
        /// <param name="product">product details</param>
        /// <returns>jsonResult with information about success</returns>
        [HttpPut]
        public JsonResult Put(Product product)
        {
            dbContext.Update(product);
            dbContext.SaveChanges();

            return new JsonResult("Edited succesfully");
        }

        /// <summary>
        /// delete product with given id from database
        /// </summary>
        /// <param name="id">product id</param>
        /// <returns>jsonResult with information about success</returns>
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var product = dbContext.Products.FirstOrDefault(s => s.Id == id);

            if(product is not null)
            {
                var imagePath = Path.Combine(environment.ContentRootPath, "Photos", product.PhotoName);

                if (System.IO.File.Exists(imagePath) && product.PhotoName != "piesel2.jpg")
                {
                    System.IO.File.Delete(imagePath);
                }

                dbContext.Remove(product);
                dbContext.SaveChanges();
                return Ok();
            }
            return NotFound();
        }

        /// <summary>
        /// save file in server
        /// </summary>
        /// <returns>jsonResult with name of file</returns>

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = Path.GetFileNameWithoutExtension(postedFile.FileName);
                string extension = Path.GetExtension(postedFile.FileName);

                fileName = fileName + DateTime.Now.ToString("yymmssffff") + extension;
                string path = Path.Combine(environment.ContentRootPath + "/Photos/" + fileName);

                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    postedFile.CopyTo(fileStream);
                }

                return new JsonResult(fileName);
            }
            catch (Exception)
            {
                return new JsonResult("piesel2.jpg");
            }
        }
    }
}
