import type { ImgHTMLAttributes } from "react";
import logoUrl from "../public/exen-logo.png?url";

export default function Image(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { src, ...rest } = props;
  // Vite embeds the original logo as a data URL in the single HTML file.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src === "/exen/exen-logo.png" ? logoUrl : src} {...rest} alt={props.alt || ""} />;
}
