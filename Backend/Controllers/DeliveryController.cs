using Microsoft.AspNetCore.Mvc;
using Premus.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Premus.Controllers
{
    /// <summary>
    /// controller for operating on deliveries
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryController : Controller
    {
        private readonly PremusDbContext dbContext;

        /// <summary>
        /// constructor
        /// </summary>
        public DeliveryController(PremusDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        /// <summary>
        /// get deliveries from database
        /// </summary>
        /// <returns>jsonResult with list of deliveries</returns>
        [HttpGet]
        public JsonResult Get()
        {
            var deliveries = dbContext.Deliveries;

            return new JsonResult(deliveries);
        }
    }
}
