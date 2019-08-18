using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MessageBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MessageBackend.Controllers
{
    [Produces("application/json")]
    [Route("auth")]
    public class AuthController : Controller
    {
        readonly ApiDBContex apiDBContex;

        public AuthController(ApiDBContex apiDBContex)
        {
            this.apiDBContex = apiDBContex;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        //POST auth/login
        [HttpPost("login")]
        public JwtPacket Login([FromBody]LoginInfo loginInfo )
        {
            try
            {
                var authenticated = apiDBContex.Users.SingleOrDefault(user => user.Email == loginInfo.Email && user.Password1 == loginInfo.Password);

                return ReturnJwtPacket(authenticated);
            }
            catch (Exception)
            {
                return null;
            }

            
        }


        // POST auth/register
        [HttpPost("register")]
        public JwtPacket Post([FromBody]User user)
        {
            

            apiDBContex.Add(user);
            apiDBContex.SaveChanges();

            return ReturnJwtPacket(user);
        }

        JwtPacket ReturnJwtPacket(User user)
        {

            var claim = new Claim[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id)
            };
            var jwt = new JwtSecurityToken(claims:claim);
            var jwtEncoded = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new JwtPacket() { Token = jwtEncoded, Name = user.FirstName };
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

    public class JwtPacket{
        public string Token { get; set; }
        public string Name { get; set; }
    }

    public class LoginInfo
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
