const express = require('express')
const app = express()
const fs = require('fs')
const consts = require('./data/consts.json')
app.get('/api',(req,res)=>{
  //consts
  for(i=0;i<consts.length;i++){
    if(req.query.type==consts[i].name){
      let start=parseInt(req.query.start),end=parseInt(req.query.end) //초기 start,end값
      if(isNaN(start)&&isNaN(end)){//start,end 둘다 없는 경우
        res.send('ERROR: No start, end value. Least one needed')
        return
      }
      if(isNaN(start))start=0//start가 없으면 처음부터
      if(isNaN(end))end=start//end가 없으면 그 자리만
      if(end-start>Math.pow(10,6)){//너무 큰 값
        res.send('ERROR: request size is too big')
        return
      }
      if(end>consts[i].end){//보유하지 않은 값
        res.send('ERROR: request length is too big')
        return  
      }
      if(start)start+=consts[i].int //만약 start가 정수부터 받아오는게 아닌 중간의 소수점 값을 가져오는것일 경우
      if(end)end+=consts[i].int //만약 end가 정수부터 받아오는게 아닌 중간의 소수점 값을 가져오는것일 경우
      if(start>end){ //start>end인 경우
        res.send('ERROR: start is bigger than end')
        return
      }
      fs.readFile('./data/'+consts[i].filename,'utf8',(err, data)=>{
        if(err) throw err
        res.send(data.substring(start,end+1))
      })
      return
    }
  }
  //error
  res.send('ERROR: invalid type parameter')
})
app.get('/docs',(req,res)=>{
  res.send('docs')
})
app.use((req, res)=>{
  let baseUrl=req.url.split('/')[1].split('?')
  if(!(baseUrl=='api'||baseUrl=='docs')){
    res.redirect('/docs')
  }
})
app.listen(8080)