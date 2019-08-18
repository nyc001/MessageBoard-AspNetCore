using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using MessageBackend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace MessageBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApiDBContex>(opt => opt.UseInMemoryDatabase(databaseName:"MessageBoard"));
            services.AddCors(option => option.AddPolicy("Cors",builder=> {
                builder.
                AllowAnyOrigin().
                AllowAnyMethod().
                AllowAnyHeader();
            }));

            

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ApiDBContex apiDBContex)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            

            app.UseCors("Cors");
            app.UseMvc();
            
            SeedData(apiDBContex);
        }

        public static void SeedData(ApiDBContex msgDB)
        {
            msgDB.Messages.Add(new Message {Id="1", Owner = "Tim", Text = "What\'s up" });
            msgDB.Messages.Add(new Message { Id = "2", Owner = "John", Text = "Hello" });
            msgDB.Messages.Add(new Message { Id = "3", Owner = "Rose", Text = "Hello guys" });
            msgDB.Users.Add(new User { FirstName = "Henry", Email = "a", Password1 = "a" });
            msgDB.SaveChanges();
        }
    }
}
