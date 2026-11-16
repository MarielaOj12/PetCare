export interface Clinic {
  id:number; clinic_name:string; short_name:string; eyebrow:string; hero_title:string; hero_subtitle:string;
  slogan:string; about_title:string; about_text:string; story:string; mission:string; address:string; city:string;
  phone:string; email:string; instagram:string|null; founded_year:string; emergency_note:string; demo_notice:string;
  hero_video:string; pexels_video_url:string; pexels_video_source:string; hero_poster:string;
}
export interface Service { id:number; name:string; description:string; icon:string; image_url:string; duration:string; featured:number; sort_order:number; }
export interface Specialty {id:number; name:string; description:string; icon:string; image_url:string; sort_order:number; }
export interface Price {id:number; service_id:number|null; label:string; description:string; amount:number|string; currency:string; unit:string; featured:number;}
export interface GalleryPhoto {id:number; image_url:string; alt_text:string; caption:string; source_url:string;}
export interface Faq {id:number; question:string; answer:string;}
export interface Hour {id:number; day_name:string; opening:string;}
export interface Highlight {id:number; value:string; label:string;}
export interface SiteData {clinic:Clinic;services:Service[];specialties:Specialty[];prices:Price[];gallery:GalleryPhoto[];faqs:Faq[];hours:Hour[];highlights:Highlight[];}
export interface ApiResponse<T> {ok:boolean; data:T; message?:string; id?:number; reply?:string;}
export interface ContactForm {name:string;email:string;phone:string;subject:string;message:string;}
export interface AppointmentForm {ownerName:string;ownerEmail:string;ownerPhone:string;petName:string;petType:string;serviceId:number|null;preferredDate:string;preferredTime:string;notes:string;}
export interface ChatMessage {role:'user'|'assistant';content:string;}
