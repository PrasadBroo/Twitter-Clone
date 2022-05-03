import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function ForYou() {
    const [searchParams] = useSearchParams();
  return (
    <div>{searchParams.get("q")}</div>
  )
}
