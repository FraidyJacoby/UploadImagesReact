using System;
using System.Collections.Generic;
using System.Text;

namespace UploadImagesReact.Data
{
    public class UploadedImage
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
    }
}
