import { FilterBedroomItemPipe } from './filter-bedroom-item.pipe';
import { FilterBedroomsPipe } from './filter-bedrooms.pipe';
import { FilterPriceItemPipe } from './filter-price-item.pipe';
import { FilterPricePipe } from './filter-price.pipe';

const Pipes = [
  FilterPricePipe,
  FilterPriceItemPipe,
  FilterBedroomsPipe,
  FilterBedroomItemPipe,
];

export { Pipes };
