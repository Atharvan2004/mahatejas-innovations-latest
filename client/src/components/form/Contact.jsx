"use client";

import { useState } from "react";
import axios from "axios";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [isSendingMail, setIsSendingMail] = useState(false)
  const [data, setData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const { fullName, email, subject, message } = data;

  async function onSubmit(event) {
    event.preventDefault();

    async function sendData() {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      setIsSendingMail(true)
      const { data } = await axios.post(
        "/user/feedback",
        JSON.stringify({
          subject: subject,
          userName: fullName,
          userEmail: email,
          message: message,
        }),
        config,
      );
      if (data) alert("Mail sent successfully")
      setIsSendingMail(false)
      setData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      })
    }
    sendData();
  }

  return (
    <div className="mt-10 flex flex-col items-center justify-center px-5 lg:m-0 lg:w-1/2">
      <p className="text-3xl font-bold">
        Send us a message
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="ml-2 inline h-7 w-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
          />
        </svg>
      </p>
      <form onSubmit={onSubmit} className="m my-10 w-full px-5 sm:w-[450px]">
        <Label className="text-md font-bold text-black" htmlFor="fullName">
          Full Name
        </Label>
        <Input
          autoCorrect="off"
          className="mb-3 text-black"
          id="fullName"
          onChange={(event) =>
            setData({ ...data, fullName: event.target.value })
          }
          placeholder="myfullname"
          required
          type="text"
          value={fullName}
        />
        <Label className="text-md font-bold text-black" htmlFor="email">
          Email
        </Label>
        <Input
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          className="mb-3 text-black"
          id="email"
          onChange={(event) => setData({ ...data, email: event.target.value })}
          placeholder="name@example.com"
          required
          type="email"
          value={email}
        />
        <Label className="text-md font-bold text-black" htmlFor="subject">
          Subject
        </Label>
        <Input
          autoCorrect="off"
          className="mb-3 text-black"
          id="subject"
          onChange={(event) =>
            setData({ ...data, subject: event.target.value })
          }
          placeholder="my query is about..."
          required
          type="text"
          value={subject}
        />
        <Label className="text-md font-bold text-black" htmlFor="message">
          Message
        </Label>
        <Textarea
          className="mb-5 text-black"
          id="message"
          onChange={(event) =>
            setData({ ...data, message: event.target.value })
          }
          rows="5"
          placeholder="Type your message here."
          required
          value={message}
        />

        <Button disabled={isSendingMail}>
          {isSendingMail && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Send Message
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-2 h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </Button>
      </form>
    </div>
  );
}
