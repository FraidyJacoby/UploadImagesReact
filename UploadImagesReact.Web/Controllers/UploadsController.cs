using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UploadImagesReact.Data;
using UploadImagesReact.Web.ViewModels;

namespace UploadImagesReact.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadsController : ControllerBase
    {
        private string _connectionString;

        public UploadsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addfile")]
        public void AddFile(UploadViewModel vm)
        {
            var firstComma = vm.Base64File.IndexOf(',');
            var base64 = vm.Base64File.Substring(firstComma + 1);
            var fileContents = Convert.FromBase64String(base64);

            var g = Guid.NewGuid();
            var ext = Path.GetExtension(vm.FileName);
            var fileName = $"{g}{ext}";
            System.IO.File.WriteAllBytes($"uploads/{fileName}", fileContents);

            var repo = new UploadedImageRepository(_connectionString);
            repo.AddFile(new UploadedImage {
                FileName = fileName,
                Description = vm.Description,
                CategoryId = vm.CategoryId,
                SubcategoryId = vm.SubcategoryId
            });
        }

        [HttpGet]
        [Route("getbycategory/{categoryId}")]
        public List<UploadedImage> GetByCategory(int categoryId)
        {
            var repo = new UploadedImageRepository(_connectionString);
            return repo.GetByCategory(categoryId);
        }

        [HttpGet]
        [Route("getbysubcategory/{subcategoryId}")]
        public List<UploadedImage> GetBySubcategory(int subcategoryId)
        {
            var repo = new UploadedImageRepository(_connectionString);
            return repo.GetBySubcategory(subcategoryId);
        }
    }
}
