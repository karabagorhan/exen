"use client";
import { AlertTriangle, Circle, Clock3 } from "lucide-react";
import type { Priority, Stage } from "@/lib/model";

export const inputClass="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500";

const stageStyle:Record<Stage,string>={
  "Kabul":"bg-slate-100 text-slate-700 ring-slate-200", "Arıza Tespiti":"bg-slate-100 text-slate-700 ring-slate-200",
  "Onay Bekliyor":"bg-amber-50 text-amber-700 ring-amber-200", "Bakımda":"bg-sky-50 text-sky-700 ring-sky-200",
  "Yedek Parça Bekliyor":"bg-violet-50 text-violet-700 ring-violet-200", "Test":"bg-indigo-50 text-indigo-700 ring-indigo-200",
  "Teslime Hazır":"bg-emerald-50 text-emerald-700 ring-emerald-200", "Teslim Edildi":"bg-emerald-50 text-emerald-700 ring-emerald-200",
  "İptal / İade":"bg-red-50 text-red-700 ring-red-200",
};
export function StageBadge({stage}:{stage:Stage}){return <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ring-inset ${stageStyle[stage]}`}><Circle className="size-2 fill-current"/>{stage}</span>}
export function PriorityBadge({priority,compact=false}:{priority:Priority,compact?:boolean}){
 const style=priority==="Acil / Kritik Duruş"?"bg-red-50 text-red-700 ring-red-200":priority==="Yüksek"?"bg-orange-50 text-orange-700 ring-orange-200":"bg-slate-50 text-slate-600 ring-slate-200";
 return <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold ring-1 ring-inset ${style}`}>{priority==="Acil / Kritik Duruş"?<AlertTriangle className="size-3 fill-red-100"/>:<Clock3 className="size-3"/>}{compact&&priority==="Acil / Kritik Duruş"?"Kritik":priority}</span>
}
export function Field({label,value,onChange,area=false,type="text",disabled=false,placeholder=""}:{label:string,value:string|number,onChange:(v:string)=>void,area?:boolean,type?:string,disabled?:boolean,placeholder?:string}){return <label className="block text-xs font-semibold text-slate-600">{label}{area?<textarea className={`${inputClass} mt-1 min-h-24 resize-y`} value={value} disabled={disabled} placeholder={placeholder} onChange={e=>onChange(e.target.value)}/>:<input className={`${inputClass} mt-1`} value={value} type={type} disabled={disabled} placeholder={placeholder} onChange={e=>onChange(e.target.value)}/>}</label>}
