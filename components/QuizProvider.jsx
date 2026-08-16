'use client'

// =============================================================================
// 3 Bricks — Quiz Provider
// Global context that lets ANY component call `openQuiz(source?)` to open the
// Estimate quiz overlay. Also exposes helper open() for ExitIntent, etc.
// =============================================================================

import { createContext, useCallback, useContext, useState } from 'react'
import dynamic from 'next/dynamic'

const EstimateQuiz = dynamic(() => import('./EstimateQuiz'), { ssr: false })

const QuizCtx = createContext({ openQuiz: () => {}, isOpen: false })

export function QuizProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [source, setSource] = useState('cta')

  const openQuiz = useCallback((src = 'cta') => { setSource(src); setOpen(true) }, [])
  const closeQuiz = useCallback(() => setOpen(false), [])

  return (
    <QuizCtx.Provider value={{ openQuiz, isOpen: open }}>
      {children}
      {open && <EstimateQuiz source={source} onClose={closeQuiz} />}
    </QuizCtx.Provider>
  )
}

export function useQuiz() { return useContext(QuizCtx) }
