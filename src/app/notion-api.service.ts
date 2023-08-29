// notion-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotionData } from '../app/models/notion-data-base-items/notion-data-base-items.component'; // Importar el modelo NotionData

@Injectable({
  providedIn: 'root',
})
export class NotionDataService {
  private apiUrl = 'https://apinotion.somee.com/api/notion'; // Ajusta la URL de la API según tu configuración
//http://apinotion.somee.com/api/notion
  constructor(private http: HttpClient) {}

  getDataFromNotionApi(): Observable<NotionData[]> {
    return this.http.post<any>(this.apiUrl, {}).pipe(
      map((response) => {
        if (response.object === 'list' && response.results?.length > 0) {
          // Crear un arreglo de NotionData a partir de los resultados de la respuesta

          console.log(response);
          return response.results.map((result: any) => new NotionData(result));
        } else {
          return []; // Si el objeto no es un database o no hay resultados, devolvemos un arreglo vacío
        }
      })
    );
  }
  //Realizando una peticion post al servidor que envia una peticion al api de Notion
  postDataFromClient(data: NotionData): Observable<NotionData> {
    const urlPost = `${this.apiUrl}/newrow`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(urlPost, data, { headers });
  }
//realizando una peticion patch para modificar una fila desde el backend a la notion API
  patchDataFromClient(pageId: string, data: NotionData): Observable<NotionData> {
    const urlPatch = `${this.apiUrl}/updateRow/${pageId}`; // Agrega el pageId a la URL
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<any>(urlPatch, data, { headers });
  }
 /*  getDataById(id: string): Observable<NotionData> {
    const url = `${this.apiUrl}/${id}`; // Ajusta la URL según tu API
    return this.http.get<NotionData>(url);
  } */
}
