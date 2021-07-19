using BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd
{
    public class AppDBContext:DbContext
    {
      public   DbSet<CreditCard> CreditCardDB { get; set; }
           public AppDBContext(DbContextOptions<AppDBContext> options):base(options)
        {

        }
    }
}
