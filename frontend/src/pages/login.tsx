import React, { PureComponent } from 'react';
import { Input, Button, Form } from 'antd';
import { FormInstance, Rule } from 'antd/lib/form';

import { REQUEST_STATUSES } from 'common/consts';
import { Loader } from 'components/loader/loader';

interface LoginOwnProps {
    authStatus: REQUEST_STATUSES;
    authenticate(body: BodyInit): void;
}

export class Login extends PureComponent<LoginOwnProps> {
    public state = {
        helpVisible: false,
    };

    private formRef: React.RefObject<FormInstance> = React.createRef();

    private get isLoggingIn() {
        return this.props.authStatus === REQUEST_STATUSES.PENDING;
    }

    private get isLoggingFailed() {
        return this.props.authStatus === REQUEST_STATUSES.FAILURE;
    }

    public render(): JSX.Element {
        return <div className="login-body">{this.renderLogin()}</div>;
    }

    private renderLogin = () => {
        const itemProps = {
            colon: false,
            hasFeedback: true,
        };

        const usernameInputRules: Rule[] = [{ required: true, message: 'Please enter your username' }];

        const passwordInputRules: Rule[] = [{ required: true, message: 'Please enter your password' }];

        if (this.isLoggingFailed) {
            Object.assign(itemProps, { validateStatus: 'error' });
        }

        return (
            <>
                <span>Please Log In</span>
                <Form
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    className="login-form"
                    hideRequiredMark={true}
                    autoComplete="off"
                >
                    <Form.Item name="username" rules={usernameInputRules} {...itemProps}>
                        {this.renderUsernameField()}
                    </Form.Item>
                    <Form.Item name="password" rules={passwordInputRules} {...itemProps}>
                        {this.renderPasswordField()}
                    </Form.Item>
                    <div className="login-form-button-group">{this.renderLoginButton()}</div>
                </Form>
            </>
        );
    };

    private onFinish = (values: any): void => {
        const { authenticate } = this.props;

        authenticate(values);
    };

    private renderUsernameField = () => <Input placeholder="Username" disabled={this.isLoggingIn} autoComplete="off" />;

    private renderPasswordField = () => (
        <Input.Password placeholder="Password" disabled={this.isLoggingIn} autoComplete="off" />
    );

    private renderLoginButton = () => {
        return (
            <span className="">
                <Button type="primary" htmlType="submit" disabled={this.isLoggingIn}>
                    {this.isLoggingIn ? <Loader /> : 'Log in'}
                </Button>
            </span>
        );
    };
}
