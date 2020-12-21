import './index.scss';

import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { useMount } from 'react-use';
import { noop } from 'lodash';
import { PROJECT_BRANCH_KEY, ONES_HOST_KEY } from '../../../common/constants';
import { customApiService } from '../../../service';
import { BranchData } from '../../../service/custom_api';

export const CustomApi: React.FC = () => {
    const [form] = Form.useForm();

    const syncFormData = async () => {
        const projectBranch = await customApiService.getCustomApi();
        form.setFieldsValue(projectBranch);
    };

    const onFormChange = useCallback(() => {
        customApiService.saveCustomApi(form.getFieldsValue() as BranchData)
    }, [form]);

    const onResetClick = async () => {
        await customApiService.saveCustomApi({
            [ONES_HOST_KEY]: null,
            [PROJECT_BRANCH_KEY]: null,
        });
        syncFormData();
    };

    const onSubmitClick = useCallback(() => {
        Promise.resolve()
            .then(() => {
                window.close()
            })
    }, [])

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
            onChange={onFormChange}
            onFinish={noop}
        >
            <Form.Item name={ONES_HOST_KEY} label="API Host">
                <Input autoFocus />
            </Form.Item>
            <Form.Item name={PROJECT_BRANCH_KEY} label="API Branch">
                <Input autoFocus />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 12 }}>
                <Button htmlType="button" onClick={onResetClick}>
                    重置
                </Button>
                <Button type="primary" htmlType="submit" onClick={onSubmitClick}>
                    完成
                </Button>
            </Form.Item>
        </Form>
    );
};
