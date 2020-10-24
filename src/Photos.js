import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageGallery from './ImageGallery';


const Photos = props => {
    const { photos, pages, currentPage } = props;

    return (
        <div>
            {photos &&
                <InfiniteScroll
                    dataLength={photos.length}
                    next={props.fetchMoreData}
                    hasMore={pages - currentPage !== 0}
                    loader={<h4>Loading...</h4>}
                >
                    <ImageGallery photos={photos} />;
                </InfiniteScroll>
            }
        </div>
    )
}

export default Photos;