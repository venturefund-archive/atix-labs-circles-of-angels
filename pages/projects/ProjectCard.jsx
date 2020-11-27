import React from 'react';
import { Tag, Row, Col } from 'antd';

const ProjectCard = () => (
  <Col className="CardProject" span={8}>
    <div className="BlockImage ">
      <img src="./static/images/Img-card1.png" alt="imgproject1" />
    </div>
    <Row
      type="flex"
      justify="space-around"
      align="middle"
      className="ProjectSummery"
    >
      <Col span={18}>
        <h1>Yellow Hammock</h1>
      </Col>
      <Col span={6}>
        <Tag color="red">Funding Phase</Tag>
      </Col>
      <Col span={24}>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </p>
      </Col>
    </Row>
  </Col>
);

export default ProjectCard;
