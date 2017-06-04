using ClothesApplication.Data.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ClothesApplication.Data
{
    public class DbSeeder
    {
        private ApplicationDbContext DbContext;
        private RoleManager<IdentityRole> RoleManager;
        private UserManager<ApplicationUser> UserManager;

        public DbSeeder(ApplicationDbContext dbContext, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            DbContext = dbContext;
            RoleManager = roleManager;
            UserManager = userManager;
        }

        public async Task CreateUsersAsync()
        {
            // local variables
            DateTime createdDate = DateTime.Now;
            DateTime lastModifiedDate = DateTime.Now;
            string role_Administrators = "Administrators";
            string role_Registered = "Registered";

            //Create Roles (if they doesn't exist yet)
            if (!await RoleManager.RoleExistsAsync(role_Administrators)) await RoleManager.CreateAsync(new IdentityRole(role_Administrators));
            if (!await RoleManager.RoleExistsAsync(role_Registered)) await RoleManager.CreateAsync(new IdentityRole(role_Registered));

            // Create the "Admin" ApplicationUser account (if it doesn't exist already)
            var user_Admin = new ApplicationUser()
            {
                UserName = "Admin",
                Email = "admin@email.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            // Insert "Admin" into the Database and also assign the "Administrator" role to him.
            if (await UserManager.FindByIdAsync(user_Admin.Id) == null)
            {
                await UserManager.CreateAsync(user_Admin, "Pass4Admin");
                await UserManager.AddToRoleAsync(user_Admin, role_Administrators);
                // Remove Lockout and E-Mail confirmation.
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
            }

#if DEBUG
            // Create some sample registered user accounts (if they don't exist already)
            var user_Jeff = new ApplicationUser()
            {
                UserName = "Jeff",
                Email = "jeff@email.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate,
                EmailConfirmed = true,
                LockoutEnabled = false
            };
            var user_Rebecca = new ApplicationUser()
            {
                UserName = "Rebecca",
                Email = "rebecca@email.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate,
                EmailConfirmed = true,
                LockoutEnabled = false
            };
           

            // Insert sample registered users into the Database and also assign the "Registered" role to him.
            if (await UserManager.FindByIdAsync(user_Jeff.Id) == null)
            {
                await UserManager.CreateAsync(user_Jeff, "Pass4Ryan");
                await UserManager.AddToRoleAsync(user_Jeff, role_Registered);
                // Remove Lockout and E-Mail confirmation.
                user_Jeff.EmailConfirmed = true;
                user_Jeff.LockoutEnabled = false;
            }
            if (await UserManager.FindByIdAsync(user_Rebecca.Id) == null)
            {
                await UserManager.CreateAsync(user_Rebecca, "Pass4Rebecca");
                await UserManager.AddToRoleAsync(user_Rebecca, role_Registered);
                // Remove Lockout and E-Mail confirmation.
                user_Rebecca.EmailConfirmed = true;
                user_Rebecca.LockoutEnabled = false;
            }
#endif
            await DbContext.SaveChangesAsync();
        }
    }
}
