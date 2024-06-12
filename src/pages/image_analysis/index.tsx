import { genChartByAiUsingPost } from '@/services/yubi/chartController';
// @ts-ignore
import { Button, Card, Col, Form, message, Row, Space, Spin, Upload } from 'antd';
// @ts-ignore
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

/**
 * 我的图表页面
 * @constructor
 */
const image_analysis: React.FC = () => {
  //用于接受用户状态
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [chart, setChart] = useState<API.BiResponse>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, setOption] = useState<any>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [submitting, setSubmitting] = useState<boolean>(false);

  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    setChart(undefined);
    setOption(undefined);
    //对接后端
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await genChartByAiUsingPost(params, {}, values.file.file.originFileObj);
      if (!res?.data) {
        message.error('分析失败,');
      } else {
        message.success('分析成功');
        const chartOption = JSON.parse(res.data.genChart ?? '');
        if (!chartOption) {
          throw new Error('图表代码解析错误');
        } else {
          setChart(res.data);
          setOption(chartOption);
        }
      }
    } catch (e: any) {
      message.error('分析失败,' + e.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title={'智能图片分析'}>
            <Form name="addChart" onFinish={onFinish} initialValues={{}} style={{ maxWidth: 600 }}>
              <Form.Item name="file" label="图片上传">
                <Upload name="file" maxCount={1}>
                  <Button
                    icon={
                      <UploadOutlined
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    }
                  >
                    上传需要分析的图片
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    提交
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'分析结论'}>
            {chart?.genResult ?? <div>请先在左侧进行提交</div>}
            <Spin spinning={submitting} />
          </Card>
          <div></div>
        </Col>
      </Row>
    </div>
  );
};
export default image_analysis;
