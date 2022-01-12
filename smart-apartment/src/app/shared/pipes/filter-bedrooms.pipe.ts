import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBedrooms',
})
export class FilterBedroomsPipe implements PipeTransform {
  transform(
    items: any[],
    studio: boolean,
    oneBed: boolean,
    twoBed: boolean,
    threeBed: boolean
  ) {
    if (!items) {
      return items;
    }

    if (studio && !oneBed && !twoBed && !threeBed) {
      return this.filterBedrooms(items, 0);
    } else if (!studio && oneBed && !twoBed && !threeBed) {
      return this.filterBedrooms(items, 1);
    } else if (!studio && !oneBed && twoBed && !threeBed) {
      return this.filterBedrooms(items, 2);
    } else if (!studio && !oneBed && !twoBed && threeBed) {
      return this.filterBedrooms(items, 3);
    } else if (!studio && !oneBed && !twoBed && !threeBed) {
      return [];
    }

    return items;
  }

  filterBedrooms(items: any[], bedRoomsCount: number) {
    return items.filter((item) =>
      item.floorplans.some((plan: any) => plan.bedrooms === bedRoomsCount)
    );
  }
}
