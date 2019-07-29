import { createEvent } from 'effector'

export const onPlay = createEvent('play game')
export const onStop = createEvent('stop game')
export const onRestart = createEvent('restart game')

export const onEatApple = createEvent('eat apple')

export const onMoveSnake = createEvent('move snake')
export const onSetDirectionForSnake = createEvent(`set snake's direction`)
export const onCrashSnake = createEvent('on crash snake')

export const onClearGameMap = createEvent('clear game map')
export const onUpdateGameMap = createEvent('upadte game map')

export const onChangeAlgorithm = createEvent('change algoright')