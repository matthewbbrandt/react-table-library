import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { HeaderRowContainer } from '@common/components/Row';
import { ThemeContext } from '@common/context/Theme';

import { useRowLayout } from './useRowLayout';

const HeaderRow = ({ className, disabled, children }) => {
  const theme = React.useContext(ThemeContext);

  const ref = React.useRef();

  useRowLayout(ref, '.th');

  return (
    <HeaderRowContainer
      role="rowheader"
      className={cs('tr', 'tr-header', className, { disabled })}
      css={css`
        ${theme?.BaseRow}
        ${theme?.HeaderRow}
      `}
      ref={ref}
    >
      {React.Children.toArray(children)
        .filter(Boolean)
        .map(child =>
          React.cloneElement(child, {
            index: Number(child.key.replace('.', '').replace('$', ''))
          })
        )}
    </HeaderRowContainer>
  );
};

HeaderRow.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { HeaderRow };
