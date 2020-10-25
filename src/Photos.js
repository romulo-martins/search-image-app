import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import LinearProgress from '@material-ui/core/LinearProgress';
import ImageGallery from './ImageGallery';


const Photos = props => {
    const { photos, fetchMoreData } = props;

    return (
        <InfiniteScroll
            dataLength={photos.length}
            next={fetchMoreData}
            hasMore
            loader={<LinearProgress />}
        >
            <ImageGallery photos={photos} />
        </InfiniteScroll>
    )
}

Photos.propTypes = {
    photos: PropTypes.array,
    fetchMoreData: PropTypes.func,
};

export default Photos;