using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using eManager.Domain;

namespace eManager.Web.Controllers
{
    public class DepartmentController : Controller
    {

        private readonly IDepartmentDataSource _db;

        public DepartmentController(IDepartmentDataSource db)
        {
            _db = db;
        }

        public ActionResult Detail(int id)
        {
            var model = _db.Departments.Single(x => x.Id == id);
            return View(model);
        }
    }
}
