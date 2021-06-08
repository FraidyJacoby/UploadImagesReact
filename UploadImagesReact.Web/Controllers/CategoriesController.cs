using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UploadImagesReact.Data;
using UploadImagesReact.Web.ViewModels;

namespace UploadImagesReact.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private string _connectionString;

        public CategoriesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addcategory")]
        public void AddCategory(AddCategoryViewModel vm)
        {
            var catRepo = new CategoriesRepository(_connectionString);
            catRepo.AddCategory(vm);
        }

        [HttpGet]
        [Route("getallcategories")]
        public List<Category> GetAllCategories()
        {
            var catRepo = new CategoriesRepository(_connectionString);
            return catRepo.GetAllCategories();
        }

        [HttpGet]
        [Route("getsubcategories/{categoryId}")]
        public List<Subcategory> GetSubcategories(int categoryId)
        {
            var catRepo = new CategoriesRepository(_connectionString);
            return catRepo.GetSubcategories(categoryId);
        }

        [HttpPost]
        [Route("addsubcategory")]
        public void AddSubcategory(AddSubcategoryViewModel vm)
        {
            var catRepo = new CategoriesRepository(_connectionString);
            catRepo.AddSubcategory(vm);
        }

        [HttpGet]
        [Route("getcategorytitle/{categoryId}")]
        public string GetCategoryTitle(int categoryId)
        {
            var catRepo = new CategoriesRepository(_connectionString);
            return catRepo.GetCategoryTitle(categoryId);
        }

        [HttpGet]
        [Route("isduplicate/{titleType}/{title}")]
        public bool IsDuplicate(string titleType, string title)
        {
            var repo = new CategoriesRepository(_connectionString);
            return repo.CheckForDuplicate(titleType, title);
        }

    }
}
