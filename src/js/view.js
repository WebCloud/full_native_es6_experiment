import Table from './Table';
import '../css/view.css';

let tableItemTemplate,
    tableViewTemplate,
    table;

tableItemTemplate = `
  <tr>
    <td><name></td>
    <td><size></td>
    <td><openLevel></td>
    <td><level></td>
    <td><profit></td>
  </tr>
`;

tableViewTemplate = `
  <thead>
    <tr>
      <th>Name</th>
      <th>Size</th>
      <th>Open Level</th>
      <th>Level</th>
      <th>Profit/Loss</th>
    <tr>
  </thead>
  <tbody>
    <formattedItems>
  </tbody>
  <tfoot>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>Total Profit/Loss <span><totalProfit></span></td>
    </tr>
  </tfoot>
`;

table = new Table(tableItemTemplate, tableViewTemplate);

export default {
  table: table.render('.target')
};
