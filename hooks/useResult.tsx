import { useState } from 'react'
import ResultBanner from '../components/common/ResultBanner'
import { FormResult } from '../types/types'

type ResultHookI = [
  ResultBannerWrapper: () => JSX.Element | null,
  setResult: (newResult: FormResult) => void
]

export const useResult = (): ResultHookI => {
  const [result, setResultState] = useState<FormResult>()

  const setResult = (newResult: FormResult) => {
    setResultState(newResult)
    setTimeout(() => {
      setResultState(undefined)
    }, 5000)
  }

  const ResultBannerWrapper = () => {
    if (!result) return null
    return <ResultBanner result={result} />
  }

  return [ResultBannerWrapper, setResult]
}
