import './index.scss';

import React, { useCallback } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import { useMount } from 'react-use';
import { PROJECT_BRANCH_KEY, WIKI_BRANCH_KEY, SHOW_BRANCH_INFO, ONES_HOST_KEY } from '../../../common/constants';
import { customApiService } from '../../service';
import { BranchData } from '../../service/custom_api';

export const CustomApi: React.FC = () => {
    const [form] = Form.useForm();

    const syncFormData = async () => {
        const projectBranch = await customApiService.getCustomApi();
        form.setFieldsValue(projectBranch);
    };

    const onFinishForm = useCallback(() => {
        customApiService.saveCustomApi(form.getFieldsValue() as BranchData).then(() => {
            window.close();
        });
    }, [form]);

    const onResetClick = async () => {
        await customApiService.saveCustomApi({
            [ONES_HOST_KEY]: null,
            [PROJECT_BRANCH_KEY]: null,
            [WIKI_BRANCH_KEY]: null,
            [SHOW_BRANCH_INFO]: true,
        });
        syncFormData();
    };

    useMount(() => {
        syncFormData();
    });

    return (
        <Form
            className="custom-api"
            name="custom-api"
            wrapperCol={{ span: 12 }}
            labelCol={{ span: 4, offset: 4 }}
            form={form}
            onFinish={onFinishForm}
        >
            <Form.Item name={ONES_HOST_KEY} label="API Host">
                <Input autoFocus />
            </Form.Item>
            <Form.Item name={PROJECT_BRANCH_KEY} label="Project API">
                <Input autoFocus />
            </Form.Item>
            <Form.Item name={WIKI_BRANCH_KEY} label="Wiki API">
                <Input />
            </Form.Item>
            <Form.Item name={SHOW_BRANCH_INFO} label="提示面板" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 12 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
                <Button htmlType="button" onClick={onResetClick}>
                    重置
                </Button>
            </Form.Item>
        </Form>
    );
};
