import { Dessert } from './../models/dessert';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class DessertService {
  private url = `${base_url}/dulces`;
  private listaCambio = new Subject<Dessert[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Dessert[]>(this.url);
  }
  insert(de: Dessert) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: Dessert[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  modificar(de: Dessert) {
    return this.http.put(this.url, de);
  }
  listarId(id: number) {
    return this.http.get<Dessert>(`${this.url}/${id}`);
  }
  buscar(fecha: string): Observable<Dessert[]> {
    return this.http.post<Dessert[]>(`${this.url}/buscar`, { fecha: fecha });
  }
}
