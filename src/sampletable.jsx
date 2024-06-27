import React from 'react';

const TableComponent = React.forwardRef(({ rows, columns }, ref) => {
  return (
    
    <div ref={ref}>
        {rows==null? <h1>null</h1>:<table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{typeof col.valueGetter === 'function' ? col.valueGetter(row) : row[col.field]}</td>
              ))}
            </tr>
          ))}
          
        </tbody>
      </table>}
      
    </div>
  );
});

export default TableComponent;
