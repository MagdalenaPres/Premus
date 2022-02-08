using Microsoft.AspNetCore.Mvc;
using Premus.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Premus.Controllers
{
    /// <summary>
    /// controller for operating on payments
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : Controller
    {

        private readonly PremusDbContext dbContext;

        /// <summary>
        /// constructor
        /// </summary>
        public PaymentController(PremusDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        /// <summary>
        /// get payments options from database
        /// </summary>
        /// <returns>jsonResult with list of payments options</returns>
        [HttpGet]
        public JsonResult Get()
        {
            var payments = dbContext.Payments.ToList();

            return new JsonResult(payments);
        }
    }
}
