import * as React from 'react';
import {
  State,
  IdReducerFunctions,
  Modifier,
  Nullish,
} from '@table-library/react-table-library/types/common';
import { TableNode, GetRowProps } from '@table-library/react-table-library/types/table';

export enum TreeExpandClickTypes {
  RowClick,
  ButtonClick,
}

export type CustomIcon = React.ReactElement | ((node: TableNode) => React.ReactElement) | Nullish;

export type TreeOptionsIcon = {
  margin?: string;
  size?: string;
  noIconMargin?: string;
  iconDefault?: CustomIcon;
  iconRight?: CustomIcon;
  iconDown?: CustomIcon;
};

export type TreeOptions = {
  isServer?: boolean;
  treeIcon?: TreeOptionsIcon;
  clickType?: TreeExpandClickTypes;
  indentation?: number;
  treeXLevel?: number;
  treeYLevel?: number;
};

export type TreeOptionsIconSound = {
  margin: string;
  size: string;
  noIconMargin: string;
  iconDefault: CustomIcon;
  iconRight: CustomIcon;
  iconDown: CustomIcon;
};

export type TreeOptionsSound = {
  isServer: boolean;
  treeIcon: TreeOptionsIconSound;
  clickType: TreeExpandClickTypes;
  indentation: number;
  treeXLevel: number;
  treeYLevel: number;
};

export type ColumnTreePropsObject = {
  treeIcon?: TreeOptionsIcon;
};

export type ColumnTreeProps = ColumnTreePropsObject | boolean;

export type CellTreeProps = {
  item: TableNode;
  treeIcon?: TreeOptionsIcon;
  children?: React.ReactNode;
};

export type Tree = {
  state: State;
  fns: IdReducerFunctions;
  options: TreeOptionsSound;
  _getRowProps: GetRowProps;
  modifier: Modifier;
  components: {
    CellTree: React.FunctionComponent<CellTreeProps>;
  };
};
