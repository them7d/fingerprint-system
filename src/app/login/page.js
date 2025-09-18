"use client"
import React, { useEffect, useRef } from "react"
import Navbar from "../components/navbar"
function Index() {
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
    if (!scurePassword(pass)) {
      ref.current.className = "text-red-500 text-xs mx-3 opacity-100";
      ref.current.innerHTML = "please enter password with at least 12 characters including uppercase, lowercase, number and special character";
    } else {
      await fetch(`${process.env.BACKEND_LOGIN_URL}`, {
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
          LocalStorage.setItem("user", res);
          window.location.href = "/";
        } else {
          ref.current.className = "text-red-500 text-xs mx-3 opacity-100";
          ref.current.innerHTML = "invalid username or password";
        }
      })
    }
  }
  return (
    <>
      <div className="font-sans flex flex-col items-center justify-items-center min-h-[100vh]">
        <Navbar />
        <main className="flex flex-col lg:min-w-lg max-w-md w-full content-center justify-center sm:items-start p-8 pb-20 grow">
          <div className="flex flex-col gap-8  bg-[var(--subBackground))] p-10 rounded-lg w-full">
            <h1 className="text-4xl font-bold text-center">
              Login
            </h1>
            <div className="flex items-center rounded bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--accent-secondary)]">
              <input id="user" type="text" name="username" placeholder="username" className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 rounded text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center rounded bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--accent-secondary)]">
                <input id="pass" type="password" name="username" placeholder="password" className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 rounded text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
              </div>
              <div className="text-xs mx-3 pt-4" ref={ref}></div>
            </div>
            <button onClick={handleClick} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-2  rounded cursor-pointer">login</button>
          </div>
        </main>
      </div>
    </>
  )
}

export default Index
