using Boardify.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace Boardify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AdminController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("addProducts")]

        public Response addProducts(Products product)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = dal.addProducts(product, connection);
            return response;
        }

        [HttpPut]
        [Route("updateProducts")]

        public Response updateProducts(Products product)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = dal.updateProducts(product, connection);
            return response;
        }

        [HttpDelete]
        [Route("deleteProducts")]

        public Response deleteProducts(Products product)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = dal.deleteProducts(product, connection);
            return response;
        }


    }
}
