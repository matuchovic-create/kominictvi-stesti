"use client";
import { useEffect } from "react";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import { WhyUs, Steps, Reviews, Gallery, Certs } from "@/components/Sections";
import { useReveal } from "@/hooks/useReveal";

export default function Home() {
  useReveal();

  return (
    <>
      <Cursor />
      <Loader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Steps />
        <Reviews />
        <Gallery />
        <Certs />
        <Contact />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
