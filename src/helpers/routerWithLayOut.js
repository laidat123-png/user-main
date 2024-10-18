import {
    Route
} from "react-router-dom";

export function RouteWithLayout({ layout: Layout, component: Component, ...rest }) {
    return (
        <Route {...rest} render={(props) =>
            <Layout
                {...props}
            >
                <Component
                    {...props}
                />
            </Layout>
        } />
    );
}