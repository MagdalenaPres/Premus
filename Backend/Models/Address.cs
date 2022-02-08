using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Premus.Models
{
    /// <summary>
    /// class address
    /// </summary>
    public class Address
    {
        /// <summary>
        /// get and set methods for id
        /// </summary>
        /// <returns>id</returns>
        public int Id { get; set; }

        /// <summary>
        /// get and set methods for street
        /// </summary>
        /// <returns>street</returns>
        [MaxLength(30)]
        public string Street { get; set; }

        /// <summary>
        /// get and set methods for number
        /// </summary>
        /// <returns>number</returns>
        [Required]
        [MaxLength(30)]
        public string Number { get; set; }

        /// <summary>
        /// get and set methods for city
        /// </summary>
        /// <returns>city</returns>
        [Required]
        [MaxLength(30)]
        public string City { get; set; }

        /// <summary>
        /// get and set methods for zipcode
        /// </summary>
        /// <returns>zipcode</returns>
        [Required]
        [StringLength(6)]
        public string ZipCode { get; set; }

    }
}
