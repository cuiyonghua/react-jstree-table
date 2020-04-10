import React, {Component} from 'react';
import TreeView from 'react-jstree-table';
import 'jstree/dist/themes/default/style.css';


const data = {
  "data":{

  },
  "state":{
     "opened":"true"
  },
  "text":"aaa",
  "children":[
     {
        "children":[
           {
              "children":[
                 {
                    "text":"bbb",
                    "data":{
                       "SOCV:Report":"https://hk-webapp1",
                       "SOCV:SignOffCL":"39536031",
                       "SOCV:ToggleCov":99.2495831017,
                       "SOCV:FuncCov":-100.0
                    },
                    "children":[
                       {
                          "children":[
                             {
                                "children":[

                                ],
                                "text":"ccc"
                             }
                          ],
                          "text":"ddd"
                       },
                       {
                          "children":[
                             {
                                "children":[
                                   {
                                      "children":[
                                         {
                                            "children":[

                                            ],
                                            "text":"eee"
                                         }
                                      ],
                                      "text":"eee"
                                   },
                                   
                                ],
                                "text":"fff"
                             }
                          ],
                          "text":"ggg"
                       }
                    ]
                 }
              ],
              "text":"hhhh",
              "state":{
                 "opened":"true"
              }
           }
        ],
        "text":"ggg",
        "state":{
           "opened":"true"
        }
     }
  ]
};

export class Tree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        plugins: ["table", "dnd", "contextmenu", "sort"],
        table: {
					columns: [
					  {width: 500, header: "Name"},
					{width: 150, value: "Unit:CodeCov", header: "Unit:CodeCov", format: function(v) {if (v){ return v.toFixed(2)+'%' }}},
                                        {width: 150, value: "Unit:FuncCov", header: "Unit:FuncCov", format: function(v) {if (v){ return v.toFixed(2)+'%' }}},
                                        {width: 150, value: "Unit:Report", header: "Unit:Report"},
                                        {width: 150, value: "Unit:SignOffCL", header: "Unit:SignOffCL"},
                                        {width: 150, value: "SOCV:ToggleCov", header: "SOCV:Toggle", format: function(v) {if (v){ return v.toFixed(2)+'%' }}},
                                        {width: 150, value: "SOCV:FuncCov", header: "SOCV:Func", format: function(v) {if (v){ return v.toFixed(2)+'%' }}},
                                        {width: 150, value: "SOCV:Report", header: "SOCV:Report"},
                                        {width: 150, value: "SOCV:SignOffCL", header: "SOCV:SignOffCL"}
					//  {width: 150, value: "quantity", header: "Qty"}
					//{width: 150, value: "price", header: "Price", format: function(v) {if (v){ return '$'+v.toFixed(2) }}},
					//{width: 150, value: "quantity", header: "Qty"}
					],
					resizable: true,
					draggable: true,
					contextmenu: true,
					width: window.innerWidth-20,
					height: window.innerHeight-20

				  },
        core: {
          data: data,
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
