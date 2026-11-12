'use client'
import dynamic from 'next/dynamic'
import ConversionTracking from './ConversionTracking'
import MobileCta from './MobileCta'

const Cursor      = dynamic(() => import('./Cursor'),      { ssr: false })
const ProgressBar = dynamic(() => import('./ProgressBar'), { ssr: false })

export default function ClientShell() {
  return (
    <>
      <Cursor />
      <ProgressBar />
      <ConversionTracking />
      <MobileCta />
    </>
  )
}
