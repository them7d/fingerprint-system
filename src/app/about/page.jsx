"use client"
import React, {useEffect, useRef} from "react"
import Navbar from "../components/navbar"
export default function About(){

    return (
        <>
            <Navbar />
            <div className="font-sans flex flex-col items-center justify-items-center content-center justify-center max-w-[800px]  -mt-24 mx-auto min-h-[100vh] p-10 text-center grow">
                We are developing a comprehensive fingerprint recognition system that integrates seamlessly with a variety of industry‑standard sensors. Our platform handles the entire pipeline — from secure capture of fingerprint data to feature extraction, template creation, encrypted storage, and rapid matching. Designed for scalability and interoperability, ensuring flexibility for diverse deployments. Advanced algorithms provide high accuracy and resilience against spoofing, while robust APIs make integration with existing applications straightforward. With a focus on security, privacy, and user experience, our system delivers reliable biometric authentication without locking clients into proprietary hardware.
            </div>
        </>
    );
}