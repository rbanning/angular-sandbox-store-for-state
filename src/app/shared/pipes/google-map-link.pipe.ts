import { Pipe, PipeTransform } from '@angular/core';
import { isGeoLocation } from '@app/models';

@Pipe({
  name: 'googleMapLink'
})
export class GoogleMapLinkPipe implements PipeTransform {

  transform(value: unknown): string {
    if (isGeoLocation(value)) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURI(value.lat+','+value.long)}`
    }
    //else
    return 'https//maps.google.com'; //just a link to google maps.
  }

}
