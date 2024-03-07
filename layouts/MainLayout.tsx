import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { ReactNode, useEffect, useState } from "react";
import { Spin } from "antd";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
