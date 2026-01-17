import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconInfo from '@theme/Admonition/Icon/Info';
const infimaClassName = 'alert alert--note';
const defaultProps = {
  icon: <IconInfo />,
  title: (
    <Translate
      id="theme.admonition.note"
      description="The default label used for the Info admonition (:::note)">
      info
    </Translate>
  ),
};
export default function AdmonitionTypeNote(props) {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}
