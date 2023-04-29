import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recycling-points-search',
  templateUrl: './recycling-points-search.component.html',
  styleUrls: ['./recycling-points-search.component.css']
})
export class RecyclingPointsSearchComponent implements OnInit {

  center: google.maps.LatLngLiteral = { lat: 40.730610, lng: -73.935242 }; // Coordenadas de ejemplo
  zoom = 12;
  constructor() { }

  ngOnInit(): void {
  }

}
