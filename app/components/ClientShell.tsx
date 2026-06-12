'use client'
import dynamic from 'next/dynamic'

const Cursor      = dynamic(() => import('./Cursor'),      { ssr: false })
const ProgressBar = dynamic(() => import('./ProgressBar'), { ssr: false })

export default function ClientShell() {
  return (
    <>
      <Cursor />
      <ProgressBar />
    </>
  )
}
