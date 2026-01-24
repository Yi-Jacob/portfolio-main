"use client";
import { ArrowLeft, Linkedin, Github, Mail } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
	project: {
		link?: string;
		title: string;
		description: string;
		repository?: string;
		slug?: string;
	};
};
export const Header: React.FC<Props> = ({ project }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const links: { label: string; href: string }[] = [];
	if (project.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${project.repository}`,
		});
	}
	if (project.link) {
		links.push({
			label: "Website",
			href: project.link,
		});
	}
	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black w-full"
		>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent w-full ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-white/10  border-zinc-200 lg:border-transparent"
				}`}
			>
				<div className="w-full max-w-full flex flex-row-reverse items-center justify-between p-4 sm:p-6 mx-auto">
					<div className="flex justify-between gap-3 sm:gap-4 md:gap-8 min-w-0">
						<Link target="_blank" href="https://www.linkedin.com/in/yi-jacob/" className="flex-shrink-0">
							<Linkedin
								className={`w-5 h-5 sm:w-6 sm:h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>
						<Link target="_blank" href="mailto:jacobyideveloper@gmail.com" className="flex-shrink-0">
						<Mail
								className={`w-5 h-5 sm:w-6 sm:h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>
						<Link target="_blank" href="https://github.com/yi-jacob" className="flex-shrink-0">
							<Github
								className={`w-5 h-5 sm:w-6 sm:h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>
					</div>
					<Link
						href="/work"
						className={`duration-200 hover:font-medium flex-shrink-0 ${
							isIntersecting
								? " text-zinc-400 hover:text-zinc-100"
								: "text-zinc-600 hover:text-zinc-900"
						} `}
					>
						<ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
					</Link>
				</div>
			</div>
			<div className="container mx-auto relative isolate overflow-hidden py-12 sm:py-20 md:py-32 w-full max-w-full">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center w-full">
					<div className="mx-auto max-w-2xl lg:mx-0 w-full">
						<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-white font-display px-0 break-words">
							{project.title}
						</h1>
						{project.description && (
							<p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-zinc-300 px-0 break-words">
								{project.description}
							</p>
						)}
					</div>

					<div className="mx-auto mt-6 sm:mt-10 max-w-2xl lg:mx-0 lg:max-w-none px-0 w-full">
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-sm sm:text-base font-semibold leading-7 text-white">
							{links.map((link) => (
								<Link target="_blank" key={link.label} href={link.href} className="hover:underline break-words">
									{link.label} <span aria-hidden="true">&rarr;</span>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
