import React, { useMemo, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TableFooter,
  TablePagination,
  Pagination,
} from '@mui/material';

function SimpleTable({ columns, data }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [page, setPage] = useState(0); // 0-indexed
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, value) => {
    setPage(value - 1); // Convert 1-indexed Pagination to 0-indexed internal state
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const visibleRows = useMemo(() => {
    const sortedData = [...data].sort((a, b) => {
      if (order === 'asc') return a[orderBy] < b[orderBy] ? -1 : 1;
      return a[orderBy] > b[orderBy] ? -1 : 1;
    });
    const startIndex = page * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [data, order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  (column.id !== 'options' && column.id !== 'documents') ? (
                    <TableCell
                      key={column.id}
                      align={column.numeric ? 'right' : 'left'}
                      sortDirection={orderBy === column.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={(event) => handleRequestSort(event, column.id)}
                        sx={{
                          '& .MuiTableSortLabel-icon': {
                            opacity: 1, // Toujours visible
                            fontSize: '1rem',
                          },
                        }}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ) : (
                    <TableCell key={column.id} align={column.numeric ? 'right' : 'left'}>
                      {column.label}
                    </TableCell>
                  )
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.length > 0 ? (
                visibleRows.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.numeric ? 'right' : 'left'}>
                        {column.render ? column.render(row) : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Pas de données disponibles
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page} // 0-indexed
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Nombre de lignes par page"
                ActionsComponent={() => null}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)} // Total pages
          variant="outlined"
          shape="rounded"
          page={page + 1} // Convert back to 1-indexed for Pagination
          onChange={handleChangePage}
        />
        
      </Box>
    </Box>
  );
}

export default SimpleTable;
