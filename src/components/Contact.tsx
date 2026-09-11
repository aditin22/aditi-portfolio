import { motion } from 'framer-motion'
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '../data/resume'
import { Reveal } from './Reveal'

const CHANNELS = [
  { icon: Mail, label: 'Email', value: profile.email, href: profile.emailHref },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { icon: Linkedin, label: 'LinkedIn', value: 'aditi-navhal', href: profile.linkedin },
  { icon: Github, label: 'GitHub', value: 'aditin22', href: profile.github },
  { icon: MapPin, label: 'Based in', value: profile.location, href: null },
]

export function Contact() {
  return (
    <section id="contact" className="band-cta relative overflow-hidden py-16 md:py-[104px]">
      <span className="hero-orb hero-orb-b" aria-hidden="true" />
      <div className="relative z-[1] mx-auto max-w-shell px-6 text-center">
        <Reveal>
          <span className="t-eyebrow" style={{ color: 'rgba(255,255,255,0.65)' }}>
            <span className="live-dot" />
            Available for new roles
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="t-display mx-auto max-w-[760px] text-white">
            Let's build <span style={{ color: '#cfeeff' }}>something.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p
            className="mx-auto mt-4 max-w-[560px] text-[17px] leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.9)' }}
          >
            I'm interested in <strong className="font-semibold text-white">Software Engineer / Full-Stack Engineer</strong>{' '}
            roles involving .NET, React and scalable product development. Email is the fastest way
            to reach me.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={profile.emailHref} target="_blank" rel="noreferrer noopener" className="btn-white btn-compact">
              <Mail size={16} />
              Email me
              <ArrowUpRight size={15} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" className="btn-glass btn-compact">
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer noopener" className="btn-glass btn-compact">
              <Github size={16} />
              GitHub
            </a>
            <a href={`${import.meta.env.BASE_URL}${profile.resumeFile}`} download className="btn-glass btn-compact">
              <Download size={16} />
              Resume
            </a>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[980px] grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
          {CHANNELS.map((c, i) => {
            const Inner = (
              <>
                <c.icon size={16} style={{ color: 'rgba(255,255,255,0.8)' }} />
                <div className="mt-2.5">
                  <div
                    className="text-[11.5px] uppercase tracking-[1.2px]"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {c.label}
                  </div>
                  <div className="mt-1 break-words text-[13.5px] font-semibold text-white">
                    {c.value}
                  </div>
                </div>
              </>
            )
            return (
              <Reveal key={c.label} delay={0.05 * i}>
                <motion.div whileHover={{ y: -2 }} className="flex h-full flex-col items-center">
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer noopener"
                      className="flex flex-col items-center"
                    >
                      {Inner}
                    </a>
                  ) : (
                    Inner
                  )}
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-page">
      <div className="mx-auto flex max-w-shell flex-col items-center justify-between gap-4 px-5 py-8 text-[13px] text-ink-3 sm:flex-row md:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind, Framer Motion &
          React Flow.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="transition-colors hover:text-brand"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="transition-colors hover:text-brand"
          >
            <Github size={16} />
          </a>
          <a
            href={profile.emailHref}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Email"
            className="transition-colors hover:text-brand"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
