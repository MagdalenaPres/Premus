using Premus.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Premus.ViewModels
{
    public class CartProductModel
    {
        public Product Product { get; set; }
        public int Quantity { set; get; }
    }
}
