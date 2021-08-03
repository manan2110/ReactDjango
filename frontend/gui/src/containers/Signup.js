import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    render() {
        const onFinish = (values) => {
            console.log('Received values of form: ', values);
            this.props.onAuth(
                values.userName,
                values.email,
                values.password,
                values.confirm
            );
            this.props.history.push('/');
        };
        const onFinishFailed = ({ errorFields }) => {
            form.scrollToField(errorFields[0].name);
        };

        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password1"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                    validator={this.validateToNextPassword}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="password2"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                    ]}
                    validator={this.compareToFirstPassword}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Signup
                    </Button> Or
                    <NavLink to='/login/'> Login
                    </NavLink>
                </Form.Item>
            </Form>
        );
    }
};

// ReactDOM.render(<NormalLoginForm />, mountNode);
const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);