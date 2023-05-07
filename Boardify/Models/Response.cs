namespace Boardify.Models
{
    public class Response
    {
        public int StatusCode { get; set; }
        public string StatusMessage { get; set; }


        public List<Users> listUsers { get; set; }

        public Users user { get; set; }

        public List<Products> products { get; set; }

        public Products product { get; set; }

        public List<Cart> listCart { get; set; }

        
    }
}
