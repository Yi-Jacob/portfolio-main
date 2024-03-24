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
            pleasures of life, anchored by my Christian faith, which provides me
            with strength, purpose, and a profound sense of belonging. In
            addition to my faith, family holds an irreplaceable place in my
            heart, serving as my foundation and constant motivation. I find
            fulfillment in embracing life's adventures, whether it's through
            travel, running, or delving into the pages of a compelling book.
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
            through the park or a challenging sprint, the feeling of freedom
            that comes with each step is truly exhilarating.
          </p>
          <p className="mt-4 text-zinc-400">
            I also like to immerse myself in the world of literature, where
            writing and reading serve as my sanctuaries, allowing me to explore
            new ideas, perspectives, and worlds through captivating novels or
            personal reflections.
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
            Who knows where I'll be next? Perhaps leading as the CEO of a
            successful startup, pounding the pavement as a dedicated marathon
            runner, earning recognition as a Forbes 30 under 30 honoree, writing
            a compelling book that resonates with readers, or backpacking across
            the globe, soaking in the diverse cultures and breathtaking
            landscapes. Whatever the future holds, I'm ready to embrace the
            challenges and celebrate the victories along the way.
          </p>
        </div>
      </div>
    </div>
  );
}
