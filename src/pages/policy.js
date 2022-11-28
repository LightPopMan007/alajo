import React, { useState, useEffect } from "react";
import { AiFillAndroid, AiFillApple, AiFillCamera } from "react-icons/ai";
import { FaHandshake, FaDollarSign, FaMobileAlt } from "react-icons/fa";
import Navbar from '../components/navbar';
import Footer from '../components/footer'
import { signOut, useSession } from 'next-auth/react'

import Stack from '@mui/material/Stack';
import { Server } from './api/lib/service';


function Guest() {
    


    return (
        <div>
            <Navbar />

            <section className="bg-yellow-500 dark:bg-slate-900 pt-16">
                <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-5xl font-bold leading-none sm:text-6xl dark:text-slate-100 text-zinc-900">
                            <span className="dark:text-yellow-400 text-slate-100">Privacy Policy</span>
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12 text-zinc-900 dark:text-slate-400"></p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-200 py-6 dark:bg-slate-800 px-4 md:px-4 mb-8">
                <div className="w-1/2 m-auto">
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        This Privacy Policy between Dauntless Exchangers Enterprises (hereinafter
                        referred to as Dauntless Exchangers) and you embodies our commitment
                        to your privacy on our website, apps, social media platforms, administrative
                        records, and premises.
                    </p>
                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">1.0 Your Privacy Rights</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">This Privacy Policy explains your privacy rights in relation to the collection,
                        use, storage, sharing, and protection of your personal information by us. It
                        applies regardless of how you access or use the Dauntless Exchangers
                        website, apps, platforms, and all database applications, services, tools, and
                        physical contact with us.</p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">If you have created a username, identification code, password or any other
                        piece of information as part of our access security measures, you must
                        treat such information as confidential, and you must not disclose it to any
                        third party. We reserve the right to disable any user identification code or
                        password, whether chosen by you or allocated by us, at any time, if in our
                        opinion you have failed to comply with any of the provisions of these
                        Conditions.
                    </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        If you know or suspect that anyone other than you know your security
                        details, you must promptly notify us.
                    </p>
                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">2.0 Consent</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        You accept this Privacy Policy when you give consent upon access to our
                        platforms, or use our services, content, features, technologies or functions
                        offered on our website, apps, digital platforms or visit any of our offices for

                        official or non-official purposes (collectively “Dauntless Exchangers's
                        services”).
                    </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        Unless otherwise agreed in writing, this Policy governs our users' and
                        stakeholders' use of Dauntless Exchangers' services and intervention
                        projects. </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">We may amend this Privacy Policy at any time by posting a revised version
                        on our website, apps, platforms, or placing such notice at conspicuous
                        points at our office facilities. The revised version will take effect seven days
                        after it is published.
                    </p>
                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">3.0 Your Personal Information</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        When you use Dauntless Exchangers' Services, we may collect information
                        sent to us by your computer, mobile phone or other electronic access
                        device.</p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">The automatically collected information includes but not limited to- data
                        about the pages you access, computer IP address, device ID or unique
                        identifier, device type, geo-location information, computer and connection
                        information, mobile network information, statistics on page views, traffic to
                        and from the sites, referral URL, ad data, standard web log data, still and
                        moving images.</p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">We may also collect information you provide us including but not limited to
                        - information on web forms, survey responses, account update information,
                        email, phone number, organization you represent, official position,
                        correspondence with Dauntless Exchangers' support services and
                        telecommunication with Dauntless Exchangers. We may also collect
                        information about your transactions, enquiries and your activities on our
                        platforms or service channels.
                    </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">We may also use information provided by third parties like social media
                        sites. Information about you provided by other sites are not controlled by
                        Dauntless Exchangers and we are therefore not liable for how they use it.
                    </p>
                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">4.0 What we do with your personal information</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        We collect your personal information in order to provide you with efficient,
                        enjoyable, and secure service. We may use your information for the
                        following purposes:
                    </p>
                    <ul className="text-slate-600 dark:text-slate-400">
                        <li className="list-disc">Provide Dauntless Exchangers's services and support.</li>
                        <li className="list-disc">Process applications and send notices about your transactions to
                            requisite parties.
                        </li>
                        <li className="list-disc">Verify your Identity</li>
                        <li className="list-disc">Resolve disputes, collect fees, and troubleshoot problems.</li>
                        <li className="list-disc">Detect, prevent or remediate violation of Laws, Regulations,
                            Standards, Guidelines and Frameworks.
                        </li>
                        <li className="list-disc">Improve Dauntless Exchangers's Services by implementing aggregate
                            customer or user preferences.
                        </li>
                        <li className="list-disc">
                            Measure the performance of the Dauntless Exchangers's Services
                            and improve content, technology and layout.
                        </li>
                        <li className="list-disc">
                            Track information breach and remediate such identified breaches.
                        </li>
                        <li className="list-disc">
                            Manage and protect our information technology and physical
                            infrastructure.
                        </li>
                        <li className="list-disc">
                            Contact you at any time through your provided telephone number,
                            email address or other contact details.
                        </li>
                    </ul>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">5.0 Cookies</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        Cookies are small files placed on your computer’s hard drive that enables
                        the website to identify your computer as you view different pages. Cookies
                        allow websites and applications to store your preferences in order to
                        present contents, options or functions that are specific to you. Like most
                        interactive websites, our website uses cookies to enable the tracking of
                        your activity for the duration of a session. </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">Our website uses only encrypted session cookies which are erased either
                        after a predefined timeout period or once the user logs out of the platform
                        and closes the browser. Session cookies do not collect information from
                        the user’s computer. They will typically store information in the form of a
                        session identification that does not personally identify the user.
                    </p>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">6.0 How we protect your personal information</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        We store and process your personal data on cloud technology service
                        providers. If we must transfer your data to another country, that country
                        must have adequate data protection legislation. </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">We will kindly request your approval if we need to send your data to a
                        country that does not have an adequate data protection law. We safeguard
                        your data with physical, technical, and administrative safeguards to reduce
                        the risks of loss, misuse, unauthorized access, disclosure, and alteration.
                        Firewalls and data encryption are among the safeguards we employ, as are
                        physical access controls to our data centers and information access
                        authorization controls.
                    </p>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">7.0 How We Share your information within Dauntless Exchangers and
                        other users.
                    </h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        During your interaction with any of our platforms or premises, we may
                        provide Ministries, Departments, Agencies (MDAs), other organs of
                        government, private sector operators performing government functions,
                        with information such as your name, contact details, or other details you
                        provide us for the purpose of performing their statutory mandate to you or
                        third parties.
                    </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        We work alongside other third parties, banks, financial institutions, and
                        corporate bodies to provide Dauntless Exchangers' services and carry out
                        its mandate. A third party may share information about you with us in this
                        manner, such as your email address or mobile phone number. </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">You accept that your pictures and testimonials on all social media
                        platforms about Dauntless Exchangers can be used for limited promotional
                        purposes by us. This does not include your trademarked or copyrighted
                        materials.</p>
                    <p className="py-1 text-slate-800 dark:text-slate-300"> From time to time, we may send you relevant information such as news
                        items, enforcement notice, statutorily mandated notices and other
                        informative notices to help Dauntless Exchangers serve you better. We may
                        also share your personal information in compliance with National or
                        international laws; crime prevention and risk management agencies and
                        service providers.
                    </p>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">8.0 Security</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        We promise to and will always hold your information securely. To prevent
                        unauthorized access to your information, we have implemented strong
                        controls and security safeguards at the technical and operational levels.
                        You should see the padlock symbol in your URL address bar once you are
                        successfully logged into the platform. The URL address will also start with
                        https:// depicting a secure webpage. </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">SSL applies encryption between two points such as your device and the
                        connecting server. Any data transmitted during the session will be
                        encrypted before transmission and decrypted at the receiving end. This is
                        to ensure that data cannot be read during transmission.
                    </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        Dauntless Exchangers has also taken measures to comply with global
                        Information Security Management Systems (ISMS) we therefore have put in
                        place digital and physical security measures to limit or eliminate
                        possibilities of data privacy breach incidents.
                    </p>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">9.0 Data Confidentiality Rights</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        Your information is regarded as confidential and will not be divulged to any
                        third party except under legal and/or regulatory conditions. You have the
                        right to request sight of, and copies of any and all information we keep on
                        you.</p>
                    <p className="py-1 text-slate-800 dark:text-slate-300"> While Dauntless Exchangers is responsible for safeguarding the
                        information entrusted to us, your role in fulfilling confidentiality duties
                        includes, but is not limited to, adopting and enforcing appropriate security
                        measures such as non-sharing of passwords and other platform login
                        details, adherence with physical security protocols on our platforms,
                        dealing with only authorized officers of Dauntless Exchangers.
                    </p>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">10.0 Links to Other Websites and Premises</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        Certain transaction processing channels may require links to other
                        websites other than ours. Please note that Dauntless Exchangers is not
                        responsible and has no control over websites outside its domain.We do not
                        monitor or review the content of other party’s websites which are linked
                        from our website or media platforms. Opinions expressed or materials
                        appearing on such websites are not necessarily shared or endorsed by us,
                        and Dauntless Exchangers should not be regarded as the publisher of such
                        opinions or materials.
                    </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        Please be aware that we are not responsible for the privacy practices, or
                        content of these sites. We encourage our users to be aware of when they
                        leave our site and to read the privacy statements of these sites. You should
                        evaluate the security and trustworthiness of any other site connected to
                        this site or accessed through this site yourself, before disclosing any
                        personal information to them. Dauntless Exchangers will not accept any
                        responsibility for any loss or damage in whatever manner, however caused,
                        resulting from your disclosure to third parties of personal information.
                    </p>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">11.0 Governing Law</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        This Privacy Policy is made pursuant to and in compliance with the Nigeria
                        Data Protection Regulation (2019) and other relevant Nigerian laws,
                        regulations or international conventions applicable to Nigeria. Where any
                        provision of this Policy is deemed inconsistent with a law, regulation or
                        convention, such provision shall be subject to the overriding law, regulation
                        or convention.
                    </p>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">COOKIES POLICY</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        Cookies are small text files which are transferred from our websites, apps,
                        platforms or portals and stored on your device.We use cookies to help us
                        provide you with a personalized service, and to help make our websites or
                        portals better for you.
                    </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        Our cookies may be session cookies (temporary cookies that identify and
                        track users within our websites or portals which are deleted when you close
                        your browser or leave your session) or persistent cookies (cookies which
                        enable our websites or portals to “remember” who you are and to
                        remember your preferences within our websites or portals and which will
                        stay on your computer or device after you close your browser or leave your
                        session.
                    </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        We use the following different types of cookies:
                    </p>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">Essential Cookies</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        These are cookies which are needed for our websites or portals to function
                        properly, for example, these cookies allow you to access secure areas of
                        our website/portal.
                    </p>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">Performance Cookies</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        These cookies collect information about how visitors and users use our
                        websites and portals. These cookies don’t collect information that
                        identifies a visitor or user. All information these cookies collect is
                        aggregated and therefore anonymous. We only use these cookies to
                        improve our website and portal.
                    </p>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">Functionality Cookies</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        These cookies allow our websites and portals to remember choices you
                        make (such as your user name, language or the region you are in) and
                        provide enhanced, more personal features. These cookies can also be used
                        to remember changes you have made to text size,fonts and other parts of
                        web pages that you can customize.
                    </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        They may also be used to provide services you have asked for. The
                        Information these cookies collect may be anonymized and they cannot
                        track your browsing activity on other websites.
                        Like most interactive websites, our website uses cookies to enable the
                        tracking of your activity for the duration of a session. Our website uses only
                        encrypted session cookies which are erased either after a predefined
                        timeout period or once the user logs out of the platform and closes the browser. Session cookies do not collect information from the user’s
                        computer. They will typically store information in the form of a session
                        identification that does not personally identify the user.
                    </p>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">DATA PROTECTION POLICY</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        Dauntless Exchangers' Data Protection Policy refers to our commitment to
                        treat information of employees, customers, stakeholders and other
                        interested parties with the utmost care and confidentiality. With this policy,
                        we ensure that we gather, store and handle data fairly, transparently and
                        with respect towards individual rights.
                    </p>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">Scope</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        This policy refers to all parties who provide any amount of information to
                        us.
                    </p>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">What is covered under the Data Protection Policy</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        Dauntless Exchangers's employees must follow this policy. Freelancers,
                        consultants, partners and any other external entity are also covered.
                        Generally, our policy refers to anyone we collaborate with or acts on our
                        behalf and may need occasional access to data.
                    </p>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">Policy Elements</h2>

                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        As part of our operations, we need to obtain and process information. This
                        information includes any offline or online data that makes a person
                        identifiable such as names, addresses, usernames and passwords, digital
                        footprints, photographs, National identity numbers, financial data etc.
                        Dauntless Exchangers collects this information in a transparent way and
                        only with the full cooperation and knowledge of interested parties. Once
                        this information is available to us, the following rules apply.
                    </p>

                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        Our data will be:
                    </p>

                    <ul className="text-slate-600 dark:text-slate-400">
                        <li className="list-disc">Accurate and kept up-to-date</li>
                        <li className="list-disc">Collected fairly and for lawful purposes only</li>
                        <li className="list-disc">Processed by the company within its legal and moral boundaries</li>
                        <li className="list-disc">Protected against any unauthorized or illegal access by internal or
                            external parties.
                        </li>
                    </ul>

                    <p className="py-1 text-slate-800 dark:text-slate-300">Our data will not be:</p>

                    <ul className="text-slate-600 dark:text-slate-400">
                        <li className="list-disc">Transferred to organizations, states or countries that do not have
                            adequate data protection policies.
                        </li>
                        <li className="list-disc">
                            Distributed to any party other than the ones agreed upon by the data’s
                            owner (exempting legitimate requests from law enforcement
                            authorities).
                        </li>
                    </ul>

                    <p className="py-1 text-slate-800 dark:text-slate-300">In addition to ways of handling data, Dauntless Exchangers has direct
                        obligations towards people to whom the data belongs.
                    </p>
                    <p className="py-1 text-slate-800 dark:text-slate-300">
                        Specifically we:
                    </p>

                    <ul className="text-slate-600 dark:text-slate-400">
                        <li className="list-disc">Let people know which of their data is collected</li>
                        <li className="list-disc">Inform people about how we’ll process their data</li>
                        <li className="list-disc">Inform people about who has access to their information</li>
                        <li className="list-disc">Have provisions in cases of lost, corrupted or compromised data</li>
                        <li className="list-disc">Allow people to request that we modify, erase, reduce or correct data
                            contained in our databases.</li>
                    </ul>

                    <h2 className="text-2xl my-2 text-slate-900 dark:text-slate-100 font-bold">Actions</h2>
                    <p className="py-1 text-slate-800 dark:text-slate-300"></p>

                    <ul className="text-slate-600 dark:text-slate-400">
                        <li className="list-disc">Restricting and monitoring access to sensitive data</li>
                            <li className="list-disc">Developing transparent data collection procedures</li>
                            <li className="list-disc">Training employees in online privacy and security measures</li>
                            <li className="list-disc">Building secure networks to protect online data from
                            cyberattacks</li>
                            <li className="list-disc">Establishing clear procedures for reporting privacy breaches
                            or data misuse</li>
                            <li className="list-disc">Including contract clauses or communicate statements on how we
                            handle data.</li>
                            <li className="list-disc">Establishing data protection practices.</li>
                    </ul>
                </div>
            </section>

            {/* FOOTER */}
            <Footer />
        </div>
    )
}

export default Guest

// export async function getServerSideProps(context) {
//     const card = await Server.get('/card')
//     const cardType = await Server.get('/card/card-type')
//     return {
//         props: {
//             cards: card.data.message,
//             cardType: cardType.data.message
//         }
//     }
// }