import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageGallery from './ImageGallery';
import LinearProgress from '@material-ui/core/LinearProgress';


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

export default Photos;