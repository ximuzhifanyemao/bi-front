import { genChartByAiAsyncUsingPost } from '@/services/yubi/chartController';
import { UploadOutlined } from '@ant-design/icons';
// @ts-ignore
import { Button, Card, Form, message, Select, Space, Upload } from 'antd';
// @ts-ignore
import TextArea from 'antd/es/input/TextArea';
// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import { ProForm } from '@ant-design/pro-form';
import useForm = ProForm.useForm;

/**
 * 添加图表(异步)
 * @constructor
 */
const AddChartAsync: React.FC = () => {
  const [form] = useForm();
  //提交状态，默认未提交
  const [submitting, setSubmitting] = useState<boolean>(false);

  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    if (submitting) {
      return;
    }
    //开始提交时，把状态改为true
    setSubmitting(true);
    //对接后端
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await genChartByAiAsyncUsingPost(params, {}, values.file.file.originFileObj);
      if (!res?.data) {
        message.error('分析失败,');
      } else {
        message.success('提交分析任务成功，请到我的图片里面查看');
      }
    } catch (e: any) {
      message.error('分析失败,' + e.message);
    }
    setSubmitting(false);
  };

  // @ts-ignore
  return (
    <div className="add-chart-async">
      <Card title={'智能分析'}>
        <Form
          form={form}
          name="addChart"
          labelAlign="left"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{}}
        >
          <Form.Item
            name="goal"
            label="分析目标"
            rules={[{ required: true, message: '请输入分析目标' }]}
          >
            <TextArea placeholder="请输入你的分析需求。比如分析网站的用户增长情况" />
          </Form.Item>

          <Form.Item name="name" label="图表名称">
            <TextArea placeholder="请输入图表名称" />
          </Form.Item>
          <Form.Item name="chartType" label="图表类型">
            <Select
              //以下这部分报错不影响使用，会在高版本移除，官方文档有
              options={[
                { value: '折线图', label: '折线图' },
                { value: '柱状图', label: '柱状图' },
                { value: '堆叠图', label: '堆叠图' },
                { value: '雷达图', label: '雷达图' },
                { value: '热力图', label: '热力图' },
                { value: '箱线图', label: '箱线图' },
              ]}
            />
          </Form.Item>
          <Form.Item name="file" label="原始数据">
            <Upload name="file" maxCount={1}>
              <Button
                icon={
                  <UploadOutlined
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                }
              >
                上传csv文件
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                提交
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default AddChartAsync;
