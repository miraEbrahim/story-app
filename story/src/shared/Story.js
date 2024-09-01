
import { Provider } from 'react-redux';
import About from '../components/About';
import store from "../app/store";
const StoryWrapper = () => {
    return (
        <Provider store={store}>
            <About />
        </Provider>
    );
};

export default StoryWrapper;