import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Photos = props => {
    const { photos, pages, currentPage } = props;

    return (
        <div>
            {photos ?
                <InfiniteScroll
                    dataLength={photos.length}
                    next={props.fetchMoreData}
                    hasMore={pages - currentPage !== 0}
                    loader={<h4>Loading...</h4>}
                >
                    <div className='flex'>
                        {photos.map((photo, index) => (
                            <div key={index}>
                                <img id={photo.id} src={photo.url} alt='lorem ipsum' />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
                : null}
        </div>
    )
}

export default Photos;