import fontUrl from "../public/DejaVuSans.ttf?url";
import logoUrl from "../public/exen-logo.png?url";
import { downloadDocument as generate } from "../src/lib/pdf";
import type { DocumentKind } from "../src/lib/pdf";
import type { Job } from "../src/lib/model";

export type { DocumentKind } from "../src/lib/pdf";
export const downloadDocument = (job: Job, kind: DocumentKind) => generate(job, kind, { fontUrl, logoUrl });
