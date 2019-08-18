using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace MessageBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost
            .CreateDefaultBuilder(args)
            .UseKestrel()
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseUrls("https://localhost:5001", "https://odin:5001", "https://192.168.100.129:5001")
            .UseIISIntegration()
            .UseStartup<Startup>();
    }
}
