import ProjectsPage from "./work";

export const metadata = {
  title: "Work",
  description:
    "A compilation of my work and development projects, reflecting a fusion of creativity, expertise, and a relentless drive for innovation.",
  alternates: {
    canonical: "/work",
  },
};

export default function Page() {
  return (
    <div>
      <ProjectsPage />
    </div>
  );
}
