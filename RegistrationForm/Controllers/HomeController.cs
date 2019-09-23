using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Text;
using System.IO;

namespace RegistrationForm.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home

        RegisterDbEntities DbContext = new RegisterDbEntities();
        List<tblRegistration> tblemaildetails = new List<tblRegistration>();
        List<Role> RoleInfo = new List<Role>();
        [HttpPost]
        public JsonResult Index(tblRegistration details)
        {

            //string strpass = encryptpass(password);
            DbContext.tblRegistrations.Add(details);
            DbContext.SaveChanges();

            return Json(details);
        }
        public ActionResult UniqueEmail(string email)
        {
            DbContext.Configuration.ProxyCreationEnabled = false;
            tblemaildetails = DbContext.tblRegistrations.Where(a => a.Email == email).ToList();
            return Json(tblemaildetails, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult tryOne(tblRegistration s)
       {
            DbContext.Configuration.ProxyCreationEnabled = false;
         //   tblRegistration d = DbContext.tblRegistrations.Find(Id);
            DbContext.Entry(s).State = EntityState.Modified;
            DbContext.SaveChanges();
            return Json(s, JsonRequestBehavior.AllowGet);


        }

        // [Authorize(Roles = "Admin")]
        public ActionResult Login(string name)
        {
            DbContext.Configuration.ProxyCreationEnabled = false;

            // var roleid = DbContext.Roles.ToList();


            if (name == "Sateesh")
            {
                // return GetAllData();
                var logDetails = DbContext.tblRegistrations.ToList();
                return Json(logDetails, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var logDetails = DbContext.tblRegistrations.Where(a => a.UserName ==
           name).FirstOrDefault();
                return Json(logDetails, JsonRequestBehavior.AllowGet);
            }


        }
        public ActionResult GetAllData()
        {
            DbContext.Configuration.ProxyCreationEnabled = false;
            List<tblRegistration> tblDetails = DbContext.tblRegistrations.ToList();
            return Json(tblDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DeleteRecord(string email)
        {

            tblRegistration DeleteOne = DbContext.tblRegistrations.Where(a => a.Email == email).FirstOrDefault();
            // DbContext.re(DeleteOne);
            DbContext.tblRegistrations.Remove(DeleteOne);
            DbContext.SaveChanges();
            return Json(DeleteOne);
        }
        public ActionResult Update(tblRegistration details)
        {

            RegisterDbEntities DbContext = new RegisterDbEntities();
            DbContext.Entry(details).State = EntityState.Modified;
            DbContext.SaveChanges();

            return View();
        }
        public string encryptpass(string password)
        {
            string msg = "";
            byte[] encode = new byte[password.Length];
            encode = Encoding.UTF8.GetBytes(password);
            msg = Convert.ToBase64String(encode);
            return msg;
        }
        
    }


}
