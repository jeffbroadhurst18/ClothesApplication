System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ClothesItem;
    return {
        setters: [],
        execute: function () {
            ClothesItem = class ClothesItem {
                constructor(Id, Type, Description, Shop, LastWornDate, LastWornDateString, WornCount, CreatedDate, LastModifiedDate) {
                    this.Id = Id;
                    this.Type = Type;
                    this.Description = Description;
                    this.Shop = Shop;
                    this.LastWornDate = LastWornDate;
                    this.LastWornDateString = LastWornDateString;
                    this.WornCount = WornCount;
                    this.CreatedDate = CreatedDate;
                    this.LastModifiedDate = LastModifiedDate;
                }
            };
            exports_1("ClothesItem", ClothesItem);
        }
    };
});
