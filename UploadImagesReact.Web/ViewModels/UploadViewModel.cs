﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UploadImagesReact.Data;

namespace UploadImagesReact.Web.ViewModels
{
    public class UploadViewModel : UploadedImage
    {
        public string Base64File { get; set; }
    }
}