import React from 'react';
import Photos from './Photos';
import 'dotenv'

const BASE_URL = 'https://api.unsplash.com';
const access_token = process.env.REACT_APP_ACCESS_TOKEN;

class App extends React.Component {
  state = {
    photos: [],
    pages: 20,
    currentPage: 1,
  }

  fetchData = () => {
    fetch(`${BASE_URL}/photos?page=${this.state.currentPage + 1}&per_page=${this.state.pages}`, {
      method: 'GET',
      headers: {
        'Authorization': `Client-ID ${access_token}`
      }
    })
    .then(response => response.json())
    .then(response => {
      const photos_url = response.map(r => ({
          src: r.urls.regular,
          width: 4,
          height: 3,
        })
      )
      
      this.setState({
        photos: [...this.state.photos, ...photos_url],
        currentPage: this.state.currentPage + 1,
      })
    })
    
  }

  componentDidMount() { this.fetchData() }

  fetchMoreData = () => { this.fetchData() }

  render() {
    const { photos, pages, currentPage } = this.state;

    return (
      <Photos
        fetchMoreData={this.fetchMoreData}
        photos={photos}
        pages={pages}
        currentPage={currentPage}
      />
    )
  }
}

export default App;