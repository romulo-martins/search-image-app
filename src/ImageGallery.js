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

    openLightbox = (_event, { index }) => {
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

    loadPhotosToGallery = () => {
        const { photos } = this.props;
        return (
            photos.map(photo => ({
                src: photo.small,
                height: 3,
                width: 4,
            }))
        )
    }

    loadPhotosToCarrosel = () => {
        const { photos } = this.props;
        const photosToCarrosel = photos.map(photo => ({ src: photo.regular }))
        return (
            photosToCarrosel.map(photo => ({
                ...photo,
                srcset: photo.srcSet,
                caption: photo.title
            }))
        )
    }

    render() {
        const { currentImage, viewerIsOpen } = this.state;

        return (
            <>
                <Gallery
                    photos={this.loadPhotosToGallery()}
                    onClick={this.openLightbox} />
                <ModalGateway>
                    {viewerIsOpen && (
                        <Modal onClose={this.closeLightbox}>
                            <Carousel
                                currentIndex={currentImage}
                                views={this.loadPhotosToCarrosel()}
                            />
                        </Modal>
                    )}
                </ModalGateway>
            </>
        );
    }
}

export default ImageGallery;