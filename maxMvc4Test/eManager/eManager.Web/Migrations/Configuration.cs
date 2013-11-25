using eManager.Domain;
using System.Data.Entity.Migrations;

namespace eManager.Web.Migrations
{

    internal sealed class Configuration : DbMigrationsConfiguration<eManager.Web.Infraestructure.DepartmentDb>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(eManager.Web.Infraestructure.DepartmentDb context)
        {
            context.Departments.AddOrUpdate(x => x.Name
                                            , new Department {Name = "Human Resource"}
                                            , new Department {Name = "Shipping"}
                                            , new Department {Name = "Sales"}
                                            , new Department {Name = "Engineering"});
        }
    }
}
