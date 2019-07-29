﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RegistrationForm.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home

        RegisterDbEntities DbContext = new RegisterDbEntities();
        List<tblRegistration> tblemaildetails = new List<tblRegistration>();
       
        [HttpPost]
        public JsonResult Index(tblRegistration details)
        {
            DbContext.tblRegistrations.Add(details);
            DbContext.SaveChanges();

            return Json(details);
        }
        public ActionResult UniqueEmail(string email)
       {
            tblemaildetails = DbContext.tblRegistrations.Where(a => a.Email == email).ToList();
            return Json(tblemaildetails,JsonRequestBehavior.AllowGet);
        }
        public ActionResult Login(string name)
        {
            var logDetails = DbContext.tblRegistrations.Where(a => a.UserName ==
            name).FirstOrDefault();
            return Json(logDetails,JsonRequestBehavior.AllowGet);
         
        }
        public ActionResult GetAllData()
        {
            List<tblRegistration> tblDetails = DbContext.tblRegistrations.ToList();
            return Json(tblDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DeleteRecord(string email)
        {

          tblRegistration DeleteOne=  DbContext.tblRegistrations.Where(a=>a.Email==email).FirstOrDefault();
            // DbContext.re(DeleteOne);
            DbContext.tblRegistrations.Remove(DeleteOne);
            DbContext.SaveChanges();
           return Json(DeleteOne);
        }
    }
}