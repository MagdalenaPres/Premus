using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Premus.Models
{
    /// <summary>
    /// class cart
    /// </summary>
    public class Cart
    {
        /// <summary>
        /// get and set methods for id
        /// </summary>
        /// <returns>id</returns>
        public int Id { get; set; }

        /// <summary>
        /// get and set methods for quantity
        /// </summary>
        /// <returns>quantity</returns>
        [Required]
        public int Quantity { get; set; }

        /// <summary>
        /// get and set methods for productid
        /// </summary>
        /// <returns>productid</returns>
        [Required]
        public int ProductId { get; set; }

        /// <summary>
        /// get and set methods for product
        /// </summary>
        /// <returns>product</returns>
        public Product Product { get; set; }
    }
}
