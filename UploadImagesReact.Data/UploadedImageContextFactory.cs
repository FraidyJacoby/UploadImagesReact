using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace UploadImagesReact.Data
{
    public class UploadedImageContextFactory : IDesignTimeDbContextFactory<UploadedImageContext>
    {
        public UploadedImageContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}UploadImagesReact.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new UploadedImageContext(config.GetConnectionString("ConStr"));
        }
    }
}
