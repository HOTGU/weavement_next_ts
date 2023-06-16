"use client";

import React, { useEffect, useState } from "react";

interface CodeProps {
  children: React.ReactNode;
}

const Code = ({ children }: CodeProps) => {
  const [accept, setAccept] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (code === process.env.NEXT_PUBLIC_CODE) setAccept(true);
  }, [code]);

  if (!accept) {
    return (
      <div className="flex items-center justify-center my-20">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border rounded px-4 py-2"
          placeholder="code"
          type="password"
        />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default Code;
