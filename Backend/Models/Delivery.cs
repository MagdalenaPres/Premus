using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Premus.Models
{
    /// <summary>
    /// class delivery
    /// </summary>
    public class Delivery
    {
        /// <summary>
        /// get and set methods for id
        /// </summary>
        /// <returns>id</returns>
        public int Id { get; set; }

        /// <summary>
        /// get and set methods for name
        /// </summary>
        /// <returns>name</returns>
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        /// <summary>
        /// get and set methods for price
        /// </summary>
        /// <returns>price</returns>
        [Required]
        public float Price { get; set; }

    }
}
