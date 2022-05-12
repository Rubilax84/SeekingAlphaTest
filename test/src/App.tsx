import React from 'react';
import styles from './App.module.scss';
import MainPage from './components/mainPage';

function App() {
    return (
        <div className={styles.wrapper}>
            <MainPage/>
        </div>
    );
}

export default App;
