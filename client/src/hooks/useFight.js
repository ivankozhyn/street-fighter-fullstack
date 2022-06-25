import { useState, useEffect, useCallback, useRef } from 'react'

import { controls } from '../config/controls'
import { getRandomNumberFrom1to2 } from '../utils/getRandomNumberFrom1to2'
import { putFight, getFight } from '../services/domainRequest/fightRequest'

export const useFight = (firstFighter, secondFighter, fightId) => {
  const [winner, setWinner] = useState(null)
  const [healthLeftIndicatorWidth, setHealthLeftIndicatorWidth] = useState(null)
  const [healthRightIndicatorWidth, setHealthRightIndicatorWidth] =
    useState(null)
  const [fighter1Shot, setFighter1Shot] = useState(0)
  const [fighter2Shot, setFighter2Shot] = useState(0)

  let firstFighterHealth = useRef(firstFighter.health)
  let secondFighterHealth = useRef(secondFighter.health)

  const firstFighterHealthInPercent = useRef(100 / firstFighterHealth.current)
  const secondFighterHealthInPercent = useRef(100 / secondFighterHealth.current)

  let isFirstFighterBlock = useRef(false)
  let isSecondFighterBlock = useRef(false)
  let isFirstFighterCriticalHit = useRef(false)
  let isSecondFighterCriticalHit = useRef(false)
  let criticalHitFirstFighter = useRef([])
  let criticalHitSecondFighter = useRef([])

  const resetFighterBlock = useCallback(e => {
    if (e.code === controls.PlayerOneBlock) {
      isFirstFighterBlock.current = false
    }
    if (e.code === controls.PlayerTwoBlock) {
      isSecondFighterBlock.current = false
    }
  }, [])

  const updateFightData = useCallback(async () => {
    try {
      if (fightId) {
        const lastFightData = await getFight(fightId)
        if (fighter1Shot || fighter2Shot) {
          await putFight(fightId, {
            fighter1: firstFighter.id,
            fighter2: secondFighter.id,
            log: [
              ...lastFightData.log,
              {
                fighter1Shot: fighter1Shot,
                fighter2Shot: fighter2Shot,
                fighter1Health: firstFighterHealth.current,
                fighter2Health: secondFighterHealth.current,
              },
            ],
          })
        }
      }
    } catch (error) {
      console.error('error: ', error)
    }
  }, [fightId, fighter1Shot, fighter2Shot, firstFighter.id, secondFighter.id])

  const battle = useCallback(
    async e => {
      const PlayerOneCriticalHitCombinationKeys = { KeyQ: 0, KeyW: 1, KeyE: 2 }
      const PlayerTwoCriticalHitCombination = { KeyU: 0, KeyI: 1, KeyO: 2 }
      const pauseAfterLastCriticalHit = 10000

      if (
        e.code === controls.PlayerOneAttack &&
        !isFirstFighterBlock.current &&
        !isSecondFighterBlock.current
      ) {
        secondFighterHealth.current -= getDamage(firstFighter, secondFighter)
        setHealthRightIndicatorWidth(
          secondFighterHealth.current * secondFighterHealthInPercent.current +
            '%'
        )
        setFighter1Shot(prevState => prevState + 1)
      }
      if (
        e.code === controls.PlayerTwoAttack &&
        !isSecondFighterBlock.current &&
        !isFirstFighterBlock.current
      ) {
        firstFighterHealth.current -= getDamage(secondFighter, firstFighter)
        setHealthLeftIndicatorWidth(
          firstFighterHealth.current * firstFighterHealthInPercent.current + '%'
        )
        setFighter2Shot(prevState => prevState + 1)
      }
      if (e.code === controls.PlayerOneBlock) {
        isFirstFighterBlock.current = true
      }
      if (e.code === controls.PlayerTwoBlock) {
        isSecondFighterBlock.current = true
      }

      switch (e.code) {
        case controls.PlayerOneCriticalHitCombination[
          PlayerOneCriticalHitCombinationKeys.KeyQ
        ]:
          criticalHitFirstFighter.current.push(e.code)
          break
        case controls.PlayerOneCriticalHitCombination[
          PlayerOneCriticalHitCombinationKeys.KeyW
        ]:
          criticalHitFirstFighter.current.push(e.code)
          break
        case controls.PlayerOneCriticalHitCombination[
          PlayerOneCriticalHitCombinationKeys.KeyE
        ]:
          criticalHitFirstFighter.current.push(e.code)
          if (
            criticalHitFirstFighter.current.length ===
              controls.PlayerOneCriticalHitCombination.length &&
            !isFirstFighterCriticalHit.current
          ) {
            secondFighterHealth.current -= getCriticalHitDamage(firstFighter)
            setHealthRightIndicatorWidth(
              secondFighterHealth.current *
                secondFighterHealthInPercent.current +
                '%'
            )
            setFighter1Shot(prevState => prevState + 1)
            isFirstFighterCriticalHit.current = true
            setTimeout(() => {
              isFirstFighterCriticalHit.current = false
              criticalHitFirstFighter.current = []
            }, pauseAfterLastCriticalHit)
          } else {
            criticalHitFirstFighter.current = []
          }
          break
        case controls.PlayerTwoCriticalHitCombination[
          PlayerTwoCriticalHitCombination.KeyU
        ]:
          criticalHitSecondFighter.current.push(e.code)
          break
        case controls.PlayerTwoCriticalHitCombination[
          PlayerTwoCriticalHitCombination.KeyI
        ]:
          criticalHitSecondFighter.current.push(e.code)
          break
        case controls.PlayerTwoCriticalHitCombination[
          PlayerTwoCriticalHitCombination.KeyO
        ]:
          criticalHitSecondFighter.current.push(e.code)
          if (
            criticalHitSecondFighter.current.length ===
              controls.PlayerTwoCriticalHitCombination.length &&
            !isSecondFighterCriticalHit.current
          ) {
            firstFighterHealth.current -= getCriticalHitDamage(secondFighter)
            setHealthLeftIndicatorWidth(
              firstFighterHealth.current * firstFighterHealthInPercent.current +
                '%'
            )
            setFighter2Shot(prevState => prevState + 1)
            isSecondFighterCriticalHit.current = true
            setTimeout(() => {
              isSecondFighterCriticalHit.current = false
              criticalHitSecondFighter.current = []
            }, pauseAfterLastCriticalHit)
          } else {
            criticalHitSecondFighter.current = []
          }
          break
        default:
          criticalHitFirstFighter.current = []
          criticalHitSecondFighter.current = []
      }
    },
    [firstFighter, secondFighter]
  )

  useEffect(() => {
    document.addEventListener('keydown', battle)
    document.addEventListener('keyup', resetFighterBlock)
    return () => {
      document.removeEventListener('keydown', battle)
      document.removeEventListener('keyup', resetFighterBlock)
    }
  }, [battle, resetFighterBlock])

  useEffect(() => {
    const getWinner = async () => {
      await updateFightData()
      if (firstFighterHealth.current <= 0) {
        setHealthLeftIndicatorWidth(0 + '%')
        setWinner(secondFighter)
      }
      if (secondFighterHealth.current <= 0) {
        setHealthRightIndicatorWidth(0 + '%')
        setWinner(firstFighter)
      }
    }
    getWinner()
  }, [updateFightData, firstFighter, secondFighter])

  return [winner, healthLeftIndicatorWidth, healthRightIndicatorWidth]
}

function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender)
  return damage > 0 ? damage : 0
}

function getCriticalHitDamage(fighter) {
  return fighter.power * 2
}

function getHitPower(fighter) {
  const criticalHitChance = getRandomNumberFrom1to2()
  const hitPower = fighter.power * criticalHitChance
  return hitPower
}

function getBlockPower(fighter) {
  const dodgeChance = getRandomNumberFrom1to2()
  const blockPower = fighter.defense * dodgeChance
  return blockPower
}
