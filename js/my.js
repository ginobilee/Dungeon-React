class GameManage extends React.Component{
   constructor(){
     super();
     this.addRooms=this.addRooms.bind(this);
     let mapWidth=100,mapHeight=200,cellState=[],i,j,rooms=[],room={};
     for(i=0;i<mapHeight;i++){
       let tempRow=[];
       for(j=0;j<mapWidth;j++){
         tempRow.push(0);
       }
       cellState.push(tempRow);
     }
     //generateFirstRoom,'1' for room cell
     for(i=100;i<109;i++){
       for(j=50;j<59;j++){
         cellState[i][j]=1;
       }
     }
     room={
       origin_col:50,
       origin_row:100,
       cols:9,
       rows:9
     };
     rooms.push(room);
     this.addRooms(cellState,rooms);
     console.log(rooms);
     this.state=({
       cellState:cellState
     });
   }
   addRooms(cellState,rooms){
     let roomNum=rooms.length,parentRI=Math.floor(Math.random()*roomNum),parentRoom=rooms[parentRI],colMin=6,colRange=7,rowMin=7,rowRange=13;
     let newCols=Math.ceil(Math.random()*colRange+colMin),newRows=Math.ceil(rowMin+Math.random()*rowRange);//6-10 for new room length,20 for new room height
     let rnFasade=Math.floor(Math.random()*4),newOriginRow,newOriginCol,newEndRow,newEndCol;//0 for top,1 for right,2 for bottom,3 for left
     switch(rnFasade){
       case 0:
         newOriginRow=parentRoom.origin_row-newRows-1;
         newOriginCol=parentRoom.origin_col-newCols+1+Math.floor(Math.random()*(parentRoom.cols+newCols));
         //newOriginCol=newEndCol-newCols;
         break;
       case 1:
        newOriginRow=parentRoom.origin_row-newRows+1+Math.floor(Math.random()*(parentRoom.rows+newRows));
        newOriginCol=parentRoom.origin_col+parentRoom.cols+1;
        break;
      case 2:
        newOriginRow=parentRoom.origin_row+parentRoom.rows+1;
        newOriginCol=parentRoom.origin_col-newCols+1+Math.floor(Math.random()*(parentRoom.cols+newCols));
        break;
      case 3:
        newEndCol=parentRoom.origin_col-2;
        newOriginCol=newEndCol-newCols+1;
        newOriginRow=parentRoom.origin_row-newRows+1+Math.floor(Math.random()*(parentRoom.rows+newRows));
        break;
     }
     let i=0,j=0,used=false;
     outer:
     for(i=newOriginRow;i<newOriginRow+newRows;i++){
       for(j=newOriginCol;j<newOriginCol+newRows;j++){
         if(cellState[i][j]==1){
           used=true;
           break outer;
         }
       }
     }
     if(!used){
       let room={
         origin_col:newOriginCol,
         origin_row:newOriginRow,
         cols:newCols,
         rows:newRows
       };
       for(i=newOriginRow;i<newOriginRow+newRows;i++){
         for(j=newOriginCol;j<newOriginCol+newCols;j++){
           cellState[i][j]=1;
         }
       }
       rooms.push(room);
       if(rooms.length<20){
         this.addRooms(cellState,rooms);
       }
     }else{
       this.addRooms(cellState,rooms);
     }
   }
   componentDidMount(){
   }
   componentDidUpdate(){
   }
   render(){
     let cellState = this.state.cellState,tempValue,len=cellState[0].length;
     const map = cellState.map(function(ele,ind){
        let cellRow = ele.map(function(e,i){
            tempValue=cellState[ind][i];
            return (<div className={tempValue==1?'cell white':'cell'} key={ind*len+i} data-key={ind*len+i}></div>);
          },this);
        return <div className='cellRow' key={ind}>{cellRow}</div>;
      },this);
      return (
        <div>
          {map}
        </div>
      );
   }
}

ReactDOM.render(
  <GameManage />,
  document.getElementById('root')
);
