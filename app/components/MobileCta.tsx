'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Barra fija en mobile: aparece después del primer scroll y se esconde mientras
// el formulario está a la vista (no tiene sentido invitar a algo que ya se ve).
export default function MobileCta() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(entries => {
      setFormVisible(entries.some(e => e.isIntersecting))
    })
    document.querySelectorAll('.dist__form').forEach(f => io.observe(f))

    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [pathname])

  const visible = scrolled && !formVisible

  useEffect(() => {
    document.body.classList.toggle('has-mobile-cta', visible)
    return () => document.body.classList.remove('has-mobile-cta')
  }, [visible])

  const href = pathname === '/distribuidores' ? '#formulario' : '/distribuidores#formulario'

  return (
    <div className={`mobile-cta${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <Link href={href} className="pop-btn pop-btn--orange" tabIndex={visible ? 0 : -1} data-track="mobile_bar">
        Quiero ser distribuidor
      </Link>
    </div>
  )
}
