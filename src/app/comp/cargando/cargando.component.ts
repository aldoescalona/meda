import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.css']
})
export class CargandoComponent implements OnInit {

  @Input() titulo;
  @Input() cargando;

  constructor() { }

  ngOnInit() {
  }

}
