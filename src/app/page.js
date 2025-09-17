'use client'
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar.jsx";
import "./globals.css"
import Results from "./components/results.jsx";
export default function Home() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  async function handleClick() {
    try {
      const response = await fetch(process.env.SENSOR_URL, {
        method: "GET"
      });
    }
    catch (err) {
      console.log(err);
    }
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    const img = document.createElement("img");
    img.className = "m-auto mt-5 rounded";
    img.src = imageUrl;
    if (response.ok) {
      console.log("trying to send image to backend")
      const formData = new FormData();
      formData.append("fingerprint", blob);
      try {
        const res = await fetch(process.env.BACKEND_URL, {
          method: "POST",
          body: formData
        });

        if (res.ok) {
          console.log("image sent successfully");
          const json = await res.json();
          setData(json);
          console.log("Server response:", data);
          setShow(true);
        } else {
          console.log("error sending image:", res.status, res.statusText);
        }
        // show result


      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    ref.current.innerHTML = "";
    ref.current.appendChild(img);
  }
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // duration of loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`font-sans flex flex-col items-center justify-items-center min-h-[100vh]`}>
        <Navbar />
        <main className={`flex flex-col gap-[32px] row-start-2 content-center justify-center max-w-[700px] sm:items-start p-8 pb-20 grow transition-opacity duration-700 ease-in-out ${loading && "opacity-0"}`}>
          <div className="flex flex-col gap-5  p-10 rounded-lg bg-[var(--subBackground)]">
            <h1 className="text-4xl font-bold text-center">
              Fingerprint Recognition
            </h1>
            <p className="text-sm max-w-[350px] m-auto text-center">
              This is a fingerprint recognition system that uses algorthims to recognize
              fingerprints.
            </p>
            <div ref={ref}>
              <div className="results">
                {show && <Results data={data}></Results>}
              </div>
            </div>
            <button onClick={handleClick} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)]  text-white font-bold py-2 px-4 rounded cursor-pointer">start</button>
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

        </footer>
      </div>
    </>
  );
}
