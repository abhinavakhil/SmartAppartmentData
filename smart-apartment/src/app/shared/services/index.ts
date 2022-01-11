import { ApartmentService } from '@app/shared/services/apartment/apartment.service';
import { MapService } from '@app/shared/services/map/map.service';
import { CommonService } from './common/common.service';

export { ApartmentService } from '@app/shared/services/apartment/apartment.service';
export { MapService } from '@app/shared/services/map/map.service';

const Services: any = [ApartmentService, CommonService, MapService];

export { Services };
