import 'bootstrap/dist/css/bootstrap.min.css';
import "../../Settings/reset.css";
import "../../Settings/palette.scss";
import SecurityCheck from "../Pages/SecurityCheck/SecurityCheck";
import AppRouter from "../../Utils/AppRouter";
import {
    BrowserRouter
} from "react-router-dom";

function App() {

    return ( <
        div className = "App" >
        <
        BrowserRouter >
        <
        AppRouter / >
        <
        /BrowserRouter> <
        /div>
    );
}

export default App;