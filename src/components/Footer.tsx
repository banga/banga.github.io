import React from "react";
import { SocialIcons } from "./SocialIcons.js";

export function Footer() {
  return (
    <div className="mt1 flex-row space-between align-center flex-wrap no-print">
      <div className="flex-col">
        <div className="bold">Shrey Banga</div>
        <div className="font-small dim">banga.shrey@gmail.com</div>
      </div>
      <SocialIcons />
    </div>
  );
}
