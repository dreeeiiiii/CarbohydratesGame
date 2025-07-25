import React from 'react'

const Table = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md mb-10">
      <table className="min-w-full border border-yellow-300">
        <thead className="bg-yellow-200 text-yellow-900">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="p-3 border-b text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-yellow-50" : "bg-yellow-100"}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-3 border-b">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table