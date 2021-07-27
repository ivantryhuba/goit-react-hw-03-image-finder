import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import { ToastContainer, toast } from 'react-toastify';

import getImages from './services/imageAPI';

import { Searchbar } from './Components/Searchbar/Searchbar';
import { ImageGallery } from './Components/ImageGallery/ImageGallery';
import { Button } from './Components/Button/Button';
import { Modal } from './Components/Modal/Modal';

class App extends React.Component {
    state = {
        page: 1,
        images: [],
        searchQuery: '',
        showModal: false,
        largeImage: '',
        status: 'idle',
        error: null,
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchQuery !== this.state.searchQuery) {
            this.fetchImages();
        }

        if (prevState.page !== this.state.page) {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        }
    }

    handleFormSubmit = searchQuery => {
        this.setState({
            searchQuery: searchQuery.trim(),
            page: 1,
            images: [],
            status: 'idle',
            error: null,
        });
    };

    fetchImages = () => {
        const { page, searchQuery } = this.state;
        const options = { searchQuery, page };

        this.setState({ status: 'pending' });

        toast.info('Looking for pictures ', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        getImages(options)
            .then(hits =>
                this.setState(prevState => ({
                    page: prevState.page + 1,
                    images: [...prevState.images, ...hits],
                    status: 'resolved',
                })),
            )
            .catch(error => {
                this.setState({ error, status: 'rejected' });

                toast.error('Error!', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    openModal = largeImageURL => {
        this.setState({
            showModal: true,
            largeImage: largeImageURL,
        });
    };

    toggleModal = () => {
        this.setState({
            largeImage: '',
            showModal: false,
        });
    };

    render() {
        const { images, showModal, largeImage, status } = this.state;

        return (
            <div>
                <Searchbar onSubmit={this.handleFormSubmit} />
                <>
                    {status === 'pending' && (
                        <BounceLoader
                            color={'#1F6FCD'}
                            loading={true}
                            size={150}
                        />
                    )}
                    {status === 'resolved' && (
                        <>
                            <ImageGallery
                                images={images}
                                openModal={this.openModal}
                            />

                            {images.length > 0 && (
                                <Button onClick={this.fetchImages} />
                            )}
                        </>
                    )}
                </>

                {showModal && (
                    <Modal onClose={this.toggleModal}>
                        <img src={largeImage} alt="" />
                    </Modal>
                )}
                <ToastContainer />
            </div>
        );
    }
}

export default App;
