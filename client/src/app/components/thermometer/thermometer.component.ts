import { Component, OnInit, Input } from '@angular/core';
import { TrackFeature } from '../../data/track-feature';
import * as chroma from 'chroma-js';
@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //TODO: define Input fields and bind them to the template.
  @Input() feature: TrackFeature;

  constructor() { }

  ngOnInit() {
  }

}
