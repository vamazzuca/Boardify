using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Boardify.Models;
using System.Data.SqlClient;
using System.Data;

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
           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_addToCart", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserID", cart.UserID);
            cmd.Parameters.AddWithValue("@Quantity", cart.Quantity);
            cmd.Parameters.AddWithValue("@ProductID", cart.ProductID);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Item added Successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Item could not be addded";
            }

            return response;
        }

        [HttpDelete]
        [Route("deleteFromCart")]
        public Response deleteFromCart(Cart cart)
        {
           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_deleteFromCart", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", cart.ID);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Item deleted successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Item could not be deleted";
            }

            return response;
        }

        [HttpPut]
        [Route("updateFromCart")]
        public Response updateFromCart(Cart cart)
        {
          
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_updateFromCart", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", cart.ID);
            cmd.Parameters.AddWithValue("@Quantity", cart.Quantity);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Item updated Successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Item could not be updated";
            }

            return response;
        }

        [HttpGet]
        [Route("getProducts")]
        public Response getProducts()
        {
           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Products", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<Products> listProducts = new List<Products>();

            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Products product = new Products();
                    product.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    product.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    product.Brand = Convert.ToString(dt.Rows[i]["Brand"]);
                    product.Manufacturer = Convert.ToString(dt.Rows[i]["Manufacturer"]);
                    product.UnitPrice = Convert.ToDecimal(dt.Rows[i]["UnitPrice"]);
                    product.Discount = Convert.ToDecimal(dt.Rows[i]["Discount"]);
                    product.Color = Convert.ToString(dt.Rows[i]["Color"]);
                    product.ConnectivityTechnology = Convert.ToString(dt.Rows[i]["ConnectivityTechnology"]);
                    product.SwitchType = Convert.ToString(dt.Rows[i]["SwitchType"]);
                    product.KeyNumber = Convert.ToInt32(dt.Rows[i]["KeyNumber"]);
                    product.ImageURL = Convert.ToString(dt.Rows[i]["ImageURL"]);
                    listProducts.Add(product);
                }
                if (listProducts.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Product Data Found";
                    response.listproducts = listProducts;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Product Data Not Found";
                    response.listproducts = null;
                }
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Product Data Not Found";
                response.listproducts = null;
            }


            return response;
        }

        [HttpPost]
        [Route("getProduct")]
        public Response getProduct(Products products)
        {
           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            SqlDataAdapter da = new SqlDataAdapter("sp_viewProduct", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@ID", products.ID);
            DataTable dt = new DataTable();
            da.Fill(dt);
            Response response = new Response();
            Products product = new Products();
            if (dt.Rows.Count > 0)
            {
                product.ID = Convert.ToInt32(dt.Rows[0]["ID"]);
                product.Name = Convert.ToString(dt.Rows[0]["Name"]);
                product.Brand = Convert.ToString(dt.Rows[0]["Brand"]);
                product.Manufacturer = Convert.ToString(dt.Rows[0]["Manufacturer"]);
                product.UnitPrice = Convert.ToDecimal(dt.Rows[0]["UnitPrice"]);
                product.Discount = Convert.ToDecimal(dt.Rows[0]["Discount"]);
                product.Color = Convert.ToString(dt.Rows[0]["Color"]);
                product.ConnectivityTechnology = Convert.ToString(dt.Rows[0]["ConnectivityTechnology"]);
                product.SwitchType = Convert.ToString(dt.Rows[0]["SwitchType"]);
                product.KeyNumber = Convert.ToInt32(dt.Rows[0]["KeyNumber"]);
                product.ImageURL = Convert.ToString(dt.Rows[0]["ImageURL"]);
                response.StatusCode = 200;
                response.StatusMessage = "Product exists.";
                response.product = product;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Product does not exist.";
                response.product = product;
            }
            return response;
        }

        [HttpPost]
        [Route("getCart")]
        public Response getCart(Cart cart)
        {
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("sp_getCart", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@UserID", cart.UserID);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<Cart> listCart = new List<Cart>();

            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Cart cartItem = new Cart();
                    cartItem.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    cartItem.ProductID = Convert.ToInt32(dt.Rows[i]["ProductID"]);
                    cartItem.UserID = Convert.ToInt32(dt.Rows[i]["UserID"]);
                    cartItem.Quantity = Convert.ToInt32(dt.Rows[i]["Quantity"]);


                    listCart.Add(cartItem);
                }
                if (listCart.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Cart Data Found";
                    response.listCart = listCart;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Cart Data Not Found";
                    response.listCart = null;
                }
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Cart Data Not Found";
                response.listCart = null;
            }


            return response;
        }

    }
}
