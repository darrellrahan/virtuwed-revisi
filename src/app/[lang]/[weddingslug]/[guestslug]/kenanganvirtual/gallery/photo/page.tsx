// import Place from "@/app/components/Place";
import { Locale } from "@/i18n.config";
import Place from "@/src/components/kenanganVirtual/Place";
import React, { Suspense } from "react";


function page({ params }: { params: { weddingslug: string, guestslug: string, lang: Locale } }) {
    return (
        <Suspense fallback={<p>Loading Image...</p>}>
            <Place params={params} />
        </Suspense>
    );
}

export default page;
