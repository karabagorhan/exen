import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { dateTR, Job, money, totals } from "./model";

export type DocumentKind = "kabul" | "teklif" | "rapor";

export async function downloadDocument(job:Job, kind:DocumentKind, assets={fontUrl:"/exen/DejaVuSans.ttf",logoUrl:"/exen/exen-logo.png"}){
  const doc=await PDFDocument.create(); doc.registerFontkit(fontkit);
  const fontBytes=await fetch(assets.fontUrl).then(r=>r.arrayBuffer());
  const font=await doc.embedFont(fontBytes,{subset:true});
  const logoBytes=await fetch(assets.logoUrl).then(r=>r.arrayBuffer());
  const logo=await doc.embedPng(logoBytes);
  const title=kind==="kabul"?"POMPA ÖN SERVİS / KABUL FORMU":kind==="teklif"?"ARIZA TESPİT / ÖN TEKLİF":"NİHAİ BAKIM-ONARIM SERVİS RAPORU";
  const A4:[number,number]=[595.28,841.89]; let page=doc.addPage(A4), y=740;
  const ink=rgb(.07,.17,.29), blue=rgb(.08,.54,.78), gray=rgb(.39,.47,.56);
  const text=(value:string,x:number,atY:number,size=10,color=ink)=>page.drawText(value,{x,y:atY,size,font,color});
  const header=()=>{page.drawRectangle({x:0,y:808,width:A4[0],height:34,color:rgb(.04,.13,.23)});page.drawImage(logo,{x:35,y:748,width:120,height:56});text("EXEN POMPA",180,775,18,blue);text("Bağcılar / İstanbul  •  info@exenpompa.com",180,755,8,gray);page.drawLine({start:{x:35,y:737},end:{x:560,y:737},thickness:1,color:blue});};
  const newPage=()=>{page=doc.addPage(A4);header();y=720;};
  const line=(value:string,size=9,indent=0)=>{const max=indent?89:96;const words=value.split(/\s+/);let row="";for(const word of words){const next=row?`${row} ${word}`:word;if(font.widthOfTextAtSize(next,size)>A4[0]-78-indent){if(y<85)newPage();text(row,38+indent,y,size);y-=16;row=word;}else row=next;}if(row){if(y<85)newPage();text(row,38+indent,y,size);y-=16;}void max;};
  const section=(label:string)=>{if(y<105)newPage();y-=12;page.drawRectangle({x:35,y:y-7,width:525,height:23,color:rgb(.92,.96,.98)});text(label,43,y,10,blue);y-=32;};
  const field=(label:string,value:string)=>line(`${label}: ${value||"Kaydedilmedi"}`);
  header();y=715;text(title,38,y,14,ink);y-=25;field("Belge No",`${job.id}-${kind.toUpperCase()}-R${job.revision}`);field("Düzenleme Tarihi",new Date().toLocaleDateString("tr-TR"));field("Servis No",job.id);section("MÜŞTERİ VE POMPA BİLGİLERİ");field("Müşteri",job.customer);field("İlgili",job.contact);field("Pompa",job.pump);field("Seri / Model",job.serial);field("Tesis",job.location);field("Kabul Tarihi",dateTR(job.date));field("Servis Durumu",job.stage);
  section("İLK BİLDİRİM VE ARIZA TESPİTİ");field("Müşteri bildirimi",job.complaint);field("Teknik tespit",job.diagnosis);
  if(kind==="kabul"){section("TESLİM ALMA");line("Pompanın kabul bilgileri yukarıda kayıtlıdır. Fiziksel durum ve imzalar teslim sırasında ayrıca doğrulanmalıdır.");}
  if(kind==="teklif"){section("TEKLİF KALEMLERİ");for(const item of job.items)line(`${item.quantity} × ${item.description} (${item.material}) — ${money(item.quantity*item.unitPrice)}`);y-=8;const t=totals(job);field("Ara Toplam",money(t.subtotal));field(`İskonto (%${job.discount})`,money(t.discount));field(`KDV (%${job.vat})`,money(t.vat));field("GENEL TOPLAM",money(t.total));field("Teklif Durumu",job.approval);line("Onaylanan fiyat ve kapsam ayrı revizyon açılmadan değiştirilmemelidir.");}
  if(kind==="rapor"){section("GERÇEKLEŞTİRİLEN İŞLEMLER");line(job.work||"Henüz gerçekleştirilen işlem kaydedilmedi.");section("ÖLÇÜM VE TEST");line(job.test||"Henüz test sonucu kaydedilmedi.");section("TEKNİK ÖNERİ VE GARANTİ");line(job.recommendation||"Öneri kaydedilmedi.");field("Garanti",`${job.warrantyMonths} ay`);field("Sonraki Bakım",dateTR(job.nextMaintenance));}
  if(y<130)newPage();y-=35;page.drawLine({start:{x:42,y},end:{x:225,y},thickness:.6,color:gray});page.drawLine({start:{x:365,y},end:{x:550,y},thickness:.6,color:gray});text("EXEN POMPA / Yetkili",42,y-15,8,gray);text("Müşteri / Onay",365,y-15,8,gray);
  const pages=doc.getPages();pages.forEach((p,i)=>p.drawText(`${i+1} / ${pages.length}`,{x:520,y:24,size:8,font,color:gray}));
  const bytes=await doc.save();const copy=new Uint8Array(bytes.length);copy.set(bytes);const url=URL.createObjectURL(new Blob([copy],{type:"application/pdf"}));const a=document.createElement("a");a.href=url;a.download=`${job.id}-${kind}-R${job.revision}.pdf`;a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
