import React from "react"
import Healthcare from "../layouts/Healthcare";

export default function NotFound() {
    const status = null;

    return (
        <Healthcare
            title="404 | Halaman tidak ditemukan"
            kw="healthcare not found, healthcare halaman tidak ditemukan, healthcare id home, healthcare halaman tidak ditemukan indonesia"
            desc="Halaman 404"
            ogUrl={status}
            ogType={status}
            ogTitle={status}
            ogDesc={status}
            twitTitle={status}
        >
            <main className="notfound-component">
            </main>
        </Healthcare>
    )
}