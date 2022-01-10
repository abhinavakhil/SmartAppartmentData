import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPrice',
})
export class FilterPricePipe implements PipeTransform {
  transform(items: any[], filter: number) {
    if (!items || !filter) {
      return items;
    }

    return items.filter((item) =>
      item.floorplans.some((plan: any) => plan.price <= filter)
    );
  }
}
