A high-performance, animation-heavy professional portfolio built with a decoupled architecture. This repository contains the frontend implementation, leveraging advanced orchestration libraries for fluid user experiences.Technical StackFrontend Framework: React with TypeScript (configured for Next.js or Vite spa)Backend Framework: NestJS (REST API / GraphQL layer for dynamic content management)Styling: Tailwind CSS (Utility-first design tokens)Animation Engines: GSAP (Complex timeline orchestration) & Framer Motion (Declarative micro-interactions)Smooth Scroll: Lenis (Performance-optimized virtual scrolling)Architecture OverviewThe project decouples content delivery from the presentation layer. NestJS serves data (projects, experience logs, analytics) to a highly optimized client interface where GSAP handles heavy scroll-driven animations without blocking the main thread.├── apps/
│   ├── api/ (NestJS Backend)
│   │   ├── src/
│   │   │   ├── projects/
│   │   │   ├── tech-stack/
│   │   │   └── main.ts
│   └── web/ (Frontend Client)
│       ├── src/
│       │   ├── components/ (UI & Animation Wrappers)
│       │   ├── hooks/      (useLenis, useGsapTimeline)
│       │   └── context/    (SmoothScrollContext)
Core Implementation Mechanics1. Smooth Scroll & GSAP IntegrationLenis manages the kinetic scrolling, which is synchronized with GSAP's ScrollTrigger proxy to prevent layout thrashing and ensure frame-rate stability.TypeScript// Example configuration in Client Root

import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)


2. Animation Strategy DelegationTo optimize rendering performance and avoid library bloat, animation duties are explicitly split:GSAP: Used exclusively for scroll-tied timelines, structural page transitions, and complex canvas/SVG path morphing.Framer Motion: Used for local component states, hover states, layout animations (layoutId), and simple entry/exit transitions.Performance Optimization MetricsScroll Performance: 60fps locked during heavy scroll-bound animations via Lenis virtual rendering layer.Asset Optimization: WebP/AVIF generation for project screenshots; SVGs optimized via SVGO.Bundle Control: Dynamic imports for heavy animation modules to reduce initial critical path payload.Setup & DeploymentPrerequisite ChecklistNode.js v18 or higherPostgreSQL / MongoDB instance (configured for the NestJS backend)Installation Sequence1.Clone and Install Dependencies:Monorepo Root.Run npm install at the root directory to install workspaces dependencies for both client and server applications.2.Environment Configuration:Create .env files.Configure .env in apps/api/ with database strings (DATABASE_URL) and port allocations. Configure .env in apps/web/ with the API endpoint (NEXT_PUBLIC_API_URL).3.Run Database Migrations:NestJS API.Navigate to apps/api/ and run the database initialization script to seed project structures.4.Launch Development Server:Concurrent execution.Execute npm run dev from the root workspace to run both NestJS and the frontend development server concurrently.API Contracts (NestJS)EndpointMethodPayloadFunction/api/projectsGETNoneFetches all portfolio items with tech tags/api/projectsPOSTJSON (Protected)Adds new project details to database/api/experienceGETNoneRetrieves timeline event details

Production Warning: Ensure gsap.ticker.lagSmoothing() is properly calibrated when using Lenis to prevent animation jumps on low-end mobile devices during rapid swipe actions.
