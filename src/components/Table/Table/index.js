import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TableProvider, TableContext } from '@context/Table';
import { ThemeProvider, ThemeContext } from '@context/Theme';
import { ResizeProvider, ResizeContext } from '@context/Resize';
import { SelectProvider, SelectContext } from '@context/Select';
import { TreeProvider, TreeContext } from '@context/Tree';
import { ExpandProvider, ExpandContext } from '@context/Expand';
import { SortProvider, SortContext } from '@context/Sort';

const TableContainer = styled.div`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

const TableContent = ({ children }) => {
  const { list } = React.useContext(TableContext);
  const theme = React.useContext(ThemeContext);
  const resize = React.useContext(ResizeContext);
  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const expand = React.useContext(ExpandContext);
  const sort = React.useContext(SortContext);

  // do any list operations (e.g. sort, pagination) here
  return children(
    sort.sortState.fn([...list]),
    theme,
    resize,
    select,
    tree,
    expand,
    sort
  );
};

const Table = ({
  list,
  theme,
  resize,
  defaultSort,
  defaultSelect,
  defaultTree,
  defaultExpand,
  children
}) => {
  const tableRef = React.useRef();

  return (
    <TableContainer className="table" role="grid" ref={tableRef}>
      <TableProvider list={list}>
        <ThemeProvider theme={theme}>
          <ResizeProvider resize={resize} tableRef={tableRef}>
            <SelectProvider defaultSelect={defaultSelect}>
              <TreeProvider defaultTree={defaultTree}>
                <ExpandProvider defaultExpand={defaultExpand}>
                  <SortProvider defaultSort={defaultSort}>
                    <TableContent>{children}</TableContent>
                  </SortProvider>
                </ExpandProvider>
              </TreeProvider>
            </SelectProvider>
          </ResizeProvider>
        </ThemeProvider>
      </TableProvider>
    </TableContainer>
  );
};

Table.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any),
  theme: PropTypes.shape(PropTypes.any),
  resize: PropTypes.bool,
  defaultSelect: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string)
  }),
  defaultTree: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string)
  }),
  defaultExpand: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string)
  }),
  defaultSort: PropTypes.shape({
    key: PropTypes.string,
    reverse: PropTypes.bool,
    fn: PropTypes.func
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { Table };
