// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timer: 25, minutes: 25, seconds: '00', isTimerRunning: false}

  onTimerDecrement = () => {
    const {timer, isTimerRunning} = this.state
    if (timer >= 1 && !isTimerRunning) {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
        minutes: prevState.timer - 1,
      }))
    }
  }

  onTimerIncrement = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.setState(prevState => ({
        timer: prevState.timer + 1,
        minutes: prevState.timer + 1,
      }))
    }
  }

  onPlayPauseBtn = () => {
    const {isTimerRunning} = this.state

    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
      minutes:
        prevState.timer === prevState.minutes
          ? prevState.minutes - 1
          : prevState.minutes,
      seconds:
        parseInt(prevState.seconds) === 0
          ? 60 - 1
          : parseInt(prevState.seconds),
    }))
    if (isTimerRunning) {
      clearInterval(this.timerId)
      clearInterval(this.secondsId)
    } else {
      this.timerId = setInterval(this.runTimer, 60000)
      this.secondsId = setInterval(this.runSeconds, 1000)
    }
  }

  runTimer = () => {
    const {minutes} = this.state

    if (minutes >= 1) {
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    }
  }

  runSeconds = () => {
    const {seconds} = this.state
    if (seconds === 0) {
      this.setState({seconds: 59})
    } else {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    }
  }

  onResetTimer = () => {
    clearInterval(this.secondsId)
    clearInterval(this.timerId)
    this.setState({
      timer: 25,
      minutes: 25,
      seconds: '00',
      isTimerRunning: false,
    })
  }

  render() {
    const {timer, minutes, seconds, isTimerRunning} = this.state

    let imgUrl
    let text
    let altText
    if (isTimerRunning) {
      imgUrl = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      text = 'Pause'
      altText = 'pause icon'
    } else {
      imgUrl = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      text = 'Start'
      altText = 'play icon'
    }

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="app-container">
          <div className="timer-img-bg-container">
            <div className="timer-bg-container" />
            <div className="timer-container">
              <h1 className="timer">
                {minutes}:{seconds}
              </h1>
              {isTimerRunning ? (
                <p className="play-pause">Running</p>
              ) : (
                <p className="play-pause">Paused</p>
              )}
            </div>
          </div>
          <div className="timer-controller-container">
            <div className="controller-container">
              <div className="play-pause-container">
                <button
                  type="button"
                  className="control-btn controller"
                  onClick={this.onPlayPauseBtn}
                >
                  <img className="controller-img" src={imgUrl} alt={altText} />
                  {text}
                </button>
              </div>
              <div className="reset-container">
                <button type="button" className="control-btn controller">
                  <img
                    className="controller-img"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    onClick={this.onResetTimer}
                  />
                  Reset
                </button>
              </div>
            </div>
            <p className="info">Set Timer limit</p>
            <div className="timer-controller">
              <button
                className="count-decrement"
                type="button"
                onClick={this.onTimerDecrement}
              >
                -
              </button>
              <p className="count">{timer}</p>
              <button
                className="count-increment"
                type="button"
                onClick={this.onTimerIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
