import React, { useState } from 'react';
import { Form, Button, Input, Row, Col, Checkbox } from 'antd';
import { connect } from 'dva';
// @ts-ignore
import styles from './UserLayout.less';
const FormItem = Form.Item;
const CODEURL = '/api/sys/codeController/generate';
const UserLayout = props => {
    const url = 'http://localhost:5000/#/userlogin';
    function handleLogin(e) {
        e.preventDefault();
        const { form, dispatch } = props;
        form.validateFields((err, values) => {
            if (!err) {
                const newValues = {
                    ...values,
                    userType: '3',
                };
                dispatch({
                    type: 'global/login',
                    payload: newValues,
                });
            }
        });
    }
    function handleCodeClick() {
    }
    const [codeUrl] = useState(`${CODEURL}?${Date.now()}`);
    const { form: { getFieldDecorator } } = props;
    return (React.createElement("div", { className: styles.container },
        React.createElement("iframe", { className: styles.frame, title: "user", src: url, frameBorder: "0" }),
        React.createElement("div", { className: styles['login-container'] },
            React.createElement(Form, { className: styles.form, onSubmit: handleLogin },
                React.createElement(FormItem, null, getFieldDecorator('username', {
                    rules: [{
                            required: true,
                            message: '请输入用户名',
                        }],
                })(React.createElement(Input, { placeholder: "\u7528\u6237\u540D" }))),
                React.createElement(FormItem, null, getFieldDecorator('password', {
                    rules: [{
                            required: true,
                            message: '请输入密码',
                        }],
                })(React.createElement(Input, { type: "password", autoComplete: "off", placeholder: "\u5BC6\u7801" }))),
                React.createElement(FormItem, null,
                    React.createElement(Row, { gutter: 8 },
                        React.createElement(Col, { span: 17 }, getFieldDecorator('code', {
                            rules: [{
                                    required: true,
                                    message: '请输入验证码',
                                }],
                        })(React.createElement(Input, { autoComplete: "off", placeholder: "\u9A8C\u8BC1\u7801" }))),
                        React.createElement(Col, { span: 7 },
                            React.createElement("img", { className: styles.yanzhengma, src: codeUrl, alt: "", onClick: handleCodeClick })))),
                React.createElement(FormItem, null,
                    React.createElement(Col, { span: 19 }, getFieldDecorator('remember', {
                        valuePropName: 'checked',
                    })(React.createElement(Checkbox, { style: { color: '#fff' } }, "\u8BB0\u4F4F\u5BC6\u7801")))),
                React.createElement(FormItem, { className: styles['form-item'] },
                    React.createElement(Button, { htmlType: "submit", className: styles.login }, "\u767B\u5F55"))))));
};
export default Form.create()(connect(({ global }) => ({
    userInfo: global.userInfo,
}))(UserLayout));
//# sourceMappingURL=UserLayout.js.map