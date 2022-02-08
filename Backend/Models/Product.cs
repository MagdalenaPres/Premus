using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Premus.Models
{
    /// <summary>
    /// class product
    /// </summary>
    public class Product
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
        [MaxLength(30)]
        public string Name { get; set; }

        /// <summary>
        /// get and set methods for price
        /// </summary>
        /// <returns>price</returns>
        [Required]
        public float Price { get; set; }

        /// <summary>
        /// get and set methods for photoname
        /// </summary>
        /// <returns>photoname</returns>
        [MaxLength(100)]
        public string PhotoName { get; set; }

        /// <summary>
        /// get and set methods for is available
        /// </summary>
        /// <returns>is available</returns>
        [Required]
        public bool IsAvailable { get; set; }

        /// <summary>
        /// get and set methods for categoryid
        /// </summary>
        /// <returns>categoryid</returns>
        public int CategoryId { get; set; }

        /// <summary>
        /// get and set methods for category
        /// </summary>
        /// <returns>category</returns>
        public Category Category { get; set; }
    }
}
