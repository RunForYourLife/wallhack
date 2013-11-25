using System.Linq;
using System.Web.Mvc;
using eManager.Domain;
using eManager.Web.Models;

namespace eManager.Web.Controllers
{
    [Authorize(Roles = "Admin")]
    public class EmployeeController : Controller
    {
        private readonly IDepartmentDataSource _db;

        public EmployeeController(IDepartmentDataSource db)
        {
            _db = db;
        }

        [HttpGet]
        public ActionResult Create(int departmentId)
        {
            var model = new CreateEmployeeViewModel();
            model.DepartmentId = departmentId;
            return View(model);
        }

        [HttpPost]
        public ActionResult Create(CreateEmployeeViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var dept = _db.Departments.Single(x => x.Id == viewModel.DepartmentId);
                var employee = new Employee
                    {
                        Name = viewModel.Name,
                        HireDate = viewModel.HireDate
                    };
                dept.Employees.Add(employee);
                _db.Save();

                return RedirectToAction("detail", "department", new {id = viewModel.DepartmentId});
            }
            return View(viewModel);
        }
    }
}