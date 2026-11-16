import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { AppointmentForm, ChatMessage, ContactForm, Service, SiteData } from './models/site.model';
@Component({
  selector:'app-root',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./app.component.html',
  styleUrl:'./app.component.css'
})
export class AppComponent implements OnInit {
  private readonly api=inject(ApiService);
  site:SiteData|null=null;
  loading=true;
  loadError='';
  mobileOpen=false;
  activeVideo:'local'|'pexels'='local';
  pexelsVideoProblem=false;
  showAllServices=false;
  openFaq:number|null=0;
  year=new Date().getFullYear();
  appointmentOpen=false;
  submittingAppointment=false;
  appointmentResult='';
  appointmentError='';
  sendingContact=false;
  contactResult='';
  contactError='';
  chatOpen=false;
  chatInput='';
  chatSending=false;
  chatHealthText='';
  chatMessages:ChatMessage[]=[{role:'assistant',content:'¡Hola! Soy Nala, tu asistente virtual. Puedo orientarte sobre los servicios, horarios y tarifas de PetCare. ¿Qué necesitas saber?'}];
  contactForm:ContactForm=this.blankContact();
  appointmentForm:AppointmentForm=this.blankAppointment();
  get minDate():string{return new Date().toLocaleDateString('sv-SE',{timeZone:'America/La_Paz'});}
  get visibleServices():Service[]{return this.showAllServices?(this.site?.services||[]):(this.site?.services||[]).slice(0,6);}
  get featuredServices():Service[]{return (this.site?.services||[]).filter(s=>!!s.featured);}
  ngOnInit():void {this.load();}
  load():void {
    this.loading=true;this.loadError='';
    this.api.site().subscribe({
      next: response => {if(response.ok&&response.data?.clinic){this.site=response.data;}else this.loadError='La API no devolvió los datos de la clínica.';this.loading=false;},
      error: () => {this.loadError='No se puede conectar con la API de Node.js. Comprueba que MySQL y el backend estén ejecutándose en el puerto 4000.';this.loading=false;}
    });
  }
  closeMenu():void {this.mobileOpen=false;}
  switchHeroVideo():void {this.activeVideo=this.activeVideo==='local'?'pexels':'local';this.pexelsVideoProblem=false;}
  onHeroVideoError():void {if(this.activeVideo==='pexels'){this.activeVideo='local';this.pexelsVideoProblem=true;}}
  icon(name:string):string {
    const symbols:Record<string,string>={stethoscope:'🩺',syringe:'💉',shield:'🛡️',flask:'🧪',heart:'💚',smile:'🦷',activity:'〰️',sparkles:'✨',leaf:'🌿',sun:'☀️',plus:'➕',paw:'🐾',cross:'✚'};
    return symbols[name]||'🐾';
  }
  openAppointment(serviceId:number|null=null):void {
    this.appointmentForm=this.blankAppointment();
    this.appointmentForm.serviceId=serviceId;
    this.appointmentError='';this.appointmentResult='';this.appointmentOpen=true;this.mobileOpen=false;
    document.body.style.overflow='hidden';
  }
  closeAppointment():void {this.appointmentOpen=false;document.body.style.overflow='';}
  @HostListener('document:keydown.escape') escape():void {if(this.appointmentOpen)this.closeAppointment();else if(this.chatOpen)this.chatOpen=false;}
  submitContact():void {
    if(this.sendingContact)return;
    this.sendingContact=true;this.contactError='';this.contactResult='';
    this.api.contact(this.contactForm).subscribe({
      next:response=>{this.sendingContact=false;this.contactResult=response.message||'Mensaje guardado correctamente.';this.contactForm=this.blankContact();},
      error:(err:HttpErrorResponse)=>{this.sendingContact=false;this.contactError=err.error?.message||'No se pudo enviar el mensaje.';}
    });
  }
  submitAppointment():void {
    if(this.submittingAppointment)return;
    this.submittingAppointment=true;this.appointmentError='';this.appointmentResult='';
    this.api.appointment(this.appointmentForm).subscribe({
      next:response=>{this.submittingAppointment=false;this.appointmentResult=response.message||'Solicitud registrada como pendiente.';},
      error:(err:HttpErrorResponse)=>{this.submittingAppointment=false;this.appointmentError=err.error?.message||'No fue posible enviar la solicitud.';}
    });
  }
  toggleChat():void {
    this.chatOpen=!this.chatOpen;
    if(this.chatOpen){this.api.chatHealth().subscribe({next:r=>this.chatHealthText=r.data.connected?(r.data.installed?'Gemma 3 disponible':'Ollama abierto · falta instalar Gemma 3'):'Ollama desconectado',error:()=>this.chatHealthText='No disponible'});}
  }
  sendChat():void {
    const content=this.chatInput.trim();if(!content||this.chatSending)return;
    const history=this.chatMessages.slice(1).slice(-8);
    this.chatMessages.push({role:'user',content});this.chatInput='';this.chatSending=true;
    this.api.chat(content,history).subscribe({
      next:r=>{this.chatMessages.push({role:'assistant',content:r.reply});this.chatSending=false;this.scrollChat();},
      error:(err:HttpErrorResponse)=>{this.chatMessages.push({role:'assistant',content:err.error?.message||'No logré conectarme con el asistente. Revisa Ollama.'});this.chatSending=false;this.scrollChat();}
    });
    this.scrollChat();
  }
  scrollChat():void {setTimeout(()=>{const panel=document.getElementById('chat-messages');if(panel)panel.scrollTop=panel.scrollHeight;},20);}
  private blankContact():ContactForm{return {name:'',email:'',phone:'',subject:'',message:''};}
  private blankAppointment():AppointmentForm{return {ownerName:'',ownerEmail:'',ownerPhone:'',petName:'',petType:'Perro',serviceId:null,preferredDate:'',preferredTime:'',notes:''};}
}
