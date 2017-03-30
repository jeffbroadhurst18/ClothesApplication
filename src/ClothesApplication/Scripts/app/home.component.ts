import { Component } from "@angular/core";

@Component({
    selector: "home",
    template: `<h2>A directory of Rebecca's wardrobe</h2>
               <clothes-list class="tops"></clothes-list>
               <clothes-list class="trousers"></clothes-list>
               <clothes-list class="shoes"></clothes-list>`,
    styles: [`
        clothes-list {
            min-width: 332px;
            border: 1px solid #aaaaaa;
            display: inline-block;
            margin: 0 10px;
            padding: 10px;
        }
        clothes-list.tops {
            background-color: #f9f9f9;
        }
        clothes-list.trousers {
            background-color: #f0f0f0;
        }
        clothes-list.shoes {
            background-color: #e9e9e9;
        }
    `]
})
export class HomeComponent {
    title = "Welcome View";
}