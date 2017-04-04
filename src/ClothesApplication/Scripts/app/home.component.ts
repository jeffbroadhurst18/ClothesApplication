﻿import { Component } from "@angular/core";

@Component({
    selector: "home",
    template: `<h2>A directory of Rebecca's wardrobe</h2>
               <div class="col-md-4">
               <clothes-list class="tops"></clothes-list>
               </div>
               <div class="col-md-4">
               <clothes-list class="trousers"></clothes-list>
               </div>
               <div class="col-md-4">               
               <clothes-list class="shoes"></clothes-list>
               </div>`
})
export class HomeComponent {
    title = "Welcome View";
}