import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BreadcrumbsProps } from '../interfaces/BreadcrumbsInterface';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <Breadcrumb className="breadcrumb-dark">
      {crumbs.map((crumb, index) => (
        <Breadcrumb.Item 
          key={index} 
          active={crumb.active} 
          linkAs={crumb.active ? 'span' : Link} 
          linkProps={crumb.active ? {} : { to: crumb.path }}
        >
         <strong>{crumb.name}</strong> 
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
