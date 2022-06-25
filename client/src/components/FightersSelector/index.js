import { Component } from 'react'
import { Button } from '@mui/material'

import NewFighter from '../NewFighter'
import FighterSelector from '../FighterSelector'
import { getFighters } from '../../services/domainRequest/fightersRequest'

import './FightersSelector.css'

class FightersSelector extends Component {
  state = {
    fighters: [],
    fighter1: null,
    fighter2: null,
  }

  async componentDidMount() {
    const fighters = await getFighters()
    if (fighters && !fighters.error) {
      this.setState({ fighters })
    }
  }

  onFightStart = async () => {
    const { fighter1, fighter2 } = this.state
    const { setSelectedFighters, showArena } = this.props

    setSelectedFighters([fighter1, fighter2])
    showArena()
  }

  onCreate = fighter => {
    this.setState({ fighters: [...this.state.fighters, fighter] })
  }

  onFighter1Select = fighter1 => {
    this.setState({ fighter1 })
  }

  onFighter2Select = fighter2 => {
    this.setState({ fighter2 })
  }

  getFighter1List = () => {
    const { fighter2, fighters } = this.state
    if (!fighter2) {
      return fighters
    }

    return fighters.filter(it => it.id !== fighter2.id)
  }

  getFighter2List = () => {
    const { fighter1, fighters } = this.state
    if (!fighter1) {
      return fighters
    }

    return fighters.filter(it => it.id !== fighter1.id)
  }

  render() {
    const { fighter1, fighter2 } = this.state
    return (
      <div id="wrapper">
        <NewFighter onCreated={this.onCreate} />
        <div id="figh-wrapper">
          <div id="title">Select Fighters</div>
          <div id="selectedFighters">
            <FighterSelector
              selectedFighter={fighter1}
              onFighterSelect={this.onFighter1Select}
              fightersList={this.getFighter1List() || []}
            />
            <FighterSelector
              selectedFighter={fighter2}
              onFighterSelect={this.onFighter2Select}
              fightersList={this.getFighter2List() || []}
            />
            <div className="btn-wrapper">
              <Button
                disabled={!(fighter1 && fighter2)}
                onClick={this.onFightStart}
                variant="contained"
                color="primary"
              >
                Start Fight
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FightersSelector
