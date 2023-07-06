using Boardify.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace Boardify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("registration")]
        public Response register(Users users)
        {
          
          
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_register", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@FirstName", users.FirstName);
            cmd.Parameters.AddWithValue("@LastName", users.LastName);
            cmd.Parameters.AddWithValue("@Password", users.Password);
            cmd.Parameters.AddWithValue("@Email", users.Email);
            cmd.Parameters.AddWithValue("@Type", "user");
            cmd.Parameters.Add("@ErrorMessage", System.Data.SqlDbType.Char, 200);
            cmd.Parameters["@ErrorMessage"].Direction = System.Data.ParameterDirection.Output;
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            string message = (string)cmd.Parameters["@ErrorMessage"].Value;
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = message;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = message;
            }

            return response;
        }

        [HttpPost]
        [Route("login")]
        public Response login(Users users) 
        {
           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            SqlDataAdapter da = new SqlDataAdapter("sp_login", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@Email", users.Email);
            da.SelectCommand.Parameters.AddWithValue("@Password", users.Password);

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
                response.StatusCode = 200;
                response.StatusMessage = "Login Success";
                response.user = user;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Login Failed. Incorrect Username or Password";
                response.user = user;
            }
            return response;
        }

        [HttpPost]
        [Route("viewUser")]
        public Response viewUser(Users users) 
        {
            
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
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

        [HttpPut]
        [Route("updateProfile")]
        public Response updateUser(Users users) 
        { 
           
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("BoardifyCS").ToString());
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_updateProfile", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", users.ID);
            cmd.Parameters.AddWithValue("@FirstName", users.FirstName);
            cmd.Parameters.AddWithValue("@LastName", users.LastName);
            cmd.Parameters.AddWithValue("@Email", users.Email);
            cmd.Parameters.Add("@ErrorMessage", System.Data.SqlDbType.Char, 200);
            cmd.Parameters["@ErrorMessage"].Direction = System.Data.ParameterDirection.Output;
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            string message = (string)cmd.Parameters["@ErrorMessage"].Value;
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = message;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = message;
            }

            return response;
        }


    }
}
