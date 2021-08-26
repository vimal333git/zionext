import React, { Component } from 'react'

class Logic extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            test:{
                a: 123,
                b: 'abc',
                c: [1, 2, 3],
                d: 'madam',
            },
            result:{},
        }
    }

    componentDidMount= () => {
        const {test}=this.state;
        let result={};
        for (let keys in test) {
            let item=test[keys];
            if(typeof(item)==="string"){

               let testString_split=item.split('');
               testString_split.reverse();
               if(JSON.stringify(item.split(''))===JSON.stringify(testString_split)){
                    result[keys]=item+' XYZ';
               }else{
                    result[keys]=item+' ABC';
               }

            }else if((typeof(item))==="number"){
                result[keys]=parseInt(item)+parseInt(7);
            }else{
                let x=[];
                item.forEach(element => {
                    if(typeof(element)==='string'){
                        x.push(element+' ABC');
                    }else{
                        x.push(parseInt(element)+parseInt(7))
                    }
                });
                result[keys]=x;
            }
        }
        console.log(result)
    }
    
    render() {
        return (
            <div className="text-center">
                <h4>See console</h4>
            </div>
        )
    }
}

export default Logic
