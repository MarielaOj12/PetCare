import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, AppointmentForm, ContactForm, ChatMessage, SiteData } from '../models/site.model';
@Injectable({providedIn:'root'})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api';
  site(): Observable<ApiResponse<SiteData>> {return this.http.get<ApiResponse<SiteData>>(`${this.base}/site`);}
  contact(form:ContactForm):Observable<ApiResponse<never>> {return this.http.post<ApiResponse<never>>(`${this.base}/contact`,form);}
  appointment(form:AppointmentForm):Observable<ApiResponse<never>> {return this.http.post<ApiResponse<never>>(`${this.base}/appointments`,form);}
  chat(message:string,history:ChatMessage[]):Observable<{ok:boolean;reply:string;model:string}> {return this.http.post<{ok:boolean;reply:string;model:string}>(`${this.base}/chat`,{message,history});}
  chatHealth():Observable<ApiResponse<{connected:boolean;installed:boolean;model:string}>> {return this.http.get<ApiResponse<{connected:boolean;installed:boolean;model:string}>>(`${this.base}/chat/health`);}
}
