import './index.scss'

import React, { useCallback } from 'react';
import { Form, Input, Button, Switch } from 'antd'
import { useMount } from 'react-use'
import { PROJECT_BRANCH_KEY, WIKI_BRANCH_KEY, SHOW_BRANCH_INFO } from '../../../common/constants';
import { branchSettingService } from '../../service';
import { BranchData } from '../../service/branch_setting';

export const BranchSetting: React.FC = () => {
    const [form] = Form.useForm()

    const syncFormData = async () => {
        const projectBranch = await branchSettingService.getBranchSetting()
        console.log("effect -> projectBranch", projectBranch)
        form.setFieldsValue(projectBranch);
    }

    const onFinishForm = useCallback(() => {
        branchSettingService.saveBranchSetting(
            form.getFieldsValue() as BranchData
        )
    }, [form])

    const onResetClick = async () => {
        await branchSettingService.saveBranchSetting({
            [PROJECT_BRANCH_KEY]: null,
            [WIKI_BRANCH_KEY]: null,
            [SHOW_BRANCH_INFO]: true
        });
        syncFormData()
    };

    useMount(() => {
        syncFormData()
    });

    return (
        <Form
            className="branch-setting"
            name="branch-setting"
            wrapperCol={{span: 12}}
            labelCol={{span: 4, offset: 4}}
            form={form}
            onFinish={onFinishForm}
        >
            <Form.Item name={PROJECT_BRANCH_KEY} label="Project API">
                <Input />
            </Form.Item>
            <Form.Item name={WIKI_BRANCH_KEY} label="Wiki API">
                <Input />
            </Form.Item>
            <Form.Item name={SHOW_BRANCH_INFO} label="分支提示" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 12}}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
                <Button htmlType="button" onClick={onResetClick}>
                    重置
                </Button>
            </Form.Item>
        </Form>
    );
}
