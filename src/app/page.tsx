import About from "@/components/sections/about";
import Blogs from "@/components/sections/blogs";
import Contact from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";



export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Blogs/>
      <Contact />
      <Footer/>
    </>
  );
}
