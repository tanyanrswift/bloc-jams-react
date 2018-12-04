import React, { Component } from 'react';
import './album.css';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: .5,
      isPlaying: null,
      hoveredSong: null,
      index: null,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.getSongNumber = this.getSongNumber.bind(this);
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ currentVolume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  play(index) {
    this.audioElement.play();
    this.setState({ isPlaying: index });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: null });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song, index) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {this.setSong(song); }
      this.play(index);
    }
  }

  handleMouseEnter(song, index) {
    this.setState({
      hoveredSong: song,
      index
    });
  }

  handleMouseLeave(index) {
    if (this.state.isPlaying !== index) {
      this.setState({
        hoveredSong: null
      });
    }
  }

  functionDisplayIcon(index) {
    if (this.state.isPlaying === index) {
      return (
        <span className = "icon ion-md-pause"></span>
      );
    } else {
      return (
        <span className = "icon ion-md-play"></span>
      )
    }
  }

  getSongNumber(index) {
    if (this.state.isPlaying === index || this.state.index === index) {
      return this.functionDisplayIcon(index)
    }

    return index + 1;
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex -1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = currentIndex === this.state.album.songs.length - 1 ? 0 : Math.min(this.state.album.songs.length - 1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume });
  }

  formatTime(seconds) {
    const minutes = Math.round(seconds / 60);
    const second = Math.round(seconds % 60);
    if (second < 10) {
      return (minutes + ":0" + second);
    } else {
      return (minutes + ":" + second);
    }
  }

  render() {
    return(
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
            this.state.album.songs.map( (song, index) =>
              <tr className="song" key={index} onClick={() => this.handleSongClick(song, index)} onMouseEnter = {() => this.handleMouseEnter(song, index)} onMouseLeave = {() => this.handleMouseLeave(index)} >
                <td id="song-number">{this.getSongNumber(index)}</td>
                 <td id="song-title">{song.title}</td>
                 <td id="song-duration">{this.formatTime(song.duration)}</td>
              </tr>
            )
          }
          </tbody>
        </table>
        <div className='player-bar'>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          currentVolume={this.state.currentVolume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) =>this.handleVolumeChange(e)}
          formatTime={this.formatTime}
        />
        </div>
      </section>
    );
  }
}

export default Album;
