import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { daySortHelper } from '../../utils/dayFilterHelpers';

const BasicTable = ({ doctors, setIsOpenModal, onSetBookingContent, booking }: any) => {
  const rows = booking || doctors;
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {booking ? (
              <>
                <TableCell align="center">Doctor ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Start</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
              </>
            ) : (
              <>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Description</TableCell>
                {!doctors?.length && (
                  <>
                    <TableCell align="center">Address</TableCell>
                    <TableCell align="center">Opening Hours</TableCell>
                  </>
                )}
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length > 0 && doctors
            ? rows?.map((row: any) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover={true} onClick={(e) => navigate(`/doctor/${row.id}`)}>
                  <TableCell component="th" scope="row" align="center">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                </TableRow>
              ))
            : booking?.length > 0 &&
              rows?.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover={true}
                  onClick={() => {
                    setIsOpenModal(true);
                    localStorage.setItem('bookingId', row.id);
                  }}
                >
                  <TableCell align="center">{row.doctorId}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.start}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                </TableRow>
              ))}
          {!doctors?.length && !booking && (
            <TableRow key={rows.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover={true} onClick={(e) => navigate(`/doctor/${rows.id}`)}>
              <TableCell component="th" scope="row" align="center">
                {rows.id}
              </TableCell>
              <TableCell align="center">{rows.name}</TableCell>
              <TableCell align="center">{rows.description}</TableCell>
              <TableCell align="center">
                {rows.address.line_1}
                {rows.address.line_2}
                {rows.address.line_district}
              </TableCell>
              {daySortHelper(rows.opening_hours).map((e: any, index: any) => {
                return (
                  <TableCell
                    key={index}
                    align="center"
                    style={{ display: 'flex', flexDirection: 'column' }}
                    onClick={() => {
                      setIsOpenModal(true);
                      onSetBookingContent(rows.id, e.start, e.end);
                    }}
                  >
                    {e.day}
                    <br />
                    {e.start} - {e.end}
                  </TableCell>
                );
              })}
            </TableRow>
          )}
          {!booking?.length && !doctors && (
            <TableRow key={rows.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover={true}>
              <TableCell align="center">{rows.doctorId}</TableCell>
              <TableCell align="center">{rows.name}</TableCell>
              <TableCell align="center">{rows.start}</TableCell>
              <TableCell align="center">{rows.date}</TableCell>
              <TableCell align="center">{rows.status}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
