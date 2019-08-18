using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MessageBackend.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        readonly ApiDBContex apiDBContex;

        public UsersController(ApiDBContex apiDBContex)
        {
            this.apiDBContex = apiDBContex;
        }

        // GET: api/values
        
        [HttpGet("me")]
        public ActionResult Get()
        {
            var users = apiDBContex.Users;
            return Ok(users);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            var user = apiDBContex.Users.SingleOrDefault(res => res.Id == id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
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
}
