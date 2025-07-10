import NavBarOne from "@/components/dashboard/header";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBarOne />
      {children}
    </div>
  );
}
