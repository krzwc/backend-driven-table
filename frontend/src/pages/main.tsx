import React, { FunctionComponent } from 'react';
import { connect, HandleThunkActionCreator, MapStateToProps } from 'react-redux';
import '../styles.css';
import 'antd/dist/antd.css';

import { Table } from 'components/table/table';
import { REQUEST_STATUSES } from 'common/consts';
import { login as loginAction } from 'common/store/actions/auth/actions';
import { thunkDispatchify } from 'common/store/actions/helpers/thunkDispatchify';
import { StoreState } from 'common/store/interfaces';
import { authStatusSelector } from 'common/store/selectors/auth-selectors';

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
            <Login authStatus={authStatus} authenticate={login} />
            <Table />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
