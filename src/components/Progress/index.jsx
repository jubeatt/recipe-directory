import { useNProgress } from "@tanem/react-nprogress"

import Bar from "./Bar"
import Container from "./Container"
import Spinner from "./Spinner"

export const progressProps = {
  animationDuration: 100,
  incrementDuration: 10,
}

export default function Progress ({
  animationDuration,
  incrementDuration,
  isAnimating,
  minimum
}) {
  const { isFinished, progress } = useNProgress({
    animationDuration,
    incrementDuration,
    isAnimating,
    minimum
  })

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress}/>
      <Spinner />
    </Container>
  )
}
