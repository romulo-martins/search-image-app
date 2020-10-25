import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageGallery from './ImageGallery';


const Photos = props => {
    const { photos, fetchMoreData } = props;

    return (
        <>
            {photos &&
                <InfiniteScroll
                    dataLength={photos.length}
                    next={fetchMoreData}
                    hasMore
                    loader={<h4>Loading...</h4>}
                >
                    <ImageGallery photos={photos} />
                </InfiniteScroll>
            }
        </>
    )
}

export default Photos;