using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UploadImagesReact.Data
{
    public class UploadedImageRepository
    {
        private string _connectionString;

        public UploadedImageRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddFile(UploadedImage image)
        {
            using (var ctx = new UploadedImageContext(_connectionString))
            {
                ctx.UploadedImages.Add(image);
                ctx.SaveChanges();
            }
        }

        public List<UploadedImage> GetByCategory(int categoryId)
        {
            using(var ctx = new UploadedImageContext(_connectionString))
            {
                return ctx.UploadedImages.Where(image => image.CategoryId == categoryId).ToList();
            }
        }

        public List<UploadedImage> GetBySubcategory(int subcategoryId)
        {
            using (var ctx = new UploadedImageContext(_connectionString))
            {
                return ctx.UploadedImages.Where(image => image.SubcategoryId == subcategoryId).ToList();
            }
        }
    }
}
