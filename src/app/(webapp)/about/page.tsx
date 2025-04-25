import { FlipWordsSection } from "~/components/about/flip-words";
import { AboutUsCard } from "~/components/ui/about-us-card";

export default function AboutPage() {
  return (
    <div>
      {/* Radial gradient for the container to give a faded look */}
      <div className="relative z-10">
        <FlipWordsSection />
        <div className="flex flex-wrap justify-center gap-4 py-8 px-4 pb-20">
          <AboutUsCard
            name="Christian Toney"
            title="Product Manager | Backend Lead"
            description="Christian is the product manager at Swiftplay. He has contributed to massive projects on github and built websites for Central Michigan University!"
            githubUrl="https://github.com/christian-toney"
          />
          <AboutUsCard
            name="Aiden Jastrzembski"
            title="Frontend Lead | Mobile Lead"
            description="As the Mobile Lead and Frontend Lead at swiftplay, Aiden has lots of experience not only in programming but also in leading a team. He is a Software Engineer at Atomic Industries, and is an avid Neovim lover."
            githubUrl="https://github.com/aidenjastrzembski"
          />
          <AboutUsCard
            name="Michael Strange"
            title="Full Stack Developer"
            description="Michael is a Full Stack Developer at Swiftplay. He has a passion for data science and has built data pipelines used by many communities. Michael is fluent in nearly any language you can think of!"
            githubUrl="https://github.com/michael-strange"
          />
          <AboutUsCard
            name="Austin Vandegriff"
            title="Frontend Developer"
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
      </div>
    </div>
  );
}
