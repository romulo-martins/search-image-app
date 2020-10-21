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

  componentDidMount() {
    fetch(`${BASE_URL}/photos?page=${this.state.currentPage + 1}&per_page=${this.state.pages}`, {
      method: 'GET',
      headers: {
        'Authorization': `Client-ID ${access_token}`
      }
    })
      .then(res => res.json())
      .then(res => this.setState({ photos: res }))
  }

  fetchMoreData = () => {
    fetch(`${BASE_URL}/photos?page=${this.state.currentPage + 1}&per_page=${this.state.pages}`, {
      method: 'GET',
      headers: {
        'Authorization': `Client-ID ${access_token}`
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          photos: [...this.state.photos, ...res],
          currentPage: this.state.currentPage + 1,
        })
      })
  }

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