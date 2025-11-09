const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addWithNode(this.rootNode, data);

    function addWithNode(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (data === node.data) {
        return node;
      }
      if (data < node.data) {
        node.left = addWithNode(node.left, data);
      } else if (data > node.data) {
        node.right = addWithNode(node.right, data);
      }
      return node;
    }
  }

  find(data) {
    return this.searchWithin(this.rootNode, data).node || null;
  }

  searchWithin(node, data) {
    if (!node) {
      return { found: false, node: null };
    }
    if (data === node.data) {
      return { found: true, node };
    }
    if (data < node.data) {
      return this.searchWithin(node.left, data);
    } else {
      return this.searchWithin(node.right, data);
    }
  }

  has(data) {
    return this.searchWithin(this.rootNode, data).found;
  }

  remove(data) {
    return removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);
        return node;
      }

    }
  }

  min() {
    if (!this.rootNode) {
      return null;
    }
    let current = this.rootNode;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }
    let current = this.rootNode;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }

}

module.exports = {
  BinarySearchTree
};