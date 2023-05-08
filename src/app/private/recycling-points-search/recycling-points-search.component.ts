import { Component, OnInit } from '@angular/core';
import { RecyclingPointsService } from 'src/app/public/service/usuario/recycling-points.service';

@Component({
  selector: 'app-recycling-points-search',
  templateUrl: './recycling-points-search.component.html',
  styleUrls: ['./recycling-points-search.component.css']
})
export class RecyclingPointsSearchComponent implements OnInit {

  constructor(private recyclingPoints : RecyclingPointsService) { }

  ngOnInit(): void {
    //recyclingPoints.listar
  }

  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12
  };
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {
      draggable: false
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  addMarker(event: google.maps.MapMouseEvent) {
    console.log(event)
      if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }
}
//40.730610, -73.935242
