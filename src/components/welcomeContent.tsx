import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../CSS/welcome.css'
import JewelleriesProducts from './Jewelleries';
import Food_BeveragesProducts from './Food_Beverages';
import ShoesProducts from './Shoes';
import ElectronicsProducts from './Electronics';
import Clothes from './Clothes';
import CartComponent from './Cart';

interface HomeProps {
    SelectedCategory: string;
}
// type CategoryComponentProps = JewelleriesProducts | ClothesProps;
type CategoryComponentProps = React.ComponentProps<typeof JewelleriesProducts> | React.ComponentProps<typeof Clothes> | React.ComponentProps<typeof CartComponent>;

const WelcomeContent = ({ SelectedCategory }: HomeProps) => {
    // console.log("SelectedCategory:", SelectedCategory);

    const categoryComponents: { [key: string]: React.ComponentType<CategoryComponentProps> } = {
        JewelleriesProducts,
        Clothes,
        ElectronicsProducts,
        ShoesProducts,
        Food_BeveragesProducts,
        CartComponent
    };
    const SelectedComponent = categoryComponents[SelectedCategory];
    

    return <div id="welcome-content">
        {SelectedComponent && <SelectedComponent />}
        {!SelectedComponent && <div id='welcome-div'>
            <h1>Welcome back to Nyanja's e-commerce, The leading online Platform for global trade</h1>
            <form action="">
                <input id='searchInput' placeholder='What are you looking for ?' type="text" /><FontAwesomeIcon className='icons' icon={faSearch} /><button>Search</button>
            </form>
        </div>}
    </div>
}

export default WelcomeContent