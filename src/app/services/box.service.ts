import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Box } from '../models/box.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  maxId!: number;
  private resourceUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getMaxId(): Observable<{ maxId: number }> {
    return this.http.get<{ maxId: number }>(`${this.resourceUrl}/max-id`);
  }

  createNewBox(newBoxData: Box): Observable<{ message: string; square: Box }> {
    return this.http.post<{ message: string; square: Box }>(
      `${this.resourceUrl}/insert`,
      newBoxData
    );
  }

  getBox(id: number): Observable<Box> {
    return this.http.get<Box>(`${this.resourceUrl}/get/${id}`);
  }

  getAllBoxData(): Observable<Box[]> {
    return this.http.get<Box[]>(`${this.resourceUrl}/getAll`);
  }

  deleteExistingBox(id: number): Observable<{ message: string; data: Box[] }> {
    return this.http.delete<{ message: string; data: Box[] }>(
      `${this.resourceUrl}/delete/${id}`
    );
  }
}
