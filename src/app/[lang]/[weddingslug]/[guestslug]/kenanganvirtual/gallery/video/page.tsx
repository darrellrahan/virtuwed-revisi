import { Locale } from "@/i18n.config";
import Youtube360 from "@/src/components/kenanganVirtual/Youtube";
import React, { Suspense } from "react";

function page({ params }: { params: { weddingslug: string, guestslug: string, lang: Locale } }) {
    return (
        <Suspense fallback={<p>Loading Video...</p>}>
            <Youtube360 params={params} />
        </Suspense>
    );
}

export default page;
