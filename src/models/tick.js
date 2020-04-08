import {
  createStore,
  createEffect,
  forward,
  sample,
  guard,
  attach,
  merge,
  createEvent,
} from 'effector'
import { GAME_STATE } from '../config'
import { $gameState, $fps } from './game'

const $isPlay = $gameState.map((s) => s === GAME_STATE.IS_PLAY)
const $isPause = $gameState.map((s) => s === GAME_STATE.IS_PAUSE)

const tickFx = createEffect().use(
  (fps) =>
    new Promise((rs) => {
      setTimeout(rs, 1000 / fps)
    })
)

export function createTick({ $state, runLogic, runRender }) {
  const $tick = createStore(0)
  const render = createEvent()
  const start = createEvent()

  const nextTickFx = attach({
    effect: tickFx,
    source: $fps,
    mapParams: (_, fps) => fps,
  })

  const triggerTick = guard(merge([nextTickFx.done, $isPlay]), {
    filter: $isPlay,
  })

  const triggerRender = guard($state, { filter: $isPause })

  $tick.on(nextTickFx.done, (previous) => previous + 1)

  sample($state, nextTickFx).watch(runLogic)
  sample($state, render).watch(runRender)

  forward({
    from: merge([start, triggerTick]),
    to: nextTickFx,
  })

  forward({
    from: merge([triggerRender, nextTickFx.done]),
    to: render,
  })

  return {
    $tick,
    start,
  }
}