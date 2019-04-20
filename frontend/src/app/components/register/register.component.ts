import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public title: string;

  constructor() {

    this.title = 'Registra a tu perro';
  }

  ngOnInit() {

    console.log('Componente de Registro cargado...');
    
  }

}
