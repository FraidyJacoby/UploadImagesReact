using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UploadImagesReact.Data
{
    public class CategoriesRepository
    {
        private string _connectionString;

        public CategoriesRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddCategory(Category category)
        {
            using(var ctx = new UploadedImageContext(_connectionString))
            {
                ctx.Categories.Add(category);
                ctx.SaveChanges();
            }
        }

        public List<Category> GetAllCategories()
        {
            using(var ctx = new UploadedImageContext(_connectionString))
            {
                return ctx.Categories.ToList();
            }
        }

        public List<Subcategory> GetSubcategories(int categoryId)
        {
            using(var ctx = new UploadedImageContext(_connectionString))
            {
                return ctx.Subcategories.Where(s => s.CategoryId == categoryId).ToList();
            }
        }

        public void AddSubcategory(Subcategory subcategory)
        {
            using(var ctx = new UploadedImageContext(_connectionString))
            {
                ctx.Subcategories.Add(subcategory);
                ctx.SaveChanges();
            }
        }

        public string GetCategoryTitle(int categoryId)
        {
            using(var ctx = new UploadedImageContext(_connectionString))
            {
                return ctx.Categories.FirstOrDefault(c => c.Id == categoryId).Title;
            }
        }

        public bool CheckForDuplicate(string titleType, string title)
        {
            using(var ctx = new UploadedImageContext(_connectionString))
            {
                if (titleType == "categories")
                {
                    return ctx.Categories.Any(c => c.Title == title);
                }
                return ctx.Subcategories.Any(s => s.Title == title);
            }
        }
    }
}
