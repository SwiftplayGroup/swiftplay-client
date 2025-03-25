import React from "react";
import { PlaceholdersAndVanishInputDemo } from "~/components/example/contact-us-input";
import { FlipWordsDemo } from "~/components/example/flip-words-demo";
import NavbarDemo from "~/components/example/navbar-menu-demo";
import { AboutUsCard } from "~/components/ui/about-us-card";

export default function AboutPage() {
  return (
    <div className="w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative ">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0  dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
      <NavbarDemo />
      <FlipWordsDemo />
      <div className="flex flex-wrap justify-center gap-4">
        <AboutUsCard
          name="Christian Toney"
          title="Product Manager"
          description="Christian is the product manager at Swiftplay. He has contributed to massive projects on github and built websites for Central Michigan University!."
          githubUrl="https://github.com/christian-toney"
        />
        <AboutUsCard
          name="Aiden Jastrzembski"
          title="Front End Lead"
          description="Aiden is the front-end lead at Swiftplay. He is a full time Full Stack Engineer at Atomic Industries and has built custom ERP systems utilizing unique data models."
          githubUrl="https://github.com/aidenjastrzembski"
        />
        <AboutUsCard
          name="Michael Strange"
          title="Full Stack Developer"
          description="Michael is a Full Stack Developer at Swiftplay. He has a passion for data science and has built data pipelines used by many communities. Michael is fleunt in nearly any language you can think of!"
          githubUrl="https://github.com/michael-strange"
        />
        <AboutUsCard
          name="Austin Vandegriff"
          title="Front End Developer"
          description="Austin is a front-end developer at Swiftplay. He is fluent in React, Typescript, Express, and Node.js, and has used those skills to build components within this website!"
          githubUrl="https://github.com/a-vandegriff"
        />
        <AboutUsCard
          name="Bennett Rauscher"
          title="Back End Developer"
          description="Bennett is a back-end developer at Swiftplay. He is a Computer Science major at Central Michigan University and has experience with Python, SQL, and Java."
          githubUrl="https://github.com/bennettELHS"
        />
      </div>
      <PlaceholdersAndVanishInputDemo />
    </div>
  );
}
