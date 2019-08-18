using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessageBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MessageBackend.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MessagesController : Controller
    {
        //static List<Message> messages = new List<Message> {
        //   new Message { Owner = "Tim", Text = "What\'s up" },
        //   new Message { Owner = "John", Text = "Hello" },
        //   new Message { Owner = "Rose", Text = "Hello guys" }};
        readonly ApiDBContex apiDBContex;

        public MessagesController(ApiDBContex apiDBContex)
        {
            this.apiDBContex = apiDBContex;
        }

        // GET: api/values
        [HttpGet]
        [HttpOptions]
        public IEnumerable<Message> Get()
        {

            return apiDBContex.Messages;
        }

        // GET api/values/5
        [HttpGet("{name}")]
        [HttpOptions]
        public IEnumerable<Message> Get(string name)
        {
            return apiDBContex.Messages.Where(message => message.Owner == name);

        }

        // POST api/values
        [HttpPost]
        public Message Post([FromBody]Message message)
        {
            var dbmsg = apiDBContex.Messages.Add(message).Entity;
            apiDBContex.SaveChanges();
            return dbmsg; 
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
