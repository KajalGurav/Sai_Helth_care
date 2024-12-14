using Sai_Helth_care.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Drawing.Imaging;
using System.IO;
using System.Web.Hosting;
using System.Drawing;
using System.Drawing.Drawing2D;

namespace Sai_Helth_care.Controllers
{
    [VerifyUserAttribute]
    public class MindrayProductController : Controller
    {
        private DB_SaiHealthCareEntities1 db = new DB_SaiHealthCareEntities1();
        public static string connectionString = ConfigurationManager.ConnectionStrings["DB_SaiHealthCare"].ConnectionString;
        public static SqlConnection con = new SqlConnection(connectionString);
        static SqlCommand cmd;
        static SqlDataAdapter sda;
        static SqlDataReader sdr;
        static DataTable dt, dt1;

        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public class Search_Admin
        {
            public int PageNo { get; set; }
            public int PageSize { get; set; }
            public string FARMER_NAME { get; set; }
            public string STATE_ID { get; set; }
            public string ROLE_ID { get; set; }

        }

        public JsonResult TotalRecordCount(Search_Admin tB_Admin)
        {
            int i = 0;
            try
            {
                cmd = new SqlCommand("Get_Tb_MindrayProduct_Count", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
                cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Json(new { success = i }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetadminById(int id)
        {
            var _getadmin = db.Tb_Product.Where(z => z.P_ID == id).Select(s => new { s.P_ID, s.CAT_ID, s.PRODUCT_NAME, s.PRODUCT_IMAGE, s.DESCRIPTION, s.CONFIGURATION, s.STATUS, s.REG_DATE, s.HSN_CODE }).FirstOrDefault();
            return Json(_getadmin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetallAdmin(Search_Admin tB_Admin)
        {
            cmd = new SqlCommand("Panel_Get_Tb_MindrayProduct", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageSize", tB_Admin.PageSize);
            cmd.Parameters.AddWithValue("@PageNo", tB_Admin.PageNo - 1);
            cmd.Parameters.AddWithValue("@FARMER_NAME", tB_Admin.FARMER_NAME);
            cmd.Parameters.AddWithValue("@STATE_ID", tB_Admin.STATE_ID);
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
            con.Open();
            dt = new DataTable();
            sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            con.Close();
            MindrayCategory rt;
            List<MindrayCategory> FinalreportList = new List<MindrayCategory>();
            if (dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    rt = new MindrayCategory();
                    try
                    {

                        rt.P_ID = Convert.ToInt64(dt.Rows[i]["P_ID"]);
                        rt.CAT_ID = dt.Rows[i]["CAT_ID"] is DBNull ? (long?)null : Convert.ToInt64(dt.Rows[i]["CAT_ID"]);
                        rt.PRODUCT_NAME = (dt.Rows[i]["PRODUCT_NAME"].ToString());
                        rt.PRODUCT_IMAGE = (dt.Rows[i]["PRODUCT_IMAGE"].ToString());
                        rt.HSN_CODE = (dt.Rows[i]["HSN_CODE"].ToString());
                        rt.DESCRIPTION = (dt.Rows[i]["DESCRIPTION"].ToString());
                        rt.CONFIGURATION = (dt.Rows[i]["CONFIGURATION"].ToString());
                        rt.STATUS = (dt.Rows[i]["STATUS"].ToString());
                        rt.REG_DATE = (dt.Rows[i]["REG_DATE"].ToString());

                    }
                    catch (Exception ex)
                    {
                    }
                    FinalreportList.Add(rt);
                }

            }
            var _Monthlyreport = FinalreportList;
            return Json(_Monthlyreport, JsonRequestBehavior.AllowGet);
        }


        //public ActionResult AddAdmin(MindrayCategory tB_admin)
        //{
        //    try
        //    {
        //        string OTP = Master.RandomString(6);
        //        if (tB_admin.PRODUCT_IMAGE == "Yes")
        //        {
        //            string fileName = tB_admin.ImageName;
        //            string extension = tB_admin.ImageExtension;
        //            fileName = "Banner" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
        //            string fileName1 = fileName;
        //            tB_admin.PRODUCT_IMAGE = Master.serverurl + "/UploadedImages/" + fileName;
        //            fileName = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName);

        //            if (tB_admin.PRODUCT_IMAGE != string.Empty)
        //            {
        //                byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
        //                MemoryStream mem = new MemoryStream(imageByteData);
        //                System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
        //                if (extension.ToLower() == ".png")
        //                {
        //                    img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName1), ImageFormat.Png);
        //                }
        //                else
        //                {
        //                    img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName1), ImageFormat.Jpeg);
        //                }
        //            }
        //        }
        //        else
        //        {
        //            tB_admin.PRODUCT_IMAGE = null;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //    }
        //    try
        //    {
        //        cmd = new SqlCommand("Insert_TB_MindrayProduct", con);
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.Parameters.AddWithValue("@CAT_ID", tB_admin.CAT_ID);
        //        cmd.Parameters.AddWithValue("@PRODUCT_NAME", tB_admin.PRODUCT_NAME);
        //        cmd.Parameters.AddWithValue("@HSN_CODE", tB_admin.HSN_CODE);
        //        cmd.Parameters.AddWithValue("@PRODUCT_IMAGE", tB_admin.PRODUCT_IMAGE);
        //        cmd.Parameters.AddWithValue("@DESCRIPTION", tB_admin.DESCRIPTION);
        //        cmd.Parameters.AddWithValue("@CONFIGURATION", tB_admin.CONFIGURATION);
        //        cmd.Connection = con;
        //        if (con.State == System.Data.ConnectionState.Open)
        //        {
        //            con.Close();
        //        }
        //        con.Open();
        //        int i = Convert.ToInt32(cmd.ExecuteScalar());
        //        con.Close();
        //        if (i == -1)
        //        {
        //            return Json(new { success = false });

        //        }
        //        else
        //        {
        //            return Json(new { success = true });
        //        }
        //    }
        //    catch (Exception ex)
        //    {


        //    }

        //    return View("Index");
        //}
        public ActionResult AddAdmin(MindrayCategory tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.PRODUCT_IMAGE == "Yes")
                {
                    if (string.IsNullOrEmpty(tB_admin.ImageName) || string.IsNullOrEmpty(tB_admin.ImageExtension) || string.IsNullOrEmpty(tB_admin.ImageBase64Data))
                    {
                        throw new ArgumentException("ImageName, ImageExtension, or ImageBase64Data cannot be null or empty.");
                    }

                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;
                    string fileName1 = "Banner" + OTP + DateTime.Now.ToString("ddMMyyyy") + extension;
                    tB_admin.PRODUCT_IMAGE = Master.serverurl + "/UploadedImages/" + fileName1;
                    string filePath = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName1);

                    byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                    using (MemoryStream mem = new MemoryStream(imageByteData))
                    {
                        using (System.Drawing.Image img = System.Drawing.Image.FromStream(mem))
                        {
                            ImageFormat format = extension.ToLower() == ".png" ? ImageFormat.Png : ImageFormat.Jpeg;
                            img.Save(filePath, format);
                        }
                    }
                }
                else
                {
                    tB_admin.PRODUCT_IMAGE = null;
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine("Exception during image processing: " + ex.Message);
                return Json(new { success = false, message = "An error occurred while processing the image." });
            }

            try
            {
                using (SqlCommand cmd = new SqlCommand("Insert_TB_MindrayProduct", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CAT_ID", tB_admin.CAT_ID);
                    cmd.Parameters.AddWithValue("@PRODUCT_NAME", tB_admin.PRODUCT_NAME);
                    cmd.Parameters.AddWithValue("@HSN_CODE", tB_admin.HSN_CODE);
                    cmd.Parameters.AddWithValue("@PRODUCT_IMAGE", tB_admin.PRODUCT_IMAGE);
                    cmd.Parameters.AddWithValue("@DESCRIPTION", tB_admin.DESCRIPTION);
                    cmd.Parameters.AddWithValue("@CONFIGURATION", tB_admin.CONFIGURATION);
                    cmd.Connection = con;

                    if (con.State == ConnectionState.Open)
                    {
                        con.Close();
                    }

                    con.Open();
                    int result = Convert.ToInt32(cmd.ExecuteScalar());
                    con.Close();

                    return Json(new { success = result != -1 });
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine("Exception during database operation: " + ex.Message);
                return Json(new { success = false, message = "An error occurred while inserting data into the database." });
            }

            return View("Index");
        }


        //public ActionResult AddAdmin(MindrayCategory tB_admin)
        //{
        //    try
        //    {
        //        string OTP = Master.RandomString(6);
        //        if (tB_admin.PRODUCT_IMAGE == "Yes")
        //        {
        //            if (string.IsNullOrEmpty(tB_admin.ImageName) || string.IsNullOrEmpty(tB_admin.ImageExtension) || string.IsNullOrEmpty(tB_admin.ImageBase64Data))
        //            {
        //                throw new ArgumentException("ImageName, ImageExtension, or ImageBase64Data cannot be null or empty.");
        //            }

        //            string fileName = tB_admin.ImageName;
        //            string extension = tB_admin.ImageExtension;
        //            string fileName1 = "Banner" + OTP + DateTime.Now.ToString("ddMMyyyy") + extension;
        //            tB_admin.PRODUCT_IMAGE = Master.serverurl + "/UploadedImages/" + fileName1;
        //            string filePath = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName1);

        //            byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
        //            using (MemoryStream mem = new MemoryStream(imageByteData))
        //            {
        //                using (System.Drawing.Image img = System.Drawing.Image.FromStream(mem))
        //                {
        //                    int newWidth = 512;
        //                    int newHeight = 512;
        //                    using (Bitmap resizedImg = new Bitmap(newWidth, newHeight))
        //                    {
        //                        using (Graphics g = Graphics.FromImage(resizedImg))
        //                        {
        //                            g.CompositingQuality = CompositingQuality.HighQuality;
        //                            g.SmoothingMode = SmoothingMode.HighQuality;
        //                            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
        //                            g.DrawImage(img, 0, 0, newWidth, newHeight);
        //                        }

        //                        ImageFormat format = extension.ToLower() == ".png" ? ImageFormat.Png : ImageFormat.Jpeg;
        //                        resizedImg.Save(filePath, format);
        //                    }
        //                }
        //            }
        //        }
        //        else
        //        {
        //            tB_admin.PRODUCT_IMAGE = null;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Log the exception
        //        Console.WriteLine("Exception during image processing: " + ex.Message);
        //        return Json(new { success = false, message = "An error occurred while processing the image." });
        //    }

        //    try
        //    {
        //        using (SqlCommand cmd = new SqlCommand("Insert_TB_MindrayProduct", con))
        //        {
        //            cmd.CommandType = CommandType.StoredProcedure;
        //            cmd.Parameters.AddWithValue("@CAT_ID", tB_admin.CAT_ID);
        //            cmd.Parameters.AddWithValue("@PRODUCT_NAME", tB_admin.PRODUCT_NAME);
        //            cmd.Parameters.AddWithValue("@HSN_CODE", tB_admin.HSN_CODE);
        //            cmd.Parameters.AddWithValue("@PRODUCT_IMAGE", tB_admin.PRODUCT_IMAGE);
        //            cmd.Parameters.AddWithValue("@DESCRIPTION", tB_admin.DESCRIPTION);
        //            cmd.Parameters.AddWithValue("@CONFIGURATION", tB_admin.CONFIGURATION);
        //            cmd.Connection = con;

        //            if (con.State == ConnectionState.Open)
        //            {
        //                con.Close();
        //            }

        //            con.Open();
        //            int result = Convert.ToInt32(cmd.ExecuteScalar());
        //            con.Close();

        //            return Json(new { success = result != -1 });
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Log the exception
        //        Console.WriteLine("Exception during database operation: " + ex.Message);
        //        return Json(new { success = false, message = "An error occurred while inserting data into the database." });
        //    }

        //    return View("Index");
        //}



        public ActionResult EditAdmin(MindrayCategory tB_admin)
        {
            try
            {
                string OTP = Master.RandomString(6);
                if (tB_admin.PRODUCT_IMAGE == "Yes")
                {
                    string fileName = tB_admin.ImageName;
                    string extension = tB_admin.ImageExtension;
                    fileName = "Banner" + OTP + DateTime.Now.ToString("ddmmyyyy") + extension;
                    string fileName1 = fileName;
                    tB_admin.PRODUCT_IMAGE = Master.serverurl + "/UploadedImages/" + fileName;
                    fileName = Path.Combine(Server.MapPath("~/UploadedImages/"), fileName);
                    if (tB_admin.PRODUCT_IMAGE != string.Empty)
                    {
                        byte[] imageByteData = Convert.FromBase64String(tB_admin.ImageBase64Data);
                        MemoryStream mem = new MemoryStream(imageByteData);
                        System.Drawing.Image img = System.Drawing.Image.FromStream(mem);
                        img.Save(HostingEnvironment.MapPath("~/UploadedImages/" + fileName1), ImageFormat.Jpeg);
                    }
                }
                else
                {
                    //tB_admin.PRODUCT_IMAGE = "";
                }
            }
            catch (Exception ex)
            {
            }
            try
            {
                cmd = new SqlCommand("Update_Tb_MindrayProduct", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@P_ID", tB_admin.P_ID);
                cmd.Parameters.AddWithValue("@CAT_ID", tB_admin.CAT_ID);
                cmd.Parameters.AddWithValue("@PRODUCT_NAME", tB_admin.PRODUCT_NAME);
                cmd.Parameters.AddWithValue("@HSN_CODE", tB_admin.HSN_CODE);
                cmd.Parameters.AddWithValue("@PRODUCT_IMAGE", tB_admin.PRODUCT_IMAGE);
                cmd.Parameters.AddWithValue("@DESCRIPTION", tB_admin.DESCRIPTION);
                cmd.Parameters.AddWithValue("@CONFIGURATION", tB_admin.CONFIGURATION);
                cmd.Connection = con;
                if (con.State == System.Data.ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                int i = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
                if (i == -1)
                {
                    return Json(new { success = false });

                }
                else
                {
                    return Json(new { success = true });
                }
            }
            catch (Exception ex)
            {


            }

            return View("Index");
        }




        [HttpPost]
        public ActionResult UploadProductImage(HttpPostedFileBase PRODUCT_IMAGE, int productId)
        {
            if (PRODUCT_IMAGE != null && PRODUCT_IMAGE.ContentLength > 0)
            {
                try
                {
                    var fileName = Path.GetFileNameWithoutExtension(PRODUCT_IMAGE.FileName);
                    var extension = Path.GetExtension(PRODUCT_IMAGE.FileName);
                    var uniqueFileName = $"{fileName}_{Guid.NewGuid()}{extension}";

                    var filePath = Path.Combine(Server.MapPath("~/Images/Products"), uniqueFileName);
                    

                    using (var originalImage = Image.FromStream(PRODUCT_IMAGE.InputStream))
                    {
                        var resizedImage = ResizeImage(originalImage, 512, 512);
                        resizedImage.Save(filePath, ImageFormat.Jpeg);
                    }

                    using (var dbContext = new DB_SaiHealthCareEntities1())
                    {
                        var product = dbContext.Tb_MindrayProduct.Find(productId);
                        if (product != null)
                        {
                            product.PRODUCT_IMAGE = "/Images/Products/" + uniqueFileName;
                            dbContext.SaveChanges();
                        }
                    }

                    ViewBag.ProductImagePath = "/Images/Products/" + uniqueFileName;
                }
                catch (Exception ex)
                {
                    // Log the exception and handle it appropriately
                    // e.g., Logger.Error(ex);
                    ViewBag.ErrorMessage = "An error occurred while uploading the image.";
                }
            }

            return View();
        }

        private Image ResizeImage(Image image, int width, int height)
        {
            var destRect = new Rectangle(0, 0, width, height);
            var destImage = new Bitmap(width, height);

            destImage.SetResolution(image.HorizontalResolution, image.VerticalResolution);

            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(image, destRect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }

            return destImage;
        }
    }







}
