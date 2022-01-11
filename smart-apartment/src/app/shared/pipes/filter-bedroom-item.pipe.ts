import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBedroomItem',
})
export class FilterBedroomItemPipe implements PipeTransform {
  transform(
    floorplans: any[],
    studio: boolean,
    oneBed: boolean,
    twoBed: boolean,
    threeBed: boolean
  ) {
    if (!floorplans) {
      return floorplans;
    }

    if (studio && !oneBed && !twoBed && !threeBed) {
      return this.filterBedroomItems(floorplans, 0);
    } else if (!studio && oneBed && !twoBed && !threeBed) {
      return this.filterBedroomItems(floorplans, 1);
    } else if (!studio && !oneBed && twoBed && !threeBed) {
      return this.filterBedroomItems(floorplans, 2);
    } else if (!studio && !oneBed && !twoBed && threeBed) {
      return this.filterBedroomItems(floorplans, 3);
    } else if (!studio && !oneBed && !twoBed && !threeBed) {
      return [];
    }

    return floorplans;
  }

  filterBedroomItems(items: any[], bedRoomsCount: number) {
    return items.filter((item) => item.bedrooms === bedRoomsCount);
  }
}
