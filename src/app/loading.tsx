import Image from "next/image";

export default function Loading() {
  return (
    <div className="grid min-h-[40vh] place-items-center" role="status" aria-live="polite">
      <Image src="/kyntriq-mark.png" alt="" width={72} height={72} className="size-16" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
