using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Premus.Models
{
    /// <summary>
    /// class opinion
    /// </summary>
    public class Opinion
    {
        /// <summary>
        /// get and set methods for id
        /// </summary>
        /// <returns>id</returns>
        public int Id { get; set; }

        /// <summary>
        /// get and set methods for content of opinion
        /// </summary>
        /// <returns>content</returns>
        [Required]
        [MaxLength(1000)]
        public string Contents { get; set; }

        /// <summary>
        /// get and set methods for is snonymous
        /// </summary>
        /// <returns>bool is anonymous</returns>
        public bool IsAnonymuous { get; set; }

        /// <summary>
        /// get and set methods for date
        /// </summary>
        /// <returns>date</returns>
        [Required]
        public string Date { get; set; }

        /// <summary>
        /// get and set methods for productid
        /// </summary>
        /// <returns>productid</returns>
        public int ProductId { get; set; }

        /// <summary>
        /// get and set methods for product
        /// </summary>
        /// <returns>product</returns>
        public Product Product { get; set; }
    }
}
