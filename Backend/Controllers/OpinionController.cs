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
    /// controller for operating on opinions
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class OpinionController : Controller
    {
        private readonly PremusDbContext dbContext;

        /// <summary>
        /// constructor
        /// </summary>
        public OpinionController(PremusDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        /// <summary>
        /// get opinions from database
        /// </summary>
        /// <returns>jsonResult with list of opinions</returns>

        [HttpGet]
        public JsonResult GetAllOpinions()
        {
            var products = dbContext.Opinions
                .Include(p => p.Product)
                .Include(p => p.Product.Category);

            var result = new JsonResult(products);
            Console.WriteLine(result.GetType());
            return result;
        }
        /// <summary>
        /// get opinion from database given 
        /// </summary>
        /// <param name="id">Id of opinion</param>
        /// <returns>jsonResult with list of opinions</returns>
        [HttpGet("{id}")]
        public JsonResult GetOpinionsAboutProduct(int id)
        {
            var products = dbContext.Opinions
                .Include(p => p.Product)
                .Include(p => p.Product.Category)
                .Where(p => p.ProductId == id);

            return new JsonResult(products);
        }

        /// <summary>
        /// save given opinion in database
        /// </summary>
        /// <param name="opinion">opinion details</param>
        /// <returns>jsonResult with information about success</returns>
        [HttpPost]
        public JsonResult AddOpinion(Opinion opinion)
        {
            dbContext.Opinions.Add(opinion);
            dbContext.SaveChanges();

            return new JsonResult(opinion);
        }

        /// <summary>
        /// update given opinion in database
        /// </summary>
        /// <param name="opinion">opinion details</param>
        /// <returns>jsonResult with information about success</returns>
        [HttpPut]
        public JsonResult UpdateOpinion(Opinion opinion)
        {
            dbContext.Opinions.Update(opinion);
            dbContext.SaveChanges();

            return new JsonResult("Added succesfully");
        }

        /// <summary>
        /// delete opinion with given id in database
        /// </summary>
        /// <param name="id">opinion id</param>
        /// <returns>jsonResult with information about success</returns>
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            var opinion = dbContext.Opinions.Find(id);

            if (opinion is not null)
            {
                dbContext.Remove(opinion);
                dbContext.SaveChanges();
            }

            return new JsonResult(opinion);
        }

        public int GetOpinionNumber()
        {
            var count = dbContext.Opinions.ToList().Count;
            return count;
        }
    }
}
