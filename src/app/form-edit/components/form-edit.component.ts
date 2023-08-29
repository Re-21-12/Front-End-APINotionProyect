import { Component, OnInit } from '@angular/core';
import { NotionDataService } from '../../notion-api.service';
import { NotionData } from '../../models/notion-data-base-items/notion-data-base-items.component';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css'],
})
export class FormEditComponent implements OnInit {
  itemId: string = '';
  notionData: NotionData = {
    titulo: '',
    autor: '',
    descripcion: '',
    hecha: false,
    fecha_de_realizacion: this.getFormattedCurrentDate(),
    subida_o_modificada: new Date(),
  };
  notionDataSubmit = {
    titulo: '',
    autor: '',
    descripcion: '',
    hecha: false,
    fecha_de_realizacion: '',
    subida_o_modificada: new Date(),
  };
  arregloDeDatos: NotionData[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private notionDataService: NotionDataService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.itemId = params['id'];

      this.notionDataService.getDataFromNotionApi().subscribe(
        (data) => {
          this.arregloDeDatos = data;
          const foundItem = this.arregloDeDatos.find(
            (item) => item.id === this.itemId
          );
//copiar datos del arreglo
          this.notionData = { ...this.notionData, ...foundItem };
          const formattedDate = this.formatToISODate(
            new Date(this.notionData.fecha_de_realizacion)
          );
          //mapearlo en el que se va a subir
          this.notionDataSubmit = {
            titulo: this.notionData.titulo,
            autor: this.notionData.autor,
            descripcion: this.notionData.descripcion,
            hecha: this.notionData.hecha,
            fecha_de_realizacion: formattedDate,
            subida_o_modificada: new Date(),
          };
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    });
  }

  private capitalizeAutor(autor: string): string {
    return autor.charAt(0).toUpperCase() + autor.slice(1).toLowerCase();
  }
//obtener fecha en ISO para hoy
  private getFormattedCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
// conversion de fecha en ISO para la fecha obtenida
  private formatToISODate(date: Date): string {
    if (date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  }
//subir y utilizar las conversiones
  onSubmit(): void {
    this.notionData.titulo = this.notionData.titulo.toUpperCase();
    this.notionData.autor = this.capitalizeAutor(this.notionData.autor!);

    if (
      typeof this.notionDataSubmit.fecha_de_realizacion === 'string' &&
      this.notionDataSubmit.fecha_de_realizacion.trim() !== ''
    ) {
      this.notionDataService
        .patchDataFromClient(this.itemId, this.notionDataSubmit)
        .subscribe(
          (response) => {
            console.log('Datos actualizados:', response);
            // Restaurar el objeto de datos después de la actualización
            this.notionDataSubmit = {
              titulo: this.notionDataSubmit.titulo,
              autor: this.notionDataSubmit.autor,
              descripcion: this.notionDataSubmit.descripcion,
              hecha: this.notionDataSubmit.hecha,
              fecha_de_realizacion: this.getFormattedCurrentDate(),
              subida_o_modificada: new Date(),
            };
            // Aquí podrías redirigir al componente de la lista o realizar otras acciones
          },
          (error) => {
            console.error('Error al actualizar los datos:', error);
          }
        );
    } else {
      console.log('Fecha de realización no válida.');
    }
  }
}
