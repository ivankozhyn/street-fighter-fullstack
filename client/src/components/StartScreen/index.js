import { Component } from 'react'

import SignInUp from '../SignInUp'
import FightersSelector from '../FightersSelector'
import SignOut from '../SignOut'
import Modal from '../Modal'
import Arena from '../Arena'
import { isSignedIn } from '../../services/authService'
import { fightersImgs, defaultFightersImg } from '../../config/fightersImgs'

class StartScreen extends Component {
  state = {
    isSignedIn: false,
    isShowModal: false,
    isShowArena: false,
    selectedFighters: [],
    winner: null,
    fightId: null,
  }

  componentDidMount() {
    this.setIsLoggedIn(isSignedIn())
  }

  setFightId = fightId => {
    this.setState({ fightId })
  }

  setSelectedFighters = selectedFighters => {
    this.setState({ selectedFighters })
  }

  setIsLoggedIn = isSignedIn => {
    this.setState({ isSignedIn })
  }

  handleModalClose = () => {
    this.setState({ isShowModal: false })
  }

  showArena = () => {
    this.setState({ isShowArena: true })
  }

  showModal = winner => {
    this.setState(() => ({ isShowArena: false, isShowModal: true, winner }))
  }

  render() {
    const {
      isSignedIn,
      isShowModal,
      isShowArena,
      selectedFighters,
      winner,
      fightId,
    } = this.state

    if (!isSignedIn) {
      return <SignInUp setIsLoggedIn={this.setIsLoggedIn} />
    }

    if (isShowArena) {
      return (
        <Arena
          selectedFighters={selectedFighters}
          fightId={fightId}
          setFightId={this.setFightId}
          showModal={this.showModal}
        />
      )
    }

    if (isShowModal) {
      return (
        <Modal
          title="Fight is over"
          fightId={fightId}
          bodyElement={
            <p>
              <span className="winner">{winner.name}</span> is winner.
              <img
                className="modalImg"
                src={fightersImgs[winner.name] ?? defaultFightersImg}
                alt={winner.name}
              />
            </p>
          }
          onClose={this.handleModalClose}
        />
      )
    }

    return (
      <>
        <FightersSelector
          showArena={this.showArena}
          setSelectedFighters={this.setSelectedFighters}
        />
        <SignOut
          isSignedIn={isSignedIn}
          onSignOut={() => this.setIsLoggedIn(false)}
        />
      </>
    )
  }
}

export default StartScreen
