import React, { Component } from 'react';
import Progress from './Progress.json';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import MUIDataTable from 'mui-datatables';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import Chart from 'react-google-charts';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class ProgressReport extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           report:Progress,
           primaryColumn:[
            {
                name:"s_no",
                label:<b>S.No</b>,
            },
            {
                name:"name",
                label:<b>Students Name</b>,
            },
            {
                name:"class",
                label:<b>Section</b>,
            },
            {
                name:"chart",
                label:<b>View Chart</b>,
            }
           ],
           secondartColumn:[
               {
                   name:"tamil",
                   label:<b>Tamil/Language</b>,
               },
               {
                   name:"english",
                   label:<b>English/Language</b>,
               },
               {
                   name:"mathematics",
                   label:<b>Mathematics/</b>,
               },
               {
                   name:"science",
                   label:<b>Science</b>,
               },
               {
                   name:"economics",
                   label:<b>Econnomics</b>,
               },
           ],
           studentName:'',
           marks:[],
           openxlSheet:false,
           xlsheetData:[],
           xlsheetName:'',
           xlsheetHeading:'',
           primaryData:[],
           secondaryData:[],
           dialogOpen:false,
        }
    }

    loadChart=(element)=>{
        let studentName=element.name?element.name:'';
        let report=element.report;
        var marks=[];
        marks.push(['Task', 'Hours per Day'],['Tamil',report.tamil],['English',report.english],['Mathematics',report.mathematics],
        ['Science',report.science],['Economics',report.economics])
        this.setState({studentName:studentName,marks:marks},()=>this.setState({dialogOpen:true}))
    }

    reportGeneration = () => {
        let xlsheetData=[];
        let tableDataRow=[];
        let count=0;
        let xlsheetName='Students Report';
        let xlsheetHeading="Students Report";
  
        if(this.state.report.length > 0) {
          this.state.report.forEach((item,index)=>{
          count++;
          tableDataRow.push(
            [{value:"S.No",style:{font: {sz: "10"},fill: {patternType: "solid", fgColor: {rgb: "D1D1D1"}},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
            {value:"Student Name",style:{font: {sz: "10"},fill: {patternType: "solid", fgColor: {rgb: "D1D1D1"}},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
            {value:"Section",style:{font: {sz: "10"},fill: {patternType: "solid", fgColor: {rgb: "D1D1D1"}},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
          ],
          [{value:parseInt(index)+parseInt(1),style: {font: {sz: "10"},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
          {value:item.name?item.name:'-',style: {font: {sz: "10"},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
          {value:item.class?item.class:'-',style: {alignment: {horizontal:"left"},font: {sz: "10"},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
          ],
          )
          tableDataRow.push(
              [
                {value:""}
              ]
          )
          tableDataRow.push(
            [
                {value:""},
                {value:"Tamil",style:{font: {sz: "10"},fill: {patternType: "solid", fgColor: {rgb: "ADD8E6"}},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
                {value:"English",style:{font: {sz: "10"},fill: {patternType: "solid", fgColor: {rgb: "ADD8E6"}},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
                {value:"Mathematics",style:{font: {sz: "10"},fill: {patternType: "solid", fgColor: {rgb: "ADD8E6"}},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
                {value:"Science",style:{font: {sz: "10"},fill: {patternType: "solid", fgColor: {rgb: "ADD8E6"}},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
                {value:"Economics",style:{font: {sz: "10"},fill: {patternType: "solid", fgColor: {rgb: "ADD8E6"}},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
            ],
            [
                {value:""},
                {value:item.report.tamil?item.report.tamil:'',style: {font: {sz: "10"},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
                {value:item.report.english?item.report.english:'',style: {font: {sz: "10"},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
                {value:item.report.mathematics?item.report.mathematics:'',style: {font: {sz: "10"},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
                {value:item.report.science?item.report.science:'',style: {font: {sz: "10"},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
                {value:item.report.economics?item.report.economics:'',style: {font: {sz: "10"},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
            ]
          )
          tableDataRow.push(
            [{value:""}],
        )
      
          tableDataRow.push(
            [{value:''},{value:''},{value:''},{value:''},{value:''},{value:''}],
            [{value:''},{value:''},{value:''},{value:''},{value:''},{value:''}]
          )
        })
      }else{
        tableDataRow.push(
          [{value:"-"},{value:'No Data Found'},{value:'-'}]
        )
      } 
        
      if(tableDataRow.length > 0){
        xlsheetData.push({
          ySteps: 0,
          columns:[
              {"title": '', width: {wpx: 130},style: {font: {sz: "10", bold: true},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
              {"title": '', width: {wpx: 160},style: {font: {sz: "10", bold: true},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},
              {"title": '', width: {wpx: 130},style: {font: {sz: "10", bold: true},border: { top:{style: 'thin'},bottom:{style: 'thin'},left:{style: 'thin'},right:{style: 'thin'}}}},                
              {"title": '', width: {wpx: 130}},
          ],
          data:tableDataRow
        })
      }
      if (xlsheetData.length > 0){
        this.setState({xlsheetData:xlsheetData,xlsheetName:xlsheetName,xlsheetHeading:xlsheetHeading,openxlSheet:true})
        setTimeout(()=>{ 
            this.setState({openxlSheet:false});
        }, 1000);
    }
    }
    initiatList=()=>{
        const {report}=this.state;
        let primaryData=[];
        if(report.length){
            report.forEach((element,index) => {
                primaryData.push(
                    {
                        s_no:parseInt(index)+parseInt(1),
                        name:element.name,
                        class:element.class,
                        chart:<div>
                            <IconButton onClick={()=>this.loadChart(element)}>
                                <VisibilityIcon className="text-primary" />
                            </IconButton>
                        </div>
                    }
                )
            });
        }
        this.setState({primaryData:primaryData})
    }

    componentDidMount(){
        this.initiatList();
    }
    
    render() {
        const {primaryColumn,secondartColumn,primaryData}=this.state;
        const options1 = {
            viewColumns:false,
            download:false,
            print:false,
            filterType: "dropdown",
            selectableRows:"none",
            elevation: 0,
            filter:false,    
        };
        const options = {
            filterType: "multiselect",
            responsive: "stacked",
            print:false,
            download:false,
            selectableRows:"none",
            viewColumns:false,
            expandableRows:true,
            renderExpandableRow: (rowData,row) => {  
                let secondaryData=[];
                let report=this.state.report;
                let item=report[row.rowIndex].report;
                    secondaryData.push(
                        {
                            "tamil":item.tamil,
                            "english":item.english,
                            "mathematics":item.mathematics,
                            "science":item.science,
                            "economics":item.economics,
                        }
                    )
                return (
                  <TableRow>
                    <TableCell className="bg-light-gray" colspan={9}>
                        <MUIDataTable columns={this.state.secondartColumn} 
                        options={options1} data={secondaryData} className="p-1"/>
                    </TableCell>
                  </TableRow>
                );
              }
            
          };
        return (
            <div className="m-2">
                <div className="m-4 mt-4">
                    <Accordion className="p-2">
                        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
                             <h5 >Progress Report</h5>
                        </AccordionSummary>
                    </Accordion>
                </div>
                <div className="float-right mr-4">
                    <Button color="primary" size="small" onClick={this.reportGeneration} variant="contained">Download Report</Button>
                </div>
                
                <div className="m-4">
                    <MUIDataTable columns={primaryColumn} options={options} data={primaryData} className="p-3 pt-0"/>
                </div>

                <Dialog
                    fullWidth={true}
                    maxWidth="md"
                    open={this.state.dialogOpen}
                    onClose={()=>this.setState({dialogOpen:false})}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">Progress Report</DialogTitle>
                    <DialogContent>
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.marks?this.state.marks:[]}
                            options={{
                                title: this.state.studentName?`Student Name :${this.state.studentName}`:'',
                                is3D: true,
                            }}
                            rootProps={{ 'data-testid': '2' }}
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={()=>this.setState({dialogOpen:false})} color="primary">
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>
                        {this.state.openxlSheet &&
                            <ExcelFile filename={this.state.xlsheetName} hideElement={true}>
                                <ExcelSheet dataSet={this.state.xlsheetData ? this.state.xlsheetData:[]} name={this.state.xlsheetHeading} >                  
                                </ExcelSheet>
                            </ExcelFile>
                        }
                
            </div>
        )
    }
}

export default ProgressReport
