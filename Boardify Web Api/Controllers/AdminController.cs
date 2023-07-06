using Boardify.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
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

        public Response addProducts(Products products)
        {
           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_addProduct", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Name", products.Name);
            cmd.Parameters.AddWithValue("@Brand", products.Brand);
            cmd.Parameters.AddWithValue("@Manufacturer", products.Manufacturer);
            cmd.Parameters.AddWithValue("@UnitPrice", products.UnitPrice);
            cmd.Parameters.AddWithValue("@Discount", products.Discount);
            cmd.Parameters.AddWithValue("@Color", products.Color);
            cmd.Parameters.AddWithValue("@ConnectivityTechnology", products.ConnectivityTechnology);
            cmd.Parameters.AddWithValue("@SwitchType", products.SwitchType);
            cmd.Parameters.AddWithValue("@KeyNumber", products.KeyNumber);
            cmd.Parameters.AddWithValue("@ImageURL", products.ImageURL);


            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Product inserted sucessfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Product could not be saved.";
            }
            return response;
        }

        [HttpPut]
        [Route("updateProducts")]

        public Response updateProducts(Products products)
        {
            
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_updateProduct", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", products.ID);
            cmd.Parameters.AddWithValue("@Name", products.Name);
            cmd.Parameters.AddWithValue("@Brand", products.Brand);
            cmd.Parameters.AddWithValue("@Manufacturer", products.Manufacturer);
            cmd.Parameters.AddWithValue("@UnitPrice", products.UnitPrice);
            cmd.Parameters.AddWithValue("@Discount", products.Discount);
            cmd.Parameters.AddWithValue("@Color", products.Color);
            cmd.Parameters.AddWithValue("@ConnectivityTechnology", products.ConnectivityTechnology);
            cmd.Parameters.AddWithValue("@SwitchType", products.SwitchType);
            cmd.Parameters.AddWithValue("@KeyNumber", products.KeyNumber);
            cmd.Parameters.AddWithValue("@ImageURL", products.ImageURL);


            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Product updated sucessfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Product could not be updated.";
            }
            return response;
        }

        [HttpDelete]
        [Route("deleteProducts")]

        public Response deleteProducts(Products products)
        {
            
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_deleteProduct", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", products.ID);


            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Product deleted sucessfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Product could not be deleted.";
            }
            return response;
        }


    }
}
