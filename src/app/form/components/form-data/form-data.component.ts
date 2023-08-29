import { Component, OnInit } from '@angular/core';
import { NotionDataService } from '../../../notion-api.service';
import { NotionData } from '../../../models/notion-data-base-items/notion-data-base-items.component';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css'],
})
export class FormDataComponent implements OnInit {
  constructor(private notionService: NotionDataService) {}

  Fila: NotionData = {
    titulo: '',
    descripcion: '',
    autor: '',
    fecha_de_realizacion: this.getFormattedCurrentDate(), // Inicializar fecha con el valor actual
    subida_o_modificada: new Date(), // Inicializar fecha con el valor actual
    hecha: false,
  };

  ngOnInit(): void {
    this.Fila.titulo = '';
    this.Fila.descripcion = '';
    this.Fila.autor = '';
    this.Fila.fecha_de_realizacion = this.getFormattedCurrentDate();
    // this.setInitialDate(); // Llama a la función para inicializar la fecha actual
  }

  capitalizeAutor(autor: string): string {
    return autor.charAt(0).toUpperCase() + autor.slice(1).toLowerCase();
  }

  // Función para obtener la fecha actual en formato 'yyyy-MM-dd'
  getFormattedCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Función para inicializar la fecha con el valor actual
  /* setInitialDate(): void {
    this.Fila.fecha_de_realizacion = this.getFormattedCurrentDate();
 
  } */
  onSubmit() {
    this.Fila.titulo = this.Fila.titulo.toUpperCase();
    this.Fila.autor = this.capitalizeAutor(this.Fila.autor);
    console.log(this.Fila.fecha_de_realizacion);
    // Enviar datos al servidor utilizando el servicio NotionDataService
    this.notionService.postDataFromClient(this.Fila).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.Fila.titulo = '';
        this.Fila.descripcion = '';
        this.Fila.autor = '';
        this.Fila.subida_o_modificada = new Date();
        this.Fila.fecha_de_realizacion = this.getFormattedCurrentDate();
        this.Fila.hecha = false;
        //     this.setInitialDate(); // Vuelve a inicializar la fecha después de enviar los datos
      },
      (error) => {
        console.error('Error en la petición:', error);
        // Maneja los errores aquí si es necesario
      }
    );
  }
}
