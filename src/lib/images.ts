import { getImage } from 'astro:assets';

/** A resized WebP URL for a CSS background image. */
export async function backgroundUrl(src: ImageMetadata, width: number, quality = 75): Promise<string> {
  const w = Math.min(width, src.width);
  const img = await getImage({ src, width: w, height: Math.round((w * src.height) / src.width), format: 'webp', quality });
  return img.src;
}
