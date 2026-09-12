import { lazy, Suspense } from 'react'
import { About } from './components/About'
import { Contact, Footer } from './components/Contact'
import { SectionHead } from './components/SectionHead'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Impact } from './components/Impact'
import { Band } from './components/Band'
import { Stats } from './components/Stats'
import { FeaturedWork } from './components/FeaturedWork'
import { WhatIBuild } from './components/WhatIBuild'
import { Skills } from './components/Skills'
import { TopBar } from './components/TopBar'

/* React Flow is the single heaviest dependency and lives well below the fold,
   so it is split out and fetched when the visitor gets near it. The fallback
   reserves the diagram's height to keep the scroll position steady. */
const Architecture = lazy(() => import('./components/Architecture'))

function ArchitectureFallback() {
  return (
    <section id="architecture" className="mx-auto max-w-shell px-6 py-16 md:py-[68px]">
      <SectionHead
        eyebrow="System design"
        title="The diagrams behind"
        accent="the bullet points."
        blurb="Drag a node or pan the canvas. These are the two architectures I spent the most time inside - rendered with React Flow rather than screenshotted."
      />
      <div className="h-[440px] w-full animate-pulse rounded-2xl border border-line bg-surface md:h-[500px]" />
    </section>
  )
}

export default function App() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <TopBar />
      <main>
        <Hero />
        <Stats />
        <WhatIBuild />
        <FeaturedWork />
        <Experience />
        <Impact />
        <Band />
        <Suspense fallback={<ArchitectureFallback />}>
          <Architecture />
        </Suspense>
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
