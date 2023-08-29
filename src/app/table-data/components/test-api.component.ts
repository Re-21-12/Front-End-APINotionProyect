// data.component.ts
import { Component, OnInit } from '@angular/core';
import { NotionDataService } from '../../notion-api.service';
import { NotionData } from '../../models/notion-data-base-items/notion-data-base-items.component'; // Corregir la importación del modelo

@Component({
  selector: 'app-data',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css'],
})
export class DataComponent implements OnInit {
  //Info sin filtrar
  databaseItems: NotionData[] = [];
  //Info filtrada
  filterDataNotionDB: NotionData[] = [];
  filterDataDateNotionDB: NotionData[] = [];

  searchTerm: string = '';
  searchState: boolean | undefined = undefined;

  //fecha por dia, semana y mes
  actualDate: string = 'Todas';
  //fecha de la tarea
  //totales
  totalTareas: number = 0;
  tareasPendientes: number = 0;
  tareasRealizadas: number = 0;
  isDarkMode = false;
  constructor(private notionDataService: NotionDataService) {}
  //carga la informacion al principio de carrgar el componente
  ngOnInit(): void {
    this.getDatabaseItems();
    // Aplicar otros filtros si es necesario
    this.filterData();
    this.filterDataState();
    // Llamar a filterDataToday() después de aplicar otros filtros
    this.filterDataToday();
    //implementado estado en el local storage
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode) {
      this.isDarkMode = JSON.parse(storedMode);
    }
  }
  //modo oscuro
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    // Guardar el estado en el Local Storage
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
  }
  //creando un scroll infinito
  onScroll() {}
  getDatabaseItems(): void {
    this.notionDataService.getDataFromNotionApi().subscribe(
      (data) => {
        /*  console.log( data[0].id) */
        this.databaseItems = data;
        this.filterDataNotionDB = data;
        this.filterDataDateNotionDB = data;
        //muestra la info inicialmente
        this.calculateTasks();
      },
      (error) => {
        console.error(
          'Error al obtener los datos de Notion desde la API:',
          error
        );
      }
    );
  }
  //busca en el arreglo cargado una tarea
  filterData(): void {
    //.filter filtra informacion de un arreglo
    this.filterDataNotionDB = this.databaseItems.filter((item) => {
      return item.titulo.toUpperCase().includes(this.searchTerm.toUpperCase());
    });
    this.calculateTasks();
  }
  //muestra el estado de las tareas realizadas
  filterDataState(): void {
    //si la busqueda es distinta de nula
    if (this.searchState !== undefined) {
      //copia el arreglo filtrado
      this.filterDataNotionDB = this.databaseItems.filter((item) => {
        //retorna valores
        return item.hecha == this.searchState;
      });
    } else {
      // Si no se ha seleccionado ningún estado, muestra todos los elementos
      //si alguno es nulo
      this.filterDataNotionDB = this.databaseItems;
    }
    this.calculateTasks();
  }
  //calcula las tareas pendientes, realizadas y el total
  calculateTasks(): void {
    this.totalTareas = this.databaseItems.length;

    //filtra las tareas que no sean verdaderas y obtiene el tamanio
    this.tareasPendientes = this.databaseItems.filter(
      (item) => !item.hecha
    ).length;
    //filtra las tareas que sean verdaderas y obtiene el tamanio
    this.tareasRealizadas = this.databaseItems.filter(
      (item) => item.hecha
    ).length;
  }

  //calcular cuantos dias faltan para queu la tarea se venza
  filterDataDate(): void {
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    this.filterDataNotionDB = this.databaseItems.filter((item) => {
      if (this.actualDate === 'Todas') {
        this.filterDataNotionDB = this.databaseItems;
        return true;
      } else if (item.fecha_de_realizacion !== undefined) {
        // Convertir la fecha de realización a un objeto Date
        const fechaRealizacion = new Date(item.fecha_de_realizacion);

        if (this.actualDate === 'Hoy' && fechaRealizacion >= today) {
          alert(`La tarea '${item.titulo}' está a punto de vencerse hoy.`);
          return true;
        } else if (
          this.actualDate === 'Mes' &&
          fechaRealizacion >= startOfMonth
        ) {
          return true;
        } else if (
          this.actualDate === 'Semana' &&
          fechaRealizacion >= weekAgo
        ) {
          return true;
        }
      }
      return false;
    });

    this.calculateTasks();
  }

  filterDataToday(): void {
    const today = new Date();

    this.filterDataDateNotionDB = this.databaseItems.filter((item) => {
      // Convertir la fecha de realización a un objeto Date
      const fechaRealizacion = new Date(item.fecha_de_realizacion);

      const timeDiff = fechaRealizacion.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff <= 1 && daysDiff > 0) {
        return true;
      }
      return false;
    });
  }
}
