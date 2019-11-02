import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Row, Col, Checkbox } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { routerRedux } from 'dva/router';
// @ts-ignore
import styles from './UserLayout.less';


const FormItem = Form.Item;

interface UserTypes extends FormComponentProps{
  dispatch: Dispatch<any>;
  userInfo: any
}

const CODEURL = '/api/sys/codeController/generate';

const UserLayout: React.FC<UserTypes> = props => {
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
  return (
    <div className={styles.container}>
      <iframe className={styles.frame} title="user" src={url} frameBorder="0" />
      <div className={styles['login-container']}>
        <Form className={styles.form} onSubmit={handleLogin}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{
                required: true,
                message: '请输入用户名',
              }],
            })(
              <Input placeholder="用户名" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: '请输入密码',
              }],
            })(
              <Input type="password" autoComplete="off" placeholder="密码" />,
            )}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={17}>
                {getFieldDecorator('code', {
                  rules: [{
                    required: true,
                    message: '请输入验证码',
                  }],
                })(
                  <Input autoComplete="off" placeholder="验证码" />,
                )}
              </Col>
              <Col span={7}>
                <img className={styles.yanzhengma} src={codeUrl} alt="" onClick={handleCodeClick} />
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Col span={19}>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
              })(
                <Checkbox style={{ color: '#fff' }}>记住密码</Checkbox>,
              )}
            </Col>
            {/* <Col span={5}> */}
            {/* <span>忘记密码</span> */}
            {/* </Col> */}
          </FormItem>
          <FormItem className={styles['form-item']}>
            <Button htmlType="submit" className={styles.login}>登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default Form.create<UserTypes>()(connect(({ global }) => ({
  userInfo: global.userInfo,
}))(UserLayout));
