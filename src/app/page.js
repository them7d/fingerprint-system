'use client'
import Image from "next/image";
import {useEffect, useRef} from "react";
import Navbar from "./components/navbar";
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import "./globals.css"

export default function Home() {
  const ref = useRef(null);
  async function handleClick() {
    const response = await fetch("http://10.21.53.203:8080/image",{
    method: "GET",
    mode: "cors",
    }).catch(err => console.log(err));
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    const img = document.createElement("img");
    img.src = imageUrl;
    ref.current.appendChild(img);
  }
  return (
    <>
    <div className="font-sans flex flex-col items-center justify-items-center min-h-[100vh]">
      <Navbar />
      <main className="flex flex-col gap-[32px] row-start-2 content-center justify-center max-w-[700px] sm:items-start p-8 pb-20 grow">
        <div className="flex flex-col gap-5 bg-gray-800 p-10 rounded-lg">
          <h1 className="text-4xl font-bold text-center">
            Fingerprint Recognition
          </h1>
          <p className="text-sm max-w-[350px] m-auto text-center">
            This is a fingerprint recognition system that uses algorthims to recognize
            fingerprints.
          </p>
          <div ref={ref}></div>
          <button onClick={handleClick} className="bg-[#2ECC71] hover:bg-[#1E8549] text-white font-bold py-2 px-4 rounded cursor-pointer">start</button>
        </div>
        
        {/* <div className={"flex flex-col gap-5 bg-gray-800 p-10 rounded-lg"}>
          <h1 className="text-3xl font-bold text-center">
            Fingerprint recognaizing
          </h1>
          <div className="flex justify-center items-center flex-col pt-10">
            <Spinner variant="ring" />
            
          </div>
        </div> */}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
    </>
  );
}
