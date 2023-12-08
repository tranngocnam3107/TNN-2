import React from 'react'
import {RoutesList} from '../Routes/RoutesList';
import {Route, Routes} from "react-router-dom";
import SecurityCheck from "../Components/Pages/SecurityCheck/SecurityCheck";
const AppRouter = () => {
    return (
        <Routes>
            {
                RoutesList.map((el) =>
                    <Route path={el.path} element={el.element} key={el.path} />
                )
            }
            <Route path={'*'} element={<SecurityCheck/>} />
        </Routes>

    )
}

export default AppRouter
