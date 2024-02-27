import { Locale } from "@/i18n.config";
import { redirect } from "next/navigation";

export default function Home({
  params,
}: {
  params: { weddingslug: string; guestslug: string; lang: Locale };
}) {
  redirect(
    `/${params.lang}/${params.weddingslug}/${params.guestslug}/kenanganvirtual/gallery`
  );
}
