import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { startCheking } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { cheking, uid } = useSelector(state => state.auth)
    // console.log(cheking, uid)

    useEffect(() => {
        dispatch(startCheking())
    }, [dispatch]);

    if (cheking) {
        return (<h5>Espere...</h5>);
    }

    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <PublicRoute exact path="/login" component={LoginScreen} isAuthenticated={!!uid} />
                        <PrivateRoute exact path="/" component={CalendarScreen} isAuthenticated={!!uid}/>
                        <Redirect to="/" />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
