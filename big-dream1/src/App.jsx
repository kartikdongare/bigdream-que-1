/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const App = () => {
  const [counters, setCounters] = useState([
    { label: "Billing Counter", customers: [5, 3, 2] },
    { label: "Billing Counter", customers: [4, 1] },
    { label: "Billing Counter", customers: [3, 2, 1] },
    { label: "Billing Counter", customers: [2, 4] },
    { label: "Billing Counter", customers: [1, 3, 2] },
  ]);
  const [waitingCustomers, setWaitingCustomers] = useState([4, 3, 5, 2]);
  const reduceItems = () => {
    let newCounters = [...counters];

    for (let i = 0; i < newCounters.length; i++) {
      let firstCustomer = newCounters[i].customers[0];

      if (firstCustomer && firstCustomer > 1) {
        newCounters[i].customers[0]--;
      } else if (firstCustomer && firstCustomer === 1) {
        newCounters[i].customers.shift();
      }
    }
    setCounters(newCounters);
  };

  const sendCustomers = () => {
    const newCustomer = Math.floor(Math.random() * 10) + 1;
    waitingCustomers.push(newCustomer);
    let newCounters = [...counters];
    let newWaitingCustomers = [...waitingCustomers];

    if (newWaitingCustomers.length > 0) {
      let firstWaitingCustomer = newWaitingCustomers[0];

      let minIndex = 0;
      let minItems = Infinity;

      for (let i = 0; i < newCounters.length; i++) {
        let totalItems = newCounters[i].customers.reduce(
          (sum, customer) => sum + customer,
          0
        );
        if (totalItems < minItems) {
          minIndex = i;
          minItems = totalItems;
        }
      }
      newCounters[minIndex].customers.push(firstWaitingCustomer);
      newWaitingCustomers.shift();
      setCounters(newCounters);
      setWaitingCustomers(newWaitingCustomers);
    }
  };
  useEffect(() => {
    const timer = setInterval(reduceItems, 1000);
    return () => clearInterval(timer);
  }, [counters]);

  return (
    <div className="billing-counter">
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableBody>
            {counters.map((counter, index1) => (
              <StyledTableRow key={counter.label}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                >
                  {index1 + 1}.&nbsp;&nbsp;&nbsp; {counter.label} :-
                </StyledTableCell>
                {counter.customers.map((a, index) => (
                  <StyledTableCell component="th" scope="row" key={index}>
                    <Typography>
                      Customer No:
                      <Typography variant="span">{index + 1}</Typography>
                      &nbsp;&nbsp;&nbsp;&nbsp;Items:-
                      <Typography variant="span">{a}</Typography>
                    </Typography>
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        onClick={sendCustomers}
        sx={{ marginTop: "1rem" }}
      >
        Add New Customer
      </Button>
    </div>
  );
};

export default App;
