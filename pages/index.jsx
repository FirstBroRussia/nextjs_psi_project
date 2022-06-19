import {useEffect} from 'react';


import Head from 'next/head'
import Header from '../components/header/Header/Header';
import Logo from '../components/header/Logo';
import Navbar from '../components/header/Navbar/Navbar';
import Sandwich from '../components/header/Sandwich/Sandwich';
import SocialNetworkList from '../components/Social-Network-List/SocialNetworkList';

import styles from '../styles/Index.module.scss'
import Main from '../components/Main/Main';
import Image from 'next/image';

let initial = false;

export default function Home() {

	// useEffect(() => {
	// 	if (!initial) {
	// 		window.addEventListener('resize', (evt) => {
	// 			console.log(evt);
	// 		});
	// 		initial = true;
	// 	}
	// }, []);
  return (
    <div className={styles.main_container}>
      <Head>
        <title>Анастасия Судакова</title>
        <meta name="description" content="Сайт психолога" />
        <link rel="icon" href="/favicon.ico" />  
	<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
	{/* РАЗОБРАТЬСЯ 
	С 
	ИКОНКАМИ 
	!!!!!!!!!!!!!!!!!!!!!!!! */}
      </Head>
	<Header />
	<Main />
	<footer className="footer">
		<div className="navbar_wrapper">
			<Navbar />
		</div>
		<div className="content_wrapper">
			<div className="social_network_wrapper">
			<SocialNetworkList width="35" />
			</div>
			<div className="logo_wrapper">
				<Logo width="300" height="80" />
			</div>
			<ul className="copyright_list">
				<li className="copyright_item year">2022</li>
				<li className="copyright_item privacy">Политика конфиденциальности</li>
			</ul>
		</div>
	</footer>
	{/* <div className="background_image">
		<Image src={} alt="Фоновое изображение" />
	</div> */}
    </div>
  )
}
