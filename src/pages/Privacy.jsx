import React from 'react'
import '@/styles/_privacy.scss'
import Netray from '../layouts/Netray'

export default function Privacy() {
    const status = null

    return (
        <Netray
            title='Privacy Policy'
            kw='netray not found, netray halaman tidak ditemukan, netray id home, netray halaman tidak ditemukan indonesia'
            desc='Halaman 404'
            ogUrl={status}
            ogType={status}
            ogTitle={status}
            ogDesc={status}
            twitTitle={status}
        >
        <main className='container mx-auto px-4'>
            <div className='priv px-1 mx-auto py-10'>
                <h3 className='font-bold text-grey-200 text-3xl'>
                    Privacy Policy
                </h3>
                <p className='mx-auto py-8 text-zinc-400'>
                    <strong>CONTENTS</strong>
                </p>
                {/* <ol className='mx-auto py-8 text-zinc-400 decimal-ol'>
                    <li className='decimal-li'>
                        <a href='/'></a>
                    </li>
                </ol> */}
                <ol class="mx-auto text-zinc-400 decimal-ol">
                    <li class="decimal-li"><a href="#_bookmark0">CONTACT INFORMATION</a></li>
                    <li class="decimal-li"><a href="#_bookmark1">OBJECTIVE AND SCOPE</a></li>
                    <li class="decimal-li">
                        <a href="#_bookmark2">COLLECTION OF PERSONAL INFORMATION</a>
                        <ol class="decimal-ol">
                        <li class="decimal-li"><a href="#_bookmark3">INFORMATION PROVIDED BY YOU</a></li>
                        <li class="decimal-li"><a href="#_bookmark4">INFORMATION WE COLLECT AUTOMATICALLY</a></li>
                        <li class="decimal-li">
                            <a href="#_bookmark5">INFERRED INFORMATION THROUGH USAGE AND LOG DATA</a>
                        </li>
                        <li class="decimal-li">
                            <a href="#_bookmark6">INFORMATION WE COLLECT THROUGH THIRD PARTY SOURCES</a>
                        </li>
                        </ol>
                    </li>
                    <li class="decimal-li"><a href="#_bookmark7">PAYMENT, CARD AND BILLING INFORMATION</a></li>
                    <li class="decimal-li"><a href="#_bookmark8">PURPOSES OF PROCESSING</a></li>
                    <li class="decimal-li">
                        <a href="#_bookmark9">DISCLOSURE</a>
                        <ol class="decimal-ol">
                        <li class="decimal-li"><a href="#_bookmark10">SERVICE PROVIDERS</a></li>
                        <li class="decimal-li"><a href="#_bookmark11">BUSINESS OR PROMOTIONAL PARTNERS</a></li>
                        <li class="decimal-li"><a href="#_bookmark12">BUSINESS TRANSFERS</a></li>
                        <li class="decimal-li"><a href="#_bookmark13">LEGAL</a></li>
                        </ol>
                    </li>
                    <li class="decimal-li">
                        <a href="#_bookmark14">YOUR CONTROLS AND CHOICES</a>
                        <ol class="decimal-ol">
                        <li class="decimal-li"><a href="#_bookmark15">MANAGING YOUR INFORMATION</a></li>
                        <li class="decimal-li"><a href="#_bookmark16">INTEREST-BASED ADVERTISING</a></li>
                        <li class="decimal-li">
                            <a href="#_bookmark17">PUSH NOTIFICATIONS /MARKETING MESSAGES</a>
                        </li>
                        <li class="decimal-li">
                            <a href="#_bookmark18">RECTIFICATION OF INACCURATE OR INCOMPLETE INFORMATION</a>
                        </li>
                        <li class="decimal-li"><a href="#_bookmark19">DATA ACCESS AND PORTABILITY</a></li>
                        <li class="decimal-li"><a href="#_bookmark20">DATA RETENTION AND ERASURE</a></li>
                        <li class="decimal-li">
                            <a href="#_bookmark21">WITHDRAWING CONSENT AND RESTRICTION OF PROCESSING</a>
                        </li>
                        <li class="decimal-li"><a href="#_bookmark22">OBJECTION TO PROCESSING</a></li>
                        </ol>
                    </li>
                    <li class="decimal-li"><a href="#_bookmark23">CHILDREN'S PRIVACY</a></li>
                    <li class="decimal-li">
                        <a href="#_bookmark24">DATA TRANSFER, STORAGE &amp; PROCESSING GLOBALLY</a>
                    </li>
                    <li class="decimal-li"><a href="#_bookmark25">SECURITY</a></li>
                    <li class="decimal-li"><a href="#_bookmark26">COOKIES</a></li>
                    <li class="decimal-li"><a href="#_bookmark27">CHANGE IN PRIVACY POLICY</a></li>
                    <li class="decimal-li"><a href="#_bookmark28">CONTACT US</a></li>
                </ol>

                
            </div>

            <div className='privacy px-1 mx-auto py-5'>
                <ol className="mx-auto text-zinc-400 decimal-ol">
                    <li class="decimal-li">
                        <h4>
                        <a id="1._Contact_information"></a><a id="_bookmark0"></a>CONTACT INFORMATION
                        </h4>
                        <p>
                        The Netray Company (Southeast Asia) Pte. Limited, a company registered
                        under the laws of Indonesia, with its principal office at Indonesia
                        ("<strong>we</strong>", "<strong>us</strong>", "<strong>our</strong>",
                        "<strong>Netray</strong>") provides, directly or through its distributors or
                        service providers, a subscription service in Indonesia, which may be available
                        through an online website
                        <a href="/">https://www.netray.com </a>and/or
                        applications (“<strong>Platform</strong>” or the
                        <strong>“Netray Service</strong>”, which includes all the features
                        available on such Platform).
                        </p>
                        <p>
                        Netray values the trust placed by users of Netray Service
                        ("<strong>you</strong>", "<strong>your</strong>", "<strong>user</strong>",
                        "<strong>subscriber</strong>") and therefore, we follow appropriate standards
                        to protect your Personal Information (defined below).
                        </p>
                        <p>
                        If you require any information or clarification regarding the use and/or
                        processing of your Personal Information (defined below) or this Privacy Policy
                        or if you require any general information or clarification or inquiry
                        regarding the Platform please email us at
                        <a href="mailto:netrayplus.id@netray.com">netrayplus.id@netray.com</a><a id="."></a>.
                        </p>
                    </li>
                    <li class="decimal-li">
                        <h4>
                        <a id="2._Objective_and_Scope"></a><a id="_bookmark1"></a>OBJECTIVE AND SCOPE
                        </h4>
                        <p>
                        This Privacy Policy ("<strong>Privacy Policy</strong>") explains how we use,
                        process and protect Personal Information of the users or subscribers of the
                        Disney+ Hotstar Service in Indonesia.
                        </p>
                        <p>
                        This Privacy Policy describes the usage of information and / or Personal
                        Information provided or collected through sites and applications, where this
                        Privacy Policy is posted and/or affiliate or third-party sites / platforms
                        through which the Platform and/or any of its features and/or services
                        available on the Platform may be provided. We follow this Privacy Policy in
                        accordance with applicable law in the places where we operate the sites and
                        applications subject to this Privacy Policy. In some cases, we may provide
                        additional data privacy notices specific to certain features or services.
                        Those notices are to be read in combination with this Privacy Policy.
                        </p>
                        <p>
                        Please note that our sites and applications may contain links to other sites
                        not owned or controlled by us and we are not responsible for the privacy
                        practices of those sites. We encourage you to be aware when you leave our
                        sites or applications and to read the privacy policies of other sites that may
                        collect your Personal Information.
                        </p>
                        <p>
                        We encourage you to read the applicable Terms of Use to understand the terms
                        related to the use of the Disney+ Hotstar Service in general.
                        </p>
                    </li>
                </ol>
            </div>
        </main>
        </Netray>
    )
}
