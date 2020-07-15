import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Space, PageHeader, Checkbox } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useDebounce, useUpdate } from 'react-use';
import { customApiService } from '../../service';
import { CUSTOM_API_PATTERNS } from '../../common/constants';
import { PatternConfig } from '../../service/custom_api';

const onFinish = (values: { patterns?: PatternConfig[] }) => {
    console.log('Received values of form:', values);
    customApiService.saveCustomApi({
        [CUSTOM_API_PATTERNS]: values.patterns,
    });
};

const CustomApi: React.FC = () => {
    const [hasInitForm, setHasInitForm] = useState(false);
    const [form] = Form.useForm();
    const update = useUpdate();

    useEffect(() => {
        const effect = async () => {
            const data = await customApiService.getCustomApi();
            const customApiPatterns = data[CUSTOM_API_PATTERNS];
            form.setFieldsValue({
                patterns: customApiPatterns,
            });
            setHasInitForm(true);
        };
        effect();
    }, [form, setHasInitForm]);

    useDebounce(
        () => {
            if (hasInitForm) {
                form.submit();
            }
        },
        300,
        [form.getFieldsValue(), hasInitForm],
    );

    return (
        <div className="custom-api">
            <PageHeader title="API 匹配规则" backIcon={false} />
            <Form name="custom-api" form={form} onFinish={onFinish} autoComplete="off">
                <Form.List name="patterns">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((field) => (
                                    <Space
                                        key={field.key}
                                        className="pattern-config"
                                        style={{ display: 'flex', marginBottom: 8 }}
                                        align="start"
                                    >
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'enable']}
                                            fieldKey={[field.fieldKey, 'enable']}
                                            valuePropName="checked"
                                        >
                                            <Checkbox onChange={update} />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'pattern']}
                                            fieldKey={[field.fieldKey, 'pattern']}
                                        >
                                            <Input placeholder="pattern" onChange={update} />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            onClick={() => {
                                                remove(field.name);
                                                update();
                                            }}
                                        />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add({
                                                enable: false,
                                                pattern: '',
                                            });
                                        }}
                                        block
                                    >
                                        <PlusOutlined /> 添加规则
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
            </Form>
        </div>
    );
};

export { CustomApi };
