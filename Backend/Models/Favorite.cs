using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Premus.Models
{
    /// <summary>
    /// class favorite
    /// </summary>
    public class Favorite
    {
        /// <summary>
        /// get and set methods for id
        /// </summary>
        /// <returns>id</returns>
        public int Id { get; set; }

        /// <summary>
        /// get and set methods for productsid
        /// </summary>
        /// <returns>productsid</returns>
        [Required]
        public int ProductId { get; set; }

        /// <summary>
        /// get and set methods for product
        /// </summary>
        /// <returns>product</returns>
        public Product Product { get; set; }
    }
}
