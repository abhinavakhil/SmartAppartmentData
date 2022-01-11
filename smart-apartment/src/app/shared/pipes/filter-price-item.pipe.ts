import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPriceItem',
})
export class FilterPriceItemPipe implements PipeTransform {
  transform(floorplans: any[], filter: number) {
    if (!floorplans || !filter) {
      return floorplans;
    }

    return floorplans.filter((plan) => plan.price <= filter);
  }
}
