import React, { Component } from "react";
import PropTypes from 'prop-types';
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
        const photosToGallery = photos.map(photo => ({
            src: photo.urls.small,
            height: 3,
            width: 4,
        }))
        return photosToGallery
    }

    loadPhotosToCarrosel = () => {
        const { photos } = this.props;
        const photosToCarrosel = photos.map(photo => ({
            src: photo.urls.regular,
            caption: photo.description,
            alt: photo.alt_description,
        }))
        return photosToCarrosel
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

ImageGallery.propTypes = {
    photos: PropTypes.object,
};

export default ImageGallery;