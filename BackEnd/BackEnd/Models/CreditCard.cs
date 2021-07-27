using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    public class CreditCard
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public String Name { get; set; }
        [Required]
        public String CardNumber { get; set; }
        [Required]
        public String ExpirationDate { get; set; }
        [Required]
        public String CVV { get; set; }
    }
}
