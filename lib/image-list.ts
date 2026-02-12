/**
 * Image filenames in /Images (served from public/images after copy-images).
 * Generated from Images folder — run `npm run copy-images` to sync.
 */
export const IMAGE_FILENAMES = [
  "3819AD13-269A-4C69-BCEC-5732C8D93D33.JPG",
  "DSCF0588.JPG",
  "DSCF1249.JPG",
  "DSCF1390.JPG",
  "DSCF1407.JPG",
  "GEDC3405.JPG",
  "IMG_0408.JPG",
  "IMG_0736.JPG",
  "IMG_2067.JPEG",
  "IMG_2531.JPG",
  "IMG_3339.JPG",
  "IMG_3376.JPG",
  "IMG_3545.JPG",
  "IMG_3636.JPG",
  "IMG_3727.JPG",
  "IMG_3728.JPG",
  "IMG_3729.JPG",
  "IMG_4137.jpg",
  "IMG_4159.JPG",
  "IMG_4161.JPG",
  "IMG_4170.JPG",
  "IMG_4187.JPG",
  "IMG_4193.jpg",
  "IMG_4344.JPG",
  "IMG_4426.JPG",
  "IMG_4566.JPG",
  "IMG_4707.JPG",
  "IMG_4727.JPG",
  "IMG_4729.JPG",
  "IMG_4914.JPG",
  "IMG_4915.JPG",
  "IMG_5244.JPG",
  "IMG_5276.jpg",
  "IMG_5295.JPG",
  "IMG_6162.JPG",
  "IMG_6163.JPG",
  "IMG_6164.JPG",
  "IMG_6174.JPG",
  "IMG_6196.JPG",
];

export function getImageSrc(filename: string): string {
  return `/images/${encodeURIComponent(filename)}`;
}
