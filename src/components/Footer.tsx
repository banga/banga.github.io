import React from "react";
import { SocialIcons } from "./SocialIcons.js";

export function Footer() {
  return (
    <div className="mt1 flex-row space-between align-center">
      <div className="flex-col">
        <div className="bold">Shrey Banga</div>
        <div className="font-small light">banga.shrey@gmail.com</div>
      </div>
      <SocialIcons />
    </div>
  );
}
