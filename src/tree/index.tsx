import InternalTree from './tree';
import { Tree as AntTree } from 'antd';

type InternalTree = typeof InternalTree;

interface Tree extends InternalTree {
  TreeNode: typeof AntTree.TreeNode;
}

const Tree: Tree = InternalTree as Tree;

Tree.TreeNode = AntTree.TreeNode;

export default Tree;
