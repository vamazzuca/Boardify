using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Boardify.Models;
using System.Data.SqlClient;

namespace Boardify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProductsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("addToCart")]

        public Response addToCart(Cart cart)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = dal.addToCart(cart, connection);
            return response;
        }
    }
}
