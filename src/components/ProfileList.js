import React, { Component } from 'react';
import Profile from './Profile.json';
import MUIDataTable from 'mui-datatables';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';


class ProfileList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             profileList:Profile,
             collapse:0,
             columnData:[
                 {
                     name:'familiar',
                     label:<b>Familiar Language</b>,
                 },
                 {
                     name:"proficient",
                     label:<b>Proficient Language</b>,
                 },
                 {
                     name:"excellent",
                     label:<b>Excellent Language</b>,
                 },
             ]
        }
    }

    expand_and_collapse = (index) =>{
        if(index===this.state.collapse){
           this.setState({collapse:null})
        }else{
            this.setState({collapse:index})
        }
    }

    dataSet = (item,index) =>{
        let data=[];
        item.programming_languages.forEach((element,i)=>{
            data.push({
                "familiar":element.familiar,
                "proficient":element.proficient,
                "excellent":element.excellent
            })
        })

        return data;
    }
    

    render() {
        const {profileList}=this.state;
        const options={
            viewColumns:false,
            download:false,
            print:false,
            filterType: "dropdown",
            selectableRows:"none",
            elevation: 0,
            filter:false,  
        }
        return (
            <div className="m-4">
                <div>
                    <Accordion className="p-4 m-2">
                        <span><b>Applicant Profile</b></span>
                    </Accordion>
                </div>
                 <div>
                    {profileList.length && profileList.map((item,index)=>
                        <Accordion onChange={()=>this.expand_and_collapse(index)} expanded={(this.state.collapse===index)?true:false} className="m-2">
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                        <span><span className="text-muted">Name : </span><b>{item.name}</b></span>
                        </AccordionSummary>
                        <div>
                            <MUIDataTable columns={this.state.columnData} options={options} data={this.dataSet(item,index)} className="p-2"/>
                        </div>
                        </Accordion>     
                    )}
                 </div>
            </div>
        )
    }
}

export default ProfileList
