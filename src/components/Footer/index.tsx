import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'csdn',
          title: 'CSDN博客地址',
          href: 'https://blog.csdn.net/m0_73282576?spm=1000.2115.3001.5343',
          blankTarget: true,
        },
        {
          key: 'github地址',
          title: (
            <>
              <GithubOutlined /> qq GitHub
            </>
          ),
          href: 'https://github.com/ximuzhifanyemao/',
          blankTarget: true,
        },
        {
          key: 'gitee地址',
          title: 'gitee',
          href: 'https://gitee.com/liunian-ximu',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
