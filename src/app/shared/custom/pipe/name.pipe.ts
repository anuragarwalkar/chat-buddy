import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customName' })
export class CustomName implements PipeTransform {
    transform(value: string): string {
        try {
            const [[firstChar = ''], [lastFirstChar = '']] = value.split(' ');
            return `${firstChar.toUpperCase()}${lastFirstChar.toUpperCase()}`;
        } catch (error) {
            const [[firstChar = '']] = value.split(' ');
            return `${firstChar.toUpperCase()}`;
        }

    }
}