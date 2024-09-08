# Vue3ToDoList

使用 Vue3 製作的 Vue3ToDoList

# 操作說明

## 新增項目
由頁面左半部 input 輸入框操作，  
提供以下兩種方式：
1. input 輸入框按 Enter  
2. input 輸入框旁的「新增」按鈕  
  
請注意，輸入值不得為空；為空新增時，會跳出 Alert 視窗（視窗需自己按關閉）  

## 標記完成/未完成
由頁面右半部上方的「標記完成」、「標記未完成」兩個按鈕批次操作  
兩者按下之後，選過的值都會清空  

## 刪除項目
每個待辦項目的右側皆有「刪除」按鈕  

## 篩選任務
由頁面右半部上方的下拉選單，選單項目有「全部」、「已完成」、「未完成」，可依照待辦項目狀態篩選  

# 頁面說明

## Header
使用 sticky 的方式呈現，待辦事項如果過長，往下拉的時候，Header 仍會存在

## Footer
使用 fixed 的方式呈現，不管頁面拉到哪邊都會固定在最下方
