import React, { Component } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";


class ImageGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0,
            viewerIsOpen: false,
        };
    }

    openLightbox = (_event, { _photo, index }) => {
        console.log({ index })

        this.setState({
            currentImage: index,
            viewerIsOpen: true,
        })
    }

    closeLightbox = () => {
        this.setState({
            currentImage: 0,
            viewerIsOpen: false,
        })
    };

    render() {
        const { photos } = this.props;
        const { currentImage, viewerIsOpen } = this.state;

        return (
            <div>
                <Gallery photos={photos} onClick={this.openLightbox} />
                <ModalGateway>
                    {viewerIsOpen && (
                        <Modal onClose={this.closeLightbox}>
                            <Carousel
                                currentIndex={currentImage}
                                views={photos.map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title
                                }))}
                            />
                        </Modal>
                    )}
                </ModalGateway>
            </div>
        );
    }
}

export default ImageGallery;