import React from 'react'
import { useTheme } from '../hooks/useTheme'

export default function Label ({ text, useDarkTheme }) {
  const { darkTheme } = useTheme()
  return <div className={`  ${useDarkTheme && darkTheme ? 'label-dark' : 'label'}`}>{text}</div>
}
