import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../CSS/welcome.css'
import JewelleriesProducts from './Jewelleries';
import Clothes from './Clothes';

interface HomeProps {
    SelectedCategory: string;
}
// type CategoryComponentProps = JewelleriesProducts | ClothesProps;
type CategoryComponentProps = React.ComponentProps<typeof JewelleriesProducts> | React.ComponentProps<typeof Clothes>;

const WelcomeContent = ({ SelectedCategory }: HomeProps) => {
    console.log("SelectedCategory:", SelectedCategory);

    const categoryComponents: { [key: string]: React.ComponentType<CategoryComponentProps> } = {
        JewelleriesProducts,
        Clothes
    };
    const SelectedComponent = categoryComponents[SelectedCategory];

    return <div id="welcome-content">
        {SelectedComponent && <SelectedComponent />}
        {!SelectedComponent && <div id='welcome-div'>
            <h1>Welcome to Nyanja's e-commerce, The leading online Platform for global trade</h1>
            <form action="">
                <input id='searchInput' placeholder='What are you looking for ?' type="text" /><FontAwesomeIcon className='icons' icon={faSearch} /><button>Search</button>
            </form>
        </div>}
    </div>
}

export default WelcomeContent