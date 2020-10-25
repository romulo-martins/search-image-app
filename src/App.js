import React from 'react';
import Photos from './Photos';
import {
  IconButton,
  Container,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const BASE_URL = 'https://api.unsplash.com';
const access_token = process.env.REACT_APP_ACCESS_TOKEN;

class App extends React.Component {
  state = {
    photos: [],
    pages: 20,
    currentPage: 1,
    term: '',
  }

  fetchSearchData = (query = '') => {
    const { photos, pages, currentPage } = this.state;

    const payload = {
      per_page: pages,
      page: currentPage + 1,
      query: query
    }
    const params = new URLSearchParams(payload).toString();

    fetch(`${BASE_URL}/search/photos?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Client-ID ${access_token}`
      },
    })
      .then(response => response.json())
      .then(response => {
        const photo_urls = response.results.map(resp => resp.urls)

        this.setState({
          photos: [...photos, ...photo_urls],
          currentPage: currentPage + 1,
        })
      })
  }

  fetchData = () => {
    const { photos, pages, currentPage } = this.state;
    const payload = {
      per_page: pages,
      page: currentPage + 1,
    }
    const params = new URLSearchParams(payload).toString();

    fetch(`${BASE_URL}/photos?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Client-ID ${access_token}`
      },
    })
      .then(response => response.json())
      .then(response => {
        const photo_urls = response.map(resp => resp.urls)

        this.setState({
          photos: [...photos, ...photo_urls],
          currentPage: currentPage + 1,
        })
      })
  }

  componentDidMount() { this.fetchData() }

  fetchMoreData = () => {
    const { term } = this.state;
    if (term.length > 0) {
      this.fetchSearchData(term)
    } else {
      this.fetchData()
    }
  }

  handleChange = (event) => {
    this.setState({ term: event.target.value })
  }

  handleSearch = () => {
    this.setState({
      photos: [], currentPage: 1
    }, () => {
      this.fetchSearchData(this.state.term)
    })
  }

  render() {
    const { photos, pages, currentPage, term } = this.state;

    return (
      <Container>
        <FormControl className=''>
          <InputLabel>Search ...</InputLabel>
          <Input
            type='text'
            value={term}
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle search"
                  onClick={this.handleSearch}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <br />
        <br />
        
        <Photos
          fetchMoreData={this.fetchMoreData}
          photos={photos}
          pages={pages}
          currentPage={currentPage}
        />
      </ Container>
    )
  }
}

export default App;