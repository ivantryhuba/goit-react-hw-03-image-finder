import React from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
    imageUrl,
    tags,
    largeImageURL,
    openModal,
}) => {
    return (
        <li>
            <img
                src={imageUrl}
                alt={tags}
                onClick={() => openModal(largeImageURL)}
            />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
};
