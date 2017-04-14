import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from "@angular/common";

@Pipe({ name: 'transformCategory' })
export class TransformCategoryPipe implements PipeTransform {
    transform(input: number): string {
        switch (input) {
            case 1: { return 'Tops'; }
            case 2: { return 'Trousers'; }
            case 3: { return 'Shoes'; }
        }
    }
}

@Pipe({ name: 'transformDate' })
export class TransformDatePipe implements PipeTransform {
    datePipe: DatePipe;
    transform(input: Date): string {
        this.datePipe = new DatePipe();
        return this.datePipe.transform(input);
    }
}