using System;
using System.Collections.Generic;

namespace UploadImagesReact.Data
{
    public class Category
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<Subcategory> Subcategories { get; set; }
    }
}
