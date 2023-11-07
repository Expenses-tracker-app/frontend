import React from 'react';
import { Grid, styled } from '@mui/material';

const Wrapper = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Content = styled('div')(() => ({
    textAlign: 'center'
  }));

export const NotFoundPage = () => {
    return (
        <Wrapper>
            <Content>
                <div>
                    <h1>404 - Not Found!</h1>
                    <p>Sorry, the page you are looking for does not exist.</p>
                </div>
            </Content>
        </Wrapper>
    );
};