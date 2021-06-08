using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UploadImagesReact.Web.Controllers
{
    public class ImagesController : Controller
    {
        public IActionResult GetImage(string fileName)
        {
            var bytes = System.IO.File.ReadAllBytes($"uploads/{fileName}");
            return File(bytes, "image/jpeg");
        }
    }
}
