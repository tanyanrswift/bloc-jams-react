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
            <Link to={`/album/${album.slug}`} key={index}>
              <img className='image' src={album.albumCover} alt={album.title} />
              <div>{album.title}</div>
              <div>{album.artist}</div>
              <div>{album.songs.length} songs</div>
            </Link>
          )
        }
      </section>
    );
  }
}

export default Library;
