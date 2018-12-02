import React, { Component } from 'react'; //allows us to use a class based component
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './library.css';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
    //A component's state is data on the component that's designed to be dynamic
    // and changeable throughout the lifetime of the component.
  }
  render() {
    return(
      <section className='library'>
        {
          this.state.albums.map( (album, index) =>
            <Link className='link' to={`/album/${album.slug}`} key={index}>
              <img className='image' src={album.albumCover} alt={album.title} />
              <div className='album'>
                <div id='title'>{album.title}</div>
                <div id='artist'>{album.artist}</div>
                <div id='songs'>{album.songs.length} songs</div>
              </div>
            </Link>
          )
        }
      </section>
    );
  }
}

export default Library;
