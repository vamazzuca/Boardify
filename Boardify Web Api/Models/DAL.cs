using System.Data.SqlClient;
using System.Data;
using System.Reflection.Metadata;


namespace Boardify.Models
{
    public class DAL
    {
        public Response register(Users users, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_register", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@FirstName", users.FirstName);
            cmd.Parameters.AddWithValue("@LastName", users.LastName);
            cmd.Parameters.AddWithValue("@Password", users.Password);
            cmd.Parameters.AddWithValue("@Email", users.Email);
            cmd.Parameters.AddWithValue("@Type", users.Type);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            if (i > 0) 
            {
                response.StatusCode = 200;
                response.StatusMessage = "User registered successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User registration failed";
            }

            return response;
        }


        public Response login(Users users, SqlConnection connection)
        {
            SqlDataAdapter da = new SqlDataAdapter("sp_login", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@Email", users.Email);
            da.SelectCommand.Parameters.AddWithValue("@Password", users.Password);

            DataTable dt = new DataTable();
            da.Fill(dt);
            Response response = new Response();
            Users user = new Users();
            if(dt.Rows.Count > 0)
            {
                user.ID = Convert.ToInt32(dt.Rows[0]["ID"]);
                user.FirstName = Convert.ToString(dt.Rows[0]["FirstName"]);
                user.LastName = Convert.ToString(dt.Rows[0]["LastName"]);
                user.Email = Convert.ToString(dt.Rows[0]["Email"]);
                user.Type = Convert.ToString(dt.Rows[0]["Type"]);
                response.StatusCode = 200;
                response.StatusMessage = "User is valid";
                response.user = user;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User is invalid";
                response.user = null;
            }
            return response;
        }

        public Response viewUser(Users users, SqlConnection connection)
        {
            SqlDataAdapter da = new SqlDataAdapter("sp_viewUser", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@ID", users.ID);
            DataTable dt = new DataTable();
            da.Fill(dt);
            Response response = new Response();
            Users user = new Users();
            if (dt.Rows.Count > 0)
            {
                user.ID = Convert.ToInt32(dt.Rows[0]["ID"]);
                user.FirstName = Convert.ToString(dt.Rows[0]["FirstName"]);
                user.LastName = Convert.ToString(dt.Rows[0]["LastName"]);
                user.Email = Convert.ToString(dt.Rows[0]["Email"]);
                user.Type = Convert.ToString(dt.Rows[0]["Type"]);
                user.Password = Convert.ToString(dt.Rows[0]["Password"]);
                response.StatusCode = 200;
                response.StatusMessage = "User exists.";
                response.user = user;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User does not exist.";
                response.user = user;    
            }
            return response;
        }

        public Response updateProfile(Users users, SqlConnection connection)
        {
            Response response = new Response(); 
            SqlCommand cmd = new SqlCommand("sp_updateProfile", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", users.ID);
            cmd.Parameters.AddWithValue("@FirstName", users.FirstName);
            cmd.Parameters.AddWithValue("@LastName", users.LastName);
            cmd.Parameters.AddWithValue("@Password", users.Password);
            cmd.Parameters.AddWithValue("@Email", users.Email);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if(i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Updated successfully.";
            } else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Update Failed. Try Again.";
            }
            
            return response;
        }

        public Response addToCart(Cart cart, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_addToCart", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserID", cart.UserID);
            cmd.Parameters.AddWithValue("@UnitPrice", cart.UnitPrice);
            cmd.Parameters.AddWithValue("@Discount", cart.Discount);
            cmd.Parameters.AddWithValue("@Quantity", cart.Quantity);
            cmd.Parameters.AddWithValue("@TotalPrice", cart.TotalPrice);
            cmd.Parameters.AddWithValue("@ProductID", cart.ProductID);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if(i > 0)
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

        public Response deleteFromCart(Cart cart, SqlConnection connection)
        {
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

        public Response updateFromCart(Cart cart, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_updateFromCart", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", cart.ID);
            cmd.Parameters.AddWithValue("@Quantity", cart.Quantity);
            cmd.Parameters.AddWithValue("@TotalPrice", cart.TotalPrice);
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

        public Response addProducts(Products products, SqlConnection connection) 
        {
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
            } else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Product could not be saved.";
            }
            return response;
        }

        public Response updateProducts(Products products, SqlConnection connection)
        {
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

        public Response deleteProducts(Products products, SqlConnection connection)
        {
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

        public Response productsList(SqlConnection connection)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Products", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<Products> listProducts = new List<Products>();

            if(dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Products product = new Products();
                    product.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    product.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    product.Brand = Convert.ToString(dt.Rows[i]["Brand"]);
                    product.UnitPrice = Convert.ToDecimal(dt.Rows[i]["UnitPrice"]);
                    product.Discount = Convert.ToDecimal(dt.Rows[i]["Discount"]);
                    product.Color = Convert.ToString(dt.Rows[i]["Color"]);
                    product.ConnectivityTechnology = Convert.ToString(dt.Rows[i]["ConnectivityTechnology"]);
                    product.SwitchType = Convert.ToString(dt.Rows[i]["SwitchType"]);
                    product.KeyNumber = Convert.ToInt32(dt.Rows[i]["KeyNumber"]);
                    product.ImageURL = Convert.ToString(dt.Rows[i]["ImageURL"]);
                    listProducts.Add(product);
                }
                if(listProducts.Count > 0)
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

        public Response cartList(Cart cart, SqlConnection connection)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("sp_getCart", connection);
            da.SelectCommand.Parameters.AddWithValue("@CartID", cart.ID);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<Cart> listCart = new List<Cart>();
            List<Products> listProducts = new List<Products>();

            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Cart cartItem = new Cart();
                    Products product = new Products();
                    cartItem.ID = Convert.ToInt32(dt.Rows[i]["Cart.ID"]);
                    cartItem.ProductID = Convert.ToInt32(dt.Rows[i]["ProductID"]);
                    cartItem.UserID = Convert.ToInt32(dt.Rows[i]["UserID"]);
                    cartItem.UnitPrice = Convert.ToDecimal(dt.Rows[i]["UnitPrice"]);
                    cartItem.Quantity = Convert.ToInt32(dt.Rows[i]["Quantity"]);
                    cartItem.TotalPrice = Convert.ToDecimal(dt.Rows[i]["TotalPrice"]);
                    product.ID = Convert.ToInt32(dt.Rows[i]["Products.ID"]);
                    product.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    product.Brand = Convert.ToString(dt.Rows[i]["Brand"]);
                    product.UnitPrice = Convert.ToDecimal(dt.Rows[i]["UnitPrice"]);
                    product.Discount = Convert.ToDecimal(dt.Rows[i]["Discount"]);
                    product.Color = Convert.ToString(dt.Rows[i]["Color"]);
                    product.ConnectivityTechnology = Convert.ToString(dt.Rows[i]["ConnectivityTechnology"]);
                    product.SwitchType = Convert.ToString(dt.Rows[i]["SwitchType"]);
                    product.KeyNumber = Convert.ToInt32(dt.Rows[i]["KeyNumber"]);
                    product.ImageURL = Convert.ToString(dt.Rows[i]["ImageURL"]);
                    listProducts.Add(product);
                    listCart.Add(cartItem);
                }
                if (listProducts.Count > 0 & listCart.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Product Data Found";
                    response.listproducts = listProducts;
                    response.listCart = listCart;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Product Data Not Found";
                    response.listproducts = null;
                    response.listCart = null;
                }
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Product Data Not Found";
                response.listproducts = null;
                response.listCart = null;
            }


            return response;
        }


    }
}
