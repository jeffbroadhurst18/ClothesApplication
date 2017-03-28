import { Pipe, PipeTransform } from '@angular/core';

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