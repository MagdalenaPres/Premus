using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Premus.Models
{
    /// <summary>
    /// class order
    /// </summary>
    public class Order
    {
        /// <summary>
        /// get and set methods for id
        /// </summary>
        /// <returns>id</returns>
        public int Id{ get; set; }

        /// <summary>
        /// get and set methods for date
        /// </summary>
        /// <returns>date</returns>
        [Required]
        public DateTime Date { get; set; }

        /// <summary>
        /// get and set methods for deliveryid
        /// </summary>
        /// <returns>deliveryid</returns>
        public int DeliveryId { get; set; }


        /// <summary>
        /// get and set methods for delivery
        /// </summary>
        /// <returns>delivery</returns>
        public Delivery Delivery { get; set; }


        /// <summary>
        /// get and set methods for paymentid
        /// </summary>
        /// <returns>paymentid</returns>
        public int PaymentId { get; set; }


        /// <summary>
        /// get and set methods for payment
        /// </summary>
        /// <returns>payment</returns>
        public Payment Payment { get; set; }
    }
}
