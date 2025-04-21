// ✅ src/core/hooks/useLocalInfo.ts
'use client'

import { useEffect, useState } from 'react'

export function useLocalInfo() {
  const [timezone, setTimezone] = useState('')
  const [language, setLanguage] = useState('')

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    setLanguage(navigator.language)
  }, [])

  return { timezone, language }
}