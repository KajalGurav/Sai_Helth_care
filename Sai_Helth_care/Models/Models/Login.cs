using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sai_Helth_care.Models
{
    public class Login
    {
        public string USER_NAME { get; set; }
        public string PASSWORD { get; set; }
        public string EMP_NAME { get; set; }
        public string COMPANY_ID { get; set; }
        public bool RememberMe { get; set; }
        [DisplayName("Enter Mobile Number:")]
        [Remote("IsFARMERAvailable", "UserMaster", ErrorMessage = "Mobile Number already in use.")]
        [RegularExpression("[789][0-9]{9}", ErrorMessage = "Invalid Mobile Number")]
        [Required(ErrorMessage = "Mobile Number is required.")]
        [MinLength(10, ErrorMessage = "Mobile Number cannot be Smaller than 10 digits.")]
        [MaxLength(10, ErrorMessage = "Mobile Number cannot be longer than 10 digits.")]
        public string CONTACT_NO { get; set; }
    }
}