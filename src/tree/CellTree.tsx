import * as React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { Button } from '@table-library/react-table-library/common/components/Button';
import { Cell } from '@table-library/react-table-library/table/Cell';
import { TreeContext } from '@table-library/react-table-library/common/context/Tree';
import { isLeaf } from '@table-library/react-table-library/common/util/tree';

import { State } from '@table-library/react-table-library/types/common';
import { TableNode } from '@table-library/react-table-library/types/table';
import { CellTreeProps, CustomIcon } from '@table-library/react-table-library/types/tree';

const style = css`
  display: flex;
  align-items: center;

  & > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export type Size = {
  height: string;
  width: string;
};

const resolveIcon = (customIcon: CustomIcon, node: TableNode, size: Size) => {
  if (!customIcon) return null;

  if (typeof customIcon === 'function') {
    return React.cloneElement(customIcon(node), { ...size });
  }

  return React.cloneElement(customIcon, { ...size });
};

const getTreeIcon = (
  item: TableNode,
  treeState: State,
  treeIconSize: string,
  TreeIconDefault: CustomIcon,
  TreeIconRight: CustomIcon,
  TreeIconDown: CustomIcon,
) => {
  const size = {
    height: `${treeIconSize}`,
    width: `${treeIconSize}`,
  };

  const isTreeExpanded = treeState.ids.includes(item.id);

  if (!isLeaf(item) && isTreeExpanded) {
    return resolveIcon(TreeIconDown, item, size);
  }

  if (!isLeaf(item) && !isTreeExpanded) {
    return resolveIcon(TreeIconRight, item, size);
  }

  return resolveIcon(TreeIconDefault, item, size);
};

export const CellTree: React.FC<CellTreeProps> = ({
  item,
  treeIcon = {},
  children,
  ...passThrough
}: CellTreeProps) => {
  const context = React.useContext(TreeContext);

  if (!context) {
    throw new Error('No Tree Context. No return value from useTree provided to Table component.');
  }

  const { state, fns, options } = context;

  const mergedTreeIconOptions = {
    ...options.treeIcon,
    ...treeIcon,
  };

  const handleClick = () => {
    if (isLeaf(item)) return;

    fns.onToggleById(item.id);
  };

  const icon = getTreeIcon(
    item,
    state,
    mergedTreeIconOptions.size,
    mergedTreeIconOptions.iconDefault,
    mergedTreeIconOptions.iconRight,
    mergedTreeIconOptions.iconDown,
  );

  return (
    <Cell {...passThrough}>
      <div css={style}>
        <Button
          className="prefix narrow"
          margin={icon ? mergedTreeIconOptions.margin : mergedTreeIconOptions.noIconMargin}
          onClick={handleClick}
        >
          {icon ? <div>{icon}</div> : <div />}
        </Button>
        <div>{children}</div>
      </div>
    </Cell>
  );
};
