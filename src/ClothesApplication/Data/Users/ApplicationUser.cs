﻿using ClothesApplication.Data.ClothesItems;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ClothesApplication.Data.Users
{
    public class ApplicationUser:IdentityUser
    {
        #region Constructor
        public ApplicationUser()
        {

        }

        public ApplicationUser(string userName) : base(userName)
        {
        }
        #endregion Constructor

        #region Properties
        public string DisplayName { get; set; }
        public string Notes { get; set; }
        [Required]
        public int Type { get; set; }
        [Required]
        public int Flags { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }
        #endregion Properties

        #region Related Properties
        /// <summary>
        /// A list of items wrote by this user: this property will be loaded on first use using EF's Lazy-Loading feature.
        /// </summary>
        public virtual List<ClothesItem> Items { get; set; }

        /// <summary>
        /// A list of comments wrote by this user: this property will be loaded on first use using EF's Lazy-Loading feature.
        /// </summary>
        //public virtual List<Comment> Comments { get; set; }
        #endregion Related Properties
    }
}
