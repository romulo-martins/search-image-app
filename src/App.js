import React from 'react';
import Photos from './Photos';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const LIMIT = 5;

class App extends React.Component {
  state = {
    photos: [],
    pages: 10,
    currentPage: 1,
  }

  componentDidMount() {
    fetch(`${BASE_URL}/photos?_page=1&_limit=${LIMIT}`)
      .then(res => res.json())
      .then(res => this.setState({ photos: res }))
  }

  fetchMoreData = () => {
    fetch(`${BASE_URL}/photos?_page=${this.state.currentPage + 1}&_limit=${LIMIT}`)
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