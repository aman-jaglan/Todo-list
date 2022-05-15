import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';

class AddTask extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            taskDesc: ''
        }
    }
    handleTaskTextChange(e){
        this.setState({
            taskDesc: e.target.value
        })
    }

    handleAddTaskClick(){
        this.props.handleInfo(this.state.taskDesc);
        this.setState({
            taskDesc: ''
        })
    }

    render(){
        return(
            <form>
                <input type="text" value={this.state.taskDesc} onChange={(e) => this.handleTaskTextChange(e)} />
                <input type="button" value="Add Task" onClick={() => this.handleAddTaskClick()}/>
            </form>
        );
    }
}

class TaskList extends React.Component{


    handleTask(taskDesc){
        this.props.handleTaskInfo(taskDesc);
    }
    
    render(){
        let list=[];

        for(let i=0;i<this.props.task.length;i++){
            let task=this.props.task[i];
            let spanAction;
            if(task.isFinished){
                spanAction=(
                    <i class="material-icons" onClick={()=> this.handleTask(task.desc)}>delete</i>
                );
            }
            else{
                spanAction=(
                    <i class="material-icons" onClick={()=> this.handleTask(task.desc)}>done_outline</i>
                );
            }
            let listItem=(
                <div key={i}>
                    <span>{task.desc}</span>
                    <span>{spanAction}</span>
                </div>
            );

            list.push(listItem);

        }

        return(
            <div className={this.props.purpose}>
            <div className='content'>
            <div className='headDesc'>{this.props.desc}</div>
            <div className='list'>
                    {list}
                </div> 
            </div>
            </div>
        );
    }
}

class App extends React.Component{
    constructor(props){
        super(props);

        this.state={
            task:[
                {
                    desc:'turn on the light',
                    isFinished: true
                },{
                    desc:'turn on the fan',
                    isFinished: false
                },{
                    desc: 'turn on the laptop',
                    isFinished: true
                },{
                    desc: 'turn off the phone',
                    isFinished: false
                }
            ]
        }
    }

    handleAddTask(tasks){
        let oldTask=this.state.task.slice();
        if(tasks.length>0){
        oldTask.push(
            {
                desc: tasks,
                isFinished: false
            }
        );

        this.setState({
            task: oldTask
        });
    }
    }

    handleItem(taskDesc,status){
        let oldTask=this.state.task.slice();
        if(status==false){
            let item=oldTask.filter(ot=> ot.desc!=taskDesc);
           this.setState({
                task:item
           });
        }
        else{
            
            let taskItem=oldTask.find(ot=> ot.desc==taskDesc);
            taskItem.isFinished=status;
            this.setState({
                task: oldTask
            });
        }
       
       
    }

    render(){
       
        
        let tasks=this.state.task;
        let todoList=tasks.filter(t=> t.isFinished==false);
        let doneList=tasks.filter(t=> t.isFinished==true);
        return(
            <>
                <div className='addtask'>
                <AddTask handleInfo={(tasks)=> this.handleAddTask(tasks)} />
                </div>
                 
                 <div className='tasklist'>
                 <TaskList handleTaskInfo={(taskDesc)=> this.handleItem(taskDesc,true)} task={todoList} purpose="Todo" desc="TODO"/>
                 <TaskList handleTaskInfo={(taskDesc)=> this.handleItem(taskDesc,false)} task={doneList} purpose="Finished" desc="FINISHED"/>
                 </div>
                 
            </>
           
        );
        
    }
}

ReactDOM.render(<App />, document.getElementById('root'));