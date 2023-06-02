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

        [HttpDelete]
        [Route("deleteFromCart")]
        public Response deleteFromCart(Cart cart)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = dal.deleteFromCart(cart, connection);
            return response;
        }

        [HttpPut]
        [Route("updateFromCart")]
        public Response updateFromCart(Cart cart)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = dal.updateFromCart(cart, connection);
            return response;
        }

        [HttpGet]
        [Route("getProducts")]
        public Response getProducts()
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = dal.productsList(connection);
            return response;
        }

        [HttpPost]
        [Route("getProduct")]
        public Response getProduct(Products product)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = dal.viewProduct(product, connection);
            return response;
        }

        [HttpGet]
        [Route("getCart")]
        public Response getCart(Cart cart)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = dal.cartList(cart, connection);
            return response;
        }

    }
}
