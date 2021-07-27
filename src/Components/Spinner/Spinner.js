import React from 'react';
import Loader from 'react-loader-spinner';
import { SpinnerStyled } from './Spinner.styles';

export const Spinner = () => {
    return (
        <SpinnerStyled>
            <Loader type="Bars" color="#00BFFF" height={200} width={200} />
        </SpinnerStyled>
    );
};
