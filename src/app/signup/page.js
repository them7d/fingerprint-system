"use client"
import React, { useRef } from 'react'
import Navbar from "../components/navbar"
export default function Index() {
  const ref = useRef(null);
  function scurePassword(s) {
    let uppercase = false;
    let lowercase = false;
    let number = false;
    let special = false;
    if (s.length < 12) {
      return false;
    }
    if (RegExp(/[a-z]/).test(s)) {
      lowercase = true;
    }
    if (RegExp(/[A-Z]/).test(s)) {
      uppercase = true;
    }
    if (RegExp(/[0-9]/).test(s)) {
      number = true;
    }
    if (RegExp(/[!@#$%^&*()-+]/).test(s)) {
      special = true;
    }

    return uppercase && lowercase && number && special;
  }
  async function handleClick() {
    const user = document.querySelector("#user").value;
    const pass = document.querySelector("#pass").value;
    const confirmPass = document.querySelector("#confirm-pass").value;
    if (pass !== confirmPass) {
      ref.current.className = "text-red-500 text-xs mx-3 opacity-100";
      ref.current.innerHTML = "passwords do not match";
      return;
    }
    if (!scurePassword(pass)) {
      ref.current.className = "text-red-500 text-xs mx-3 opacity-100";
      ref.current.innerHTML = "please enter password with at least 12 characters including uppercase, lowercase, number and special character";
    } else {
      await fetch("https://bluefin.hedgehog-mamba.ts.net/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
          pass: pass,
        }),
      }).then(res => {
        if (res.ok) {
          window.location.href = "/login";
        } else {
          ref.current.className = "text-red-500 text-xs mx-3"
        }
      })
    }
  }
  return (
    <>
      <div className='font-sans flex flex-col items-center justify-items-center min-h-[100vh]'>
        <Navbar />
        <main className={`flex flex-col lg:min-w-lg max-w-md w-full content-center justify-center sm:items-start p-8 pb-20 grow`}>
          <div className="flex flex-col gap-8 bg-[var(--subBackground)] p-10 rounded-lg w-full">
            <h1 className="text-4xl font-bold text-center">
              Sign Up
            </h1>
            <div className="flex items-center rounded bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--accent-secondary)]">
              <input id="user" type="text" name="username" placeholder="username" className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 rounded text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
            </div>
            <div className="flex items-center rounded bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--accent-secondary)]">
              <input id="pass" type="password" name="username" placeholder="password" className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 rounded text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center rounded bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--accent-secondary)]">
                <input id="pass" type="password" name="username" placeholder="password" className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 rounded text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
              </div>
              <div className='text-xs mx-3' ref={ref}></div>
            </div>
            <button onClick={handleClick} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] mt-3 text-white font-bold py-2  rounded cursor-pointer">Sign Up</button>
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
      </div>
    </>
  )
}