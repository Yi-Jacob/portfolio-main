"use client";
import { Navigation } from "../components/nav";

export default function About() {
  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div className="max-w-2xl mx-auto my-4 lg:mx-0">
          <h2
            className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl"
            style={{ marginTop: "75px" }}
          >
            About
          </h2>
          <p className="mt-4 text-zinc-400">
            Hey there! I'm Jacob Yi, a full-stack software developer with a
            knack for crafting dynamic and user-friendly web and mobile
            applications. My journey in the tech industry has been fueled by a
            strong passion for coding and a solid background in computer
            science. Over the years, I've had the opportunity to work on a
            variety of projects, from simple websites to complex applications,
            always striving to deliver top-notch results on time.
          </p>{" "}
          <p className="mt-4 text-zinc-400">
            Beyond the realm of coding, I find immense joy in the simple
            pleasures of life. My Christian faith is the cornerstone of my
            existence, providing me with strength, purpose, and a sense of
            belonging. Family holds an irreplaceable place in my heart, serving
            as my foundation and constant motivation. And when it comes to
            freedom, it's not just about financial independence but also about
            embracing life's adventures, whether it's through travel or the
            invigorating rhythm of running.
          </p>
          <p className="mt-4 text-zinc-400">
            Speaking of travel, it's one of my greatest passions. There's
            something magical about immersing myself in different cultures,
            exploring new landscapes, and meeting people from all walks of life.
            Each journey leaves me with cherished memories and a deeper
            appreciation for the world around me.
          </p>
          <p className="mt-4 text-zinc-400">
            On the flip side, I also find solace in the simplicity of lacing up
            my running shoes and hitting the pavement. Running isn't just about
            physical fitness for me; it's a form of meditation, a way to clear
            my mind and reconnect with myself. Whether it's a leisurely jog
            through the park or a challenging race, the feeling of freedom that
            comes with each step is truly exhilarating.
          </p>
          <p className="mt-4 text-zinc-400">
            Looking ahead, I'm excited about the endless possibilities that lie
            on the horizon. Whether it's diving deeper into the world of web
            development, embarking on new travel adventures, or simply spending
            quality time with loved ones, I'm eager to embrace each opportunity
            with open arms. Life is a beautiful journey, and I'm grateful for
            every moment of it.
          </p>
          <p className="mt-4 text-zinc-400">
          Who knows where I'll be next? Perhaps leading as
            the CEO of a successful startup, pounding the pavement as a
            dedicated marathon runner, earning recognition as a Forbes 30 under
            30 honoree, or backpacking across the globe, soaking in the diverse
            cultures and breathtaking landscapes. Whatever the future holds, I'm
            ready to embrace the challenges and celebrate the victories along
            the way.
            </p>
        </div>
      </div>
    </div>
  );
}
