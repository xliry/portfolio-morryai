import { createContext, useContext } from 'react'

export const MotionPreference = createContext(false)
export const useStudioReducedMotion = () => useContext(MotionPreference)
