import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import '../CSS/App.css'
import Header from './header'
import Footer from './footer';
//import JewelleriesProducts from './Jewelleries';
import WelcomeContent from './welcomeContent';

function Home() {

    const [SelectedCategory, setSelectedCategory] = useState('');

    // const switchContent = (selectedContent) => {
    //     setContent(selectedContent);
    // };

    // const renderContent = () => {
    //     switch (content) {
    //         case 'home':
    //             return (
    //                 <div id='home'>
    //                     <h1>Welcome to Nyanja's e-commerce, The leading online Platform for global trade</h1>
    //                     <form action="">
    //                         <input id='searchInput' placeholder='What are you looking for ?' type="text" />
    //                         <FontAwesomeIcon className='icons' icon={faSearch} />
    //                         <button>Search</button>
    //                     </form>
    //                 </div>
    //             );
    //         case 'Jewelleries':
    //             return <JewelleriesProducts />; // Render the Clothes component when selected
    //         default:
    //             return (
    //                 <div id='home'>
    //                     <h1>Welcome to Nyanja's e-commerce, The leading online Platform for global trade</h1>
    //                     <form action="">
    //                         <input id='searchInput' placeholder='What are you looking for ?' type="text" />
    //                         <FontAwesomeIcon className='icons' icon={faSearch} />
    //                         <button>Search</button>
    //                     </form>
    //                 </div>
    //             );
    //     }
    // };

    return (
        <>
            <Header onSelectCategory={setSelectedCategory} />
            <WelcomeContent SelectedCategory={SelectedCategory} />
            <Footer />
        </>
    )
}

export default Home;
