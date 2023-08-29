export class NotionData {
  id?: string;
  titulo: string = '';
  descripcion: string = '';
  autor: string = ' ';
  subida_o_modificada: Date = new Date();
  fecha_de_realizacion: string = new Date().toString(); // Cambiado a string
  hecha: boolean = false;

  constructor(data: any) {
    if (data.object === 'page') {
      this.id = data.id;
      this.titulo = data.properties.titulo.title[0].plain_text;
      this.descripcion = data.properties.descripcion.rich_text[0].plain_text;
      this.autor = data.properties.autor.rich_text[0].plain_text;
      this.subida_o_modificada = new Date(
        data.properties['subida_o_modificada'].created_time
      );
      this.fecha_de_realizacion = new Date(
        data.properties['fecha_de_realizacion'].date.start
      ).toString(); // Convertir a formato ISO 8601
      this.hecha = data.properties.hecha.checkbox;
    }
  }
}
