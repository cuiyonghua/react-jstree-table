import React, {Component} from 'react';
import TreeView from 'react-jstree-table';
import 'jstree/dist/themes/default/style.css';

export class Tree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        plugins: ["themes","json","table","dnd","contextmenu","search","sort"],
        table: {
          columns: [
              { width: 210, header: "Nodes", title: "_DATA_" },
              { cellClass: "col1", value: "price", width: 60, header: "Price", title: "price" },
              { cellClass: "col2", value: "size", header: "Qty", title: "size" }
          ],
          resizable: false
        },
        core: {
          data: [
            {
              text: 'Root node', children: [
              {text: 'Child node 1'},
              {text: 'Child node 2'}
              ]
            }
          ],
          "check_callback": true
        }
      },
      selected: [],
    };
  }

  handleClick() {
    const newData = this.state.data.core.data[0].children.slice();
    newData.push({text: 'New child node'});
    this.setState({
      data: {
        plugins: ["core","ui","table"],
        table: {
          columns: ['aa', 'bb', 'cc'],
          width: 25
        },
        core: {
          data: [
            {
              text: 'Root node', children: newData
            }
          ]
        }
      }
    });
  }

  handleChange(e, data) {
    this.setState({
      selected: data.selected,
    })
  }

  render() {
    const data = this.state.data;

    return (
      <div>
        <button onClick={() => this.handleClick()}>Add node</button>
        <br/><br/>
        <TreeView treeData={data} onChange={(e, data) => this.handleChange(e, data)} />
        <br />
        <p>Selected nodes: {this.state.selected.join(', ')}</p>
      </div>
    );
  }
}
