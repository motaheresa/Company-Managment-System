import styled from "styled-components";


export const Wrapper = styled.div`
width: 99%;
height:100vh;
margin: 5px;
background-color:tranparent;
`
export const CalenderHead = styled.div`
width: 100%;
height:40px;
display:flex;
justify-content:space-around;
margin: 10px 0;
align-items:center;
font-size:24px;
`
export const SevenColGrid = styled.div`
width: 100%;
display: grid;
grid-template-columns: repeat(7,1fr);
height:27px;
`

export const HeadDay = styled.div`
text-align: center;
// background: rgb(250, 205, 183);
font-weight: 600;
color: #EC783D;
font-size: 1.2rem;
border-width: 1px 1px 0 1px;
border-style:solid;
`

export const CalendarBody = styled.div`
height: calc(100% - 27px - 40px);
display:grid;
grid-template-columns: repeat(7,1fr);
grid-template-rows: repeat(${({fourCol})=>fourCol ? 4 : 5},1fr);
`

export const StyledDay = styled.span`
border: 1px solid rgb(222, 222, 222);
border-collapse: collapse;
text-align:right;
padding:5px;
${({active})=>active && ` background-color: rgb(243, 159, 117)`}
`


export const StyledEvent=styled.span`
display:grid;
text-align:center;
background-color: rgb(236, 120, 61) !important;
color:white;
padding:2px 7px;
border-radius:8px;
margin:1px 0;
`


