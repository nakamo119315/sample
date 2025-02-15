import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SearchName from "./SearchName";

function MemberHome() {
  const [backendData, setBackendData] = useState({data:[]})
  const [selectData, setSelectData] = useState([{}])
  const [selectedOption, setSelectedOption] = useState("");
  const theme = createTheme(); // デフォルトテーマ
  const navigation = useNavigate();
  const [rows, setRows] = useState([...backendData.data]);
  const [searched, setSearched] = useState("");
  function deleteClick(deleteId){
    const body = {
      id:deleteId
    }
    axios.post('/member/delete',body).then(response=>{
      window.location.reload();
    });
  }
  useEffect(() => {
    fetch("/member/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
        setRows(data.data)
        fetch("/member/group")
          .then(response => response.json())
          .then(selectdata => {
            setSelectData(selectdata.data);
          })
      }
    )
  }, [])
  return (
    <ThemeProvider theme={theme}>
          {(typeof backendData.data === 'undefined') ? (
          <p>Loading...</p>
          ): (
            <>
            <SearchName
              initialRows={backendData.data}
              searched={searched}
              setRows={setRows}
              setSearched={setSearched}
              selectedOption = {selectedOption}
              setSelectedOption = {setSelectedOption}
              groups = {selectData}
            />
             <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">名前</TableCell>
                    <TableCell align="right">グループ名</TableCell>
                    <TableCell align="right">更新</TableCell>
                    <TableCell align="right">削除</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((member, i) => (
                      <TableRow
                        key={i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {member.id}
                        </TableCell>
                        <TableCell align="right">{member.name}</TableCell>
                        <TableCell align="right">{member.group_name}</TableCell>
                        <TableCell align="right">
                          <Button variant="outlined" onClick={() => navigation("/member/update", {state:{id:member.id}})} state={{id:member.id}}>
                            Update 
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button variant="outlined" onClick={() => deleteClick(member.id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </>
          )}
      <div>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={() => { navigation("/member/register") }} state={{}}>
            Register
          </Button>
          <Button variant="outlined" onClick={() => { navigation("/") }} state={{}}>
            Home
          </Button>
        </Stack>
      </div>
    </ThemeProvider>
  )
}

export default MemberHome