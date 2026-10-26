export type Stage = "Kabul" | "Arıza Tespiti" | "Onay Bekliyor" | "Bakımda" | "Yedek Parça Bekliyor" | "Test" | "Teslime Hazır" | "Teslim Edildi" | "İptal / İade";
export type Priority = "Normal" | "Yüksek" | "Acil / Kritik Duruş";
export type Approval = "Taslak" | "Bekliyor" | "Onaylandı" | "Reddedildi";
export type Finding = { label: string; checked: boolean };
export type Item = { description: string; material: string; quantity: number; unitPrice: number; laborHours?: number };
export type AuditEntry = { at: string; actor: string; action: string };
export type TestMetrics = { pressure: string; leak: "Bekliyor" | "Uygun" | "Uygun Değil"; vibration: string; temperature: string; amperage: string };
export type Job = {
  id: string; customer: string; contact: string; phone: string; pump: string; brand: string; serial: string; pumpType: string;
  fluid: string; flow: string; head: string; rpm: string; power: string; location: string; date: string; owner: string;
  stage: Stage; priority: Priority; complaint: string; diagnosis: string; findings: Finding[]; work: string; test: string;
  testMetrics: TestMetrics; recommendation: string; warrantyMonths: number; nextMaintenance: string; discount: number; vat: number;
  approval: Approval; revision: number; items: Item[]; audit: AuditEntry[]; createdAt: string; updatedAt: string;
};

export const stages: Stage[] = ["Kabul", "Arıza Tespiti", "Onay Bekliyor", "Bakımda", "Yedek Parça Bekliyor", "Test", "Teslime Hazır", "Teslim Edildi", "İptal / İade"];
export const kanbanStages: Stage[] = ["Kabul", "Arıza Tespiti", "Onay Bekliyor", "Bakımda", "Yedek Parça Bekliyor", "Test", "Teslime Hazır"];
export const priorities: Priority[] = ["Normal", "Yüksek", "Acil / Kritik Duruş"];
export const findingLabels = ["Rulman dağılması / boşluğu", "Mekanik salmastra kaçağı", "Çark aşınması / kavitasyon", "Mil eğriliği / aşınması", "Gövde korozyonu", "Motor sargı / izolasyon hatası"];
const findings = (...checked: string[]): Finding[] => findingLabels.map(label => ({ label, checked: checked.includes(label) }));
const audit = (id: string, owner: string, stage: Stage): AuditEntry[] => [
  { at: "2026-10-23T08:40:00", actor: "Sistem", action: `${id} servis kaydı açıldı` },
  { at: "2026-10-23T10:15:00", actor: owner, action: `Durum “${stage}” olarak güncellendi` },
];

export const seed: Job[] = [
  { id:"SRV-2026-0048", customer:"Örnek Endüstri A.Ş.", contact:"Deniz Kaya", phone:"0212 555 01 48", pump:"Demo Proses Pompası", brand:"EXEN", serial:"DEMO-103", pumpType:"Eksantrik Vidalı", fluid:"Reçine", flow:"42", head:"38", rpm:"1450", power:"15", location:"İstanbul", date:"2026-10-23", owner:"A. Demir", stage:"Bakımda", priority:"Acil / Kritik Duruş", complaint:"Debi düşüşü, anormal ses ve mekanik salmastrada kaçak bildirildi.", diagnosis:"3309 rulmanda aşınma ve mekanik salmastrada kaçak gözlendi. Mil yüzeyinde aşınma tespit edildi.", findings:findings("Rulman dağılması / boşluğu","Mekanik salmastra kaçağı","Mil eğriliği / aşınması"), work:"SKF 3309 rulman ve SiC/SiC/Viton mekanik salmastra değiştirildi. Mil kontrolü, demontaj ve montaj yapıldı.", test:"Test işlemleri bakım tamamlandıktan sonra gerçekleştirilecektir.", testMetrics:{pressure:"",leak:"Bekliyor",vibration:"",temperature:"",amperage:""}, recommendation:"Devreye alma öncesi titreşim ve sızdırmazlık testi yapılması önerilir.", warrantyMonths:12, nextMaintenance:"2027-04-23", discount:0, vat:20, approval:"Onaylandı", revision:1, items:[{description:"Mekanik salmastra",material:"SiC/SiC/Viton",quantity:1,unitPrice:8500,laborHours:2},{description:"3309 rulman",material:"SKF C3",quantity:1,unitPrice:4200,laborHours:2},{description:"Mil revizyonu",material:"4140 çelik",quantity:1,unitPrice:12000,laborHours:4},{description:"Demontaj, montaj ve işçilik",material:"İşçilik",quantity:1,unitPrice:9500,laborHours:8}], audit:audit("SRV-2026-0048","A. Demir","Bakımda"), createdAt:"2026-10-23T08:40:00", updatedAt:"2026-10-26T10:15:00" },
  { id:"SRV-2026-0047", customer:"Mavi Enerji", contact:"Ayşe Yılmaz", phone:"0232 555 04 47", pump:"KSB Etanorm 80-200", brand:"KSB", serial:"KSB-11842", pumpType:"Santrifüj", fluid:"Proses suyu", flow:"95", head:"52", rpm:"2900", power:"30", location:"İzmir", date:"2026-10-22", owner:"S. Demir", stage:"Onay Bekliyor", priority:"Yüksek", complaint:"Pompa çalışma sırasında yüksek titreşim yapıyor.", diagnosis:"Rulman boşluğu ve kaplin hizasızlığı tespit edildi.", findings:findings("Rulman dağılması / boşluğu"), work:"", test:"", testMetrics:{pressure:"",leak:"Bekliyor",vibration:"7.8",temperature:"74",amperage:""}, recommendation:"Rulman değişimi ve kaplin ayarı önerilir.", warrantyMonths:12, nextMaintenance:"2027-04-22", discount:5, vat:20, approval:"Bekliyor", revision:1, items:[{description:"6309 rulman değişimi",material:"SKF 6309 C3",quantity:2,unitPrice:7200,laborHours:3},{description:"Kaplin lazer ayarı",material:"İşçilik",quantity:1,unitPrice:5400,laborHours:2}], audit:audit("SRV-2026-0047","S. Demir","Onay Bekliyor"), createdAt:"2026-10-22T09:10:00", updatedAt:"2026-10-25T16:20:00" },
  { id:"SRV-2026-0046", customer:"Ova Gıda", contact:"Mehmet Acar", phone:"0224 555 04 46", pump:"Wilo CronoLine IL 65", brand:"Wilo", serial:"WL-90271", pumpType:"Santrifüj", fluid:"Sıcak su", flow:"58", head:"31", rpm:"1450", power:"11", location:"Bursa", date:"2026-10-21", owner:"E. Yıldız", stage:"Test", priority:"Normal", complaint:"Basınç kaybı ve düşük debi bildirildi.", diagnosis:"Çark yüzeyinde aşınma ve kavitasyon izleri gözlendi.", findings:findings("Çark aşınması / kavitasyon"), work:"Çark revizyonu, balans ve montaj tamamlandı.", test:"Sızdırmazlık testi tamamlandı; kaçak gözlenmedi.", testMetrics:{pressure:"6.2",leak:"Uygun",vibration:"2.1",temperature:"43",amperage:"18.4"}, recommendation:"Altı ay sonra titreşim kontrolü önerilir.", warrantyMonths:12, nextMaintenance:"2027-04-21", discount:0, vat:20, approval:"Onaylandı", revision:1, items:[{description:"Çark revizyonu ve balans",material:"İşçilik",quantity:1,unitPrice:18000,laborHours:6},{description:"O-Ring takımı",material:"EPDM",quantity:1,unitPrice:2400,laborHours:1}], audit:audit("SRV-2026-0046","E. Yıldız","Test"), createdAt:"2026-10-21T11:00:00", updatedAt:"2026-10-26T09:30:00" },
];

export const money = (n:number) => new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY"}).format(n);
export function totals(job:Job){const subtotal=job.items.reduce((sum,item)=>sum+item.quantity*item.unitPrice,0);const discount=subtotal*job.discount/100;const vat=(subtotal-discount)*job.vat/100;return{subtotal,discount,vat,total:subtotal-discount+vat};}
export const dateTR=(s:string)=>s?new Date(`${s.length===10?s+"T12:00:00":s}`).toLocaleDateString("tr-TR"):"—";
export const initials=(name:string)=>name.split(/\s+/).map(n=>n.replace(/[^A-Za-zÇĞİÖŞÜçğıöşü]/g,"")[0]).filter(Boolean).slice(0,2).join("").toLocaleUpperCase("tr");
export function normalizeJob(raw: Partial<Job>): Job {
  const base=seed.find(j=>j.id===raw.id)||seed[0];const now=new Date().toISOString();
  return {...base,...raw,priority:raw.priority||"Normal",brand:raw.brand||raw.pump?.split(" ")[0]||"",pumpType:raw.pumpType||"Santrifüj",fluid:raw.fluid||"",flow:String(raw.flow||""),head:String(raw.head||""),rpm:String(raw.rpm||""),power:String(raw.power||""),phone:raw.phone||"",findings:Array.isArray(raw.findings)?raw.findings:findings(),testMetrics:{pressure:"",leak:"Bekliyor",vibration:"",temperature:"",amperage:"",...(raw.testMetrics||{})},audit:Array.isArray(raw.audit)?raw.audit:[{at:now,actor:"Sistem",action:"Eski kayıt yeni sürüme aktarıldı"}],createdAt:raw.createdAt||now,updatedAt:raw.updatedAt||now,items:(raw.items||[]).map(i=>({...i,laborHours:i.laborHours||0}))};
}
