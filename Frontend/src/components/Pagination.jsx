"use client"
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationComponent({current,total,onPageChange}) {
    const handleChange=(event,value)=>{
        onPageChange(value);
    }
  return (
    <Stack spacing={2}>
      <Pagination count={total} page={current} onChange={handleChange} color="success"/>
    </Stack>
  );
}
