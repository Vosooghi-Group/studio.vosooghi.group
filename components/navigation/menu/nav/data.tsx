import { IoLogoLinkedin } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
export const links = [
     {
         title: "صفحه اصلی",
         href: "/"
     },
     {
         title: "خدمات ",
         href: "/#about"
     },
     {
         title: "نمونه کارها",
         href: "/#showcases"
     },
     {
         title: "وبلاگ",
         href: "/#blogs"
     },
     {
         title: "تماس باما",
         href: "/#contact"
     }
 ]
 
 export const footerLinks = [
     {
         title: "Linkedin",
         href: "https://www.linkedin.com/company/vosooghi-studio/" ,
         icon : <IoLogoLinkedin size={20} />, 
     },
     {
         title: "Telegram",
         href: "https://t.me/vosooghi_studio",
         icon : <FaTelegram size={20} /> 
     },
     {
         title: "Instagram",
         href: "https://www.instagram.com/vosooghi.studio/",
         icon : <FaInstagram size={20} />
     },
     {
         title: "9926667069",
         href: "/",
         icon : <FaPhoneAlt size={18} />
     },
     
 ]