import Table from 'cli-table';
import chalk from 'chalk';

const getStatsTable = () => {
  const table = new Table({
    head: [chalk.bold('Metric'), chalk.bold('Value')],
    style: {
      head: ['cyan'],
      compact: true,
    },
  });

  const result = {
    table,
    add: (metric, value) => {
      table.push({ [metric]: [value] });
      return result;
    },
    output: ({ before = '', after = '' } = {}) =>
      console.log(`${before}${table.toString()}${after}`), // eslint-disable-line no-console
  };

  return result;
};

export default getStatsTable;
