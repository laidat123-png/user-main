import './App.css';
import { routers } from './Routers/index'
import { MainLayout } from './layout/MainLayout';
import React, { useEffect } from "react";
import { getCurrentUser } from './actions/actionAuth';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingPage } from './components/LoadingPage';
import { fetchAPIRequest } from './actions/actionProducts';
import { ToastContainer } from 'react-toastify';
import { RouteWithLayout } from './helpers/routerWithLayOut';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { PrivateRoute } from './helpers/PrivateRouter';
import { Account } from './page/Account';
import { CartWidget } from './components/CartWidget';
import { Model } from './components/Model';
import { OrderLayout } from './layout/OrderLayout';
import { Checkout } from './page/Checkout';
import { Cart } from './page/Cart';
import { OrderReceived } from './components/OrderReceived';
function App() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading.loadingall);
    useEffect(() => {
        fetchAPIRequest(dispatch);
        getCurrentUser(dispatch);
    }, [])
    return (
        <Router>
            <div className="site-wrap">
                <Model />
                <CartWidget />
                <ToastContainer />
                {loading ? <Switch>
                    {routers.map(route => {
                        return (
                            route.layout ? <RouteWithLayout
                                key={route.path}
                                path={route.path}
                                exact={route.exact}
                                layout={MainLayout}
                                component={route.component}
                            /> : <Route
                                key={route.path}
                                path={route.path}
                                exact={route.exact}
                                component={route.component}
                            />
                        )
                    })}
                    <PrivateRoute path="/My-account" exact component={Account} layout={MainLayout} />
                    <RouteWithLayout path="/Cart" exact component={Cart} layout={OrderLayout} />
                    <RouteWithLayout path="/Checkout" exact component={Checkout} layout={OrderLayout} />
                    <RouteWithLayout path="/Order-received" exact component={OrderReceived} layout={OrderLayout} />
                </Switch> : <LoadingPage />}
            </div>
        </Router>
    );
}




export default App;
