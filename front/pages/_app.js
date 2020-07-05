import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css'
import Head from 'next/head';
// import withReduxSaga from 'next-redux-saga';

import wrapper from '../store/configureStore';


const Renotter = ({ Component }) => (
    <>
        <Head>
            <title>Renotter</title>
        </Head>
        <Component />
    </>
);

Renotter.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(Renotter);


// HOC (High-Order Componet)
// export default wrapper.withRedux(withReduxSaga(Renotter));
