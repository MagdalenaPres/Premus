using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Premus.Models
{
    /// <summary>
    /// class payment
    /// </summary>
    public class Payment
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
    }
}
