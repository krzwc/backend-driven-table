import React, { FunctionComponent, Suspense, lazy } from 'react';
import { connect, HandleThunkActionCreator, MapStateToProps } from 'react-redux';
import '../styles.css';
import 'antd/dist/antd.css';

const Table = lazy(() => import('components/table/table'));
import { REQUEST_STATUSES } from 'common/consts';
import { login as loginAction } from 'common/store/actions/auth/actions';
import { thunkDispatchify } from 'common/store/actions/helpers/thunkDispatchify';
import { StoreState } from 'common/store/interfaces';
import { authStatusSelector } from 'common/store/selectors/auth-selectors';
import { Loader } from 'components/loader/loader';

import { Login } from './login';

interface StateToProps {
    authStatus: REQUEST_STATUSES | undefined;
}

const mapStateToProps: MapStateToProps<StateToProps, Record<string, unknown>, StoreState> = (state) => ({
    authStatus: authStatusSelector(state),
});

interface DispatchToProps {
    login: HandleThunkActionCreator<typeof loginAction>;
}
const mapDispatchToProps: DispatchToProps = {
    login: thunkDispatchify(loginAction),
};

export const Main: FunctionComponent<StateToProps & DispatchToProps> = ({ authStatus, login }) => {
    return (
        <div className="container">
            {authStatus === REQUEST_STATUSES.SUCCESS ? (
                <Suspense fallback={<Loader />}>
                    <Table />
                </Suspense>
            ) : (
                <Login authStatus={authStatus} authenticate={login} />
            )}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
